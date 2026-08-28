/**
 * Waveform — onda sonora che scorre in orizzontale, in loop continuo.
 * Divisore di sezione, accento sotto un titolo o fascia di un banner.
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): stile in CSS Modules sui
 * token di @butik/ui-tokens (ADR-0005). Decorativo, animazione tutta CSS.
 */
import styles from './Waveform.module.css';

export interface WaveformProps {
  tone?: 'onLight' | 'onDark' | 'accent' | 'highlight';
  /** Altezza della fascia, in px. */
  height?: number;
  /** Secondi per ciclo di scorrimento. */
  speed?: number;
  className?: string;
}

// Onda sinusoidale (curve quadratiche) larga 1200 con periodo 160px: due
// segmenti su/giù, così lo scorrimento di -160px chiude il loop senza salti.
const W = 1200;
const SEG = 80;
const AMP = 14;
const MID = 30;

const path = (() => {
  let d = `M0 ${MID}`;
  let up = true;
  for (let x = 0; x < W; x += SEG) {
    d += ` Q ${x + SEG / 2} ${up ? MID - AMP : MID + AMP} ${x + SEG} ${MID}`;
    up = !up;
  }
  return d;
})();

export default function Waveform({
  tone = 'onLight',
  height = 56,
  speed = 6,
  className,
}: WaveformProps) {
  const cls = [styles.wave, styles[tone], className].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      style={{ '--wave-h': `${height}px`, '--wave-speed': `${speed}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 60" preserveAspectRatio="none">
        <g className={styles.track}>
          <path d={path} />
        </g>
      </svg>
    </div>
  );
}
