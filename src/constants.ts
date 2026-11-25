// Centralized constants shared across the website.

// The application repository (source code and releases).
export const APP_REPO_URL = 'https://github.com/powerbq/eso-addons-manager';
export const APP_ISSUES_URL =
  'https://github.com/powerbq/eso-addons-manager/issues';
export const APP_RELEASES_URL =
  'https://github.com/powerbq/eso-addons-manager/releases';

// Reserved for the future release integration stage. Not used yet.
export const GITHUB_RELEASES_API_URL =
  'https://api.github.com/repos/powerbq/eso-addons-manager/releases/latest';

// Stable section IDs used for anchor navigation.
export const SECTION_IDS = [
  'hero',
  'notice',
  'features',
  'screenshots',
  'download',
  'getting-started',
  'changelog',
  'roadmap',
  'faq',
  'support',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
