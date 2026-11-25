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
    <div className={`max-w-2xl ${alignment} mb-8`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        id={id}
        className="text-2xl font-semibold leading-tight text-content-primary sm:text-3xl lg:text-[2rem]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-content-secondary sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
