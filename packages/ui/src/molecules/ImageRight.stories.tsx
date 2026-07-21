import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageRight from './ImageRight';

const placeholderSrc =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#3b5a8a"/></svg>'
  );

const meta = {
  title: 'UI/ImageRight',
  component: ImageRight,
  tags: ['autodocs'],
  args: {
    src: placeholderSrc,
    alt: '',
  },
} satisfies Meta<typeof ImageRight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoCaption: Story = {};

export const WithCaption: Story = {
  args: {
    caption: 'Vista dall’alto dello spazio espositivo.',
  },
};
