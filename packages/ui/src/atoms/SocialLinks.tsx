/**
 * SocialLinks — atomo del catalogo @butik/ui.
 *
 * Riga di icone social (link + SVG inline), oggi duplicata identica in
 * Footer.astro e pages/contatti.astro. Il dato (`socials`) resta applicativo
 * (`apps/web/src/data/socials.ts`) e viene passato come prop — l'atomo non
 * conosce i profili social di butik, solo come renderizzarli. CSS Modules +
 * token (ADR-0005), componente presentazionale (ADR-0008).
 */
import styles from './SocialLinks.module.css';

export interface Social {
  label: string;
  href: string;
  /** Tracciato SVG dell'icona (viewBox 0 0 24 24). */
  path: string;
}

export interface SocialLinksProps {
  socials: Social[];
}

export default function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <ul className={styles.list}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={styles.link}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={s.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
