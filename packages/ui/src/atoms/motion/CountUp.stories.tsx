// Storie del CountUp: toni, prefissi/suffissi, didascalia e ordini di grandezza.
import type { Meta, StoryObj } from '@storybook/react-vite';
import CountUp from './CountUp';

const meta = {
  title: 'Atoms/Motion/CountUp',
  component: CountUp,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number' } },
    tone: { control: 'inline-radio', options: ['onLight', 'onDark'] },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    label: { control: 'text' },
  },
  args: { value: 30, suffix: '+', label: 'progetti realizzati', tone: 'onLight' },
} satisfies Meta<typeof CountUp>;

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

// Senza didascalia: solo il numero.
export const WithoutLabel: Story = { args: { label: undefined } };

// Numero grande con suffisso: il conteggio resta leggibile.
export const LargeValue: Story = {
  args: { value: 70, suffix: 'K+', label: 'persone raggiunte' },
};

// Numero piccolo, senza suffisso.
export const SmallValue: Story = { args: { value: 9, suffix: '', label: 'bandi vinti' } };

// Con prefisso.
export const WithPrefix: Story = { args: { value: 15, prefix: '≈', label: 'territori' } };

// Una riga di numeri, come nella sezione impatto.
export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
      <CountUp value={30} suffix="+" label="progetti realizzati" tone="onLight" />
      <CountUp value={15} suffix="+" label="territori coinvolti" tone="onLight" />
      <CountUp value={1000} suffix="+" label="giovani formati" tone="onLight" />
    </div>
  ),
};
