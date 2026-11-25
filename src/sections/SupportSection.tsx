import { AlertCircle, Globe, ExternalLink, ShieldAlert, ListChecks } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type SupportSectionProps = {
  content: LocaleContent['support'];
};

const channelIcons = [AlertCircle, Globe];

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

      {/* Two support channels */}
      <ul className="mb-8 grid gap-4 sm:grid-cols-2">
        {content.channels.map((channel, index) => {
          const Icon = channelIcons[index] ?? AlertCircle;
          return (
            <li key={channel.label} className="card flex flex-col">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bronze/10 text-bronze">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-content-primary">
                  {channel.label}
                </h3>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
                {channel.description}
              </p>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary mt-4 self-start"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {channel.linkLabel}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Bug report guide */}
      <div className="card max-w-3xl">
        <div className="flex items-center gap-3">
          <ListChecks className="h-5 w-5 text-bronze" aria-hidden="true" />
          <h3 className="text-base font-semibold text-content-primary">
            {content.reportGuideTitle}
          </h3>
        </div>
        <p className="mt-3 text-sm text-content-secondary">
          {content.reportGuideIntro}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-content-secondary">
          {content.reportGuideItems.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-start gap-2.5 rounded-md border border-warning/30 bg-warning/[0.06] p-3.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-content-primary">
            {content.privacyWarning}
          </p>
        </div>
      </div>
    </Section>
  );
}
