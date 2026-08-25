import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageBlock from './ImageBlock';

const placeholderSrc =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#8a6d3b"/></svg>'
  );

const meta = {
  title: 'Molecules/ImageBlock',
  component: ImageBlock,
  tags: ['autodocs'],
  args: {
    src: placeholderSrc,
    alt: '',
  },
} satisfies Meta<typeof ImageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoCaption: Story = {};

export const WithCaption: Story = {
  args: {
    caption: 'Il team al lavoro durante il workshop di co-progettazione.',
  },
};
