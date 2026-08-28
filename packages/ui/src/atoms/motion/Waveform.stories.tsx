// Storie della Waveform: toni, altezza della fascia e velocità di scorrimento.
import type { Meta, StoryObj } from '@storybook/react-vite';
import Waveform from './Waveform';

const meta = {
  title: 'Atoms/Motion/Waveform',
  component: Waveform,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['onLight', 'onDark', 'accent', 'highlight'] },
    height: { control: { type: 'range', min: 24, max: 160, step: 8 } },
    speed: { control: { type: 'range', min: 1, max: 20, step: 1 } },
  },
  args: { tone: 'onLight', height: 56, speed: 6 },
} satisfies Meta<typeof Waveform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnDark: Story = {
  args: { tone: 'onDark' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-invert)', padding: 'var(--space-8) 0' }}>
        <Story />
      </div>
    ),
  ],
};

// Fascia sottile: divisore discreto tra due sezioni.
export const Thin: Story = { args: { height: 28 } };

// Fascia alta: l'onda diventa un elemento grafico a sé.
export const Tall: Story = { args: { height: 140 } };

// Scorrimento lento, per un movimento appena percettibile.
export const Slow: Story = { args: { speed: 18 } };

// Scorrimento veloce: più energia, adatto a una fascia "live".
export const Fast: Story = { args: { speed: 2 } };
