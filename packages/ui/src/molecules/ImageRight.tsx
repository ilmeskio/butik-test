/**
 * ImageRight — molecola del catalogo @butik/ui.
 *
 * Stessa figura di ImageLeft; il "right" è solo l'ordine del DOM nel
 * wrapper `.astro` app-side (`apps/web/src/components/mdx/ImageRight.astro`
 * mette lo slot testo prima della figura). Vedi ADR-0008 amendment
 * 2026-07-21.
 */
import styles from './ImageRight.module.css';

export interface ImageRightProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export default function ImageRight({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt = '',
  caption,
}: ImageRightProps) {
  return (
    <figure className={styles.figure}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        className={styles.image}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
