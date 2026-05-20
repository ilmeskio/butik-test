# 06 · Testimonials

**File codice**: `src/components/home/Testimonials.astro` (nuovo)
**Sezione wireframe**: "Cosa dicono di noi"

## Scopo

Quote dei partner/clienti per validare il lavoro. 3 testimonial visibili
contemporaneamente su desktop, in carousel su mobile.

## Layout & contenuto

```
              Eyebrow: "Testimonianze"
              H2: "Cosa dicono di noi"

   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
   │ ★★★★★       │  │ ★★★★★       │  │ ★★★★★       │
   │             │  │             │  │             │
   │ "Lorem      │  │ "Lorem      │  │ "Lorem      │
   │  ipsum      │  │  ipsum      │  │  ipsum      │
   │  dolor..."  │  │  dolor..."  │  │  dolor..."  │
   │             │  │             │  │             │
   │ Nome cognome│  │ Nome cognome│  │ Nome cognome│
   │ Ruolo       │  │ Ruolo       │  │ Ruolo       │
   │ [LOGO]      │  │ [LOGO]      │  │ [LOGO]      │
   └─────────────┘  └─────────────┘  └─────────────┘

              ● ● ● ● ●   (pagination)
              ←    →
```

- Desktop (`md:`): 3 card affiancate.
- Mobile: carousel a 1 card visibile per volta + dots + frecce.
- Riuso pattern del `ImageCarousel.astro` già esistente come riferimento JS.

## Dati

Array hard-coded di N testimonial:

```ts
const testimonials = [
  {
    rating: 5,
    quote: "Lorem ipsum dolor sit amet...",
    name: "Nome Cognome",
    role: "Ruolo / Azienda",
    logo: "/logos/cliente-x.svg",
  },
  // ...
];
```

**Prima implementazione**: 3-5 placeholder con lorem ipsum (il copy reale
arriva dopo, come da tua richiesta).

## Props

Opzionale: `testimonials?: Testimonial[]`. Default: lista interna.

## Stile

- Container: `py-24 bg-butik-light`.
- H2: `font-heading text-4xl md:text-5xl font-bold text-butik-dark text-center mb-12`.
- Card: `border border-butik-dark/15 p-8 bg-white flex flex-col gap-6`.
- Rating stelle: 5 SVG inline `text-butik-red w-4 h-4`.
- Quote: `font-sans text-base text-butik-dark leading-relaxed`.
- Nome: `font-sans text-sm font-bold text-butik-dark`.
- Ruolo: `font-sans text-sm text-butik-dark/60`.
- Logo: `h-6 w-auto opacity-60 grayscale`.

## Interazioni

- **Desktop**: nessuna; card statiche.
- **Mobile**: swipe orizzontale via `overflow-x-auto scroll-snap`. Dots
  cliccabili che scrollano alla card. Frecce ←/→ che incrementano l'indice.
- JS minimale (lo stile del `ImageCarousel.astro` esistente).

## Mobile

Sotto `md` (< 768px):

- **Layout**: 1 card visibile per volta, carousel orizzontale.
- **Tecnica**: `flex overflow-x-auto scroll-snap-type: x mandatory` sul
  container; ogni card `flex-shrink-0 w-full scroll-snap-align-start`. Niente
  JS necessario per lo swipe (nativo del browser su touch).
- **Indicatori**: dots cliccabili sotto il carousel (5 puntini se 5 card).
  Active = `butik-red`, inactive = `butik-dark/20`.
- **Frecce ←/→**: opzionali su mobile. Propongo di **ometterle** (lo swipe
  è scopribile, le frecce occupano spazio). Le dots bastano come affordance.
- **Card padding**: `p-6` invece di `p-8` desktop.
- **Quote**: invariato.
- **Logo nella card**: `h-5` invece di `h-6`.
- **JS minimale**: aggiorna lo stato active dei dots in base allo
  `IntersectionObserver` sulle card (più robusto del `scroll` event).

## Domande aperte

1. **Carousel anche su desktop**? Esempio: 3 visibili, scorri per vedere
   testimonial extra. Oppure se hai esattamente 3 testimonial niente carousel
   desktop. Quanti ne hai/avrai?
2. **Logo cliente nella card**: presente o opzionale? Se manca, layout
   diverso?
3. **Stelle obbligatorie**: ha senso una recensione "Butik" a stelle (come
   prodotto)? È un classico Relume. Tieni o togli?
4. **Stelle colore**: rosso (`butik-red`), giallo standard, o verde acido?
   Per coerenza con palette → io direi `butik-red`.
