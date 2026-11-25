import { ExternalLink, Info } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';
import { APP_RELEASES_URL } from '../constants';

type ChangelogSectionProps = {
  content: LocaleContent['changelog'];
};

export default function ChangelogSection({ content }: ChangelogSectionProps) {
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
      <div className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-bronze" aria-hidden="true" />
          <p className="text-sm text-content-primary">
            {content.notImplemented}
          </p>
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
