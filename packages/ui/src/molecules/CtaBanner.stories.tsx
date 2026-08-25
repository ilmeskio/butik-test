// Storie del CtaBanner per il workshop @butik/ui. Copre le due varianti reali
// osservate nei 6 punti di consumo (con/senza CTA secondaria) e la lunghezza
// del body.
import type { Meta, StoryObj } from '@storybook/react-vite';
import CtaBanner from './CtaBanner';

const meta = {
  title: 'Molecules/CtaBanner',
  component: CtaBanner,
  tags: ['autodocs'],
  args: {
    title: 'Hai un progetto in mente?',
    body: 'Raccontaci la tua idea: troviamo insieme il format giusto.',
    primaryCta: { label: 'Contattaci', href: '/contatti' },
    secondaryCta: { label: 'Scopri i servizi', href: '/servizi' },
  },
} satisfies Meta<typeof CtaBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Doppia CTA (es. home, servizi/index).
export const WithSecondaryCta: Story = {};

// Solo CTA primaria, senza body (es. chi-siamo).
export const PrimaryOnly: Story = {
  args: {
    body: undefined,
    secondaryCta: undefined,
  },
};

// Titolo lungo: verifica il wrapping.
export const LongTitle: Story = {
  args: {
    title: 'Vuoi costruire un progetto culturale che duri nel tempo e coinvolga la community?',
  },
};
