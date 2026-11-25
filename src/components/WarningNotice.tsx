import { AlertTriangle } from 'lucide-react';
import type { LocaleContent } from '../i18n/types';

type WarningNoticeProps = {
  content: LocaleContent['notice'];
};

// The mandatory safety notice. Shown near the hero section and never hidden
// in the FAQ or footer.
export default function WarningNotice({ content }: WarningNoticeProps) {
  return (
    <div
      className="rounded-lg border border-warning/40 bg-warning/[0.08] p-5 sm:p-6"
      role="note"
      aria-label={content.title}
    >
      <div className="flex items-start gap-3.5">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <div>
          <h2 className="text-base font-semibold text-warning">
            {content.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-content-primary">
            {content.body}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-content-primary">
            <li className="flex items-start gap-2.5">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{content.bullet1}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{content.bullet2}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
