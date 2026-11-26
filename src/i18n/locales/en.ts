import type { LocaleContent } from '../types';
import {
  APP_ISSUES_URL,
  APP_REPO_URL,
  APP_RELEASES_URL,
  WEBSITE_ISSUES_URL,
  WEBSITE_REPO_URL,
} from '../../constants';

export const en: LocaleContent = {
  meta: {
    title: 'ESO Addons Manager — Your add-ons. Simplified.',
    description:
      'Manage your The Elder Scrolls Online add-ons and libraries with ESO Addons Manager for Windows, macOS and Linux. Explore features, downloads and setup instructions.',
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
    eyebrow: 'THE ELDER SCROLLS ONLINE',
    title: 'ESO Addons Manager',
    subtitle: 'Your add-ons. Simplified.',
    tagline: 'Your add-ons. Simplified.',
    description:
      'Install, update and organize your The Elder Scrolls Online add-ons and libraries from a single desktop application. Manage dependencies, scan existing add-ons and keep your setup synchronized.',
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
    body: 'Before using ESO Addons Manager for the first time, back up your AddOns folder and verify that the selected folder is correct. Synchronization may delete files and add-ons that the manager does not manage.',
    bullets: [
      'Create a backup of your AddOns folder before your first synchronization.',
      'Use Scan to discover existing add-ons and review the results before synchronizing.',
      'Keep synchronization on launch disabled until your initial setup is complete and verified.',
    ],
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
          'Manage your ESO add-ons from a single application without manually handling every installation or update.',
      },
      {
        icon: 'refresh',
        title: 'Synchronize add-ons and libraries',
        description: 'Synchronize managed add-ons and their associated libraries.',
      },
      {
        icon: 'link',
        title: 'Dependency management',
        description:
          'Detect and resolve required dependencies. Some dependencies may require a user selection.',
      },
      {
        icon: 'search',
        title: 'Scan for existing add-ons',
        description:
          'Discover add-ons already present in your AddOns folder and review them before your first synchronization.',
      },
      {
        icon: 'rocket',
        title: 'Synchronization on launch',
        description:
          'Optionally synchronize managed add-ons when the application starts.',
      },
      {
        icon: 'library',
        title: 'Library management',
        description:
          'Manage shared libraries alongside your installed add-ons.',
      },
      {
        icon: 'ban',
        title: 'Exclusions',
        description:
          "Exclude selected add-ons or folders from synchronization according to the application's available settings.",
      },
      {
        icon: 'package',
        title: 'Custom ZIP add-ons',
        description: 'Add custom add-ons distributed as ZIP archives.',
      },
      {
        icon: 'star',
        title: 'Favourites',
        description: 'Mark add-ons as favourites for convenient access.',
      },
      {
        icon: 'coins',
        title: 'Tamriel Trade Centre price tables',
        description:
          'Update TTC price tables during synchronization when the corresponding add-on is installed and the feature is applicable.',
      },
      {
        icon: 'fileText',
        title: 'Diagnostic logs and settings',
        description:
          'Review diagnostic information and configure the application to suit your setup.',
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
      'The available installation packages depend on your operating system and architecture. Download files from the original GitHub Releases page.',
    fallbackLink: 'Open releases on GitHub',
    fallbackNote:
      'You will be redirected to the official GitHub Releases page of the application repository.',
    checksumNote:
      'Verify published checksums when available before running the application.',
    latestVersion: 'Latest version',
    publishedOn: 'Published',
    loadingReleases: 'Loading release information…',
    fetchError:
      'Release information could not be loaded. You can still download from GitHub directly.',
    retry: 'Try again',
    usingCache: 'Showing cached release information.',
    noReleaseAvailable: 'No release is currently available. Visit GitHub to check for releases.',
    downloadFile: 'Download',
    fileSize: 'Size',
    noPackagesAvailable: 'No packages are available for this platform in the latest release.',
    checksumsLabel: 'Checksums',
    unclassifiedAssets: 'Other files',
    packageLabels: {
      exe: 'Installer (EXE)',
      zip: 'Portable (ZIP)',
      dmg: 'Disk Image (DMG)',
      appimage: 'AppImage',
      deb: 'Debian (DEB)',
      rpm: 'RPM',
      'pkg.tar.zst': 'Arch (pkg.tar.zst)',
    },
    architectureLabel: 'Architecture',
    platforms: [
      {
        name: 'Windows',
        detail: 'AMD64',
        note: 'AMD64 builds. Windows SmartScreen may display a warning because the application is unsigned.',
      },
      {
        name: 'macOS',
        detail: 'Apple Silicon ARM64',
        note: 'Apple Silicon ARM64 builds. Intel Mac support is not currently listed.',
      },
      {
        name: 'Linux',
        detail: 'AMD64',
        note: 'AMD64 builds. Select the package appropriate for your distribution.',
      },
    ],
  },
  gettingStarted: {
    title: 'Getting Started',
    subtitle:
      'A clear setup guide to configure ESO Addons Manager safely before your first synchronization.',
    steps: [
      {
        title: 'Download and install',
        body: 'Choose the appropriate package for your operating system and architecture from the original GitHub Releases page.',
        emphasis: false,
      },
      {
        title: 'Back up your AddOns folder',
        body: 'Before launching or synchronizing the application, create a backup of your existing ESO AddOns folder.',
        emphasis: true,
      },
      {
        title: 'Verify the AddOns folder',
        body: 'Check that the selected folder is the correct ESO AddOns directory. Keep synchronization on launch disabled during initial setup.',
        emphasis: false,
      },
      {
        title: 'Scan existing add-ons',
        body: 'Use the Scan function to discover existing add-ons. Review the results and configure exclusions where necessary.',
        emphasis: true,
      },
      {
        title: 'Review and synchronize',
        body: 'Review the managed add-ons, libraries, dependencies and exclusions before starting your first synchronization. Unmanaged files may be deleted during synchronization.',
        emphasis: false,
      },
      {
        title: 'Maintain your setup',
        body: 'Use the manager to maintain your add-ons and libraries. Enable synchronization on launch only after verifying that your setup is correct.',
        emphasis: false,
      },
    ],
  },
  changelog: {
    title: 'Changelog',
    subtitle: 'Stable release history, newest first. Notes are rendered from the original GitHub releases.',
    notImplemented:
      'Release history could not be loaded automatically at this time.',
    fallbackLink: 'View release history on GitHub',
    loadingReleases: 'Loading release history…',
    fetchError:
      'Release history could not be loaded. You can still view all releases on GitHub.',
    retry: 'Try again',
    usingCache: 'Showing cached release history.',
    noReleases: 'No stable releases have been published yet.',
    emptyNotes: 'No release notes were provided for this release.',
    viewOnGithub: 'View on GitHub',
    publishedOn: 'Published',
  },
  roadmap: {
    title: 'Roadmap',
    subtitle:
      'Planned features for future releases. No release dates are announced.',
    plannedBadge: 'Planned',
    items: [
      {
        title: 'Import and export of installed add-ons',
        description:
          'Import and export functionality for installed add-ons is planned. It is not currently available and no release date has been announced.',
        status: 'planned',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Common questions about ESO Addons Manager.',
    items: [
      {
        question: 'What is ESO Addons Manager?',
        answer:
          'A desktop application for installing, updating, removing and managing add-ons for The Elder Scrolls Online.',
      },
      {
        question: 'Is ESO Addons Manager free?',
        answer:
          'Yes. The application source code and releases are publicly available on GitHub.',
      },
      {
        question: 'Which operating systems are supported?',
        answer:
          'Windows AMD64, macOS Apple Silicon ARM64 and Linux AMD64.',
      },
      {
        question: 'Are Intel Macs supported?',
        answer:
          'The currently supported macOS architecture is Apple Silicon ARM64. Intel Mac support is not currently listed.',
      },
      {
        question: 'What should I do if I already have installed add-ons?',
        answer:
          'Back up your AddOns folder, verify the selected directory, use Scan and review the detected add-ons before synchronizing.',
      },
      {
        question: 'Can the manager delete my existing add-ons?',
        answer:
          'Yes. Synchronization may delete files and add-ons that the manager does not manage. Always keep a backup and review your configuration before synchronizing.',
      },
      {
        question: 'Are dependencies installed automatically?',
        answer:
          'The manager supports automatic dependency resolution, but some dependencies may require a user selection.',
      },
      {
        question: 'Can I install custom ZIP add-ons?',
        answer: 'Yes. The application supports custom ZIP add-ons.',
      },
      {
        question: 'Can I exclude add-ons from synchronization?',
        answer: 'Yes. The application supports exclusions.',
      },
      {
        question: 'Does the manager support Tamriel Trade Centre?',
        answer:
          'TTC price tables can be updated during synchronization when the corresponding add-on is installed and the feature is applicable.',
      },
      {
        question: 'Why does Windows SmartScreen show a warning?',
        answer:
          'Windows may display a warning because the application is unsigned. Verify the download source and published checksums before running the application. An unsigned application is not automatically malicious, but its safety cannot be guaranteed solely by its availability on GitHub.',
      },
      {
        question: 'Does the manager update itself automatically?',
        answer:
          'The application can check for updates and direct users to the download page. This does not automatically install the new application version.',
      },
      {
        question: 'Can I import or export my installed add-ons?',
        answer:
          'Import and export functionality is planned and is not currently presented as an available feature.',
      },
      {
        question: 'Where can I report application bugs?',
        answer:
          'Report application-related issues in the original application repository on GitHub. Remove personal information from diagnostic logs before sharing them.',
      },
    ],
  },
  support: {
    title: 'Support',
    subtitle: 'Two types of support are available depending on your question.',
    channels: [
      {
        label: 'Application support',
        description:
          'For application bugs, feature requests and application-related questions.',
        linkLabel: 'Report an application issue',
        url: APP_ISSUES_URL,
      },
      {
        label: 'Website support',
        description:
          'For website bugs, incorrect information, translation issues or broken website links.',
        linkLabel: 'Report a website issue',
        url: WEBSITE_ISSUES_URL,
      },
    ],
    reportGuideTitle: 'How to write a useful bug report',
    reportGuideIntro:
      'A useful bug report helps maintainers reproduce and fix the problem. Include the following when applicable:',
    reportGuideItems: [
      'Application version, if applicable',
      'Operating system',
      'Description of the problem',
      'Steps to reproduce',
      'Expected and actual behaviour',
      'Relevant screenshots or diagnostic logs',
    ],
    privacyWarning:
      'Do not include passwords, tokens or personal information in public issue reports.',
  },
  footer: {
    tagline: 'Your add-ons. Simplified.',
    disclaimerTitle: 'Independent project disclaimer',
    disclaimerBody:
      'This is an independent presentation website for ESO Addons Manager. The application source code and releases are maintained by powerbq on GitHub.',
    notAffiliated:
      'This website is not affiliated with, endorsed by, or sponsored by ZeniMax Media Inc. or Bethesda Softworks. The Elder Scrolls Online and related trademarks belong to their respective owners.',
    sections: 'Sections',
    resourcesTitle: 'Resources',
    links: [
      {
        label: 'Application repository',
        url: APP_REPO_URL,
        external: true,
      },
      {
        label: 'Application releases',
        url: APP_RELEASES_URL,
        external: true,
      },
      {
        label: 'Application issues',
        url: APP_ISSUES_URL,
        external: true,
      },
      {
        label: 'Website repository',
        url: WEBSITE_REPO_URL,
        external: true,
      },
      {
        label: 'Website issues',
        url: WEBSITE_ISSUES_URL,
        external: true,
      },
    ],
    license: 'MIT License',
    copyright: 'ESO Addons Manager website contributors',
  },
};
