/**
 * NumberBadge — atomo del catalogo @butik/ui.
 *
 * Pallino numerato usato per gli step di un elenco ordinato (es. "Il nostro
 * metodo"). CSS Modules + token (ADR-0005), componente presentazionale
 * (ADR-0008).
 */
import styles from './NumberBadge.module.css';

export interface NumberBadgeProps {
  /** Numero dello step (1-based); reso con zero-padding a 2 cifre. */
  number: number;
}

export default function NumberBadge({ number }: NumberBadgeProps) {
  return <span className={styles.badge}>{String(number).padStart(2, '0')}</span>;
}
