import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { editorialMarkdown } from './src/data/content-policy.ts';

export default defineConfig({
  site: 'https://eso-addons-manager.github.io',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  markdown: {
    processor: satteri({
      features: { rawHtml: false },
      hastPlugins: [editorialMarkdown(new URL('./public/', import.meta.url))],
    }),
  },
  vite: {
    css: {
      // Keep the legacy site's PostCSS config out of Astro's CSS build.
      postcss: { plugins: [] },
    },
  },
});
