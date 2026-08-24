// Storie di ArrowLink per il workshop @butik/ui. Coprono i due toni reali —
// fondo chiaro (ServiceExpanded) e fondo scuro (Hero della home) — e il
// ritono per contesto via --accent, che le card dei servizi già impostano.
import type { Meta, StoryObj } from '@storybook/react-vite';
import ArrowLink from './ArrowLink';

const meta = {
  title: 'UI/ArrowLink',
  component: ArrowLink,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['default', 'invert'],
      description: 'Tonalità: default su fondo chiaro, invert su fondo scuro.',
    },
    href: { control: 'text', description: 'Destinazione del link.' },
    children: { control: 'text', description: 'Testo del link (la freccia la aggiunge il componente).' },
  },
  args: {
    href: '#',
    children: 'Scopri la progettazione culturale',
  },
} satisfies Meta<typeof ArrowLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuFondoChiaro: Story = {
  args: { tone: 'default' },
};

export const SuFondoScuro: Story = {
  args: { tone: 'invert', children: 'Esplora tutti i servizi' },
  parameters: { backgrounds: { default: 'scuro' } },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-invert)', padding: 'var(--space-8)' }}>
        <Story />
      </div>
    ),
  ],
};

// Il tono default eredita --accent dal contesto: è così che le card dei
// servizi danno a ogni categoria il proprio colore senza toccare l'atomo.
export const AccentoDalContesto: Story = {
  args: { tone: 'default', children: 'Scopri il turismo musicale' },
  decorators: [
    (Story) => (
      <div style={{ ['--accent' as string]: 'var(--color-accent-2)' }}>
        <Story />
      </div>
    ),
  ],
};
