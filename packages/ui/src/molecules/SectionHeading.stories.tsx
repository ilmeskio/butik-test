// Storie di SectionHeading per il workshop @butik/ui. Coprono i quattro punti
// di consumo reali trovati nell'audit: sezione centrata (Metodo,
// Testimonials, servizi/index) e titolo di pagina come h1 (partners), più il
// caso senza eyebrow e un titolo lungo che va a capo.
import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionHeading from './SectionHeading';

const meta = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'inline-radio',
      options: ['h1', 'h2'],
      description: 'Livello del heading: h2 per le sezioni, h1 per il titolo di pagina.',
    },
    align: {
      control: 'inline-radio',
      options: ['center', 'left'],
      description: 'Allineamento del blocco.',
    },
    eyebrow: { control: 'text', description: 'Titoletto maiuscolo sopra al titolo.' },
    title: { control: 'text', description: 'Titolo della sezione.' },
  },
  args: {
    eyebrow: 'Il nostro metodo',
    title: 'Come lavoriamo con i territori',
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Section: Story = {
  args: { as: 'h2', align: 'center' },
};

export const AlignLeft: Story = {
  args: { as: 'h2', align: 'left' },
};

export const PageTitle: Story = {
  args: { as: 'h1', align: 'center', eyebrow: 'Partner', title: 'Con chi lavoriamo' },
};

export const NoEyebrow: Story = {
  args: { as: 'h2', align: 'center', eyebrow: undefined },
};

export const LongTitle: Story = {
  args: {
    as: 'h2',
    align: 'center',
    eyebrow: 'Cosa dicono di noi',
    title: 'Un titolo di sezione molto lungo, che deve andare a capo su più righe restando leggibile',
  },
};
