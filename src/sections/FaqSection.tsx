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
      <ul className="max-w-3xl overflow-hidden rounded-lg border border-graphite-border bg-graphite-card">
        {content.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={item.question} className="border-b border-graphite-border last:border-b-0">
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-content-primary transition-colors hover:text-bronze"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-content-secondary transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-bronze' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              {isOpen && (
                <div className="border-l-2 border-bronze/40 px-5 pb-5 pl-5 text-sm leading-relaxed text-content-secondary">
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
