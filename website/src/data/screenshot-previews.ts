import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { publicDir } from 'astro:config/server';
import sharp from 'sharp';
import { publicImageExists } from './content-policy';

const widths = [480, 800, 1200];
const previewDirectory = '/previews';

type Variant = { file: string; width: number; bytes: Buffer };
type ScreenshotPreview = {
  width: number;
  height: number;
  srcset?: string;
  variants: Variant[];
};

async function createPreview(src: string): Promise<ScreenshotPreview> {
  if (!publicImageExists(src, publicDir)) throw new Error(`Cannot read screenshot: ${src}`);

  const original = await readFile(new URL(src.slice(1), publicDir));
  const image = sharp(original);
  const { pages, autoOrient: { width, height } } = await image.metadata();
  if (import.meta.env.DEV || (pages ?? 1) > 1) return { width, height, variants: [] };

  const name = basename(src, extname(src));
  const candidates = await Promise.all(widths.filter((candidate) => candidate < width).map(async (candidate) => {
    const bytes = await image.clone().autoOrient().resize(candidate).webp({ quality: 90, smartSubsample: true }).toBuffer();
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    return { file: `${name}-${candidate}-${hash}`, width: candidate, bytes };
  }));

  const variants = candidates.filter(({ bytes }) => bytes.length < original.length);
  const descriptors = variants.map(({ file, width }) => `${previewDirectory}/${file}.webp ${width}w`);
  const srcset = variants.length > 0 ? [...descriptors, `${src} ${width}w`].join(', ') : undefined;
  return { width, height, srcset, variants };
}

const previews = new Map<string, Promise<ScreenshotPreview>>();

export function getScreenshotPreview(src: string): Promise<ScreenshotPreview> {
  if (import.meta.env.DEV) return createPreview(src);

  const preview = previews.get(src) ?? createPreview(src);
  previews.set(src, preview);
  return preview;
}
