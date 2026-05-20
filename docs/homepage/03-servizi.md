# 03 · Servizi (card)

**File codice**: `src/components/home/Servizi.astro` (nuovo)
**Sezione wireframe**: subito dopo Hero — vetrina dei 5 servizi di Butik
**Riferimento estetico**: blocco "Enterprise / Webflow AEO / The Future of Search"
della homepage Webflow

## Scopo

Vetrina sintetica dei **5 servizi** offerti da Butik. Card linkabili che
portano alle relative pagine `/servizi/<slug>`. Non è il punto in cui
spiegare il metodo — è il punto in cui far capire "cosa facciamo" e dare
accesso rapido ai dettagli.

## Layout & contenuto

Ispirato al reference Webflow: card affiancate, ognuna con titolo + 1-2 righe
di descrizione + mini-illustrazione/preview a destra (o sopra su mobile).

### Layout responsivo (5 card, 3 breakpoint)

Tre layout differenti a seconda della larghezza schermo:

**Desktop large (`lg`+, ≥1024px) — 5 in riga**

```
┌────┬────┬────┬────┬────┐
│ C1 │ C2 │ C3 │ C4 │ C5 │
└────┴────┴────┴────┴────┘
```

Con container `max-w-7xl` e `gap-4`, ogni card ~230px. Layout interno
verticale (preview sopra, testo sotto) — orizzontale non regge a quella
larghezza.

**Tablet/medium (`md`, 768-1023px) — bento asimmetrico stile Webflow**

```
┌─────────────────────────────┐
│         C1 (big)            │   ← full-width, anatomia orizzontale
└─────────────────────────────┘
┌──────────────┬──────────────┐
│   C2         │   C3         │   ← 2 cols, anatomia orizzontale
└──────────────┴──────────────┘
┌──────────────┬──────────────┐
│   C4         │   C5         │
└──────────────┴──────────────┘
```

Riprende il pattern del reference Webflow a breakpoint intermedi: la
prima card occupa l'intera larghezza con testo a sinistra + preview a
destra; le 4 successive vengono affiancate a coppie con la stessa anatomia
orizzontale ma compressa. La card C1 può essere il servizio "principale"
(es. Progettazione culturale, `order: 1`).

**Mobile (`< md`, < 768px) — stack 1 col**

