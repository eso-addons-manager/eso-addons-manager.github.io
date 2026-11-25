import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type GettingStartedSectionProps = {
  content: LocaleContent['gettingStarted'];
};

export default function GettingStartedSection({
  content,
}: GettingStartedSectionProps) {
  const steps = [
    { title: content.step1Title, body: content.step1Body },
    { title: content.step2Title, body: content.step2Body },
    { title: content.step3Title, body: content.step3Body },
    { title: content.step4Title, body: content.step4Body },
  ];

  return (
    <Section
      id="getting-started"
      ariaLabelledby="getting-started-title"
      className="border-b border-graphite-border bg-graphite-section"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="getting-started-title"
      />
      <ol className="grid gap-5 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title} className="card">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bronze text-sm font-semibold text-graphite-bg"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-base font-semibold text-content-primary">
                {step.title}
              </h3>
            </div>
            <p className="mt-3 text-sm text-content-secondary">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
