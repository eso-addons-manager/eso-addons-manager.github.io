import assert from 'node:assert/strict';
import { test } from 'node:test';
import { setTimeout } from 'node:timers/promises';
import { parseReleaseSnapshot, resolveReleaseSnapshot, resolveScheduledRelease } from '../src/data/github.ts';
import { APP_RELEASES_URL } from '../src/data/links.ts';
import { releaseSnapshot } from '../src/data/release-snapshot.ts';
import { classifyRelease, parseGithubRelease } from '../src/data/releases.ts';

const githubLatest = 'https://api.github.com/repos/powerbq/eso-addons-manager/releases/latest';
const published = 'https://eso-addons-manager.github.io/_data/releases.json';
const sha = 'a'.repeat(40);

function githubAsset(name, overrides = {}) {
  return {
    name,
    size: 1024,
    state: 'uploaded',
    browser_download_url: `${APP_RELEASES_URL}/download/v1.0.0/${encodeURIComponent(name)}`,
    ...overrides,
  };
}

function githubRelease(overrides = {}) {
  return {
    tag_name: 'v1.0.0',
    name: 'First release',
    body: '## Release notes\n\nA fix.',
    published_at: '2026-11-27T18:21:57Z',
    html_url: `${APP_RELEASES_URL}/tag/v1.0.0`,
    draft: false,
    prerelease: false,
    assets: [],
    ...overrides,
  };
}

function fromGithub(payload, siteSha) {
  return resolveReleaseSnapshot({
    mode: 'live',
    siteSha,
    fetcher: async (url) => {
      assert.equal(url, githubLatest);
      return Response.json(payload);
    },
  });
}

test('parses metadata and matches only uploaded files from the same tag and repository', () => {
  const release = parseGithubRelease(githubRelease({
    assets: [
      githubAsset('app-windows-amd64-setup.exe'),
      githubAsset('README with spaces.txt'),
      githubAsset('README with spaces.txt'),
      githubAsset('another-windows-amd64.exe', { state: 'new' }),
      githubAsset('empty-linux-amd64.zip', { size: 0 }),
      githubAsset('fractional-linux-amd64.zip', { size: 1.5 }),
      githubAsset('bad-linux-amd64.zip', { browser_download_url: 'javascript:alert(1)' }),
      githubAsset('other-tag.zip', { browser_download_url: `${APP_RELEASES_URL}/download/v0/other-tag.zip` }),
      githubAsset('swapped-name.zip', { browser_download_url: `${APP_RELEASES_URL}/download/v1.0.0/other.zip` }),
      githubAsset('other-repo.zip', { browser_download_url: 'https://github.com/another/project/releases/download/v1.0.0/other-repo.zip' }),
      githubAsset('sources.zip', { browser_download_url: `${APP_RELEASES_URL}/download/v1.0.0/sources.zip?redirect=example` }),
    ],
  }));
  assert.equal(release.title, 'First release');
  assert.equal(release.notes, '## Release notes\n\nA fix.');
  assert.deepEqual(release.assets.map(({ name }) => name), ['README with spaces.txt', 'app-windows-amd64-setup.exe']);
});

test('supports tags with slashes and GitHub releases without a title or notes', () => {
  const root = `${APP_RELEASES_URL}/download/releases%2Fv1.0.0`;
  const release = parseGithubRelease(githubRelease({
    tag_name: 'releases/v1.0.0',
    name: null,
    body: null,
    html_url: `${APP_RELEASES_URL}/tag/releases/v1.0.0`,
    assets: [githubAsset('SHA256SUMS', { browser_download_url: `${root}/SHA256SUMS` })],
  }));
  assert.equal(release.title, release.tag);
  assert.equal(release.notes, '');
  assert.equal(release.assets.length, 1);
  const withoutNotes = parseGithubRelease(githubRelease({ name: undefined, body: undefined }));
  assert.equal(withoutNotes.title, withoutNotes.tag);
  assert.equal(withoutNotes.notes, '');
});

test('rejects invalid release metadata, drafts and prereleases', () => {
  for (const overrides of [
    { published_at: 'yesterday' },
    { tag_name: '../v1.0.0' },
    { html_url: 'https://github.com/another/project/releases/tag/v1.0.0' },
    { html_url: `${APP_RELEASES_URL}/tag/v2.0.0` },
    { draft: true },
    { prerelease: true },
  ]) {
    assert.throws(() => parseGithubRelease(githubRelease(overrides)));
  }
});

