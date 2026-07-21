/**
 * ImageLeft — molecola del catalogo @butik/ui.
 *
 * Figura con immagine (aspect naturale) e didascalia opzionale, per il body
 * editoriale MDX; il layout a due colonne (immagine + testo affiancato) e lo
 * slot del testo restano nel wrapper `.astro` app-side
 * (`apps/web/src/components/mdx/ImageLeft.astro`) perché lo slot MDX e il
 * wrapper `.prose` sono concern di composizione pagina, non del componente
 * condiviso. Riceve `src`/`srcSet` già risolti — vedi ADR-0008 amendment
 * 2026-07-21.
 */
import styles from './ImageLeft.module.css';

export interface ImageLeftProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export default function ImageLeft({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt = '',
  caption,
}: ImageLeftProps) {
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
