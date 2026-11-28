import { z } from 'astro/zod';
import { APP_RELEASES_URL } from './links.ts';

const packageFormats = {
  'pkg.tar.zst': 'linux',
  appimage: 'linux',
  deb: 'linux',
  rpm: 'linux',
  dmg: 'macos',
  exe: 'windows',
  zip: null,
} as const;

export type PackageKind = keyof typeof packageFormats;
type Platform = NonNullable<(typeof packageFormats)[PackageKind]>;
type Architecture = 'AMD64' | 'ARM64';

const safeSegment = /^[^/\\\u0000-\u001f\u007f]+$/;
const fileName = z.string().regex(safeSegment).refine((name) => name !== '.' && name !== '..');
const assetSize = z.number().int().positive();
const assetSchema = z.strictObject({ name: fileName, size: assetSize, url: z.string() });

const tagName = z.string().refine((tag) => tag.split('/').every((part) =>
  safeSegment.test(part) && !part.startsWith('.') && !/[\s~^:?*\[]/.test(part) &&
  !part.includes('..') && !part.includes('@{') && !part.endsWith('.lock'),
) && !tag.endsWith('.'));
const releasesPath = new URL(APP_RELEASES_URL).pathname;

function matchesReleaseUrl(value: string, expectedPath: string): boolean {
  if (!value.startsWith('https://github.com/') || /[\s\\?#]/.test(value)) return false;
  const url = URL.parse(value);
  if (!url) return false;
  try {
    return decodeURIComponent(url.pathname) === expectedPath;
  } catch {
    return false;
  }
}

function matchesAssetUrl(file: ReleaseFile, tag: string): boolean {
  return matchesReleaseUrl(file.url, `${releasesPath}/download/${tag}/${file.name}`);
}

const releaseMetadataSchema = z.strictObject({
  tag: tagName,
  title: z.string().trim().min(1),
  notes: z.string(),
  publishedAt: z.iso.datetime(),
  url: z.string(),
});

export const releaseDataSchema = releaseMetadataSchema.extend({ assets: z.array(assetSchema) })
  .superRefine(({ tag, url, assets }, context) => {
    if (!matchesReleaseUrl(url, `${releasesPath}/tag/${tag}`)) {
      context.addIssue({ code: 'custom', path: ['url'], message: 'Invalid GitHub release URL.' });
    }
    const names = new Set<string>();
    for (const [index, file] of assets.entries()) {
      if (names.has(file.name) || !matchesAssetUrl(file, tag)) {
        context.addIssue({ code: 'custom', path: ['assets', index], message: 'Incorrect or duplicate GitHub asset.' });
      }
      names.add(file.name);
    }
  })
  .transform((release) => ({
    ...release,
    assets: release.assets.sort((a, b) => {
      if (a.name === b.name) return 0;
      return a.name < b.name ? -1 : 1;
    }),
  }));

const githubReleaseSchema = z.object({
  tag_name: tagName,
  name: z.string().nullish(),
  body: z.string().nullish(),
  published_at: z.iso.datetime(),
  html_url: z.string(),
  draft: z.literal(false),
  prerelease: z.literal(false),
  assets: z.array(z.unknown()),
});

const githubAssetSchema = z.object({
  name: fileName,
  size: assetSize,
  browser_download_url: z.string(),
  state: z.literal('uploaded'),
});

export type ReleaseFile = z.infer<typeof assetSchema>;
export type ReleaseData = z.infer<typeof releaseDataSchema>;
export type ReleasePackage = ReleaseFile & { kind: PackageKind };
export type PlatformGroup = { platform: Platform; architecture: Architecture; packages: ReleasePackage[] };
export type Release = ReleaseData & { platforms: PlatformGroup[]; checksums: ReleaseFile[]; otherFiles: ReleaseFile[] };

export function parseGithubRelease(payload: unknown): ReleaseData {
  const result = githubReleaseSchema.parse(payload);
  const assets = new Map<string, ReleaseFile>();
  for (const value of result.assets) {
    const parsed = githubAssetSchema.safeParse(value);
    if (!parsed.success) continue;
    const { name, size, browser_download_url: url } = parsed.data;
    const file = { name, size, url };
    if (!assets.has(name) && matchesAssetUrl(file, result.tag_name)) assets.set(name, file);
  }

  return releaseDataSchema.parse({
    tag: result.tag_name,
    title: result.name?.trim() || result.tag_name,
    notes: result.body ?? '',
    publishedAt: result.published_at,
    url: result.html_url,
    assets: [...assets.values()],
  });
}

const packageKinds = Object.keys(packageFormats) as PackageKind[];
const platformMarkers = {
  windows: /(?:^|[._-])(?:windows|win)(?=$|[._-])/,
  macos: /(?:^|[._-])(?:macos|darwin)(?=$|[._-])/,
  linux: /(?:^|[._-])linux(?=$|[._-])/,
};
const amd64 = /(?:^|[._-])(?:amd64|x86_64|x64)(?=$|[._-])/;
const arm64 = /(?:^|[._-])(?:arm64|aarch64)(?=$|[._-])/;

function classifyPackage(name: string) {
  const kind = packageKinds.find((value) => name.endsWith(`.${value}`));
  const hasAmd64 = amd64.test(name);
  const hasArm64 = arm64.test(name);
  if (!kind || hasAmd64 === hasArm64) return null;

  const candidates = (Object.keys(platformMarkers) as Platform[]).filter((key) => platformMarkers[key].test(name));
  const formatPlatform = packageFormats[kind];
  const platform = formatPlatform ?? candidates[0];
  if (!platform || candidates.length > 1 || (candidates[0] && candidates[0] !== platform)) return null;

  const architecture: Architecture = hasArm64 ? 'ARM64' : 'AMD64';
  return { kind, platform, architecture };
}

export function classifyRelease(data: ReleaseData): Release {
  const groups = new Map<string, PlatformGroup>();
  const checksums: ReleaseFile[] = [];
  const otherFiles: ReleaseFile[] = [];

  for (const file of data.assets) {
    const name = file.name.toLowerCase();
    if (/^sha256sums(?:\.txt|\.sig)?$|\.sha256(?:sum)?$/.test(name)) {
      checksums.push(file);
      continue;
    }

    const classified = classifyPackage(name);
    if (!classified) {
      otherFiles.push(file);
      continue;
    }

    const { kind, platform, architecture } = classified;
    const key = `${platform}:${architecture}`;
    const group = groups.get(key) ?? { platform, architecture, packages: [] };
    group.packages.push({ ...file, kind });
    groups.set(key, group);
  }

  return { ...data, platforms: [...groups.values()], checksums, otherFiles };
}

const releaseDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Europe/Kyiv',
});

export function formatDate(date: string): string {
  return releaseDate.format(new Date(date));
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / Math.pow(1024, index);
  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}
