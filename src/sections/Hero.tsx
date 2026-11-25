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
    <section
      id="hero"
      className="relative scroll-mt-16 overflow-hidden border-b border-graphite-border bg-graphite-bg"
    >
      {/* Decorative cartographic background — low opacity, behind content. */}
      <div
        className="hero-cartographic pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
      />

      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left column: title, description, actions, platforms */}
          <div className="animate-fade-in-up">
            <p className="eyebrow mb-4">{content.eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-[1.1] text-content-primary sm:text-5xl lg:text-[3.25rem]">
              {content.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-bronze sm:text-xl">
              {content.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
              {content.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
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

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-wider text-content-secondary">
                {content.platformLabel}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {content.platforms.map((p) => {
                  const Icon = platformIcons[p.name] ?? Monitor;
                  return (
                    <li
                      key={p.name}
                      className="inline-flex items-center gap-2 rounded-md border border-graphite-border bg-graphite-card/80 px-3 py-1.5 text-sm text-content-primary"
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

          {/* Right column: clearly-labeled screenshot placeholder */}
          <div className="animate-fade-in-up lg:pl-4">
            <div
              className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-graphite-border bg-graphite-section/90"
              aria-label={content.screenshotAlt}
            >
              <div className="text-center">
                <div
                  className="mx-auto mb-3 h-12 w-12 rounded-md border border-graphite-border bg-graphite-card"
                  aria-hidden="true"
                />
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
