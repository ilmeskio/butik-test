/**
 * Logo — atomo del catalogo @butik/ui.
 *
 * Componente puramente presentazionale: riceve `src`/`width`/`height` già
 * risolti dal chiamante `.astro` (via `getImage()` di `astro:assets`, non
 * `<Image>` — quest'ultimo è un componente Astro-only, non eseguibile dentro
 * un'isola React né in Storybook). Vedi ADR-0008 amendment 2026-07-21.
 * `className` è passata così com'è (non unita a classi interne) per
 * permettere ai chiamanti app-side di agganciare effetti locali (es. il
 * filtro drop-shadow dell'header in modalità overlay).
 */
import styles from './Logo.module.css';

export interface LogoProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  loading?: 'eager' | 'lazy';
  className?: string;
}

export default function Logo({
  src,
  width,
  height,
  alt = 'Butik',
  loading = 'lazy',
  className,
}: LogoProps) {
  const cls = className ? `${styles.logo} ${className}` : styles.logo;

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      className={cls}
    />
  );
}
