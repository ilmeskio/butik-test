/**
 * Mark — segni grafici da spruzzare per dare carattere editoriale: stella,
 * croce, mirino, bollo, sparkle. Con `twinkle` pulsa e ruota piano.
 *
 * Atomo di motion del catalogo @butik/ui (ADR-0008): CSS Modules sui token di
 * @butik/ui-tokens (ADR-0005). Decorativo, animazione tutta CSS.
 */
import styles from './Mark.module.css';

export type MarkType = 'spark' | 'plus' | 'reg' | 'bollo' | 'sparkle';

export interface MarkProps {
  type?: MarkType;
  tone?: 'accent' | 'highlight' | 'fg' | 'accent2';
  /** Lato del segno, in px. */
  size?: number;
  /** Se true il segno pulsa e ruota lentamente. */
  twinkle?: boolean;
  className?: string;
}

// I segni pieni si disegnano con `fill`, quelli lineari con `stroke`.
const FILLED: MarkType[] = ['spark', 'bollo', 'sparkle'];

const SHAPES: Record<MarkType, React.ReactNode> = {
  spark: <path d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z" />,
  sparkle: <path d="M12 2 Q13 11 22 12 Q13 13 12 22 Q11 13 2 12 Q11 11 12 2 Z" />,
  bollo: <circle cx="12" cy="12" r="8" />,
  plus: <path d="M12 3 V21 M3 12 H21" />,
  reg: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22" />
    </>
  ),
};

export default function Mark({
  type = 'spark',
  tone = 'accent',
  size = 24,
  twinkle = false,
  className,
}: MarkProps) {
  const filled = FILLED.includes(type);
  const cls = [styles.mark, styles[tone], twinkle && styles.twinkle, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={cls}
      style={{ '--mark-size': `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
      >
        {SHAPES[type]}
      </svg>
    </span>
  );
}
