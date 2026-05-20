# 09 · AboutInline

**File codice**: `src/components/home/AboutInline.astro` (nuovo)
**Sezione wireframe**: "Una realtà che crede nel potere della musica"

## Scopo

Mini-about inline nella homepage, prima del banner CTA finale e della
newsletter. Comunica chi è Butik, da quanto opera, e cosa la rende unica.

## Layout & contenuto

```
   ┌──────────────────────┬──────────────────────┐
   │   H2 a sinistra      │                      │
   │   "Una realtà che    │                      │
   │    crede nel potere  │   ┌──────────────┐   │
   │    della musica"     │   │              │   │
   │                      │   │   IMG        │   │
   │   Body 3 paragrafi   │   │              │   │
   │                      │   │              │   │
   │   [Scopri] [Chi siamo]   └──────────────┘   │
   └──────────────────────┴──────────────────────┘
```

- 2 colonne `md:grid-cols-2` con gap generoso.
- Testo a sinistra, immagine a destra.
- Su mobile: stack verticale, immagine sopra o sotto (decidiamo).

## Contenuto (dal wireframe)

**H2**: "Una realtà che crede nel potere della musica"

**Body** (3 paragrafi):

> La prima impresa sociale italiana specializzata in progettazione culturale
> e sviluppo territoriale attraverso la musica.

> Dal 2018 lavoriamo al fianco di Comuni, istituzioni, operatori culturali e
> turistici per trasformare il patrimonio musicale in strumento di crescita
> culturale, sociale e turistica — con un metodo fondato sull'ascolto, la
> co-progettazione e il coinvolgimento attivo delle nuove generazioni. Siamo
> tra le prime realtà in Italia ad aver sviluppato un approccio strutturato
> al turismo musicale.

> Dal 2024 siamo l'ente organizzatore di Milano Music Week, uno dei
> principali appuntamenti italiani dedicati alla musica e all'industria
> musicale.

**CTA**:
- Primario: "Scopri" → `/chi-siamo`
- Secondario: "Chi siamo" → ?? (forse `/about` o stessa rotta)

(Le label "Scopri" e "Chi siamo" portano probabilmente alla stessa pagina;
nel wireframe sono affiancati. Strano — vedi domanda 1.)

## Props

Nessuna nella prima versione (tutto hard-coded). Volendo: `image: ImageMetadata`.

## Stile

- Container: `py-24`.
- Grid: `grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6`.
- H2: `font-heading text-4xl md:text-5xl font-bold text-butik-dark leading-tight mb-8`.
- Paragrafi: `font-sans text-base text-butik-dark/80 leading-relaxed mb-4`.
- Immagine: `w-full aspect-square object-cover` (o 4:3).
- CTA primario/secondario come negli altri componenti.

## Interazioni

Nessuna oltre hover dei CTA.

## Mobile

Sotto `md` (< 768px):

- **Layout**: stack verticale `grid-cols-1 md:grid-cols-2`.
- **Ordine elementi**: la mia proposta è **immagine prima del testo** (in DOM
  va prima la colonna testo, su mobile uso `order-2`/`order-1` per invertire).
  Motivo: l'immagine fa da hook visivo prima di un blocco di testo lungo.
- **Immagine**: `aspect-[16/9]` o `aspect-[4/3]` su mobile (orizzontale,
  meno ingombrante del quadrato desktop).
- **H2**: `text-3xl md:text-4xl lg:text-5xl`, `mb-6`.
- **Paragrafi**: invariati. `text-base`, `leading-relaxed`.
- **CTA pair**: full-width stacked, gap-3.
- **Padding sezione**: `py-16 md:py-24`.
- **Gap colonne**: `gap-8 md:gap-12`.

## Domande aperte

1. **Due CTA che vanno alla stessa pagina** (entrambi "chi siamo"): nel
   wireframe sono "Scopri" + "Chi siamo", ma sembrano puntare allo stesso
   posto. Era un placeholder? Forse uno punta al manifesto PDF e uno a
   `/chi-siamo`? Definiamo i due target.
2. **Immagine**: quale? Ne hai una in `src/assets/`? Oppure carousel di 2-3?
3. **Copy**: confermi i 3 paragrafi così come sono, o vuoi rifinirli?
4. **Posizione immagine** su mobile: sopra il testo o sotto?
