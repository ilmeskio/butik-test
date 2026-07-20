// Configurazione Storybook per @butik/ui (ADR-0008): workshop del catalogo
// componenti, builder react-vite. Vive solo qui, come dev tool: non tocca la
// build statica del sito (@butik/web).
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Le storie sono co-locate accanto ai componenti in src/.
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  // a11y (issue #29): pannello di audit accessibilità per storia, basato su
  // axe-core. Verifica ARIA/contrasto/focus direttamente nel workshop, oltre
  // a design-check.
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
