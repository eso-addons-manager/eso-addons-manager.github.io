type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-2xl ${alignment} mb-10`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold text-content-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-content-secondary text-lg">{subtitle}</p>
      )}
    </div>
  );
}
