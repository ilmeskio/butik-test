// ──────────────────────────────────────────────────────────────────────────
// Contenuti hero per la pagina del singolo servizio — UNICA fonte dati,
// condivisa dalle 3 direzioni di design (A/B/C) così che l'unica variabile
// nel confronto sia la presentazione, non il copy.
//
// Tutto qui dentro è fondato su contenuti REALI già presenti nel sito:
//   · "Per chi" deriva dai campi `AdattoA` di ogni .mdx servizio
//   · le prove (numeri/bandi/partner) vengono da Numbers.astro, dai bandi
//     reali in progettazione-culturale.mdx e dai loghi in data/partners.ts
//   · le CTA alternano form contatti e "call conoscitiva" a seconda del
//     target naturale del servizio (test form-vs-call lato dato, non design)
// ──────────────────────────────────────────────────────────────────────────

export interface ServiceProof {
  /** Numero o etichetta forte, es. "9", "70K+", "IULM·24ORE·SAE". */
  value: string;
  /** Cosa rappresenta il valore, es. "bandi vinti dal 2018". */
  label: string;
}

export interface ServiceHeroCta {
  label: string;
  href: string;
}

export interface LedgerRow {
  /** Chiave a sinistra: anno, sigla, luogo o numero. */
  k: string;
  /** Voce a destra: bando, partner, committente, prodotto. */
  v: string;
}

export interface ServiceHeroContent {
  /** Slug della collection `servizi` (entry.id). */
  slug: string;
  /** "Per [target]" — chi è questo servizio, in alto e in chiaro. */
  eyebrow: string;
  /** Claim di valore nel linguaggio del target. */
  headline: string;
  /** Una riga di supporto. */
  sub: string;
  /** 2–3 prove forti (per gli hero A e C). */
  proof: ServiceProof[];
  /** Stringhe brevi per la barra prova orizzontale (hero B). */
  proofBar: string[];
  /** 3 esiti concreti "cosa ottieni" (hero C). */
  outcomes: string[];
  /** CTA primaria. */
  ctaPrimary: ServiceHeroCta;
  /** CTA secondaria opzionale. */
  ctaSecondary?: ServiceHeroCta;
  /** Etichetta del registro (colonna prova verticale dell'hero B). */
  ledgerLabel: string;
  /** Registro: voci di prova REALI, mostrate come indice tipografico. */
  ledger: LedgerRow[];
}

