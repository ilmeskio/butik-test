import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const serviziCollection = defineCollection({
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/servizi',
    generateId: ({ entry }) => entry.replace(/\.(mdx?)$/, ''),
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    heroImage: image(),
    heroAlt: z.string().optional().default(''),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: image().optional(),
    ogCta: z.string().optional(),
    order: z.number().optional().default(0),
    draft: z.boolean().optional().default(false),
  }),
});

const progettiCollection = defineCollection({
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/progetti',
    generateId: ({ entry }) => entry.replace(/\.(mdx?)$/, ''),
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    heroImage: image(),
    heroAlt: z.string().optional().default(''),
    client: z.string().optional(),
    year: z.number().optional(),
    category: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: image().optional(),
    ogCta: z.string().optional(),
    order: z.number().optional().default(0),
    featured: z.boolean().optional().default(false),
    featuredOrder: z.number().optional().default(0),
    draft: z.boolean().optional().default(false),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// Collezione `pagine` (ADR-0004): pagine editoriali "singleton" la cui copy era
// hardcoded nei `.astro`. Ogni entry è una pagina a sé (chi-siamo, contatti), con
// un set di campi diverso: per questo usiamo una discriminated union su `type`.
// I campi sono volutamente PIATTI e scalari (string), gli unici tipi che gli
// schema Sitepins di questo repo usano oggi (string/media/number/boolean) — così
// Zod e `.sitepins/schema/pagine/*.json` restano allineati (skill content-check).
// Nota: alcune stringhe (paragrafi con <strong>/link, indirizzo) contengono HTML
// inline e vengono rese con `set:html` nelle pagine per mantenere l'output
// visivamente identico alla versione hardcoded.
// ─────────────────────────────────────────────────────────────────────────────
const paginaChiSiamo = z.object({
  type: z.literal('chi-siamo'),
  metaTitle: z.string(),
  metaDescription: z.string(),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  heroImageAlt: z.string(),
  introEyebrow: z.string(),
  introP1: z.string(),
  introP2: z.string(),
  introP3: z.string(),
  introP4: z.string(),
  missionEyebrow: z.string(),
  missionStatement: z.string(),
  sdgEyebrow: z.string(),
  sdgIntro: z.string(),
  sdg8Title: z.string(),
  sdg11Title: z.string(),
  teamEyebrow: z.string(),
  teamP1: z.string(),
  teamP2: z.string(),
  teamP3: z.string(),
  founder1Name: z.string(),
  founder1Role: z.string(),
  founder1Bio: z.string(),
  founder1Email: z.string(),
  founder1Linkedin: z.string(),
  founder2Name: z.string(),
  founder2Role: z.string(),
  founder2Bio: z.string(),
  founder2Email: z.string(),
  founder2Linkedin: z.string(),
  founder3Name: z.string(),
  founder3Role: z.string(),
  founder3Bio: z.string(),
  founder3Email: z.string(),
  founder3Linkedin: z.string(),
  testimonialQuote: z.string(),
  testimonialAuthor: z.string(),
  ctaTitle: z.string(),
  ctaBody: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});

const paginaContatti = z.object({
  type: z.literal('contatti'),
  metaTitle: z.string(),
  metaDescription: z.string(),
  headerEyebrow: z.string(),
  headerTitle: z.string(),
  headerIntro: z.string(),
  recapitiEyebrow: z.string(),
  emailLabel: z.string(),
  emailValue: z.string(),
  pecLabel: z.string(),
  pecValue: z.string(),
  sedeLabel: z.string(),
  sedeAddress: z.string(),
  seguiciLabel: z.string(),
});

const pagineCollection = defineCollection({
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/pagine',
    generateId: ({ entry }) => entry.replace(/\.(mdx?)$/, ''),
  }),
  schema: z.discriminatedUnion('type', [paginaChiSiamo, paginaContatti]),
});

export const collections = {
  servizi: serviziCollection,
  progetti: progettiCollection,
  pagine: pagineCollection,
};
