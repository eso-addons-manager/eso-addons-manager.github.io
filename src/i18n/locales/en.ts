import type { LocaleContent } from '../types';

export const en: LocaleContent = {
  meta: {
    title: 'ESO Addons Manager — Your add-ons. Simplified.',
    description:
      'ESO Addons Manager is a desktop add-on manager for The Elder Scrolls Online. Install, update and organize your ESO add-ons on Windows, macOS and Linux.',
  },
  nav: {
    features: 'Features',
    screenshots: 'Screenshots',
    download: 'Download',
    gettingStarted: 'Getting Started',
    changelog: 'Changelog',
    roadmap: 'Roadmap',
    faq: 'FAQ',
    support: 'Support',
    viewOnGithub: 'View on GitHub',
  },
  header: {
    brandName: 'ESO Addons Manager',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    eyebrow: 'The Elder Scrolls Online',
    title: 'ESO Addons Manager',
    subtitle: 'Your add-ons. Simplified.',
    tagline: 'Your add-ons. Simplified.',
    description:
      'A desktop add-on manager for The Elder Scrolls Online. Install, update and organize your add-ons and libraries from a single application, with automatic dependency resolution and synchronization on launch.',
    viewDownloads: 'View downloads',
    viewOnGithub: 'View on GitHub',
    platformLabel: 'Available for',
    platforms: [
      { name: 'Windows', detail: 'AMD64' },
      { name: 'macOS', detail: 'Apple Silicon ARM64' },
      { name: 'Linux', detail: 'AMD64' },
    ],
    screenshotAlt: 'Application screenshot placeholder',
    screenshotLabel: 'Application screenshot',
  },
  notice: {
    title: 'Important notice before first use',
    body: 'Before using ESO Addons Manager for the first time, back up your AddOns folder and verify that the selected folder is correct. The manager may delete files and add-ons that it does not manage.',
    bullet1: 'Back up your AddOns folder before the first synchronization.',
    bullet2: 'Use Scan for existing add-ons before the first synchronization to preserve existing add-ons.',
  },
  features: {
    title: 'Features',
    subtitle:
      'Everything you need to keep your add-ons organized, up to date and ready for your next adventure in Tamriel.',
    items: [
      {
        icon: 'download',
        title: 'Install, update and remove add-ons',
        description:
          'Browse, install, update and remove add-ons directly from the manager without manual file handling.',
      },
      {
        icon: 'refresh',
        title: 'Synchronize add-ons and libraries',
        description:
          'Keep your add-ons and their required libraries synchronized with a single action.',
      },
      {
        icon: 'link',
        title: 'Automatic dependency management',
        description:
          'Required dependencies are resolved and installed automatically so add-ons work out of the box.',
      },
      {
        icon: 'search',
        title: 'Scan for existing add-ons',
        description:
          'Detect add-ons already present in your AddOns folder so they are preserved during synchronization.',
      },
      {
        icon: 'rocket',
        title: 'Synchronization on launch',
        description:
          'Add-ons are checked and synchronized automatically every time the application starts.',
      },
      {
        icon: 'library',
        title: 'Library management',
        description:
          'Manage shared libraries alongside add-ons and keep them at compatible versions.',
      },
      {
        icon: 'ban',
        title: 'Exclusions',
        description:
          'Exclude specific add-ons or folders from synchronization and updates.',
      },
      {
        icon: 'package',
        title: 'Custom ZIP add-ons',
        description:
          'Install add-ons distributed as ZIP archives from outside the standard sources.',
      },
      {
        icon: 'star',
        title: 'Favourites',
        description:
          'Mark frequently used add-ons as favourites for quick access and tracking.',
      },
      {
        icon: 'coins',
        title: 'Tamriel Trade Centre price tables',
        description:
          'Tamriel Trade Centre price table updates are applied during synchronization when applicable.',
      },
      {
        icon: 'fileText',
        title: 'Diagnostic logs and settings',
        description:
          'Review diagnostic logs and configure the manager to match your setup and preferences.',
      },
    ],
  },
  screenshots: {
    title: 'Screenshots',
    subtitle:
      'Screenshots of the application will be added here once they are prepared. No fabricated or mock interface images are shown.',
    placeholderLabel: 'Screenshot placeholder',
    placeholderNote:
      'A real application screenshot will appear here in a later stage.',
  },
  download: {
    title: 'Download',
    subtitle:
      'ESO Addons Manager is available for Windows, macOS and Linux. Automatic release detection is not yet implemented on this website.',
    notImplemented:
      'Automatic release integration is not yet implemented. Download links and version information are not displayed automatically at this stage.',
    fallbackLink: 'Open releases on GitHub',
    fallbackNote:
      'You will be redirected to the official GitHub Releases page of the application repository.',
    platforms: [
      { name: 'Windows', detail: 'AMD64' },
      { name: 'macOS', detail: 'Apple Silicon ARM64' },
      { name: 'Linux', detail: 'AMD64' },
    ],
  },
  gettingStarted: {
    title: 'Getting Started',
    subtitle:
      'A few steps to set up ESO Addons Manager safely before your first synchronization.',
    step1Title: 'Download and install',
    step1Body:
      'Download the latest release for your platform from the GitHub Releases page and install the application.',
    step2Title: 'Back up your AddOns folder',
    step2Body:
      'Before launching, back up your existing ESO AddOns folder so you can restore it if anything goes wrong.',
    step3Title: 'Select your AddOns folder',
    step3Body:
      'On first launch, point the manager to your ESO AddOns folder and verify the path is correct.',
    step4Title: 'Scan before synchronizing',
    step4Body:
      'Use Scan for existing add-ons before the first synchronization so add-ons the manager does not control are preserved.',
  },
  changelog: {
    title: 'Changelog',
    subtitle:
      'Release notes will be displayed here once automatic release integration is implemented.',
    notImplemented:
      'Automatic release integration is not yet implemented. Release versions, dates and changelog entries are not shown automatically at this stage.',
    fallbackLink: 'View release history on GitHub',
  },
  roadmap: {
    title: 'Roadmap',
    subtitle:
      'Planned features for future releases. No release dates are announced.',
    plannedBadge: 'Planned',
    items: [
      {
        title: 'Import and export installed add-ons',
        description:
          'A way to import and export your installed add-ons list is planned for a future release. It is not currently available.',
        status: 'planned',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Common questions about ESO Addons Manager.',
    items: [
      {
        question: 'Is ESO Addons Manager affiliated with Bethesda or ZeniMax?',
        answer:
          'No. ESO Addons Manager is an independent, community-created tool. It is not affiliated with, endorsed by, or sponsored by ZeniMax Media Inc. or Bethesda Softworks.',
      },
      {
        question: 'Which platforms are supported?',
        answer:
          'The application supports Windows AMD64, macOS Apple Silicon ARM64 and Linux AMD64.',
      },
      {
        question: 'Can I import or export my installed add-ons?',
        answer:
          'Not yet. Importing and exporting installed add-ons is planned for a future release and has no announced release date.',
      },
      {
        question: 'Will the manager delete my existing add-ons?',
        answer:
          'The manager may delete files and add-ons that it does not manage. Always back up your AddOns folder and run Scan for existing add-ons before the first synchronization.',
      },
      {
        question: 'Where do downloads come from?',
        answer:
          'Downloads are hosted on the application GitHub repository. This website links to the official GitHub Releases page and does not host or mirror any files.',
      },
    ],
  },
  support: {
    title: 'Support',
    subtitle: 'Need help or found a bug?',
    body: 'ESO Addons Manager is maintained by powerbq on GitHub. For bug reports, feature requests and questions, please use the GitHub Issues page of the application repository.',
    reportIssue: 'Report an issue',
    viewRepo: 'View application repository',
  },
  footer: {
    tagline: 'Your add-ons. Simplified.',
    disclaimerTitle: 'Independent project disclaimer',
    disclaimerBody:
      'This is an independent presentation website for ESO Addons Manager. The application source code and releases are maintained by powerbq on GitHub. This website is not affiliated with, endorsed by, or sponsored by ZeniMax Media Inc. or Bethesda Softworks.',
    sections: 'Sections',
    applicationRepo: 'Application repository',
    reportIssue: 'Report an issue',
    license: 'MIT License',
    copyright: 'ESO Addons Manager website contributors',
    notAffiliated:
      'The Elder Scrolls Online is a trademark of ZeniMax Media Inc. This project is not affiliated with or endorsed by ZeniMax Media Inc. or Bethesda Softworks.',
  },
};
