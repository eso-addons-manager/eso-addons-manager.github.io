import { Github, AlertCircle } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';
import { APP_REPO_URL, APP_ISSUES_URL } from '../constants';

type SupportSectionProps = {
  content: LocaleContent['support'];
};

export default function SupportSection({ content }: SupportSectionProps) {
  return (
    <Section
      id="support"
      ariaLabelledby="support-title"
      className="bg-graphite-section"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="support-title"
      />
      <div className="card max-w-3xl">
        <p className="text-sm text-content-secondary">{content.body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={APP_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {content.reportIssue}
          </a>
          <a
            href={APP_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {content.viewRepo}
          </a>
        </div>
      </div>
    </Section>
  );
}
