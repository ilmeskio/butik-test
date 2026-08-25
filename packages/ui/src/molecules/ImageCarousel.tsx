/**
 * ImageCarousel — molecola del catalogo @butik/ui.
 *
 * Carosello di immagini con scroll-snap orizzontale, frecce prev/next e dot
 * di navigazione. A differenza delle altre molecole immagine, ha
 * interattività reale (non solo presentazione): richiede una direttiva
 * client (`client:visible`) quando consumato in Astro — ADR-0008 lo prevede
 * esplicitamente ("aggiunta solo quando serve interattività"). Riceve
 * `images` con `src`/`srcSet` già risolti dal chiamante `.astro` — vedi
 * ADR-0008 amendment 2026-07-21.
 */
import { useRef, useState } from 'react';
import styles from './ImageCarousel.module.css';

export interface CarouselImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export interface ImageCarouselProps {
  images: CarouselImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: reducedMotion ? 'auto' : 'smooth' });
    setCurrent(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div
      className={styles.carousel}
      role="group"
      aria-roledescription="carosello"
      aria-label="Galleria immagini"
    >
      {/* tabIndex sul track: è una regione scrollabile, e senza essere
          focusabile non sarebbe raggiungibile da tastiera (SC 2.1.1) da chi
          non usa i bottoni. */}
      <div
        className={styles.track}
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Immagini, scorrevole"
      >
        {images.map((img, i) => (
          <div className={styles.slide} key={img.src}>
            <figure className={styles.figure}>
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes={img.sizes}
                width={img.width}
                height={img.height}
                alt={img.alt ?? ''}
                className={styles.image}
              />
              {img.caption && <figcaption className={styles.caption}>{img.caption}</figcaption>}
            </figure>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          aria-label="Immagine precedente"
          className={styles.navButton}
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        <div className={styles.dots}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Vai all'immagine ${i + 1}`}
              /* Lo stato attivo era veicolato dal solo colore: senza
                 aria-current non arrivava alle tecnologie assistive. */
              aria-current={i === current ? 'true' : undefined}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Immagine successiva"
          className={styles.navButton}
          onClick={() => goTo(current + 1)}
          disabled={current === images.length - 1}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
