/**
 * SectionHeading — molecola del catalogo @butik/ui.
 *
 * Compone Eyebrow + titolo di sezione, coppia finora riscritta a mano in
 * quattro punti (`home/Metodo`, `home/Testimonials`, `pages/servizi/index`,
 * `pages/partners`) con la stessa catena Tailwind duplicata
 * `font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-butik-dark`.
 *
 * La scala tipografica è un token unico e fluido
 * (`--font-size-section-title`): i due punti che divergevano — servizi/index
 * senza `lg:text-5xl`, partners con `text-5xl` fisso — si allineano alla
 * scala dominante invece di essere preservati come varianti (le divergenze
 * erano accidentali, non decisioni di design).
 *
 * CSS Modules + token (ADR-0005), componente presentazionale senza direttiva
 * client: Astro lo rende a HTML statico (ADR-0008).
 */
import type { ReactNode } from 'react';
import Eyebrow from '../atoms/Eyebrow';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  /** Titoletto maiuscolo sopra al titolo. Omesso, il titolo sta da solo. */
  eyebrow?: ReactNode;
  /** Il titolo della sezione. */
  title: ReactNode;
  /**
   * Livello del heading. `h2` (default) per le sezioni; `h1` per il titolo
   * principale di una pagina (es. partners). Cambia solo il tag: la resa
   * visiva è la stessa, la gerarchia del documento no.
   */
  as?: 'h1' | 'h2';
  /** Allineamento del blocco: centro (default, tutti i casi attuali) o sinistra. */
  align?: 'center' | 'left';
}

export default function SectionHeading({
  eyebrow,
  title,
  as: Tag = 'h2',
  align = 'center',
}: SectionHeadingProps) {
  const cls = [styles.wrapper, align === 'left' && styles.left].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {eyebrow && <Eyebrow align={align === 'left' ? 'left' : 'center'}>{eyebrow}</Eyebrow>}
      <Tag className={styles.title}>{title}</Tag>
    </div>
  );
}
