// Configurazione Storybook per @butik/ui (ADR-0008): workshop del catalogo
// componenti, builder react-vite. Vive solo qui, come dev tool: non tocca la
// build statica del sito (@butik/web).
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Le storie sono co-locate accanto ai componenti in src/.
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
