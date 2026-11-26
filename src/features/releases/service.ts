import type { GithubRelease } from './types';

const LATEST_URL =
  'https://api.github.com/repos/powerbq/eso-addons-manager/releases/latest';
const HISTORY_URL =
  'https://api.github.com/repos/powerbq/eso-addons-manager/releases?per_page=100';

const CACHE_PREFIX = 'eso-am:releases:';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const FETCH_TIMEOUT_MS = 12_000;
const MAX_PAGES = 5; // up to 500 releases via pagination

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

function readCache<T>(
  key: string,
  allowStale = false
): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry = JSON.parse(raw) as CacheEntry<T>;

    if (!Number.isFinite(entry.timestamp)) {
      return null;
    }

    const isExpired =
      Date.now() - entry.timestamp > CACHE_TTL_MS;

    if (isExpired && !allowStale) {
      return null;
    }

    return entry.data ?? null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // storage full or unavailable — non-fatal, skip caching
  }
}

function validateRelease(obj: unknown): obj is GithubRelease {
  if (typeof obj !== 'object' || obj === null) return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.id === 'number' &&
    typeof r.tag_name === 'string' &&
    typeof r.html_url === 'string' &&
    typeof r.published_at === 'string' &&
    typeof r.prerelease === 'boolean' &&
    typeof r.draft === 'boolean' &&
    Array.isArray(r.assets)
  );
}

function validateReleases(arr: unknown): GithubRelease[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter(validateRelease) as GithubRelease[];
}

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  });

  if (res.status === 403 || res.status === 429) {
    throw new Error('RATE_LIMITED');
  }
  if (!res.ok) {
    throw new Error(`HTTP_${res.status}`);
  }
  return res.json();
}

function withTimeout(): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timer),
  };
}

export type LatestResult = {
  latest: GithubRelease | null;
  fromCache: boolean;
  error: string | null;
};

export type HistoryResult = {
  stable: GithubRelease[];
  fromCache: boolean;
  error: string | null;
};

export async function fetchLatestRelease(): Promise<LatestResult> {
  const cacheKey = `${CACHE_PREFIX}latest`;
  const cached = readCache<GithubRelease>(cacheKey);
  if (cached) {
    return { latest: cached, fromCache: true, error: null };
  }

  const { signal, cancel } = withTimeout();
  try {
    const json = await fetchJson(LATEST_URL, signal);
    if (validateRelease(json)) {
      writeCache(cacheKey, json);
      return { latest: json, fromCache: false, error: null };
    }
    throw new Error('INVALID_RESPONSE');
  } catch (err) {
    const message =
      err instanceof DOMException && err.name === 'AbortError'
        ? 'TIMEOUT'
        : err instanceof Error
          ? err.message
          : 'NETWORK_ERROR';
    // Fall back to stale cache if available (even if expired)
const stale = readCache<GithubRelease>(cacheKey, true);

return {
  latest: stale,
  fromCache: stale !== null,
  error: message,
};
  } finally {
    cancel();
  }
}

export async function fetchStableHistory(): Promise<HistoryResult> {
  const cacheKey = `${CACHE_PREFIX}history`;
  const cached = readCache<GithubRelease[]>(cacheKey);
  if (cached) {
    return { stable: cached, fromCache: true, error: null };
  }

  let allReleases: GithubRelease[] = [];
  let page = 1;
  let nextUrl = `${HISTORY_URL}&page=${page}`;

  const { signal, cancel } = withTimeout();
  try {
    while (page <= MAX_PAGES) {
const json = await fetchJson(nextUrl, signal);

if (!Array.isArray(json)) {
  throw new Error('INVALID_RESPONSE');
}

const batch = validateReleases(json);
      if (batch.length === 0) break;
      allReleases = allReleases.concat(batch);
      if (batch.length < 100) break; // no more pages
      page += 1;
      nextUrl = `${HISTORY_URL}&page=${page}`;
    }

    const stable = allReleases
      .filter((r) => !r.draft && !r.prerelease)
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

    writeCache(cacheKey, stable);
    return { stable, fromCache: false, error: null };
  } catch (err) {
    const message =
      err instanceof DOMException && err.name === 'AbortError'
        ? 'TIMEOUT'
        : err instanceof Error
          ? err.message
          : 'NETWORK_ERROR';
const stale = readCache<GithubRelease[]>(cacheKey, true);

return {
  stable: stale ?? [],
  fromCache: stale !== null,
  error: message,
};
  } finally {
    cancel();
  }
}