export const serviziHero: Record<string, ServiceHeroContent> = {
  'progettazione-culturale': {
    slug: 'progettazione-culturale',
    eyebrow: 'Per Comuni, enti e associazioni che cercano finanziamenti',
    headline: 'Dalla tua idea a un progetto culturale finanziato.',
    sub: 'Ideazione, scrittura bandi, partenariati e rendicontazione: ti affianchiamo in tutto il ciclo di vita del progetto.',
    proof: [
      { value: '9', label: 'bandi vinti dal 2018' },
      { value: 'UE · PNRR', label: 'fondi intercettati' },
      { value: '30+', label: 'progetti realizzati' },
    ],
    proofBar: ['9 bandi vinti dal 2018', '30+ progetti realizzati', 'fondi UE · PNRR · Cariplo'],
    outcomes: [
      'Ideazione e scrittura di bandi nazionali ed europei',
      'Costruzione e gestione di partenariati',
      'Coordinamento progettuale e rendicontazione',
    ],
    ctaPrimary: { label: 'Partecipa a un bando con noi', href: '/contatti' },
    ctaSecondary: { label: 'Vedi i progetti', href: '/progetti' },
    ledgerLabel: 'Bandi vinti dal 2018',
    ledger: [
      { k: '2018', v: 'Fondazione Cariplo · innovazione culturale' },
      { k: '2019', v: 'JUMP · European Music Market' },
      { k: '2021', v: 'ANCI · Fermenti in Comune' },
      { k: '2021', v: 'CESVI · Scena Unita' },
      { k: '2022', v: 'MusicAIRE · Music Moves Europe' },
      { k: '22/23', v: 'FUS · Progetti Speciali Musica' },
      { k: '2023', v: 'PNRR · M1C3 capacity building' },
      { k: '2023', v: 'BS/BG Capitale della Cultura' },
      { k: '2025', v: 'Cariparma' },
    ],
  },

  'consulenza-strategica': {
    slug: 'consulenza-strategica',
    eyebrow: 'Per Comuni, DMO ed enti di promozione territoriale',
    headline: 'Il patrimonio musicale del tuo territorio è una strategia, non un singolo evento.',
    sub: 'Ascolto, analisi e co-progettazione per trasformarlo in un asset culturale e turistico duraturo.',
    proof: [
      { value: '15+', label: 'territori coinvolti' },
      { value: '30+', label: 'progetti realizzati' },
      { value: 'dal 2018', label: 'al fianco delle PA' },
    ],
    proofBar: ['15+ territori coinvolti', 'co-progettazione sul campo', 'dal 2018 al fianco delle PA'],
    outcomes: [
      'Ascolto attivo e analisi del contesto',
      'Strategia di sviluppo su base musicale',
      'Co-progettazione con gli attori locali',
    ],
    ctaPrimary: { label: 'Prenota una call conoscitiva', href: '/contatti' },
    ctaSecondary: { label: 'Scopri il metodo', href: '/servizi' },
    ledgerLabel: 'Al fianco di Comuni e DMO',
    ledger: [
      { k: 'Cremona', v: 'DMO Visit Cremona' },
      { k: 'Napoli', v: 'Comune di Napoli' },
      { k: 'Milano', v: 'Comune di Milano' },
      { k: 'Brescia', v: 'Comune di Brescia' },
      { k: 'Pesaro', v: 'Comune di Pesaro' },
      { k: 'Verona', v: 'Comune di Verona' },
    ],
  },

  'formazione-capacity-building': {
    slug: 'formazione-capacity-building',
    eyebrow: 'Per operatori, giovani professionisti ed enti di formazione',
    headline: 'Competenze che restano sul territorio.',
    sub: 'Percorsi formativi immersivi ed esperienziali, con format proprietari replicabili e adattabili.',
    proof: [
      { value: '1000+', label: 'giovani formati' },
      { value: '5+', label: 'percorsi formativi' },
      { value: 'IULM · 24ORE · SAE', label: 'partner accademici' },
    ],
    proofBar: ['1000+ giovani formati', '5+ percorsi formativi', 'con IULM, 24ORE, SAE'],
    outcomes: [
      'Percorsi immersivi ed esperienziali',
      'Format proprietari replicabili',
      'Mentoring e project work sul campo',
    ],
    ctaPrimary: { label: 'Attiva un percorso formativo', href: '/contatti' },
    ctaSecondary: { label: 'Vedi i progetti', href: '/progetti' },
    ledgerLabel: 'Partner accademici e formativi',
    ledger: [
      { k: 'IULM', v: 'Università · Milano' },
      { k: '24ORE', v: 'Business School' },
      { k: 'SAE', v: 'Institute' },
      { k: 'NAM', v: 'Nuova Accademia Musica' },
      { k: '1000+', v: 'giovani formati' },
      { k: '5+', v: 'percorsi attivati' },
    ],
  },

  'eventi-culturali-musicali': {
    slug: 'eventi-culturali-musicali',
    eyebrow: "Per Comuni e per l'industry musicale",
    headline: 'Eventi che attivano quartieri, comunità e reti professionali.',
    sub: 'Dal concept al coordinamento operativo: format musicali con un impatto sociale misurabile.',
    proof: [
      { value: '70K+', label: 'persone raggiunte' },
      { value: '2', label: 'edizioni Milano Music Week' },
      { value: '30+', label: 'progetti realizzati' },
    ],
    proofBar: ['Milano Music Week · 2 edizioni', '70K+ persone raggiunte', 'format con impatto sociale'],
    outcomes: [
      'Concept e direzione artistica',
      'Coordinamento operativo end-to-end',
      'Attivazione di comunità e networking',
    ],
    ctaPrimary: { label: 'Progetta un evento con noi', href: '/contatti' },
    ctaSecondary: { label: 'Vedi i format', href: '/progetti' },
    ledgerLabel: "Con l'industry musicale",
    ledger: [
      { k: 'MMW', v: 'Milano Music Week · 2 ed. · 70K+' },
      { k: 'Assomusica', v: 'associazione di settore' },
      { k: 'AssoConcerti', v: 'live industry' },
      { k: 'FIMI', v: 'industria discografica' },
      { k: 'SIAE', v: 'diritti d’autore' },
      { k: 'Nuovo IMAIE', v: 'diritti connessi' },
    ],
  },

  'prodotti-turistico-musicali': {
    slug: 'prodotti-turistico-musicali',
    eyebrow: 'Per DMO, PA ed enti di promozione turistica',
    headline: 'Dal patrimonio musicale a un prodotto turistico che si vende.',
    sub: 'Itinerari, mappe, guide e storytelling: il tuo territorio diventa una destinazione musicale.',
    proof: [
      { value: '15+', label: 'territori coinvolti' },
      { value: 'itinerari', label: 'mappe, guide, editoriale' },
      { value: 'Visit Cremona', label: 'caso reale' },
    ],
    proofBar: ['itinerari e mappe turistiche', 'materiali editoriali e promozionali', 'case study Visit Cremona'],
    outcomes: [
      'Prodotti turistici e itinerari',
      'Materiali editoriali, mappe e guide',
      'Storytelling e promozione della destinazione',
    ],
    ctaPrimary: { label: 'Prenota una call conoscitiva', href: '/contatti' },
    ctaSecondary: { label: 'Vedi i progetti', href: '/progetti' },
    ledgerLabel: 'Destinazioni e prodotti reali',
    ledger: [
      { k: 'Cremona', v: 'DMO Visit Cremona · itinerari' },
      { k: 'CCIAA', v: 'Camera di Commercio Cremona' },
      { k: 'Mappe', v: 'comuni musicali' },
      { k: 'TUM', v: 'turismo musicale' },
      { k: '15+', v: 'territori coinvolti' },
    ],
  },
};
