import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { gettingStartedStepSchema } from './data/content-schema';

export const collections = {
  gettingStarted: defineCollection({
    loader: glob({ base: './src/content/en/getting-started', pattern: '*.md' }),
    schema: gettingStartedStepSchema,
  }),
};
