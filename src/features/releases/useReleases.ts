import { useEffect, useRef, useState } from 'react';
import type { GithubRelease, ReleasesState } from './types';
import { fetchLatestRelease, fetchStableHistory } from './service';

// Module-level dedup: a single in-flight promise set shared across all
// components so Download and Changelog never trigger duplicate fetches.
let latestPromise: Promise<void> | null = null;
let historyPromise: Promise<void> | null = null;

let latestData: GithubRelease | null = null;
let historyData: GithubRelease[] = [];
let latestError: string | null = null;
let historyError: string | null = null;
let latestFromCache = false;
let historyFromCache = false;

const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((fn) => fn());
}

function ensureLatest() {
  if (latestPromise) return latestPromise;
  latestPromise = (async () => {
    const result = await fetchLatestRelease();
    latestData = result.latest;
    latestError = result.error;
    latestFromCache = result.fromCache;
    latestPromise = null;
    notify();
  })();
  return latestPromise;
}

function ensureHistory() {
  if (historyPromise) return historyPromise;
  historyPromise = (async () => {
    const result = await fetchStableHistory();
    historyData = result.stable;
    historyError = result.error;
    historyFromCache = result.fromCache;
    historyPromise = null;
    notify();
  })();
  return historyPromise;
}

export function useReleases(): ReleasesState & { retry: () => void } {
  const [, forceUpdate] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const update = () => {
      if (mountedRef.current) forceUpdate((n) => n + 1);
    };
    subscribers.add(update);

    // Fetch both latest and history once, shared across mount points.
    void ensureLatest();
    void ensureHistory();

    return () => {
      mountedRef.current = false;
      subscribers.delete(update);
    };
  }, []);

  const loading = latestPromise !== null || historyPromise !== null;

  // If we have no data at all and there's an error, surface the error.
  const error =
    latestError && historyError && !latestData && historyData.length === 0
      ? latestError
      : latestError && !latestData
        ? latestError
        : historyError && historyData.length === 0
          ? historyError
          : null;

  const usingCache = latestFromCache || historyFromCache;

  const retry = () => {
    latestData = null;
    historyData = [];
    latestError = null;
    historyError = null;
    latestFromCache = false;
    historyFromCache = false;
    latestPromise = null;
    historyPromise = null;
    void ensureLatest();
    void ensureHistory();
    notify();
  };

  return {
    latest: latestData,
    stableHistory: historyData,
    loading,
    error,
    usingCache,
    retry,
  };
}
