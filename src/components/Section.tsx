import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  ariaLabelledby?: string;
};

export default function Section({
  id,
  children,
  className = '',
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-padding scroll-mt-14 ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
