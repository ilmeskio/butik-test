/**
 * Button — componente pilota del catalogo @butik/ui.
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
  /** Tipo del <button> (ignorato quando c'è `href`). */
  type?: 'button' | 'submit' | 'reset';
  /** Contenuto del bottone (testo, icona + testo, ...). */
  children?: ReactNode;
}

export default function Button({
  href,
  variant = 'primary',
  type = 'button',
  children,
}: ButtonProps) {
  const cls = `${styles.button} ${styles[variant]}`;

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
