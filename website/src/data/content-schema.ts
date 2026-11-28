import { z } from 'astro/zod';
import { icons, platformIcons, type IconName } from './icons';
import { sectionLabels } from './navigation';
import { isHttpsUrl, isPublicImagePath } from './content-policy';

const text = z.string().trim().min(1);
const icon = z.enum(Object.keys(icons) as IconName[]);
const httpsUrl = text.refine(isHttpsUrl, 'Use an HTTPS URL without embedded credentials.');
const imagePath = text.refine(isPublicImagePath, 'Use a public raster image under /brand/ or /screenshots/.');
const image = z.strictObject({
  src: imagePath,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const sectionHeading = { title: text, subtitle: text };
const packageLabels = z.strictObject({ exe: text, zip: text, dmg: text, appimage: text, deb: text, rpm: text });

export const gettingStartedStepSchema = z.strictObject({
  title: text,
  order: z.number().int().positive(),
  icon,
  emphasis: z.boolean(),
});

export const editorialContentSchema = z.strictObject({
  seo: z.strictObject({
    title: text,
    description: text,
    author: text,
    socialImage: image,
    socialTitle: text.optional(),
    socialDescription: text.optional(),
  }),
  homepage: z.strictObject({
    hero: z.strictObject({
      eyebrow: text,
      title: text,
      subtitle: text,
      description: text,
      viewDownloads: text,
      platformLabel: text,
      screenshot: image.extend({ alt: text }),
    }),
    notice: z.strictObject({
      title: text,
      body: text,
      bullets: z.array(text).min(1),
    }),
  }),
  navigation: z.strictObject({
    header: z.strictObject({ brandName: text, primaryLabel: text, openMenu: text, closeMenu: text }),
    nav: z.record(z.enum(Object.values(sectionLabels)), text),
    skipToContent: text,
  }),
  features: z.strictObject({
    ...sectionHeading,
    items: z.array(z.strictObject({ icon, title: text, description: text })).min(1),
  }),
  screenshots: z.strictObject({
    ...sectionHeading,
    viewFullSize: text,
    items: z.array(z.strictObject({ src: imagePath, title: text, description: text, alt: text })).min(1),
  }),
  downloads: z.strictObject({
    ...sectionHeading,
    fallbackLink: text,
    releaseLink: text,
    checksumNote: text,
    platforms: z.array(z.strictObject({
      name: z.enum(Object.keys(platformIcons) as (keyof typeof platformIcons)[]),
      detail: text,
      architecture: z.enum(['AMD64', 'ARM64']),
      note: text,
    })).min(1).refine(
      (platforms) => new Set(platforms.map(({ name }) => name)).size === platforms.length,
      'List each platform once.',
    ),
    latestVersion: text,
    publishedOn: text,
    noReleaseAvailable: text,
    noPackagesAvailable: text,
    noCompatiblePackages: text,
    checksumsLabel: text,
    unclassifiedAssets: text,
    packageLabels: z.union([
      packageLabels.extend({ pkgTarZst: text })
        .transform(({ pkgTarZst, ...labels }) => ({ ...labels, 'pkg.tar.zst': pkgTarZst })),
      packageLabels.extend({ 'pkg.tar.zst': text }),
    ]),
  }),
  'getting-started': z.strictObject(sectionHeading),
  roadmap: z.strictObject({
    ...sectionHeading,
    plannedBadge: text,
    items: z.array(z.strictObject({ title: text, description: text, status: z.literal('planned') })).min(1),
  }),
  faq: z.strictObject({
    ...sectionHeading,
    items: z.array(z.strictObject({ question: text, answer: text })).min(1),
  }),
  support: z.strictObject({
    ...sectionHeading,
    channels: z.array(z.strictObject({
      label: text, description: text, linkLabel: text, url: httpsUrl, icon,
    })).min(1),
    reportGuideTitle: text,
    reportGuideIntro: text,
    reportGuideItems: z.array(text).min(1),
    privacyWarning: text,
  }),
  footer: z.strictObject({
    tagline: text,
    disclaimerTitle: text,
    disclaimerBody: text,
    notAffiliated: text,
    sections: text,
    resourcesTitle: text,
    links: z.array(z.strictObject({ label: text, url: httpsUrl, icon })).min(1),
    license: text,
    copyright: text,
  }),
});
