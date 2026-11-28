import type { APIRoute, GetStaticPaths } from 'astro';
import homepage from '../../content/en/homepage.json';
import screenshots from '../../content/en/screenshots.json';
import { getScreenshotPreview } from '../../data/screenshot-previews';

export const getStaticPaths = (async () => {
  const sources = new Set([homepage.hero.screenshot.src, ...screenshots.items.map(({ src }) => src)]);
  const images = await Promise.all([...sources].map(getScreenshotPreview));
  const variants = new Map(images.flatMap(({ variants }) => variants.map((variant) => [variant.file, variant] as const)));

  return [...variants.values()].map(({ file, bytes }) => ({ params: { preview: file }, props: { bytes } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ bytes: Buffer }> = ({ props: { bytes } }) =>
  new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'image/webp' } });
