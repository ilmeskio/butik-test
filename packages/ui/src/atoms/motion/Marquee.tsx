/**
 * Marquee — fascia tipografica cinetica in stile poster musicale: le voci
 * scorrono in loop, separate da un bollo. Transizione tra sezioni, claim
 * ricorrente, gancio a fondo pagina.
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): CSS Modules sui token di
 * @butik/ui-tokens (ADR-0005). Decorativo (`aria-hidden`): il testo che scorre
 * non è leggibile da tastiera né utile a uno screen reader, quindi non deve
 * essere l'unico posto in cui quel messaggio compare.
 */
import styles from './Marquee.module.css';

export interface MarqueeProps {
  /** Le voci che scorrono. */
  items: string[];
  tone?: 'onLight' | 'onDark';
  /** Inverte il senso di scorrimento. */
  reverse?: boolean;
  /** Secondi per ciclo completo. */
  speed?: number;
  className?: string;
}

export default function Marquee({
  items,
  tone = 'onDark',
  reverse = false,
  speed = 22,
  className,
}: MarqueeProps) {
  // La lista è duplicata: lo scorrimento di -50% torna esattamente al punto di
  // partenza, così il loop non ha stacchi.
  const loop = [...items, ...items];
  const cls = [styles.mq, styles[tone], className].filter(Boolean).join(' ');

  return (
    <div className={cls} aria-hidden="true">
      <div
        className={[styles.track, reverse && styles.reverse].filter(Boolean).join(' ')}
        style={{ '--mq-speed': `${speed}s` } as React.CSSProperties}
      >
        {loop.map((it, i) => (
          <span className={styles.item} key={`${it}-${i}`}>
            {it}
            <span className={styles.dot}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
