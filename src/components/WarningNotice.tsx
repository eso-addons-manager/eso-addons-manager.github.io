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
      className="rounded-lg border border-warning/40 bg-warning/10 p-5 sm:p-6"
      role="note"
      aria-label={content.title}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-warning"
          aria-hidden="true"
        />
        <div>
          <h2 className="text-base font-semibold text-warning">
            {content.title}
          </h2>
          <p className="mt-2 text-sm text-content-primary">{content.body}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-content-primary">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning" aria-hidden="true" />
              {content.bullet1}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning" aria-hidden="true" />
              {content.bullet2}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
