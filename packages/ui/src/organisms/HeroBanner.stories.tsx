// Storie dell'HeroBanner. Storybook non ha la pipeline immagini di Astro:
// gli specimen usano un'immagine placeholder statica al posto degli asset
// reali (risolti a build-time solo lato apps/web via getImage()).
import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroBanner from './HeroBanner';

const placeholderSrc =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#463a52"/></svg>'
  );

const meta = {
  title: 'Organisms/HeroBanner',
  component: HeroBanner,
  tags: ['autodocs'],
  args: {
    title: 'Un titolo che racconta il progetto',
    src: placeholderSrc,
    imageAlt: '',
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Solo titolo (es. progetti/servizi senza sottotitolo).
export const TitleOnly: Story = {};

// Con sottotitolo (es. chi-siamo).
export const WithSubtitle: Story = {
  args: {
    subtitle: 'Un sottotitolo che espande il contesto in una riga o due.',
  },
};

// Titolo lungo: verifica il wrapping su max-width.
export const LongTitle: Story = {
  args: {
    title: 'Un titolo molto lungo che deve andare a capo su più righe restando leggibile',
    subtitle: 'E un sottotitolo altrettanto descrittivo per verificare la gerarchia visiva.',
  },
};
