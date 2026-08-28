/**
 * Vinyl — disco in vinile che ruota. Accento-firma musicale, alternativo
 * all'Equalizer: accanto a un titolo, come indicatore di attesa, come decoro
 * d'angolo.
 *
 * Gira da solo; premendo e trascinando si "scratcha" — il disco segue il
 * puntatore come sotto la mano del dj e, al rilascio, mantiene la velocità del
 * lancio rallentando per inerzia fino al giro di regime. Il gesto parte al
 * click, non al passaggio del mouse, così funziona identico da touch (logica e
 * parametri TAU/MAX_VEL/STALE in ../../lib/vinylScratch).
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): CSS Modules sui token di
 * @butik/ui-tokens (ADR-0005). Senza client la rotazione resta quella CSS di
 * fallback: si vede girare, ma non si può scratchare.
 */
import { useEffect, useRef } from 'react';
import { initVinylScratch } from '../../lib/vinylScratch';
import styles from './Vinyl.module.css';

export interface VinylProps {
  /** Diametro del disco, in px. */
  size?: number;
  /** Colore dell'etichetta centrale. */
  label?: 'accent' | 'highlight' | 'fg';
  /** Secondi per giro a velocità di regime. */
  speed?: number;
  className?: string;
}

export default function Vinyl({
  size = 64,
  label = 'accent',
  speed = 6,
  className,
}: VinylProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // `root` limita l'aggancio a questa istanza: ogni disco è indipendente.
    initVinylScratch({
      root: el.parentNode ?? document,
      nodeSelector: `.${styles.vinyl}`,
      discSelector: `.${styles.disc}`,
      speedVar: '--vinyl-speed',
      defaultSpeed: 6,
    });
  }, []);

  const cls = [styles.vinyl, styles[label], className].filter(Boolean).join(' ');

  return (
    <span
      className={cls}
      ref={ref}
      style={
        { '--vinyl-size': `${size}px`, '--vinyl-speed': `${speed}s` } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <span className={styles.disc}>
        <span className={styles.glint} />
        <span className={styles.label}>
          <span className={styles.hole} />
        </span>
      </span>
    </span>
  );
}
