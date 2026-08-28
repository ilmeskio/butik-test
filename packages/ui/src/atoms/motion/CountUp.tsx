/**
 * CountUp — numero che sale da 0 al valore quando entra in vista. Per i numeri
 * d'impatto (progetti, persone raggiunte, bandi vinti).
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): CSS Modules sui token di
 * @butik/ui-tokens (ADR-0005).
 *
 * NOTA: come Underline, questo atomo ha bisogno del client — in Astro va
 * montato con `client:visible`, altrimenti resta fermo sul valore iniziale.
 * Con `prefers-reduced-motion` il numero compare subito al valore finale,
 * senza conteggio.
 */
import { useEffect, useRef, useState } from 'react';
import styles from './CountUp.module.css';

export interface CountUpProps {
  /** Valore finale del conteggio. */
  value: number;
  /** Testo prima del numero (es. "+"). */
  prefix?: string;
  /** Testo dopo il numero (es. "K", "%"). */
  suffix?: string;
  /** Didascalia sotto il numero. */
  label?: string;
  tone?: 'onLight' | 'onDark';
  className?: string;
}

const DURATION = 1400;

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  label,
  tone = 'onDark',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const run = () => {
      if (reduce) {
        setN(value);
        return;
      }
      let start = 0;
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / DURATION, 1);
        // easeOutCubic: parte rapido e si assesta, come un contatore che frena.
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const cls = [styles.cu, styles[tone], className].filter(Boolean).join(' ');

  return (
    <div className={cls} ref={ref}>
      <span className={styles.num}>{`${prefix}${Math.round(n)}${suffix}`}</span>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
