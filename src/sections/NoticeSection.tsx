import WarningNotice from '../components/WarningNotice';
import type { LocaleContent } from '../i18n/types';

type NoticeSectionProps = {
  content: LocaleContent['notice'];
};

export default function NoticeSection({ content }: NoticeSectionProps) {
  return (
    <section id="notice" className="border-b border-graphite-border bg-graphite-section scroll-mt-20">
      <div className="container-page py-10 sm:py-12">
        <WarningNotice content={content} />
      </div>
    </section>
  );
}
