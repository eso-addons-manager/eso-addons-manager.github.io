import { CalendarClock } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type RoadmapSectionProps = {
  content: LocaleContent['roadmap'];
};

export default function RoadmapSection({ content }: RoadmapSectionProps) {
  return (
    <Section
      id="roadmap"
      ariaLabelledby="roadmap-title"
      className="border-b border-graphite-border bg-graphite-section"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="roadmap-title"
      />
      <ul className="grid gap-5">
        {content.items.map((item) => (
          <li key={item.title} className="card">
            <div className="flex flex-wrap items-center gap-3">
              <CalendarClock className="h-5 w-5 text-bronze" aria-hidden="true" />
              <h3 className="text-base font-semibold text-content-primary">
                {item.title}
              </h3>
              <span className="rounded-full border border-bronze/40 bg-bronze/10 px-2.5 py-0.5 text-xs font-medium text-bronze">
                {content.plannedBadge}
              </span>
            </div>
            <p className="mt-3 text-sm text-content-secondary">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
