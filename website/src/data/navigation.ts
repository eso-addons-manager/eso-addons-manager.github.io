import type { SiteContent } from './types';

export const sectionLabels = {
  features: 'features',
  screenshots: 'screenshots',
  download: 'download',
  'getting-started': 'gettingStarted',
  roadmap: 'roadmap',
  faq: 'faq',
  support: 'support',
} as const;

export type SectionId = keyof typeof sectionLabels;
export type NavLink = { id: SectionId; href: string; label: string };
const footerIds: SectionId[] = ['features', 'download', 'getting-started', 'faq', 'roadmap'];

export function navigation(labels: SiteContent['nav']) {
  const toLink = (id: SectionId): NavLink => ({
    id,
    href: `/#${id}`,
    label: labels[sectionLabels[id]],
  });
  const primaryIds = (Object.keys(sectionLabels) as SectionId[]).filter((id) => id !== 'roadmap');

  return {
    primary: primaryIds.map(toLink),
    footer: footerIds.map(toLink),
  };
}
