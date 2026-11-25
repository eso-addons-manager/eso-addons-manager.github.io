import { Github, AlertCircle, ExternalLink } from 'lucide-react';
import Logo from './Logo';
import type { LocaleContent } from '../i18n/types';
import { APP_REPO_URL, APP_ISSUES_URL } from '../constants';

type FooterProps = {
  content: LocaleContent;
};

export default function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-graphite-border bg-graphite-section">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 text-bronze">
              <Logo className="h-7 w-7 shrink-0" />
              <span className="text-sm font-semibold text-content-primary">
                {content.header.brandName}
              </span>
            </div>
            <p className="mt-3 text-sm text-content-secondary">
              {content.footer.tagline}
            </p>
          </div>

          {/* Sections */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
              {content.footer.sections}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#features" className="text-content-secondary transition-colors hover:text-bronze">
                  {content.nav.features}
                </a>
              </li>
              <li>
                <a href="#download" className="text-content-secondary transition-colors hover:text-bronze">
                  {content.nav.download}
                </a>
              </li>
              <li>
                <a href="#getting-started" className="text-content-secondary transition-colors hover:text-bronze">
                  {content.nav.gettingStarted}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-content-secondary transition-colors hover:text-bronze">
                  {content.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Application repository */}
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
              {content.footer.applicationRepo}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={APP_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-content-secondary transition-colors hover:text-bronze"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  {content.footer.applicationRepo}
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={APP_ISSUES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-content-secondary transition-colors hover:text-bronze"
                >
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {content.footer.reportIssue}
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-graphite-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-bronze">
            {content.footer.disclaimerTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            {content.footer.disclaimerBody}
          </p>
          <p className="mt-3 text-xs text-content-secondary">
            {content.footer.notAffiliated}
          </p>
          <p className="mt-4 text-xs text-content-secondary">
            © {year} {content.footer.copyright}. {content.footer.license}.
          </p>
        </div>
      </div>
    </footer>
  );
}
