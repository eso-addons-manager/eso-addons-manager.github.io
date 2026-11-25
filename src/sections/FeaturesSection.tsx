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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <li key={item.title} className="card transition-colors hover:border-bronze/50">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-bronze/10 text-bronze">
              <FeatureIcon name={item.icon} />
            </div>
            <h3 className="text-base font-semibold text-content-primary">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-content-secondary">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
