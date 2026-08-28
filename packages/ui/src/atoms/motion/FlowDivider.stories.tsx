// Storie del FlowDivider: toni, velocità e versione senza bollo.
import type { Meta, StoryObj } from '@storybook/react-vite';
import FlowDivider from './FlowDivider';

const meta = {
  title: 'Atoms/Motion/FlowDivider',
  component: FlowDivider,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['onLight', 'onDark'] },
    speed: { control: { type: 'range', min: 1, max: 12, step: 1 } },
    dot: { control: 'boolean' },
  },
  args: { tone: 'onLight', speed: 3, dot: true },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-8) 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlowDivider>;

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

// Solo i trattini: divisore minimo, senza il bollo che attira l'occhio.
export const WithoutDot: Story = { args: { dot: false } };

export const Fast: Story = { args: { speed: 1 } };
export const Slow: Story = { args: { speed: 10 } };
