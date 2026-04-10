// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  prefetch: {
    prefetchAll: true,
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