Stack verticale uniforme (vedi sezione [Mobile](#mobile)).

### Alternative scartate

- **3+2 centrate uniformi** su tutti i breakpoint: card più larghe ma
  perdiamo l'ordine pulito di "5 in riga" su desktop large.
- **Carousel orizzontale**: nasconde elementi al primo colpo d'occhio. Da
  riconsiderare solo se in futuro i servizi diventano > 5.

## Anatomia card (due varianti)

La stessa card ha **due anatomie** che si attivano via media query: verticale
quando è stretta (desktop large col 5-grid e mobile), orizzontale quando è
larga (tablet bento).

### Variante verticale (desktop large 5-col + mobile stack)

```
┌──────────────┐
│  ┌────────┐  │
│  │ IMG/   │  │   ← preview quadrata o 4:3
│  │ icona  │  │
│  └────────┘  │
│              │
│  Titolo      │
│              │
│  Descrizione │
│  breve       │
└──────────────┘
```

- Preview sopra, titolo + descrizione sotto.
- Larghezza target desktop: ~230px (5-col grid).
- Padding `p-5`.

### Variante orizzontale (tablet bento)

```
┌─────────────────────────────────────────┐
│  Titolo                  ┌────────┐     │
│                          │ IMG/   │     │
│  Descrizione             │ icona  │     │
│  (1-2 righe)             └────────┘     │
└─────────────────────────────────────────┘
```

- Testo a sinistra, preview a destra.
- Si attiva su `md:` quando la card è larga (C1 full-width, C2-C5 a coppie).
- Padding `p-6 md:p-8`.

### Caratteristiche comuni

- `bg-white`, `border` sottile su background sezione chiaro.
- Tutta la card cliccabile (`<a>` wrapper).
- **Vincoli copy**: titolo max 3-4 parole, descrizione max ~12 parole. La
  variante verticale a 230px non tollera testi lunghi. La variante
  orizzontale tablet ha più respiro ma manteniamo coerenza editoriale.

## Contenuto: 5 servizi

I 5 servizi (dai testi in `docs/copy/site-copy-source.md`):

| # | Titolo lungo (testi) | Titolo card (compatto) | Slug |
|---|---|---|---|
| 1 | Progettazione culturale su base musicale | Progettazione culturale | `/servizi/progettazione-culturale` |
| 2 | Consulenza strategica, ascolto e co-progettazione | Consulenza strategica | `/servizi/consulenza-strategica` |
| 3 | Formazione e capacity building | Formazione | `/servizi/formazione` |
| 4 | Ideazione e realizzazione di eventi culturali e musicali | Eventi e format | `/servizi/eventi` |
| 5 | Sviluppo di prodotti, itinerari e storytelling turistico-musicale | Turismo musicale | `/servizi/turismo-musicale` |

I titoli "lunghi" sono quelli ufficiali dei testi di riferimento, usati
nella pagina /servizi e nelle pagine dettaglio. Per le card della home,
dato il layout stretto a 5 colonne, usiamo i **titoli card compatti**
(2-3 parole).

Per la descrizione card useremo un sunto della "descrizione testi"
(1 frase, ~12-15 parole). Esempi (bozza, da rifinire):
- "Ideiamo progetti culturali per attivare territori e nuove generazioni."
- "Trasformiamo il patrimonio musicale locale in asset culturale e turistico."
- "Percorsi formativi immersivi per operatori e giovani professionisti."
- "Eventi e format che usano la musica come strumento di attivazione territoriale."
- "Prodotti turistici, itinerari e materiali editoriali su base musicale."

**No** numerazione (01/02/03) — qui sono servizi, non step.

## Dati

Due opzioni (vedi domanda 3):

**A. Hard-coded** nel componente. Più rapido, controllo pieno sul testo.

**B. Da collection `servizi`** esistente. La collection ha già `title`,
`subtitle`, `heroImage`, `order`, `draft`. Carico i 5 con `order` più basso
e `!draft`. Le pagine `/servizi/<slug>` esistono già o si creeranno
parallelamente.

**Suggerimento**: opzione B se le 5 entry esistono o si creeranno presto;
A altrimenti, con migrazione facile a B dopo.

## Props

```ts
// se opzione B
interface Props {
  servizi: CollectionEntry<'servizi'>[];
}
```

Se opzione A: nessuna prop, array interno.

## Stile

- **Background sezione**: sfumatura sottile da `butik-light` (#fff2f1) a
  bianco, o un viola pallidissimo se vogliamo usare `butik-purple` come
  accento. Il reference Webflow ha gradient azzurro→bianco.
  - Proposta: `bg-gradient-to-b from-butik-light via-white to-butik-light`.
- **Container**: `max-w-7xl mx-auto px-6 py-24`.
- **Eyebrow** opzionale: "Servizi" `text-butik-red`.
- **H2**: `font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-butik-dark text-center max-w-3xl mx-auto mb-12`.
  - Copy: "Cosa facciamo" oppure più editoriale (vedi domanda 4).
- **Grid card** (tablet bento + desktop 5-col):
  - Wrapper: `grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5`.
  - C1 a `md:col-span-2 lg:col-span-1` per occupare full-width a tablet ma
    tornare normale su desktop.
- **Card** (base):
  - `group relative bg-white border border-butik-dark/10 transition hover:border-butik-dark/30 hover:shadow-md`
  - **Variante verticale** (default su `lg:` e `<md`): `p-5 flex flex-col gap-3`.
  - **Variante orizzontale** (su `md:` con larghezza ≥ 50% sezione):
    `md:p-7 lg:p-5 md:flex-row md:items-center md:gap-6 lg:flex-col lg:gap-3`.
- **Preview**:
  - Verticale: `aspect-square w-full object-cover`.
  - Orizzontale (tablet): `md:w-32 md:h-32 md:flex-shrink-0 lg:w-full lg:h-auto lg:aspect-square`.
- **Card title**: `font-heading text-base md:text-xl lg:text-lg font-bold text-butik-dark leading-snug`.
  - Su tablet (orizzontale) titolo più grande perché c'è spazio.
- **Card body**: `font-sans text-sm md:text-base lg:text-sm text-butik-dark/70 leading-snug`.
- **Link affordance**: niente CTA testuale dentro la card; tutta la card è
  cliccabile. Hover → leggero shadow + border più scuro (come Webflow).

## Interazioni

- Tutta la card è `<a>` con `href` al servizio.
- Hover: shadow + bordo intensifica (no `scale` per non rompere il reference
  pulito di Webflow).
- View transitions: usa `transition:name` per continuità con la pagina del
  servizio (come fa già il sito).

## Mobile

Sotto `md` (< 768px):

- **Layout grid**: `grid-cols-1` — stack verticale a 1 card per riga.
- **Card anatomia**: verticale (preview sopra, testo sotto), uguale alla
  variante desktop large.
- **Preview**: `aspect-[16/9] w-full` su mobile (più bassa e meno ingombrante
  della quadrata full-width), torna `aspect-square` da `md:`.
- **Card padding**: `p-5`.
- **H2 sezione**: `text-3xl md:text-4xl lg:text-5xl`, `mb-8`.
- **Spaziatura tra card**: `gap-3`.
- **Touch target**: tutta la card è `<a>` → area cliccabile generosa.

### Riepilogo breakpoint

| Range | Grid | Anatomia card | Preview |
|---|---|---|---|
| `< md` (mobile) | 1 col | verticale | `aspect-[16/9]` |
| `md` (tablet) | bento (1 + 2 + 2) | orizzontale | `w-32 h-32` (laterale) |
| `lg+` (desktop) | 5 in riga | verticale | `aspect-square` |

## Cosa cambia rispetto alla versione precedente (ProcessSteps)

| Process steps (vecchio) | Servizi (nuovo) |
|---|---|
| Metodo a 4 step | Vetrina di 5 servizi |
| Numeri giganti 01/02/03/04 | Niente numeri, titolo + descrizione |
| Non linkabili | Card linkabili (`<a href>`) |
| Stack verticale numeri | Card stile Webflow con preview |
| Sezione di "spiegazione" | Sezione di "scoperta" |

## Decisioni prese

- **5 servizi confermati** con titoli card compatti: Progettazione culturale,
  Consulenza strategica, Formazione, Eventi e format, Turismo musicale.
- **Slug URL confermati**: `/servizi/progettazione-culturale`,
  `/servizi/consulenza-strategica`, `/servizi/formazione`, `/servizi/eventi`,
  `/servizi/turismo-musicale`. Le ultime due vanno create.

## Domande aperte

1. **Dati hard-coded vs collection**: le 5 entry in `src/content/servizi/`
   esistono già o vanno create? Se le crei a breve, parto direttamente con
   l'opzione collection.
2. **Titolo sezione** H2: "Cosa facciamo" è il classico, ma il wireframe
   originale aveva "Ogni progetto parte da qui" che è più editoriale. Quale
   tono preferisci?
3. **Preview**: foto reali, illustrazioni flat, icone astratte, o
   screenshot/mockup? Card strette → preview quadrate. Le foto dei progetti
   potrebbero funzionare. Le icone astratte (es. SVG monocromatiche) sono
   l'opzione più solida per card piccole.
4. **Background sezione**: gradiente `butik-light` → bianco, oppure giocare
   con `butik-purple` molto sfumato come fa Webflow con l'azzurro?
5. **Eyebrow sopra l'H2**: "Servizi" sì o no?
