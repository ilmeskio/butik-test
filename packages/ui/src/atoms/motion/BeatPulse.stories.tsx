// Storie del BeatPulse: toni, dimensioni e uso accanto a un'etichetta.
import type { Meta, StoryObj } from '@storybook/react-vite';
import BeatPulse from './BeatPulse';

const meta = {
  title: 'Atoms/Motion/BeatPulse',
  component: BeatPulse,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['accent', 'highlight', 'fg'] },
    size: { control: { type: 'range', min: 6, max: 40, step: 2 } },
  },
  args: { tone: 'accent', size: 14 },
  // Gli anelli si espandono fino a 3.4×: senza margine uscirebbero dal riquadro.
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-8)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BeatPulse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Highlight: Story = {
  args: { tone: 'highlight' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-invert)', padding: 'var(--space-8)' }}>
        <Story />
      </div>
    ),
  ],
};

// Punto piccolo: indicatore di stato accanto a un testo.
export const Small: Story = { args: { size: 8 } };

// Punto grande: elemento grafico autonomo.
export const Large: Story = { args: { size: 32 } };

// In contesto: badge "in diretta".
export const WithLabel: Story = {
  render: (args) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--color-fg)',
      }}
    >
      <BeatPulse {...args} />
      In diretta
    </span>
  ),
  args: { size: 10 },
};
