import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import FeaturesSection from './sections/FeaturesSection';
import ScreenshotsSection from './sections/ScreenshotsSection';
import DownloadSection from './sections/DownloadSection';
import GettingStartedSection from './sections/GettingStartedSection';
import ChangelogSection from './sections/ChangelogSection';
import RoadmapSection from './sections/RoadmapSection';
import FaqSection from './sections/FaqSection';
import SupportSection from './sections/SupportSection';
import { getLocaleContent } from './i18n';

function App() {
  const content = getLocaleContent('en');

  // Keep the document title in sync with the active locale content.
  useEffect(() => {
    document.title = content.meta.title;
  }, [content.meta.title]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-bronze focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-graphite-bg"
      >
        Skip to content
      </a>

      <Header content={content} />

      <main className="flex-1">
        <Hero
          content={content.hero}
          notice={content.notice}
          downloadLabel={content.hero.viewDownloads}
        />
        <FeaturesSection content={content.features} />
        <ScreenshotsSection content={content.screenshots} />
        <DownloadSection content={content.download} />
        <GettingStartedSection content={content.gettingStarted} />
        <ChangelogSection content={content.changelog} />
        <RoadmapSection content={content.roadmap} />
        <FaqSection content={content.faq} />
        <SupportSection content={content.support} />
      </main>

      <Footer content={content} />
    </div>
  );
}

export default App;
