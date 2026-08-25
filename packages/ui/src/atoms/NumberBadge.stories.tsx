import type { Meta, StoryObj } from '@storybook/react-vite';
import NumberBadge from './NumberBadge';

const meta = {
  title: 'Atoms/NumberBadge',
  component: NumberBadge,
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: 'number',
      description: 'Numero dello step (1-based); reso zero-padded a 2 cifre.',
    },
  },
  args: {
    number: 1,
  },
} satisfies Meta<typeof NumberBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: { number: 1 },
};

export const DoubleDigit: Story = {
  args: { number: 12 },
};
