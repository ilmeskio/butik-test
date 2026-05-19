// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  ...(process.env.SITE ? { site: process.env.SITE } : {}),
  prefetch: {
    prefetchAll: true,
  },
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
