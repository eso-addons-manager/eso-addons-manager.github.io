import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import type { LocaleContent } from '../i18n/types';

type FaqSectionProps = {
  content: LocaleContent['faq'];
};

export default function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      ariaLabelledby="faq-title"
      className="border-b border-graphite-border bg-graphite-bg"
    >
      <SectionHeading
        title={content.title}
        subtitle={content.subtitle}
        id="faq-title"
      />
      <ul className="max-w-3xl divide-y divide-graphite-border rounded-lg border border-graphite-border bg-graphite-card">
        {content.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={item.question}>
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-content-primary hover:text-bronze"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-content-secondary transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-content-secondary">
                  {item.answer}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
