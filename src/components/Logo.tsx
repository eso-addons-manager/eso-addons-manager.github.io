type LogoProps = {
  className?: string;
  title?: string;
};

// Brand logo v1.0 — an original compass-inspired mark in the bronze accent.
// The SVG file lives in public/brand/logo.svg and is referenced via Vite's
// BASE_URL so it resolves under the /eso-addons-manager/ subpath.
export default function Logo({
  className = 'h-8 w-8',
  title = 'ESO Addons Manager',
}: LogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/logo.svg`}
      alt={title}
      className={className}
      width={128}
      height={128}
      decoding="async"
    />
  );
}
