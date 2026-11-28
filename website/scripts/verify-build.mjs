import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { parseReleaseSnapshot } from '../src/data/github.ts';

const dist = new URL('../dist/', import.meta.url);
const site = new URL('https://eso-addons-manager.github.io/');
const read = (path) => readFile(new URL(path, dist), 'utf8');
const [home, notFound, sitemap, robots, releaseData] = await Promise.all([
  read('index.html'), read('404.html'), read('sitemap.xml'), read('robots.txt'), read('_data/releases.json'),
]);

const canonical = [...home.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/g)]
  .map(([tag]) => tag.match(/\bhref="([^"]+)"/)?.[1]);
assert.deepEqual(canonical, [site.href], 'The homepage must have exactly one canonical root URL.');
assert.match(notFound, /<meta\b[^>]*name="robots"[^>]*content="noindex[, "][^>]*>/);
assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url), [site.href]);
assert.ok(robots.split(/\r?\n/).includes(`Sitemap: ${new URL('/sitemap.xml', site).href}`));

const snapshot = parseReleaseSnapshot(JSON.parse(releaseData));
if (process.env.GITHUB_SHA) assert.equal(snapshot.siteSha, process.env.GITHUB_SHA, 'Release data must match the build commit.');

const ids = new Set([...home.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id));
const assets = new Set();
for (const html of [home, notFound]) {
  const candidates = [...html.matchAll(/\s(?:href|src)="(\/[^"\s]*)"/g)].map(([, path]) => path);
  for (const [, srcset] of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    candidates.push(...srcset.split(',').map((source) => source.trim().split(/\s+/, 1)[0]));
  }
  for (const path of candidates) {
    const url = new URL(path, site);
    assert.equal(url.origin, site.origin, `Expected a local artifact path: ${path}`);
    if (url.pathname === '/') {
      if (url.hash) assert.ok(ids.has(decodeURIComponent(url.hash.slice(1))), `Missing homepage anchor: ${path}`);
    } else {
      assets.add(url.pathname.slice(1));
    }
  }
}

await Promise.all([...assets].map(async (path) => {
  assert.ok((await stat(new URL(path, dist))).isFile(), `Missing static artifact file: ${path}`);
}));
console.log(`Verified two pages, crawler files, release data and ${assets.size} referenced static files.`);
