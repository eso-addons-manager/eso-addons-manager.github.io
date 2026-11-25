import { ImageOff } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type ScreenshotsSectionProps = {
  content: LocaleContent['screenshots'];
};

export default function ScreenshotsSection({ content }: ScreenshotsSectionProps) {
  return (
    <Section
      id="screenshots"
      ariaLabelledby="screenshots-title"
      className="border-b border-graphite-border bg-graphite-section"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="screenshots-title"
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <li
            key={i}
            className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-graphite-border bg-graphite-card"
            aria-label={content.placeholderLabel}
          >
            <div className="text-center">
              <ImageOff
                className="mx-auto h-8 w-8 text-content-secondary"
                aria-hidden="true"
              />
              <p className="mt-2 text-sm font-medium text-content-secondary">
                {content.placeholderLabel}
              </p>
              <p className="mt-1 text-xs text-content-secondary">
                {content.placeholderNote}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
