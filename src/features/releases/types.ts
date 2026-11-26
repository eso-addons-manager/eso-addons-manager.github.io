// Typed shape of a GitHub Release asset as returned by the public API.
export type GithubAsset = {
  name: string;
  size: number;
  browser_download_url: string;
  content_type: string;
};

// Typed shape of a GitHub Release as returned by the public API.
export type GithubRelease = {
  id: number;
  tag_name: string;
  name: string | null;
  published_at: string;
  body: string | null;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  assets: GithubAsset[];
};

// Classification of a single asset into platform / architecture / package.
export type AssetCategory = 'checksum' | 'unclassified';

export type PlatformKey = 'windows' | 'macos' | 'linux' | AssetCategory;

export type PackageKind =
  | 'exe'
  | 'zip'
  | 'dmg'
  | 'appimage'
  | 'deb'
  | 'rpm'
  | 'pkg.tar.zst'
  | 'checksum';

export type ClassifiedAsset = {
  asset: GithubAsset;
  platform: PlatformKey;
  architecture: string | null;
  packageKind: PackageKind;
};

// Grouped assets for a single release, keyed by platform.
export type PlatformGroup = {
  platform: Exclude<PlatformKey, AssetCategory>;
  label: string;
  architecture: string | null;
  assets: ClassifiedAsset[];
};

export type ClassifiedRelease = {
  release: GithubRelease;
  platforms: PlatformGroup[];
  checksums: ClassifiedAsset[];
  unclassified: ClassifiedAsset[];
};

// Fetch states shared between Download and Changelog.
export type ReleasesState = {
  latest: GithubRelease | null;
  stableHistory: GithubRelease[];
  loading: boolean;
  error: string | null;
  usingCache: boolean;
};
