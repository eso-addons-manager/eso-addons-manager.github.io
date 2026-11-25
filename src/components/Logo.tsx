type LogoProps = {
  className?: string;
  title?: string;
};

// A simple original compass-inspired placeholder logo in the bronze accent.
// The final logo will be prepared in a later stage.
export default function Logo({ className = 'h-8 w-8', title = 'ESO Addons Manager' }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
      <path d="M32 10 L36 30 L32 32 L28 30 Z" fill="currentColor" />
      <path d="M54 32 L34 36 L32 32 L34 28 Z" fill="currentColor" opacity="0.7" />
      <path d="M32 54 L28 34 L32 32 L36 34 Z" fill="currentColor" opacity="0.7" />
      <path d="M10 32 L30 28 L32 32 L30 36 Z" fill="currentColor" />
      <circle
        cx="32"
        cy="32"
        r="3"
        fill="#111317"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
