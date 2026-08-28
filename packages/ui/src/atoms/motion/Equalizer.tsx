/**
 * Equalizer — barre da visualizzatore audio, la firma musicale del brand.
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): island React, stile in
 * CSS Modules sui token di @butik/ui-tokens (ADR-0005). Puramente decorativo
 * (`aria-hidden`), quindi senza direttiva client Astro lo rende a HTML statico
 * e l'animazione resta interamente CSS.
 */
import styles from './Equalizer.module.css';

export interface EqualizerProps {
  /** Quante barre (le durate sono differenziate fino a 8). */
  bars?: number;
  /** Colore: adattato allo sfondo, o scelto esplicitamente. */
  tone?: 'onLight' | 'onDark' | 'accent' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  /** 'always' = anima sempre · 'hover' = solo al passaggio del puntatore. */
  play?: 'always' | 'hover';
  className?: string;
}

export default function Equalizer({
  bars = 6,
  tone = 'onDark',
  size = 'md',
  play = 'always',
  className,
}: EqualizerProps) {
  const cls = [styles.eq, styles[tone], styles[size], styles[play], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cls} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}
