import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { LocaleContent } from '../i18n/types';

type NavigationProps = {
  content: LocaleContent;
};

const NAV_ITEMS: { id: string; key: keyof LocaleContent['nav'] }[] = [
  { id: 'features', key: 'features' },
  { id: 'screenshots', key: 'screenshots' },
  { id: 'download', key: 'download' },
  { id: 'getting-started', key: 'gettingStarted' },
  { id: 'changelog', key: 'changelog' },
  { id: 'roadmap', key: 'roadmap' },
  { id: 'faq', key: 'faq' },
  { id: 'support', key: 'support' },
];

export default function Navigation({ content }: NavigationProps) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu when the viewport grows to desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <nav aria-label="Primary" className="md:static md:w-auto">
      {/* Mobile toggle */}
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-content-primary hover:text-bronze"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? content.header.closeMenu : content.header.openMenu}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop navigation */}
      <ul className="hidden md:flex md:items-center md:gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-md px-3 py-2 text-sm font-medium text-content-secondary transition-colors hover:text-bronze"
            >
              {content.nav[item.key]}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 border-b border-graphite-border bg-graphite-section shadow-lg md:hidden"
        >
          <ul className="container-page flex flex-col py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className="block rounded-md px-3 py-3 text-base font-medium text-content-secondary hover:text-bronze"
                >
                  {content.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
