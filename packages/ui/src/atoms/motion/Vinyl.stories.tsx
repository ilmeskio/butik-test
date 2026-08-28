// Storie del Vinyl: dimensioni, colore etichetta e velocità di regime.
// In tutte si può premere sul disco e trascinare per scratcharlo.
import type { Meta, StoryObj } from '@storybook/react-vite';
import Vinyl from './Vinyl';

const meta = {
  title: 'Atoms/Motion/Vinyl',
  component: Vinyl,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 24, max: 240, step: 8 } },
    label: { control: 'inline-radio', options: ['accent', 'highlight', 'fg'] },
    speed: { control: { type: 'range', min: 1, max: 20, step: 1 } },
  },
  args: { size: 64, label: 'accent', speed: 6 },
} satisfies Meta<typeof Vinyl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Grande: si apprezza lo scratch e il riflesso che gira.
export const Large: Story = { args: { size: 200 } };

// Piccolo: accento accanto a un titolo.
export const Small: Story = { args: { size: 28 } };

export const HighlightLabel: Story = { args: { label: 'highlight', size: 120 } };
export const DarkLabel: Story = { args: { label: 'fg', size: 120 } };

// Giro lento: il disco sembra fermo finché non lo si tocca.
export const Slow: Story = { args: { speed: 18, size: 120 } };

// Due dischi affiancati: ognuno si scratcha per conto suo.
export const Pair: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
      <Vinyl size={100} label="accent" />
      <Vinyl size={100} label="highlight" speed={10} />
    </div>
  ),
};
