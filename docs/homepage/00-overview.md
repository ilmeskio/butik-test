# Homepage — overview

Documento di mappa. Ogni sezione della homepage ha un proprio file in questa
cartella. La struttura ricalca il wireframe Relume personalizzato esportato in
`design/relume-ref/relume-kit-overview.png` (colonna 1).

## Ordine top → down della pagina

| # | Componente | File spec | File codice (futuro) |
|---|---|---|---|
| 1 | Header | [01-header.md](01-header.md) | `src/components/Header.astro` (esistente, da modificare) |
| 2 | Hero | [02-hero.md](02-hero.md) | `src/components/home/Hero.astro` |
| 3 | Servizi (card) | [03-servizi.md](03-servizi.md) | `src/components/home/Servizi.astro` |
| 4 | PartnerLogos | [04-partner-logos.md](04-partner-logos.md) | `src/components/home/PartnerLogos.astro` |
| 5 | Numbers | [05-numbers.md](05-numbers.md) | `src/components/home/Numbers.astro` |
| 6 | Testimonials | [06-testimonials.md](06-testimonials.md) | `src/components/home/Testimonials.astro` |
| 7 | PortfolioGrid | [07-portfolio-grid.md](07-portfolio-grid.md) | `src/components/home/PortfolioGrid.astro` |
| 8 | CtaBanner (×2) | [08-cta-banner.md](08-cta-banner.md) | `src/components/CtaBanner.astro` (riusabile) |
| 9 | AboutInline | [09-about-inline.md](09-about-inline.md) | `src/components/home/AboutInline.astro` |
| 10 | NewsletterSignup | [10-newsletter-signup.md](10-newsletter-signup.md) | `src/components/home/NewsletterSignup.astro` |
| 11 | Footer | [11-footer.md](11-footer.md) | `src/components/Footer.astro` (esistente, da riscrivere) |

## Composizione `index.astro` (target)

```astro
<BaseLayout>
  <Hero />
  <Servizi />
  <PartnerLogos />
  <Numbers />
  <Testimonials />
  <PortfolioGrid progetti={topProgetti} />
  <CtaBanner ...lavoriamoInsieme />
  <AboutInline />
  <CtaBanner ...consulenzaFormat />
  <NewsletterSignup />
</BaseLayout>
```

Header e Footer sono già dentro `BaseLayout`, non vanno inseriti qui.

## Workflow

1. Discutiamo la spec di un componente.
2. Apriamo un branch dedicato (`feature/home-<componente>`).
3. Implementiamo, build verde, commit.
4. Merge in `main` (o lasciamo aperta la PR, decisione tua).
5. Passiamo al successivo.

## Convenzioni trasversali (validi per tutti i componenti)

- **Font**: `font-heading` (League Spartan) per H1/H2; `font-display` (League Spartan) per eyebrow uppercase tracking; `font-sans` (Clear Sans) per body.
- **Palette**:
  - `bg-butik-light` (#fff2f1) — background generale e sezioni soft.
  - `bg-butik-dark` / `text-butik-dark` (#071108) — testo principale e sezioni scure.
  - `text-butik-red` / `bg-butik-red` (#e21929) — accenti, CTA primari, eyebrows.
  - `text-butik-purple` (#62109f) — accento secondario, da decidere uso.
  - `bg-butik-green` (#d2ff28) — accento contrastante, da decidere uso.
- **Container**: `max-w-7xl mx-auto px-6` per sezioni con contenuto centrato.
- **Spaziature verticali**: `py-24` per sezioni grandi, `py-16` per sezioni medie.
- **Eyebrow**: `font-display text-xs font-bold tracking-widest uppercase text-butik-red mb-4`.

## Breakpoint e convenzioni mobile (validi per tutti i componenti)

Breakpoint Tailwind di default:

| Token | Min width | Uso |
|---|---|---|
| (default) | 0 | mobile, base styles |
| `sm:` | 640px | tablet portrait piccolo |
| `md:` | 768px | tablet portrait / desktop piccolo — soglia principale |
| `lg:` | 1024px | desktop |
| `xl:` | 1280px | desktop largo |

**Regole trasversali per il mobile (sotto `md`)**:

- **Container padding**: `px-6` su tutte le sezioni (default) → `md:px-8` su tablet+.
- **Spaziature verticali**: riduco `py-24` a `py-16` su mobile dove ha senso (`py-16 md:py-24`).
- **Tipografia**:
  - H1: `text-4xl md:text-6xl lg:text-7xl` (la dimensione base mobile è ~36px, sale a 60-72px desktop).
  - H2: `text-3xl md:text-4xl lg:text-5xl`.
  - Body: invariato (`text-base`).
  - Numeri giganti (es. ProcessSteps, Numbers): scendono di 1-2 step (`text-5xl md:text-7xl`).
- **Touch target**: tutti i CTA hanno minimo altezza ~44px (in pratica `py-3` o `py-4` con font ≥ 12px già lo garantisce).
- **Grid**: collassano sempre a `grid-cols-1` o `grid-cols-2` sotto `md`. Niente
  affiancamenti orizzontali a 3+ colonne su mobile.
- **CTA paired (primario + secondario)**: su mobile diventano **full-width** e
  stacked verticalmente con `gap-3`.
- **Immagini in layout 2-col**: su mobile l'immagine viene **prima** del testo
  (`order` CSS) salvo eccezioni motivate.
- **Hover states**: invarianti, ma su touch non funzionano — i componenti devono
  essere usabili senza hover (link visibili, niente "informazione solo on hover").

Ogni doc componente ha la sua sezione `## Mobile` specifica con le scelte
peculiari di quella sezione.
