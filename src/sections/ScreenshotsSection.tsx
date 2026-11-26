import { Maximize2 } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type ScreenshotsSectionProps = {
  content: LocaleContent['screenshots'];
};

export default function ScreenshotsSection({
  content,
}: ScreenshotsSectionProps) {
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

      <ul className="grid gap-5 sm:grid-cols-2">
        {content.items.map((item) => {
          const imageUrl =
            `${import.meta.env.BASE_URL}screenshots/${item.file}`;

          return (
            <li
              key={item.file}
              className="overflow-hidden rounded-lg border border-graphite-border bg-graphite-card"
            >
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title}: ${content.viewFullSize}`}
                className="group block rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bronze"
              >
                <div className="relative aspect-[1919/1040] overflow-hidden bg-graphite-bg">
                  <img
                    src={imageUrl}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  <span className="absolute right-3 top-3 rounded-md border border-graphite-border bg-graphite-bg/90 p-2 text-bronze">
                    <Maximize2
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="border-t border-graphite-border p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-content-primary transition-colors group-hover:text-bronze">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-bronze">
                    <Maximize2
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    {content.viewFullSize}
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}