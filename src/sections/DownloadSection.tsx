import { ExternalLink, Info, Monitor, Apple, Terminal } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';
import { APP_RELEASES_URL } from '../constants';

type DownloadSectionProps = {
  content: LocaleContent['download'];
};

const platformIcons: Record<string, typeof Monitor> = {
  Windows: Monitor,
  macOS: Apple,
  Linux: Terminal,
};

export default function DownloadSection({ content }: DownloadSectionProps) {
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

      {/* Platform availability */}
      <ul className="mb-6 grid gap-4 sm:grid-cols-3">
        {content.platforms.map((p) => {
          const Icon = platformIcons[p.name] ?? Monitor;
          return (
            <li
              key={p.name}
              className="card flex items-center gap-4"
            >
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-bronze/10 text-bronze">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold text-content-primary">
                  {p.name}
                </p>
                <p className="truncate text-sm text-content-secondary">
                  {p.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Not-yet-implemented notice */}
      <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-bronze" aria-hidden="true" />
          <div>
            <p className="text-sm text-content-primary">
              {content.notImplemented}
            </p>
            <p className="mt-1 text-sm text-content-secondary">
              {content.fallbackNote}
            </p>
          </div>
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
    </Section>
  );
}
