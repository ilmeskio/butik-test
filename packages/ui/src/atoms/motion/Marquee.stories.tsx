// Storie del Marquee: toni, senso e velocità di scorrimento, lunghezza lista.
import type { Meta, StoryObj } from '@storybook/react-vite';
import Marquee from './Marquee';

const CLAIMS = ['Cultura', 'Territori', 'Musica', 'Comunità'];

const meta = {
  title: 'Atoms/Motion/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['onLight', 'onDark'] },
    reverse: { control: 'boolean' },
    speed: { control: { type: 'range', min: 5, max: 60, step: 1 } },
  },
  args: { items: CLAIMS, tone: 'onDark', reverse: false, speed: 22 },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OnLight: Story = { args: { tone: 'onLight' } };

// Senso inverso: utile per due fasce sovrapposte che scorrono in opposizione.
export const Reverse: Story = { args: { reverse: true } };

export const Fast: Story = { args: { speed: 8 } };
export const Slow: Story = { args: { speed: 50 } };

// Una sola voce, ripetuta: il claim martellante.
export const SingleItem: Story = { args: { items: ['Butik'] } };

// Voci lunghe: verifica che il loop resti continuo anche con poche ripetizioni
// per giro.
export const LongItems: Story = {
  args: {
    items: ['Progettazione culturale su base musicale', 'Sviluppo territoriale'],
    speed: 30,
  },
};
