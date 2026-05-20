# 08 · CtaBanner (componente riusabile, ×2)

**File codice**: `src/components/CtaBanner.astro` (nuovo, in components/ root non in home/ perché riusabile)
**Sezione wireframe**: due banner intermedi nella pagina:
- "Lavoriamo insieme?" (tra Portfolio e AboutInline)
- "Cerchi una consulenza su misura..." (tra AboutInline e Newsletter)

## Scopo

Banner riusabile per call-to-action a tutta larghezza, con titolo + body
opzionale + 1-2 bottoni. Stesso shape, diverso contenuto, due usi nella
homepage. Riusabile anche su altre pagine in futuro.

## Layout & contenuto

```
   ┌──────────────────────────────────────────────────┐
   │   Title grande a sinistra              [CTA1]    │
   │   "Lavoriamo insieme?"                 [CTA2]    │
   │   Body opzionale 1-2 righe                       │
   └──────────────────────────────────────────────────┘
```

- Layout flex: testo a sinistra, bottoni a destra. Su mobile: stack verticale.
- Box bordato (`border border-butik-dark/20`) o sfondo `butik-light`
  contrastante rispetto alla pagina.

## Props

```ts
interface Props {
  title: string;
  body?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'default' | 'dark' | 'accent';
}
```

Tre varianti per dare ritmo se serve, ma forse basta una.

## Usi nella homepage

### Uso 1: "Lavoriamo insieme?"

```astro
<CtaBanner
  title="Lavoriamo insieme?"
  body="Che tu sia un Comune, una DMO, un operatore culturale o un festival, siamo pronti ad ascoltarti e costruire qualcosa insieme."
  primaryCta={{ label: 'Contattaci', href: '/contatti' }}
  secondaryCta={{ label: 'Scopri i servizi', href: '/servizi' }}
/>
```

### Uso 2: "Cerchi una consulenza..."

```astro
<CtaBanner
  title="Cerchi una consulenza su misura o vuoi replicare uno dei nostri format sul tuo territorio?"
  primaryCta={{ label: 'Scopri tutti i nostri servizi', href: '/servizi' }}
  secondaryCta={{ label: 'Scopri i nostri format', href: '/formats' }}
/>
```

Senza body, titolo lungo come quasi-paragrafo.

## Stile

- Container: `py-16` + `max-w-7xl mx-auto px-6`.
- Box: `border border-butik-dark/15 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white`.
- Title: `font-heading text-3xl md:text-4xl font-bold text-butik-dark max-w-2xl`.
- Body: `font-sans text-base text-butik-dark/70 max-w-xl mt-3`.
- CTA primario: `bg-butik-dark text-white px-6 py-3 font-display text-xs font-bold tracking-widest uppercase hover:bg-butik-red`.
- CTA secondario: `border border-butik-dark px-6 py-3 font-display text-xs font-bold tracking-widest uppercase hover:bg-butik-dark hover:text-white`.

## Interazioni

Solo hover sui CTA. Nessun JS.

## Mobile

Sotto `md` (< 768px):

- **Layout**: stack verticale `flex-col`. Testo sopra, CTA sotto.
- **Box padding**: `p-6` (vs `p-8 md:p-12` desktop).
- **Title**: `text-2xl md:text-3xl lg:text-4xl`. Titolo lungo (uso 2) regge:
  lo lascio andare su 4-5 righe naturali.
- **Body**: invariato (`text-base`).
- **CTA**: ognuno **full-width** (`w-full`), gap-3. Primario sopra, secondario
  sotto. Touch target ~48px (con `py-3` + font 12px è ~46px, ok).
- **Padding sezione**: `py-12 md:py-16`.

## Domande aperte

1. **Varianti** (default/dark/accent): servono o basta una? Io partirei con
   una sola.
2. **`/formats`**: non esiste come pagina. 404 ok per ora? Oppure ridirezione
   a `/servizi#formats`?
3. **Titolo molto lungo** (uso 2): regge come singolo H? Andrà su 2-3 righe.
   Posso spezzare con `<br />` esplicito se vuoi un controllo preciso.
4. **`/contatti` 404**: ok lasciare il link morto o cambio a `mailto:`?
