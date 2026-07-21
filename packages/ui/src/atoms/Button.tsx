/**
 * Button — atomo del catalogo @butik/ui.
 *
 * Island React (ADR-0008): stesso contratto della vecchia versione .astro, ma
 * autorabile in Storybook. Stile in CSS Modules + token di @butik/ui-tokens
 * (ADR-0005): niente Tailwind, nessun valore grezzo dove esiste un token.
 * Reso come <a> quando c'è `href`, altrimenti <button>. Componente
 * presentazionale: senza direttiva client Astro lo rende a HTML statico.
 */
import type { ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  /** Se valorizzato, il bottone è un link <a>; altrimenti un <button>. */
  href?: string;
  /** Variante visiva: piena (primary) o contorno (ghost). */
  variant?: 'primary' | 'ghost';
  /**
   * Tonalità di colore, per l'uso su sfondi diversi dal default.
   * `dark` (solo `primary`): sfondo `--color-fg` invece dell'accent rosso —
   * CTA su header/hero chiari. `invert` (solo `ghost`): bordo/testo
   * `--color-fg-invert` — outline leggibile su sfondi scuri (hero fotografici).
   * Omessa: colori classici (primary = accent, ghost = foreground scuro).
   */
  tone?: 'dark' | 'invert';
  /** Tipo del <button> (ignorato quando c'è `href`). */
  type?: 'button' | 'submit' | 'reset';
  /** Contenuto del bottone (testo, icona + testo, ...). */
  children?: ReactNode;
}

export default function Button({
  href,
  variant = 'primary',
  tone,
  type = 'button',
  children,
}: ButtonProps) {
  const toneKey = tone ? `${variant}_${tone}` : variant;
  const cls = `${styles.button} ${styles[toneKey] ?? styles[variant]}`;

  return href ? (
    <a className={cls} href={href}>
      {children}
    </a>
  ) : (
    <button className={cls} type={type}>
      {children}
    </button>
  );
}
