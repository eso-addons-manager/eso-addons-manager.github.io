import { ExternalLink, Info, Loader2, AlertCircle } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';
import { APP_RELEASES_URL } from '../constants';
import { useReleases } from '../features/releases/useReleases';
import { formatDate } from '../features/releases/format';
import ReleaseMarkdown from '../features/releases/ReleaseMarkdown';

type ChangelogSectionProps = {
  content: LocaleContent['changelog'];
};

export default function ChangelogSection({ content }: ChangelogSectionProps) {
  const { stableHistory, loading, error, usingCache, retry } = useReleases('history');

  return (
    <Section
      id="changelog"
      ariaLabelledby="changelog-title"
      className="border-b border-graphite-border bg-graphite-bg"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="changelog-title"
      />

      {/* Loading state */}
      {loading && stableHistory.length === 0 && (
        <div className="card flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-bronze" aria-hidden="true" />
          <p className="text-sm text-content-secondary">{content.loadingReleases}</p>
        </div>
      )}

      {/* Error state with no data */}
      {error && stableHistory.length === 0 && (
        <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      {/* No releases */}
      {!loading && !error && stableHistory.length === 0 && (
        <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-bronze" aria-hidden="true" />
            <p className="text-sm text-content-primary">{content.noReleases}</p>
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
      )}

      {/* Stable release history */}
      {stableHistory.length > 0 && (
        <div>
          <ul className="space-y-4">
            {stableHistory.map((release) => (
              <li key={release.id} className="card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-content-primary">
                      {release.tag_name}
                    </h3>
                    <p className="mt-0.5 text-sm text-content-secondary">
                      {content.publishedOn} {formatDate(release.published_at)}
                    </p>
                  </div>
                  <a
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-bronze transition-colors hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {content.viewOnGithub}
                  </a>
                </div>

                <div className="mt-4 border-t border-graphite-border pt-4">
                  {release.body && release.body.trim().length > 0 ? (
                    <ReleaseMarkdown
                      markdown={release.body}
                      className="release-markdown text-sm leading-relaxed text-content-secondary"
                    />
                  ) : (
                    <p className="text-sm text-content-secondary">
                      {content.emptyNotes}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Cache notice */}
          {usingCache && (
            <p className="mt-4 text-xs text-content-secondary">{content.usingCache}</p>
          )}

          {/* Fallback link — always present */}
          <div className="mt-6 flex justify-center">
            <a
              href={APP_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {content.fallbackLink}
            </a>
          </div>
        </div>
      )}
    </Section>
  );
}
