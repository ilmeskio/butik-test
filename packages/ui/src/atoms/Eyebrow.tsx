/**
 * Eyebrow — atomo del catalogo @butik/ui.
 *
 * Estrae il titoletto maiuscolo che precede i titoli di sezione, oggi
 * duplicato come markup quasi identico in 11+ file (`Metodo`, `Testimonials`,
 * `MetodoSteps`, `CosaFacciamo`, `BandiVinti`, `DiCosaCiOccupiamo`, `AdattoA`,
 * `ServiceHeroA/B/C`, `pages/partners.astro`). CSS Modules + token
 * (ADR-0005), componente presentazionale (ADR-0008).
 */
import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

export interface EyebrowProps {
  /** Testo del titoletto. */
  children: ReactNode;
  /** Allineamento: sinistra (default) o centro (es. Testimonials). */
  align?: 'left' | 'center';
  /** Spaziatura sotto al testo: `md` (default, la maggioranza dei casi) o `sm` (es. AdattoA). */
  spacing?: 'md' | 'sm';
}

export default function Eyebrow({ children, align = 'left', spacing = 'md' }: EyebrowProps) {
  const cls = [
    styles.eyebrow,
    align === 'center' && styles.center,
    spacing === 'sm' && styles.spacingSm,
  ]
    .filter(Boolean)
    .join(' ');

  return <p className={cls}>{children}</p>;
}
