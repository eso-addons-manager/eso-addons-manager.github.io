import WarningNotice from '../components/WarningNotice';
import type { LocaleContent } from '../i18n/types';

type NoticeSectionProps = {
  content: LocaleContent['notice'];
};

export default function NoticeSection({ content }: NoticeSectionProps) {
  return (
    <section id="notice" className="scroll-mt-14 border-b border-graphite-border bg-graphite-section">
      <div className="container-page py-6 sm:py-8">
        <WarningNotice content={content} />
      </div>
    </section>
  );
}
