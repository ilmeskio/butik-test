// Storia dell'ImageCarousel. Componente interattivo (client:visible quando
// consumato in Astro): in Storybook è già hydratato di default, la
// navigazione prev/next/dots è provabile dal vivo.
import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageCarousel from './ImageCarousel';

const colors = ['#8a6d3b', '#2f5233', '#3b5a8a'];
const sampleImages = colors.map((fill, i) => ({
  src:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="${fill}"/></svg>`
    ),
  alt: '',
  caption: i === 1 ? 'Una didascalia per la seconda immagine.' : undefined,
}));

const meta = {
  title: 'UI/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  args: {
    images: sampleImages,
  },
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeSlides: Story = {};

export const TwoSlides: Story = {
  args: { images: sampleImages.slice(0, 2) },
};

// Una sola immagine: Prev e Next sono entrambi agli estremi, quindi disabled.
// Prima restavano abilitati e inerti — `goTo` clampava in silenzio.
export const SingleSlide: Story = {
  args: { images: sampleImages.slice(0, 1) },
};

// Limite noto: senza una `play` function le storie rendono sempre lo slide 0,
// quindi Chromatic non fotografa mai un dot attivo diverso dal primo né lo
// stato disabled di Prev. Coprirlo richiede @storybook/test, che il pacchetto
// oggi non installa.

