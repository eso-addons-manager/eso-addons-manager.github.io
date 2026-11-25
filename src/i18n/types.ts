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
    bullet1: string;
    bullet2: string;
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
    notImplemented: string;
    fallbackLink: string;
    fallbackNote: string;
    platforms: Platform[];
  };
  gettingStarted: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
    step4Title: string;
    step4Body: string;
  };
  changelog: {
    title: string;
    subtitle: string;
    notImplemented: string;
    fallbackLink: string;
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
    body: string;
    reportIssue: string;
    viewRepo: string;
  };
  footer: {
    tagline: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    sections: string;
    applicationRepo: string;
    reportIssue: string;
    license: string;
    copyright: string;
    notAffiliated: string;
  };
};
