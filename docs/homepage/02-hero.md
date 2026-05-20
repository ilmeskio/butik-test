# 02 · Hero

**File codice**: `src/components/home/Hero.astro` (nuovo)
**Sezione wireframe**: top della colonna 1, sopra "Ogni progetto parte da qui"

## Scopo

Apertura della homepage. Comunica la mission Butik in una frase forte +
azione immediata (manifesto + contatto) + impatto visivo via bento grid di
immagini reali.

## Layout & contenuto

```
                Eyebrow opzionale (?)
        ┌──────────────────────────────────┐
        │   H1 grande centrato             │
        │   "Attiviamo territori,          │
        │    comunità e nuove generazioni  │
        │    attraverso la musica"         │
        └──────────────────────────────────┘
                Sottotitolo descrittivo

           [Scarica il manifesto]   [Collaboriamo insieme!]

   ┌──────┬───────────┬──────┐
   │ IMG  │   IMG     │ IMG  │     ← bento grid asimmetrico
   ├──────┼─────┬─────┼──────┤
   │ IMG  │ IMG │ IMG │ IMG  │
   └──────┴─────┴─────┴──────┘
```

- Sfondo: `butik-light` (#fff2f1).
- Padding verticale generoso: `pt-20 pb-32`.
- Hero **non full-bleed scuro** come l'attuale: il wireframe lo vuole chiaro
  con bento grid in basso.
- Su mobile: testo + CTA verticali, bento grid in colonna semplice o nascosto.

## Contenuto testuale (dal wireframe)

- **H1**: "Attiviamo territori, comunità e nuove generazioni attraverso la musica"
- **Sottotitolo**: ~2 righe descrittive (placeholder, da rifinire)
- **CTA unico**: "Inizia il tuo progetto con noi" → `/contatti` (vedi domanda 1).

## Bento grid

- Layout responsivo a 4 colonne su desktop, 2 su mobile.
- 7-9 immagini di dimensioni miste (alcune span 2 col, alcune span 2 row).
- Implementabile con CSS Grid + `grid-template-areas` o con utility Tailwind
  (`col-span-2`, `row-span-2`).
- **Per la prima implementazione**: uso placeholder (foto progetti già nel
  repo + `heroHome`). Da sostituire con foto curate.

## Props

Probabilmente nessuna nella prima versione (tutto hard-coded nel componente).
Se vogliamo testabilità, futuribilmente: `title`, `subtitle`, `ctas[]`, `images[]`.

## Stile

- H1: `font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-butik-dark leading-tight text-center max-w-4xl mx-auto`.
- Subtitle: `font-sans text-lg md:text-xl text-butik-dark/70 mt-6 max-w-2xl mx-auto text-center`.
- CTA: `bg-butik-dark text-white px-8 py-4 font-display text-xs font-bold tracking-widest uppercase hover:bg-butik-red transition-colors`.

## Interazioni

- Hover sui CTA: cambio colore.
- Bento images: optional `group-hover:scale-105` interno.
- View transitions: opzionale, per ora no.

## Cosa sostituisce

L'attuale `<section>` hero in `src/pages/index.astro` (full-bleed con foto +
overlay nero + testo bianco). Diverso impianto cromatico.

## Mobile

Sotto `md` (< 768px):

- **H1**: `text-4xl` (~36px) invece di `text-6xl`/`text-7xl`. Resta centrato.
- **Subtitle**: `text-base` invece di `text-lg`/`text-xl`. Max-width: nessuna.
- **CTA**: full-width (`w-full`), centrato.
- **Padding verticale**: `pt-12 pb-20` (riduco rispetto a `pt-20 pb-32`).
- **Bento grid**: la mia proposta è **mostrarla in 2 colonne** (`grid-cols-2`)
  con immagini di altezza fissa (es. `aspect-square`), perdendo l'asimmetria
  desktop ma mantenendo l'impatto visivo. Le immagini con `col-span-2` o
  `row-span-2` su desktop diventano normali su mobile.
- **Alternativa**: nascondere la bento grid completamente su mobile e mostrare
  solo una immagine singola full-width come fallback. Più conservativo ma
  meno ricco. Da scegliere (vedi domanda 5).

## Decisioni prese

- **CTA unico**: "Inizia il tuo progetto con noi" (singolo, no secondario).

## Domande aperte

1. **Link CTA**: `/contatti` (404 al momento) o `mailto:info@wearebutik.com`?
2. **Bento grid**: ti va che parta con 7 placeholder usando foto del repo, o
   preferisci aspettare le foto curate prima di farla?
3. **Eyebrow sopra H1**: nel wireframe non c'è. Confermi che parto senza?
4. **Bento mobile**: griglia 2×N o singola immagine fallback?
