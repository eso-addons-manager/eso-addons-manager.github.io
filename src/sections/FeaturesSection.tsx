import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import FeatureIcon from '../components/FeatureIcon';
import type { LocaleContent } from '../i18n/types';

type FeaturesSectionProps = {
  content: LocaleContent['features'];
};

export default function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <Section
      id="features"
      ariaLabelledby="features-title"
      className="border-b border-graphite-border bg-graphite-bg"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="features-title"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <li
            key={item.title}
            className="card card-hover flex h-full flex-col"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-bronze/10 text-bronze">
              <FeatureIcon name={item.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-[0.95rem] font-semibold leading-snug text-content-primary">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
