// Storia dell'atomo Logo. In Storybook non c'è la pipeline immagini di Astro:
// lo specimen usa un data URI SVG statico al posto del bollo-rosso reale
// (risolto a build-time solo lato apps/web via getImage()).
import type { Meta, StoryObj } from '@storybook/react-vite';
import Logo from './Logo';

const placeholderSrc =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><circle cx="22.5" cy="22.5" r="22.5" fill="#e21929"/></svg>'
  );

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  args: {
    src: placeholderSrc,
    width: 45,
    height: 45,
    alt: 'Butik',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Dimensione header.
export const Header: Story = {
  args: { width: 45, height: 45 },
};

// Dimensione footer.
export const Footer: Story = {
  args: { width: 72, height: 72 },
};
