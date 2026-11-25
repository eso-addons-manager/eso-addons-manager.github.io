type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: ButtonProps) {
  const variantClass =
    variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <a href={href} className={`btn ${variantClass} ${className}`} {...externalProps}>
      {children}
    </a>
  );
}
