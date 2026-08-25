/**
 * ArrowLink — atomo del catalogo @butik/ui.
 *
 * Link testuale con freccia, non una CTA: la forma a pillola di PDR-0001 vale
 * per i bottoni (`Button`), non per questo ruolo. Estrae la grammatica
 * duplicata a mano in `home/Hero` ("Esplora tutti i servizi →") e
 * `serviziCards/ServiceExpanded` ("Scopri {servizio} →"): font display,
 * maiuscolo, tracking largo, freccia decorativa (`aria-hidden`, il testo del
 * link basta da solo agli screen reader).
 *
 * Le due decorazioni restano distinte per tono — bordo inferiore su fondo
 * chiaro, sottolineatura su fondo scuro — perché è ciò che rende leggibile
 * il link nei due contesti; il micro-movimento della freccia al passaggio del
 * mouse invece è unificato, e rispetta prefers-reduced-motion.
 *
 * CSS Modules + token (ADR-0005), presentazionale (ADR-0008).
 */
import type { ReactNode } from 'react';
import styles from './ArrowLink.module.css';

export interface ArrowLinkProps {
  /** Destinazione del link. */
  href: string;
  /** Testo del link (la freccia la aggiunge il componente). */
  children: ReactNode;
  /**
   * Tonalità: `default` su fondo chiaro (testo scuro, bordo inferiore
   * colorato), `invert` su fondo scuro o fotografico (testo chiaro,
   * sottolineatura). Il colore d'accento del tono `default` si può ritonare
   * dal contesto con `--arrow-link-accent` (o `--accent`, come fanno le card
   * dei servizi che hanno già un accento per categoria).
   */
  tone?: 'default' | 'invert';
  /** Classe aggiuntiva, unita a quelle interne. */
  className?: string;
}

export default function ArrowLink({ href, children, tone = 'default', className }: ArrowLinkProps) {
  const cls = [styles.link, tone === 'invert' && styles.invert, className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={cls} href={href}>
      {children}
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </a>
  );
}
