import type {
  ClassifiedAsset,
  ClassifiedRelease,
  GithubRelease,
  PackageKind,
  PlatformGroup,
} from './types';

// Detect the platform from an asset filename.
// Real asset names follow patterns like:
//   eso-addons-manager-windows-amd64-setup.exe
//   eso-addons-manager-macos-arm64.dmg
//   eso-addons-manager-linux-amd64.AppImage
//   eso-addons-manager_0.2.0_amd64.deb
//   eso-addons-manager-0.2.0-1-x86_64.pkg.tar.zst
function detectPlatform(name: string): 'windows' | 'macos' | 'linux' | 'checksum' | null {
  const lower = name.toLowerCase();
  if (lower === 'sha256sums' || lower === 'sha256sums.sig' || lower.endsWith('.sha256')) {
    return 'checksum';
  }
  if (lower.includes('windows') || lower.endsWith('.exe') || lower.endsWith('.msi')) {
    return 'windows';
  }
  if (lower.includes('macos') || lower.includes('darwin') || lower.endsWith('.dmg')) {
    return 'macos';
  }
  if (
    lower.includes('linux') ||
    lower.endsWith('.appimage') ||
    lower.endsWith('.deb') ||
    lower.endsWith('.rpm') ||
    lower.endsWith('.pkg.tar.zst')
  ) {
    return 'linux';
  }
  return null;
}

// Detect the architecture from an asset filename.
// Recognizes both amd64 and x86_64 as the same AMD64 architecture.
function detectArchitecture(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes('arm64') || lower.includes('aarch64')) return 'ARM64';
  if (lower.includes('amd64') || lower.includes('x86_64') || lower.includes('x64')) {
    return 'AMD64';
  }
  return null;
}

// Detect the package extension/kind from an asset filename.
function detectPackageKind(name: string): PackageKind | null {
  const lower = name.toLowerCase();
  if (lower === 'sha256sums' || lower.endsWith('.sha256')) return 'checksum';
  if (lower.endsWith('.pkg.tar.zst')) return 'pkg.tar.zst';
  if (lower.endsWith('.appimage')) return 'appimage';
  if (lower.endsWith('.deb')) return 'deb';
  if (lower.endsWith('.rpm')) return 'rpm';
  if (lower.endsWith('.dmg')) return 'dmg';
  if (lower.endsWith('.exe') || lower.endsWith('.msi')) return 'exe';
  if (lower.endsWith('.zip')) return 'zip';
  return null;
}

export function classifyAsset(asset: GithubRelease['assets'][number]): ClassifiedAsset {
  const name = asset.name;
  const platform = detectPlatform(name) ?? 'unclassified';
  const architecture = detectArchitecture(name);
  const packageKind = detectPackageKind(name) ?? 'checksum';

  return {
    asset,
    platform,
    architecture,
    packageKind,
  };
}

const PLATFORM_LABELS: Record<Exclude<PlatformGroup['platform'], never>, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
};

export function classifyRelease(release: GithubRelease): ClassifiedRelease {
  const classified = release.assets.map(classifyAsset);

  const platformMap = new Map<string, PlatformGroup>();
  const checksums: ClassifiedAsset[] = [];
  const unclassified: ClassifiedAsset[] = [];

  for (const item of classified) {
    if (item.platform === 'checksum') {
      checksums.push(item);
    } else if (item.platform === 'unclassified') {
      unclassified.push(item);
    } else {
      const key = `${item.platform}:${item.architecture ?? 'unknown'}`;
      const existing = platformMap.get(key);
      if (existing) {
        existing.assets.push(item);
      } else {
        platformMap.set(key, {
          platform: item.platform,
          label: PLATFORM_LABELS[item.platform],
          architecture: item.architecture,
          assets: [item],
        });
      }
    }
  }

  const platformOrder: Record<string, number> = { windows: 0, macos: 1, linux: 2 };
  const platforms = Array.from(platformMap.values()).sort((a, b) => {
    const ord = (platformOrder[a.platform] ?? 99) - (platformOrder[b.platform] ?? 99);
    if (ord !== 0) return ord;
    return (a.architecture ?? '').localeCompare(b.architecture ?? '');
  });

  return { release, platforms, checksums, unclassified };
}
