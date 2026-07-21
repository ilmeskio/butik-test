/**
 * ImageBlock — molecola del catalogo @butik/ui.
 *
 * Blocco immagine full-width con didascalia opzionale, per il body
 * editoriale (contenuto MDX). Riceve `src`/`srcSet` già risolti dal
 * chiamante `.astro` — la risoluzione degli asset (`resolveAsset`,
 * `getImage()`) resta app-side, Astro/Vite-only. Vedi ADR-0008 amendment
 * 2026-07-21.
 */
import styles from './ImageBlock.module.css';

export interface ImageBlockProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export default function ImageBlock({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt = '',
  caption,
}: ImageBlockProps) {
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
