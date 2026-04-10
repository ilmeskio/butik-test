import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const serviziCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/servizi' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    heroImage: z.string(),
    heroAlt: z.string().optional().default(''),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
    order: z.number().optional().default(0),
    draft: z.boolean().optional().default(false),
  }),
});

const progettiCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/progetti' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    heroImage: z.string(),
    heroAlt: z.string().optional().default(''),
    client: z.string().optional(),
    year: z.number().optional(),
    category: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
    order: z.number().optional().default(0),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  servizi: serviziCollection,
  progetti: progettiCollection,
};
