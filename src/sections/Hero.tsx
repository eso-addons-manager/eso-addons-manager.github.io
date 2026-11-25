import { Download, Github, Monitor, Apple, Terminal } from 'lucide-react';
import type { LocaleContent } from '../i18n/types';
import { APP_REPO_URL } from '../constants';

type HeroProps = {
  content: LocaleContent['hero'];
  downloadLabel: string;
};

const platformIcons: Record<string, typeof Monitor> = {
  Windows: Monitor,
  macOS: Apple,
  Linux: Terminal,
};

export default function Hero({ content, downloadLabel }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-graphite-border bg-graphite-bg">
      <div className="container-page py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <p className="eyebrow mb-4">{content.eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-tight text-content-primary sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-bronze sm:text-2xl">
              {content.subtitle}
            </p>
            <p className="mt-6 max-w-xl text-base text-content-secondary sm:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#download" className="btn btn-primary">
                <Download className="h-4 w-4" aria-hidden="true" />
                {downloadLabel}
              </a>
              <a
                href={APP_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                {content.viewOnGithub}
              </a>
            </div>

            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-wider text-content-secondary">
                {content.platformLabel}
              </p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {content.platforms.map((p) => {
                  const Icon = platformIcons[p.name] ?? Monitor;
                  return (
                    <li
                      key={p.name}
                      className="inline-flex items-center gap-2 rounded-md border border-graphite-border bg-graphite-card px-3 py-2 text-sm text-content-primary"
                    >
                      <Icon className="h-4 w-4 text-bronze" aria-hidden="true" />
                      <span className="font-medium">{p.name}</span>
                      <span className="text-content-secondary">{p.detail}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Screenshot placeholder — clearly labeled, not a fake screenshot. */}
          <div className="animate-fade-in-up lg:pl-4">
            <div
              className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-graphite-border bg-graphite-section"
              aria-label={content.screenshotAlt}
            >
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-md border border-graphite-border bg-graphite-card" aria-hidden="true" />
                <p className="text-sm font-medium text-content-secondary">
                  {content.screenshotLabel}
                </p>
                <p className="mt-1 text-xs text-content-secondary">
                  {content.screenshotAlt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