test('keeps checksums and unknown files apart from compatible packages', () => {
  const names = [
    'app-windows-x64.exe', 'app-macos-aarch64.dmg', 'app-linux-amd64.AppImage',
    'app-arm64.deb', 'app-x86_64.rpm', 'app-x86_64.pkg.tar.zst', 'app-windows-amd64.zip',
    'sha256sums.sig', 'app-linux.zip.sha256', 'app.exe', 'app-linux-arm64-amd64.zip',
    'app-windows-amd64.dmg', 'app-arm64.zip', 'readme.txt',
  ];
  const { platforms, checksums, otherFiles } = classifyRelease(parseGithubRelease(githubRelease({ assets: names.map((name) => githubAsset(name)) })));
  const packages = Object.fromEntries(platforms.map(({ platform, architecture, packages }) =>
    [`${platform}:${architecture}`, packages.map(({ kind }) => kind)],
  ));
  assert.deepEqual(packages, {
    'windows:AMD64': ['zip', 'exe'],
    'macos:ARM64': ['dmg'],
    'linux:AMD64': ['appimage', 'pkg.tar.zst', 'rpm'],
    'linux:ARM64': ['deb'],
  });
  assert.deepEqual(checksums.map(({ name }) => name), ['app-linux.zip.sha256', 'sha256sums.sig']);
  assert.deepEqual(otherFiles.map(({ name }) => name), [
    'app-arm64.zip', 'app-linux-arm64-amd64.zip', 'app-windows-amd64.dmg', 'app.exe', 'readme.txt',
  ]);
});

test('uses the bundled snapshot in offline builds', async () => {
  const result = await resolveReleaseSnapshot({ mode: 'snapshot', fetcher: () => assert.fail('Unexpected fetch') });
  assert.equal(result.source, 'bundled');
  assert.equal(result.snapshot.release.tag, 'v0.4.0');
  assert.equal(result.snapshot.release.assets.length, 10);
});

test('404 from the latest endpoint means no stable release, including prerelease-only repositories', async () => {
  const calls = [];
  const result = await resolveReleaseSnapshot({
    mode: 'live',
    fetcher: async (url) => {
      calls.push(url);
      return new Response(null, { status: 404 });
    },
  });
  assert.equal(result.source, 'github');
  assert.equal(result.snapshot.release, null);
  assert.deepEqual(calls, [githubLatest]);
});

test('preserves a stable release with an empty asset list', async () => {
  const result = await fromGithub(githubRelease());
  assert.equal(result.source, 'github');
  assert.equal(result.snapshot.release.tag, 'v1.0.0');
  assert.deepEqual(classifyRelease(result.snapshot.release).platforms, []);
});

test('uses the published snapshot when GitHub is rate limited without retrying', async (t) => {
  const warn = t.mock.method(console, 'warn', () => {});
  const { snapshot } = await fromGithub(githubRelease());
  const calls = [];
  const result = await resolveReleaseSnapshot({
    mode: 'live',
    siteSha: sha,
    fetcher: async (url) => {
      calls.push(url);
      return url === githubLatest
        ? new Response(null, { status: 429, headers: { 'retry-after': '120' } })
        : Response.json(snapshot);
    },
  });
  assert.deepEqual(calls, [githubLatest, published]);
  assert.equal(result.source, 'published');
  assert.equal(result.snapshot.siteSha, sha);
  assert.equal(result.snapshot.fingerprint, snapshot.fingerprint);
  assert.match(warn.mock.calls[0].arguments[0], /HTTP 429, retry-after=120/);
});

test('retains a published empty release state during an outage', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const { snapshot } = await resolveReleaseSnapshot({ mode: 'live', fetcher: async () => new Response(null, { status: 404 }) });
  const result = await resolveReleaseSnapshot({
    mode: 'live',
    fetcher: async (url) => url === githubLatest ? new Response(null, { status: 503 }) : Response.json(snapshot),
  });
  assert.equal(result.source, 'published');
  assert.equal(result.snapshot.release, null);
});

test('uses the bundled snapshot for malformed JSON, unexpected prereleases, and bad published snapshots', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const { snapshot } = await fromGithub(githubRelease());
  for (const response of [
    new Response('{'),
    Response.json(null),
    Response.json(githubRelease({ prerelease: true })),
    new Response(null, { status: 403 }),
    new Response(null, { status: 502 }),
  ]) {
    const result = await resolveReleaseSnapshot({
      mode: 'live',
      fetcher: async (url) => url === githubLatest
        ? response
        : Response.json({ ...snapshot, fingerprint: '0'.repeat(64) }),
    });
    assert.equal(result.source, 'bundled');
    assert.equal(result.snapshot.release.tag, releaseSnapshot.tag);
  }
});

