import { Github } from 'lucide-react';
import Logo from './Logo';
import Navigation from './Navigation';
import type { LocaleContent } from '../i18n/types';
import { APP_REPO_URL } from '../constants';

type HeaderProps = {
  content: LocaleContent;
};

export default function Header({ content }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-graphite-border bg-graphite-bg/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-bg/80">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-bronze"
          aria-label={content.header.brandName}
        >
          <Logo className="h-7 w-7 shrink-0" />
          <span className="text-sm font-semibold text-content-primary sm:text-base">
            {content.header.brandName}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <Navigation content={content} />
          <a
            href={APP_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-md border border-graphite-border bg-graphite-card px-3.5 py-2 text-sm font-medium text-content-primary transition-colors duration-200 hover:border-bronze hover:text-bronze"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>{content.nav.viewOnGithub}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
