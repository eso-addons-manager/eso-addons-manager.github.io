import {
  ExternalLink,
  Info,
  ShieldCheck,
  Monitor,
  Apple,
  Terminal,
  Download,
  FileArchive,
  Loader2,
  AlertCircle,
  FileText,
  Package,
} from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';
import { APP_RELEASES_URL } from '../constants';
import type { PackageKind } from '../features/releases/types';
import { useReleases } from '../features/releases/useReleases';
import { classifyRelease } from '../features/releases/classifier';
import { formatFileSize, formatDate } from '../features/releases/format';

type DownloadSectionProps = {
  content: LocaleContent['download'];
};

const platformIcons: Record<string, typeof Monitor> = {
  Windows: Monitor,
  macOS: Apple,
  Linux: Terminal,
};

const packageIcons: Record<PackageKind, typeof Download> = {
  exe: Download,
  zip: FileArchive,
  dmg: Package,
  appimage: Package,
  deb: Package,
  rpm: Package,
  'pkg.tar.zst': Package,
  checksum: FileText,
};

// Map classified platform key to the locale platform entry.
const platformKeyToName: Record<string, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
};

export default function DownloadSection({ content }: DownloadSectionProps) {
  const { latest, loading, error, usingCache, retry } = useReleases('latest');

  const classified = latest ? classifyRelease(latest) : null;

  return (
    <Section
      id="download"
      ariaLabelledby="download-title"
      className="border-b border-graphite-border bg-graphite-bg"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="download-title"
      />

      {/* Platform warnings — always present */}
      <ul className="mb-6 grid gap-4 sm:grid-cols-3">
        {content.platforms.map((p) => {
          const Icon = platformIcons[p.name] ?? Monitor;
          return (
            <li key={p.name} className="card flex flex-col">
              <div className="flex items-center gap-3.5">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bronze/10 text-bronze">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-content-primary">
                    {p.name}
                  </p>
                  <p className="text-sm text-content-secondary">{p.detail}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-content-secondary">
                {p.note}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Loading state */}
      {loading && !latest && (
        <div className="card mb-6 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-bronze" aria-hidden="true" />
          <p className="text-sm text-content-secondary">{content.loadingReleases}</p>
        </div>
      )}

      {/* Error state (with no data) */}
      {error && !latest && (
        <div className="card mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
            <div>
              <p className="text-sm text-content-primary">{content.fetchError}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            <button type="button" onClick={retry} className="btn btn-secondary">
              {content.retry}
            </button>
            <a
              href={APP_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {content.fallbackLink}
            </a>
          </div>
        </div>
      )}

      {/* No release available */}
      {!loading && !error && !latest && (
        <div className="card mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-bronze" aria-hidden="true" />
            <p className="text-sm text-content-primary">{content.noReleaseAvailable}</p>
          </div>
          <a
            href={APP_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary shrink-0"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {content.fallbackLink}
          </a>
        </div>
      )}

      {/* Latest release with grouped assets */}
      {latest && classified && (
        <div className="mb-6">
          {/* Release header */}
          <div className="card mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-content-secondary">
                {content.latestVersion}
              </p>
              <p className="mt-1 text-xl font-semibold text-content-primary">
                {latest.tag_name}
              </p>
              <p className="mt-1 text-sm text-content-secondary">
                {content.publishedOn} {formatDate(latest.published_at)}
              </p>
            </div>
            <a
              href={latest.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary shrink-0"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {content.fallbackLink}
            </a>
          </div>

          {/* Grouped assets by platform */}
          {classified.platforms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {content.platforms.map((platformEntry) => {
                const platformGroup = classified.platforms.find(
                  (pg) =>
                    platformKeyToName[pg.platform] === platformEntry.name &&
                    pg.architecture === platformEntry.detail.replace('Apple Silicon ', '')
                );

                return (
                  <div key={platformEntry.name} className="card flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bronze/10 text-bronze">
                        {(() => {
                          const Icon = platformIcons[platformEntry.name] ?? Monitor;
                          return <Icon className="h-5 w-5" aria-hidden="true" />;
                        })()}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-content-primary">
                          {platformEntry.name}
                        </p>
                        <p className="text-sm text-content-secondary">
                          {platformEntry.detail}
                        </p>
                      </div>
                    </div>

                    {platformGroup && platformGroup.assets.length > 0 ? (
                      <ul className="mt-4 space-y-2.5">
                        {platformGroup.assets.map((item) => {
                          const PkgIcon = packageIcons[item.packageKind] ?? Download;
                          return (
                            <li key={item.asset.name}>
                              <a
                                href={item.asset.browser_download_url}
                                className="group flex items-center justify-between gap-3 rounded-md border border-graphite-border bg-graphite-section px-3 py-2.5 text-sm transition-colors hover:border-bronze/50"
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <span className="flex min-w-0 items-center gap-2.5">
                                  <PkgIcon className="h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
                                  <span className="truncate font-medium text-content-primary">
                                    {item.packageKind === 'checksum'
                                      ? item.asset.name
                                      : content.packageLabels[item.packageKind] ?? item.asset.name}
                                  </span>
                                </span>
                                <span className="shrink-0 text-xs text-content-secondary">
                                  {formatFileSize(item.asset.size)}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-content-secondary">
                        {content.noPackagesAvailable}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card">
              <p className="text-sm text-content-secondary">{content.noPackagesAvailable}</p>
            </div>
          )}

          {/* Checksums */}
          {classified.checksums.length > 0 && (
            <div className="mt-4 card">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-bronze" aria-hidden="true" />
                <p className="text-sm font-semibold text-content-primary">
                  {content.checksumsLabel}
                </p>
              </div>
              <p className="mt-2 text-sm text-content-secondary">{content.checksumNote}</p>
              <ul className="mt-3 space-y-2">
                {classified.checksums.map((item) => (
                  <li key={item.asset.name}>
                    <a
                      href={item.asset.browser_download_url}
                      className="inline-flex items-center gap-2 text-sm text-bronze transition-colors hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      {item.asset.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Unclassified assets */}
          {classified.unclassified.length > 0 && (
            <div className="mt-4 card">
              <p className="text-sm font-semibold text-content-primary">
                {content.unclassifiedAssets}
              </p>
              <ul className="mt-3 space-y-2">
                {classified.unclassified.map((item) => (
                  <li key={item.asset.name}>
                    <a
                      href={item.asset.browser_download_url}
                      className="inline-flex items-center gap-2 text-sm text-content-secondary transition-colors hover:text-bronze"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {item.asset.name}
                      <span className="text-xs">({formatFileSize(item.asset.size)})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cache notice */}
          {usingCache && (
            <p className="mt-4 text-xs text-content-secondary">{content.usingCache}</p>
          )}
        </div>
      )}

      {/* Fallback link — always present */}
      <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-bronze" aria-hidden="true" />
          <p className="text-sm text-content-secondary">{content.fallbackNote}</p>
        </div>
        <a
          href={APP_RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary shrink-0"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {content.fallbackLink}
        </a>
      </div>
    </Section>
  );
}
