// Storie delle TapeReels: dimensioni, toni e velocità di rotazione.
import type { Meta, StoryObj } from '@storybook/react-vite';
import TapeReels from './TapeReels';

const meta = {
  title: 'Atoms/Motion/TapeReels',
  component: TapeReels,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 120, step: 4 } },
    tone: { control: 'inline-radio', options: ['onLight', 'onDark'] },
    speed: { control: { type: 'range', min: 1, max: 12, step: 1 } },
  },
  args: { size: 40, tone: 'onLight', speed: 3 },
} satisfies Meta<typeof TapeReels>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnDark: Story = {
  args: { tone: 'onDark' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-invert)', padding: 'var(--space-8)' }}>
        <Story />
      </div>
    ),
  ],
};

// Piccole: accento accanto a un'etichetta.
export const Small: Story = { args: { size: 20 } };

// Grandi: elemento grafico di sezione.
export const Large: Story = { args: { size: 96 } };

// Rotazione lenta, appena percettibile.
export const Slow: Story = { args: { speed: 10 } };
