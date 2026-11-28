import { publicDir } from 'astro:config/server';
import { getCollection, render } from 'astro:content';
import homepage from '../content/en/homepage.json';
import navigation from '../content/en/navigation.json';
import features from '../content/en/features.json';
import screenshots from '../content/en/screenshots.json';
import downloads from '../content/en/downloads.json';
import gettingStarted from '../content/en/getting-started.json';
import roadmap from '../content/en/roadmap.json';
import faq from '../content/en/faq.json';
import support from '../content/en/support.json';
import footer from '../content/en/footer.json';
import seo from '../content/en/seo.json';
import { editorialContentSchema } from './content-schema';
import { publicImageExists } from './content-policy';

export async function loadSiteContent() {
  const result = editorialContentSchema.safeParse({
    homepage, navigation, features, screenshots, downloads, 'getting-started': gettingStarted,
    roadmap, faq, support, footer, seo,
  });

  if (!result.success) {
    const messages = result.error.issues.map(({ path, message }) => {
      const [file, ...field] = path.map(String);
      return `src/content/en/${file}.json (${field.join('.')}): ${message}`;
    });
    throw new Error(`Invalid website content\n${messages.join('\n')}`);
  }

  const content = result.data;
  const images = [
    ['homepage.json (hero.screenshot.src)', content.homepage.hero.screenshot.src],
    ['seo.json (socialImage.src)', content.seo.socialImage.src],
    ...content.screenshots.items.map(({ src }, index) => [`screenshots.json (items.${index}.src)`, src] as const),
  ] as const;
  for (const [field, src] of images) {
    if (!publicImageExists(src, publicDir)) {
      throw new Error(`src/content/en/${field}: public image does not exist: ${src}`);
    }
  }

  const entries = await getCollection('gettingStarted');
  if (entries.length === 0) throw new Error('Getting Started requires at least one Markdown step.');

  const stepOrders = new Map<number, string>();
  for (const entry of entries) {
    const { order } = entry.data;
    const previous = stepOrders.get(order);
    if (previous) throw new Error(`Duplicate Getting Started order ${order}: ${previous}, ${entry.id}`);
    if (!entry.body?.trim()) throw new Error(`Getting Started step ${entry.id} has an empty Markdown body.`);
    stepOrders.set(order, entry.id);
  }

  const steps = await Promise.all(entries.sort((a, b) => a.data.order - b.data.order).map(async (entry) => {
    const { Content } = await render(entry);
    const { title, icon, emphasis } = entry.data;
    return { title, icon, emphasis, Content };
  }));

  return {
    ...content.navigation,
    ...content.homepage,
    hero: { ...content.homepage.hero, platforms: content.downloads.platforms },
    meta: content.seo,
    download: content.downloads,
    features: content.features,
    screenshots: content.screenshots,
    gettingStarted: { ...content['getting-started'], steps },
    roadmap: content.roadmap,
    faq: content.faq,
    support: content.support,
    footer: content.footer,
  };
}
