import { lstatSync } from 'node:fs';
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import { sectionLabels } from './navigation';

const publicImagePath = /^\/(?:brand|screenshots)\/[a-z0-9][a-z0-9._-]*\.(?:avif|gif|jpe?g|png|webp)$/i;
const anchors = new Set(['#hero', '#main-content', ...Object.keys(sectionLabels).map((id) => `#${id}`)]);

export function isHttpsUrl(value: unknown): boolean {
  if (typeof value !== 'string' || !/^https:\/\//i.test(value)) return false;
  const url = URL.parse(value);
  return url?.protocol === 'https:' && !url.username && !url.password;
}

export function isPublicImagePath(value: unknown): value is string {
  return typeof value === 'string' && publicImagePath.test(value);
}

export function publicImageExists(value: unknown, directory: URL): boolean {
  return isPublicImagePath(value) &&
    lstatSync(new URL(value.slice(1), directory), { throwIfNoEntry: false })?.isFile() === true;
}

function isEditorialLink(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const anchor = value.startsWith('/#') ? value.slice(1) : value;
  return isHttpsUrl(value) || value === '/' || anchors.has(anchor);
}

type MarkdownPlugin = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

export function editorialMarkdown(publicDirectory: URL): MarkdownPlugin {
  return {
    name: 'validate-editorial-markdown',
    raw(_node, context) {
      throw new Error(`Raw HTML is not allowed in editorial Markdown: ${context.fileURL?.pathname}`);
    },
    element: {
      filter: ['a', 'img'],
      visit(node, context) {
        if (node.tagName === 'a' && !isEditorialLink(node.properties.href)) {
          throw new Error(`Use an HTTPS URL or an existing page anchor in ${context.fileURL?.pathname}`);
        }
        if (node.tagName === 'img') {
          const { src, alt } = node.properties;
          if (!publicImageExists(src, publicDirectory) || typeof alt !== 'string' || !alt.trim()) {
            throw new Error(`Use an existing public image with alt text in ${context.fileURL?.pathname}`);
          }
        }
      },
    },
  };
}
