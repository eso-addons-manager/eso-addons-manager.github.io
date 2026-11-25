import {
  Download,
  ShieldCheck,
  FolderCheck,
  ScanLine,
  ListChecks,
  Settings2,
  type LucideIcon,
} from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type GettingStartedSectionProps = {
  content: LocaleContent['gettingStarted'];
};

const stepIcons: LucideIcon[] = [
  Download,
  ShieldCheck,
  FolderCheck,
  ScanLine,
  ListChecks,
  Settings2,
];

export default function GettingStartedSection({
  content,
}: GettingStartedSectionProps) {
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
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.steps.map((step, index) => {
          const Icon = stepIcons[index] ?? Download;
          return (
            <li
              key={step.title}
              className={`card flex h-full flex-col ${
                step.emphasis ? 'border-bronze/30 bg-bronze/[0.04]' : ''
              }`}
            >
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
                <Icon
                  className={`ml-auto h-5 w-5 shrink-0 ${
                    step.emphasis ? 'text-bronze' : 'text-content-secondary'
                  }`}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
