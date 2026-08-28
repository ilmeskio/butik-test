/**
 * FlowDivider — linea tratteggiata che scorre, con un bollo che la percorre.
 * Alternativa più sobria alla Waveform per separare due sezioni; richiama i
 * connettori tratteggiati della sezione Metodo.
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): CSS Modules sui token di
 * @butik/ui-tokens (ADR-0005). Decorativo, animazione tutta CSS.
 */
import styles from './FlowDivider.module.css';

export interface FlowDividerProps {
  tone?: 'onLight' | 'onDark';
  /** Secondi per ciclo dei trattini (il bollo viaggia più lento). */
  speed?: number;
  /** Mostra il bollo viaggiante. */
  dot?: boolean;
  className?: string;
}

export default function FlowDivider({
  tone = 'onLight',
  speed = 3,
  dot = true,
  className,
}: FlowDividerProps) {
  const cls = [styles.flow, styles[tone], className].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      style={{ '--flow-speed': `${speed}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className={styles.line} />
      {dot && <span className={styles.bollo} />}
    </div>
  );
}
