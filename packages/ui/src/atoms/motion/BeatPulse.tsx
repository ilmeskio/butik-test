/**
 * BeatPulse — anelli concentrici che si espandono come la membrana di un
 * altoparlante, attorno a un punto pieno. Segnala "in corso" / "live":
 * dietro un'icona, accanto a una CTA, in un badge di stato.
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): CSS Modules sui token di
 * @butik/ui-tokens (ADR-0005). Decorativo, animazione tutta CSS.
 */
import styles from './BeatPulse.module.css';

export interface BeatPulseProps {
  tone?: 'accent' | 'highlight' | 'fg';
  /** Diametro del punto centrale, in px. Gli anelli scalano con lui. */
  size?: number;
  className?: string;
}

export default function BeatPulse({ tone = 'accent', size = 14, className }: BeatPulseProps) {
  const cls = [styles.beat, styles[tone], className].filter(Boolean).join(' ');

  return (
    <span
      className={cls}
      style={{ '--beat-size': `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <i className={styles.ring} />
      <i className={styles.ring} />
      <i className={styles.ring} />
      <span className={styles.dot} />
    </span>
  );
}
