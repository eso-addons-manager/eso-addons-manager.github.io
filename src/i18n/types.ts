import type { ReactNode } from 'react';

export type LocaleCode = 'en' | 'uk' | 'fr' | 'de' | 'es';

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export type RoadmapItem = {
  title: string;
  description: string;
  status: 'planned';
};

export type Platform = {
  name: string;
  detail: string;
};

export type DownloadPlatform = Platform & {
  note: string;
};

export type GettingStartedStep = {
  title: string;
  body: string;
  emphasis: boolean;
};

export type SupportChannel = {
  label: string;
  description: string;
  linkLabel: string;
  url: string;
};

export type FooterLink = {
  label: string;
  url: string;
  external: boolean;
};

export type LocaleContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    features: string;
    screenshots: string;
    download: string;
    gettingStarted: string;
    changelog: string;
    roadmap: string;
    faq: string;
    support: string;
    viewOnGithub: string;
  };
  header: {
    brandName: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    viewDownloads: string;
    viewOnGithub: string;
    platformLabel: string;
    platforms: Platform[];
    screenshotAlt: string;
    screenshotLabel: string;
  };
  notice: {
    title: string;
    body: string;
    bullets: string[];
  };
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  screenshots: {
    title: string;
    subtitle: string;
    placeholderLabel: string;
    placeholderNote: string;
  };
  download: {
    title: string;
    subtitle: string;
    fallbackLink: string;
    fallbackNote: string;
    checksumNote: string;
    platforms: DownloadPlatform[];
    latestVersion: string;
    publishedOn: string;
    loadingReleases: string;
    fetchError: string;
    retry: string;
    usingCache: string;
    noReleaseAvailable: string;
    downloadFile: string;
    fileSize: string;
    noPackagesAvailable: string;
    checksumsLabel: string;
    unclassifiedAssets: string;
    packageLabels: {
      exe: string;
      zip: string;
      dmg: string;
      appimage: string;
      deb: string;
      rpm: string;
      'pkg.tar.zst': string;
    };
    architectureLabel: string;
  };
  gettingStarted: {
    title: string;
    subtitle: string;
    steps: GettingStartedStep[];
  };
  changelog: {
    title: string;
    subtitle: string;
    notImplemented: string;
    fallbackLink: string;
    loadingReleases: string;
    fetchError: string;
    retry: string;
    usingCache: string;
    noReleases: string;
    emptyNotes: string;
    viewOnGithub: string;
    publishedOn: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    plannedBadge: string;
    items: RoadmapItem[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  support: {
    title: string;
    subtitle: string;
    channels: SupportChannel[];
    reportGuideTitle: string;
    reportGuideIntro: string;
    reportGuideItems: string[];
    privacyWarning: string;
  };
  footer: {
    tagline: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    notAffiliated: string;
    sections: string;
    resourcesTitle: string;
    links: FooterLink[];
    license: string;
    copyright: string;
  };
};
