// ── Dati condivisi della sezione "Il nostro metodo" ───────────────────────
// Estratti da src/components/home/Metodo.astro per essere riusati dalle
// varianti grafiche in /lab/metodo. Ogni tappa porta con sé:
//  - title / description: il copy (docs/copy/site-copy-source.md)
//  - x / y: coordinate libere usate dalla variante "serpentina" (x in %, y in rem)
//  - icon: id dell'icona line-style (vedi MetodoIcon.astro)
// NB: Metodo.astro continua a usare i propri dati inline finché non si sceglie
// la variante definitiva; questo modulo serve solo alla pagina lab.

export type MetodoIconName =
  | 'ascolto'
  | 'co-progettazione'
  | 'protagonismo'
  | 'formazione'
  | 'eventi';

export interface Tappa {
  title: string;
  description: string;
  /** Ascissa del nodo, in % della larghezza (variante serpentina). */
  x: number;
  /** Ordinata del nodo, in rem (variante serpentina). */
  y: number;
  /** Icona line-style associata alla tappa. */
  icon: MetodoIconName;
}

export const tappe: Tappa[] = [
  {
    title: 'Ascolto attivo',
    description:
      'Ogni progetto parte dalla ricerca sul campo per capire i bisogni reali di comunità, istituzioni e operatori.',
    x: 34,
    y: 3,
    icon: 'ascolto',
  },
  {
    title: 'Co-progettazione',
    description:
      'Costruiamo le soluzioni insieme ai partner territoriali, senza importarle dall’esterno.',
    x: 66,
    y: 5,
    icon: 'co-progettazione',
  },
  {
    title: 'Protagonismo giovanile',
    description:
      'Le nuove generazioni non sono un target dei nostri progetti, sono parte attiva dei processi.',
    x: 30,
    y: 15,
    icon: 'protagonismo',
  },
  {
    title: 'Formazione immersiva ed esperienziale',
    description:
      'Il nostro modello formativo è basato sull’esperienza diretta e sulla costruzione di una comunità temporanea di progetto.',
    x: 70,
    y: 17,
    icon: 'formazione',
  },
  {
    title: 'Eventi come strumento strategico',
    description:
      'Progettiamo format che attivano territori e generano impatto sociale.',
    x: 36,
    y: 27,
    icon: 'eventi',
  },
];
