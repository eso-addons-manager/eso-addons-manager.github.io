import { Github, AlertCircle, ExternalLink, Globe, GitBranch } from 'lucide-react';
import Logo from './Logo';
import type { LocaleContent } from '../i18n/types';
import type { FooterLink } from '../i18n/types';

type FooterProps = {
  content: LocaleContent;
};

const linkIcons: Record<string, typeof Github> = {
  'Application repository': GitBranch,
  'Application releases': Github,
  'Application issues': AlertCircle,
  'Website repository': Globe,
  'Website issues': AlertCircle,
};

function FooterLinkRow({ link }: { link: FooterLink }) {
  const Icon = linkIcons[link.label] ?? ExternalLink;
  return (
    <li>
      <a
        href={link.url}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 text-content-secondary transition-colors hover:text-bronze"
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{link.label}</span>
        <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" />
      </a>
    </li>
  );
}

export default function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear();
  const { footer } = content;

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
              {footer.tagline}
            </p>
          </div>

          {/* Sections */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
              {footer.sections}
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

          {/* Resources */}
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
              {footer.resourcesTitle}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footer.links.map((link) => (
                <FooterLinkRow key={link.label} link={link} />
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-graphite-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-bronze">
            {footer.disclaimerTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            {footer.disclaimerBody}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            {footer.notAffiliated}
          </p>
          <p className="mt-4 text-xs text-content-secondary">
            © {year} {footer.copyright}. {footer.license}.
          </p>
        </div>
      </div>
    </footer>
  );
}
