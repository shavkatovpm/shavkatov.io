import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    title_en: z.string().optional(),
    description: z.string().optional(),
    description_en: z.string().optional(),
    date: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    // AEO fields
    tldr: z.string().optional(),
    tldr_en: z.string().optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    faq_en: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    // Content classification
    type: z.enum(['educational', 'cta', 'niche', 'personal', 'news']).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
