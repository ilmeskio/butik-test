# 07 · PortfolioGrid

**File codice**: `src/components/home/PortfolioGrid.astro` (nuovo)
**Sezione wireframe**: "Storie di trasformazione territoriale"

## Scopo

Vetrina dei progetti principali in grid asimmetrica. Sostituisce e arricchisce
la sezione "I Nostri Progetti" attuale (oggi un semplice grid 3 colonne).

## Layout & contenuto

```
        Eyebrow: "Progetti"
        H2: "Storie di trasformazione territoriale"
        Subtitle: "Quello che abbiamo costruito insieme ai nostri partner"

   ┌──────────────┬────────────┐
   │              │  Project   │
   │   Cult       ├────────────┤
   │   Funding    │  Project   │
   │              │            │
   ├──────────────┼────────────┤
   │   Milano     │  Project   │
   │   Music Week ├────────────┤
   │              │  Project   │
   └──────────────┴────────────┘
   ┌──────────────┐
   │   DMO Visit  │
   │   Cremona    │
   └──────────────┘

                 [Vedi tutto]
```

- Grid asimmetrico: alcune card più grandi, altre più piccole.
- Implementazione: CSS Grid con `grid-template-columns: repeat(3, 1fr)`
  + utility `col-span-2`, `row-span-2` su card scelte.
- 6-7 progetti mostrati al massimo. Più del wireframe possono entrare in `/progetti`.

## Card progetto (anatomia)

```
┌──────────────────────────┐
│   IMG (16:9 o 4:3)       │
│                          │
├──────────────────────────┤
│   Project name           │
│                          │
│   Lorem ipsum descrizione│
│                          │
│   [tag] [tag] [tag]      │
│                          │
│   Scopri il progetto →   │
└──────────────────────────┘
```

## Dati

Da collection `progetti` esistente — top N filtrati per `!draft`,
ordinati per `order`.

**Schema attuale**: `title`, `subtitle`, `heroImage`, `category` (singolo).

**Nel wireframe** le card hanno **2-3 tag** (es. "Formazione · Capacity
building · Fundraising culturale"). Lo schema attuale supporta solo
`category` singolo.

**Decisione necessaria** (vedi domanda 1):
- Opzione A: estendere schema a `categories: string[]` e migrare i `.mdx`.
- Opzione B: mostrare solo `category` singolo (1 tag per card).

## Props

```ts
interface Props {
  progetti: CollectionEntry<'progetti'>[];
}
```

## Stile

- Container: `py-24`.
- Eyebrow: `font-display text-xs font-bold tracking-widest uppercase text-butik-red`.
- H2: `font-heading text-4xl md:text-5xl font-bold text-butik-dark`.
- Subtitle: `font-sans text-base text-butik-dark/70 max-w-2xl mt-4`.
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 mt-12`.
- Card: `group relative overflow-hidden`.
- Card big (col-span-2): immagine + testo sovrapposto in basso.
- Card small: layout standard.
- Tag chip: `text-xs font-display tracking-widest uppercase bg-butik-light text-butik-dark px-3 py-1`.
- "Scopri il progetto →": `font-display text-xs font-bold tracking-widest uppercase text-butik-red`.

## Interazioni

- Hover card: `group-hover:scale-105` sull'immagine.
- Click card intera = link a `/progetti/<id>`.
- View transitions: riusa `transition:name={...}` come oggi.

## Cosa sostituisce

L'attuale `<section>` "I Nostri Progetti" in `src/pages/index.astro`.
Cambia layout (asimmetrico vs 3 col uguali) e arricchisce con tag.

## Mobile

Sotto `md` (< 768px):

- **Layout**: 1 colonna (`grid-cols-1 md:grid-cols-3`). Il grid asimmetrico
  collassa in una sequenza verticale di card uguali.
- **Card big/small distinzione**: scompare su mobile — tutte le card hanno
  la stessa larghezza e proporzione (es. `aspect-[4/3]`).
- **Ordine card**: l'ordine `order` dei progetti viene rispettato così com'è,
  perché il grid asimmetrico desktop riordina visivamente ma su mobile si
  legge top-to-bottom.
- **Padding card**: `p-5` (vs `p-6` desktop).
- **Tag chip**: invariato come dimensione, ma se 3+ tag vanno a capo
  (`flex-wrap gap-2`).
- **Subtitle sezione**: `text-sm md:text-base`.
- **CTA "Vedi tutto"**: full-width centrato.
- **Hover scale immagine**: resta attivo (su touch non si attiva ma non
  rompe nulla).

## Domande aperte

1. **Tag multipli o singolo**: estendiamo lo schema a `categories: string[]`
   (richiede update dei `.mdx` esistenti) o mostriamo solo `category` singolo?
2. **Layout asimmetrico specifico**: 1 big (col-span-2 row-span-2) + 4 small,
   oppure ritmo diverso? Mando un mockup ASCII quando si discute.
3. **Numero progetti mostrati**: 4? 6? 7? Il wireframe ne mostra ~6.
4. **CTA in fondo**: "Vedi tutto" → `/progetti`. Confermi.
