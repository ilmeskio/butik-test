// Dati di servizio condivisi dai blocchi della pagina /servizi (titolo, link,
// prova). Tutto reale: titolo/descrizione brevi dal lancio in home, statistica
// dal proof di serviziHero.
//
// TODO (ADR-0004): questo copy è ancora hardcoded, eredità della fase di
// prototipazione. Va portato nella collection `servizi` insieme a
// `data/serviziHero.ts`, quando sarà decisa l'architettura contenuti
// (Sitepins o altro CMS).
export interface ServiceCardData {
  slug: string;
  title: string;
  desc: string;
  href: string;
  /** Statistica reale, separata in valore + etichetta per la variante "numero". */
  statValue: string;
  statLabel: string;
}

export const serviziCards: ServiceCardData[] = [
  {
    slug: 'progettazione-culturale',
    title: 'Progettazione culturale',
    desc: 'Progetti che attivano territori e nuove generazioni.',
    href: '/servizi/progettazione-culturale',
    statValue: '9',
    statLabel: 'bandi vinti',
  },
  {
    slug: 'consulenza-strategica',
    title: 'Consulenza strategica',
    desc: 'Patrimonio musicale come asset culturale e turistico.',
    href: '/servizi/consulenza-strategica',
    statValue: '15+',
    statLabel: 'territori',
  },
  {
    slug: 'formazione-capacity-building',
    title: 'Formazione',
    desc: 'Percorsi immersivi per operatori e giovani professionisti.',
    href: '/servizi/formazione-capacity-building',
    statValue: '1000+',
    statLabel: 'giovani formati',
  },
  {
    slug: 'eventi-culturali-musicali',
    title: 'Eventi e format',
    desc: 'Format musicali per attivare comunità e quartieri.',
    href: '/servizi/eventi-culturali-musicali',
    statValue: '70K+',
    statLabel: 'persone raggiunte',
  },
  {
    slug: 'prodotti-turistico-musicali',
    title: 'Turismo musicale',
    desc: 'Prodotti turistici, itinerari e materiali editoriali.',
    href: '/servizi/prodotti-turistico-musicali',
    statValue: '15+',
    statLabel: 'territori · itinerari',
  },
];
