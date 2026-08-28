// Storie del Mark: tutti i tipi di segno, i toni e il twinkle.
import type { Meta, StoryObj } from '@storybook/react-vite';
import Mark, { type MarkType } from './Mark';

const TYPES: MarkType[] = ['spark', 'sparkle', 'bollo', 'plus', 'reg'];

const meta = {
  title: 'Atoms/Motion/Mark',
  component: Mark,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    tone: { control: 'inline-radio', options: ['accent', 'highlight', 'fg', 'accent2'] },
    size: { control: { type: 'range', min: 12, max: 96, step: 4 } },
    twinkle: { control: 'boolean' },
  },
  args: { type: 'spark', tone: 'accent', size: 24, twinkle: false },
} satisfies Meta<typeof Mark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Tutti i tipi affiancati: è il modo più rapido per sceglierne uno.
export const AllTypes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
      {TYPES.map((t) => (
        <Mark key={t} {...args} type={t} />
      ))}
    </div>
  ),
  args: { size: 40 },
};

// Tutti i toni sullo stesso segno.
export const AllTones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
      <Mark {...args} tone="accent" />
      <Mark {...args} tone="accent2" />
      <Mark {...args} tone="fg" />
    </div>
  ),
  args: { size: 40 },
};

export const Twinkling: Story = { args: { twinkle: true, size: 48 } };

// Su sfondo scuro il tono highlight è quello leggibile.
export const OnDark: Story = {
  args: { tone: 'highlight', size: 48 },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-invert)', padding: 'var(--space-8)' }}>
        <Story />
      </div>
    ),
  ],
};

// Segno piccolo, come punteggiatura accanto a un'etichetta.
export const Inline: Story = { args: { type: 'plus', size: 14 } };