test('falls back after request timeouts and network failures', async (t) => {
  const warn = t.mock.method(console, 'warn', () => {});
  const timeout = await resolveReleaseSnapshot({
    mode: 'live',
    requestTimeout: 10,
    fetcher: async (_url, { signal }) => setTimeout(500, new Response(null, { status: 500 }), { signal }),
  });
  assert.equal(timeout.source, 'bundled');
  assert.match(warn.mock.calls[0].arguments[0], /request timed out/);
  const offline = await resolveReleaseSnapshot({
    mode: 'live',
    fetcher: async () => { throw new TypeError('offline'); },
  });
  assert.equal(offline.source, 'bundled');
});

test('fingerprints change with the release, independent of array order and the build SHA', async () => {
  const assets = [githubAsset('SHA256SUMS'), githubAsset('app-windows-amd64.exe')];
  const base = await fromGithub(githubRelease({ assets }), sha);
  const reordered = await fromGithub(githubRelease({ assets: [...assets].reverse() }), 'b'.repeat(40));
  const newNotes = await fromGithub(githubRelease({ assets, body: 'Updated notes.' }), sha);
  const newSize = await fromGithub(githubRelease({ assets: [{ ...assets[0], size: 4096 }, assets[1]] }), sha);
  assert.equal(base.snapshot.fingerprint, reordered.snapshot.fingerprint);
  assert.notEqual(base.snapshot.fingerprint, newNotes.snapshot.fingerprint);
  assert.notEqual(base.snapshot.fingerprint, newSize.snapshot.fingerprint);
});

function releaseProbe(githubResponse, publishedResponse, calls = []) {
  return async (url) => {
    calls.push(url);
    assert.ok(url === githubLatest || url === published);
    return url === githubLatest ? githubResponse : publishedResponse;
  };
}

test('scheduled builds skip an unchanged site and release after one request to each source', async () => {
  const release = githubRelease();
  const { snapshot } = await fromGithub(release, sha);
  const calls = [];
  const result = await resolveScheduledRelease(sha, releaseProbe(Response.json(release), Response.json(snapshot), calls));
  assert.equal(result.snapshot, null);
  assert.deepEqual(calls, [githubLatest, published]);
});

test('scheduled builds prepare the exact release when the fingerprint or site commit changes', async () => {
  const release = githubRelease();
  const { snapshot } = await fromGithub(release, sha);
  const modified = githubRelease({ body: 'Changed release notes' });
  const freshRelease = await resolveScheduledRelease(sha, releaseProbe(Response.json(modified), Response.json(snapshot)));
  assert.equal(freshRelease.snapshot.release.notes, modified.body);
  assert.notEqual(freshRelease.snapshot.fingerprint, snapshot.fingerprint);
  assert.deepEqual(parseReleaseSnapshot(freshRelease.snapshot), freshRelease.snapshot);

  const newSha = 'b'.repeat(40);
  const freshCommit = await resolveScheduledRelease(newSha, releaseProbe(Response.json(release), Response.json(snapshot)));
  assert.equal(freshCommit.snapshot.siteSha, newSha);
  assert.equal(freshCommit.snapshot.fingerprint, snapshot.fingerprint);
});

test('scheduled builds keep published release data during an outage when the site changes', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const { snapshot } = await fromGithub(githubRelease(), sha);
  const inputs = () => releaseProbe(new Response(null, { status: 503 }), Response.json(snapshot));
  assert.equal((await resolveScheduledRelease(sha, inputs())).snapshot, null);

  const newSha = 'b'.repeat(40);
  const result = await resolveScheduledRelease(newSha, inputs());
  assert.deepEqual(result.snapshot, { ...snapshot, siteSha: newSha });
});

test('scheduled builds skip publication while both release sources are unavailable', async (t) => {
  t.mock.method(console, 'warn', () => {});
  const inputs = releaseProbe(new Response(null, { status: 429 }), new Response(null, { status: 404 }));
  const result = await resolveScheduledRelease(sha, inputs);
  assert.equal(result.snapshot, null);
  assert.match(result.reason, /unavailable/);
});

test('scheduled builds publish an empty release only when GitHub confirms there is no stable release', async () => {
  const { snapshot } = await fromGithub(githubRelease(), sha);
  const inputs = releaseProbe(new Response(null, { status: 404 }), Response.json(snapshot));
  const result = await resolveScheduledRelease(sha, inputs);
  assert.equal(result.snapshot.release, null);
  assert.notEqual(result.snapshot.fingerprint, snapshot.fingerprint);
});
