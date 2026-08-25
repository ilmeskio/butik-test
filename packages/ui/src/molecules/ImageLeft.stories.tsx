import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageLeft from './ImageLeft';

const placeholderSrc =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#2f5233"/></svg>'
  );

const meta = {
  title: 'Molecules/ImageLeft',
  component: ImageLeft,
  tags: ['autodocs'],
  args: {
    src: placeholderSrc,
    alt: '',
  },
} satisfies Meta<typeof ImageLeft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoCaption: Story = {};

export const WithCaption: Story = {
  args: {
    caption: 'Dettaglio dell’allestimento.',
  },
};
