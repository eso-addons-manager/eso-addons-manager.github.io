import { Github, AlertCircle } from 'lucide-react';
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
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-lg font-semibold text-content-primary">
              {content.header.brandName}
            </p>
            <p className="mt-2 text-sm text-content-secondary">
              {content.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-content-primary">
              {content.footer.sections}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#features" className="text-content-secondary hover:text-bronze">
                  {content.nav.features}
                </a>
              </li>
              <li>
                <a href="#download" className="text-content-secondary hover:text-bronze">
                  {content.nav.download}
                </a>
              </li>
              <li>
                <a href="#getting-started" className="text-content-secondary hover:text-bronze">
                  {content.nav.gettingStarted}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-content-secondary hover:text-bronze">
                  {content.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-content-primary">
              {content.footer.applicationRepo}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={APP_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-content-secondary hover:text-bronze"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  {content.footer.applicationRepo}
                </a>
              </li>
              <li>
                <a
                  href={APP_ISSUES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-content-secondary hover:text-bronze"
                >
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  {content.footer.reportIssue}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-graphite-border pt-6">
          <p className="text-sm text-content-secondary">
            <span className="font-semibold text-content-primary">
              {content.footer.disclaimerTitle}.
            </span>{' '}
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
