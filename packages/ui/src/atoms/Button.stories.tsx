// Storie del Button per il workshop @butik/ui (ADR-0008). Coprono varianti
// (primary/ghost), modalità di resa (link vs button) e lunghezza del contenuto.
// I controlli (knobs) di Storybook permettono di provare le prop dal vivo.
import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'ghost'],
      description: 'Variante visiva del bottone.',
    },
    tone: {
      control: 'inline-radio',
      options: [undefined, 'dark', 'invert'],
      description:
        'Tonalità: "dark" (solo primary, sfondo scuro invece di accent) o "invert" (solo ghost, outline bianco per sfondi scuri).',
    },
    href: {
      control: 'text',
      description: 'Se valorizzato rende un <a>, altrimenti un <button>.',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo del <button> (ignorato quando c’è href).',
    },
    children: {
      control: 'text',
      description: 'Contenuto del bottone.',
    },
  },
  args: {
    variant: 'primary',
    children: 'Chiamaci',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variante piena, reso come <button> (default: nessun href).
export const Primary: Story = {
  args: { variant: 'primary', children: 'Chiamaci' },
};

// Variante a contorno.
export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Scopri di più' },
};

// Con href: il componente rende un <a>.
export const AsLink: Story = {
  args: { variant: 'primary', href: '/contatti', children: 'Vai ai contatti' },
};

// Senza href: il componente rende un <button type="submit">.
export const AsButton: Story = {
  args: { variant: 'primary', href: undefined, type: 'submit', children: 'Invia' },
};

// Contenuto misto (icona + testo) via children.
export const WithIcon: Story = {
  args: {
    variant: 'ghost',
    children: (
      <>
        <span aria-hidden="true">♪</span> Ascolta
      </>
    ),
  },
};

// Etichetta lunga: verifica il wrapping e il padding.
export const LongLabel: Story = {
  args: {
    variant: 'primary',
    children: 'Prenota una consulenza gratuita con il nostro team',
  },
};

// Etichetta corta: verifica il bottone compatto.
export const ShortLabel: Story = {
  args: { variant: 'ghost', children: 'Ok' },
};

// tone="dark": CTA primaria su sfondo chiaro con colore scuro invece di accent
// (Header, Hero home).
export const DarkTone: Story = {
  args: { variant: 'primary', tone: 'dark', children: 'Lavoriamo insieme' },
};

// tone="invert": outline bianco leggibile su sfondi scuri/fotografici
// (ServiceHero A/C, CtaProgetti). Il decorator simula lo sfondo scuro reale.
export const InvertTone: Story = {
  args: { variant: 'ghost', tone: 'invert', children: 'Scopri il progetto' },
  decorators: [
    (Story) => (
      <div style={{ background: '#071108', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
