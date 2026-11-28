import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { z } from 'astro/zod';
import { APP_REPOSITORY } from './links.ts';
import { releaseSnapshot } from './release-snapshot.ts';
import { parseGithubRelease, releaseDataSchema, type ReleaseData } from './releases.ts';

const githubLatest = `https://api.github.com/repos/${APP_REPOSITORY}/releases/latest`;
const publishedRelease = 'https://eso-addons-manager.github.io/_data/releases.json';
const timeoutMs = 5_000;
const gitSha = z.string().regex(/^[0-9a-f]{40}$/);
const snapshotSchema = z.strictObject({
  schemaVersion: z.literal(1),
  siteSha: gitSha.nullable(),
  fingerprint: z.string().regex(/^[0-9a-f]{64}$/),
  release: releaseDataSchema.nullable(),
});

type Snapshot = z.infer<typeof snapshotSchema>;
type Mode = 'live' | 'snapshot';
type ReleaseResult = { source: 'github' | 'published' | 'bundled' | 'prepared'; snapshot: Snapshot };

function fingerprint(release: ReleaseData | null): string {
  return createHash('sha256').update(JSON.stringify(release)).digest('hex');
}

function snapshotOf(release: ReleaseData | null, siteSha: string | null): Snapshot {
  return { schemaVersion: 1, siteSha, fingerprint: fingerprint(release), release };
}

export function parseReleaseSnapshot(value: unknown): Snapshot {
  const snapshot = snapshotSchema.parse(value);
  if (snapshot.fingerprint !== fingerprint(snapshot.release)) throw new Error('Release snapshot fingerprint does not match.');
  return snapshot;
}

type GithubResult = { release: ReleaseData | null } | { error: string };

async function getGithubRelease(fetcher: typeof fetch, signal: AbortSignal): Promise<GithubResult> {
  let response: Response;
  try {
    response = await fetcher(githubLatest, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
      redirect: 'error',
      signal,
    });
  } catch {
    return { error: signal.aborted ? 'request timed out' : 'request failed' };
  }

  if (response.status === 404) return { release: null };
  if (response.status === 403 || response.status === 429) {
    const details = ['retry-after', 'x-ratelimit-reset']
      .map((header) => [header, response.headers.get(header)] as const)
      .filter(([, value]) => value && /^\d+$/.test(value))
      .map(([header, value]) => `${header}=${value}`);
    return { error: [`HTTP ${response.status}`, ...details].join(', ') };
  }
  if (!response.ok) return { error: `HTTP ${response.status}` };

  try {
    return { release: parseGithubRelease(await response.json()) };
  } catch {
    return { error: signal.aborted ? 'response timed out' : 'invalid release response' };
  }
}

async function getPublishedSnapshot(fetcher: typeof fetch, signal: AbortSignal): Promise<Snapshot | null> {
  try {
    const response = await fetcher(publishedRelease, { redirect: 'error', signal });
    if (!response.ok) return null;
    return parseReleaseSnapshot(await response.json());
  } catch {
    return null;
  }
}

export async function resolveReleaseSnapshot({
  mode,
  siteSha = null,
  fetcher = globalThis.fetch,
  requestTimeout = timeoutMs,
}: {
  mode: Mode;
  siteSha?: string | null;
  fetcher?: typeof fetch;
  requestTimeout?: number;
}): Promise<ReleaseResult> {
  const sha = gitSha.safeParse(siteSha).data ?? null;

  if (mode === 'live') {
    const result = await getGithubRelease(fetcher, AbortSignal.timeout(requestTimeout));
    if ('release' in result) return { source: 'github', snapshot: snapshotOf(result.release, sha) };

    const previous = await getPublishedSnapshot(fetcher, AbortSignal.timeout(requestTimeout));
    if (previous) {
      console.warn(`[releases] GitHub ${result.error}. Using the published snapshot.`);
      return { source: 'published', snapshot: snapshotOf(previous.release, sha) };
    }
    console.warn(`[releases] GitHub ${result.error}. Using the bundled snapshot.`);
  }

  return { source: 'bundled', snapshot: snapshotOf(releaseDataSchema.parse(releaseSnapshot), sha) };
}

export async function resolveScheduledRelease(siteSha: string, fetcher = globalThis.fetch) {
  const sha = gitSha.parse(siteSha);
  const [github, published] = await Promise.all([
    getGithubRelease(fetcher, AbortSignal.timeout(timeoutMs)),
    getPublishedSnapshot(fetcher, AbortSignal.timeout(timeoutMs)),
  ]);

  if ('error' in github) console.warn(`[releases] GitHub ${github.error} during scheduled refresh.`);
  const release = 'release' in github ? github.release : published?.release;
  if (release === undefined) return { snapshot: null, reason: 'Release API and published snapshot are unavailable.' };

  const candidate = snapshotOf(release, sha);
  if (published?.siteSha === sha && published.fingerprint === candidate.fingerprint) {
    return { snapshot: null, reason: 'Published site commit and release are current.' };
  }
  return { snapshot: candidate, reason: 'Site commit or release metadata changed.' };
}

async function readPreparedRelease(path: string): Promise<ReleaseResult> {
  const snapshot = parseReleaseSnapshot(JSON.parse(await readFile(path, 'utf8')));
  if (snapshot.siteSha !== gitSha.parse(process.env.GITHUB_SHA)) {
    throw new Error('Prepared release snapshot belongs to a different site commit.');
  }
  return { source: 'prepared', snapshot };
}

let current: Promise<ReleaseResult> | undefined;

export function getReleaseSnapshot(): Promise<ReleaseResult> {
  if (!current) {
    const path = process.env.ESO_RELEASE_SNAPSHOT_PATH;
    const mode = process.env.ESO_RELEASE_MODE ?? 'snapshot';
    if (mode !== 'live' && mode !== 'snapshot') throw new Error('ESO_RELEASE_MODE must be live or snapshot.');
    current = path ? readPreparedRelease(path) : resolveReleaseSnapshot({ mode, siteSha: process.env.GITHUB_SHA });
  }
  return current;
}
