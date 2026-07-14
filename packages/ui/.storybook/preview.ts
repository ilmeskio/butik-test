// Preview globale di Storybook: carica i token di @butik/ui-tokens una volta
// sola, così le storie rendono con le stesse custom property del sito (ADR-0008).
import type { Preview } from '@storybook/react-vite';
import '@butik/ui-tokens/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
