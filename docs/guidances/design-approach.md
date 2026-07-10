> **Consigliata, non enforced.** Il vocabolario di design che un linter non può
> verificare del tutto. Si applica dentro i confini decisi in
> [ADR-0005](../adr/0005-design-system.md). La skill `design-check` copre la parte
> meccanizzabile (token vs valori raw, contrasto, focus).

# Design approach

## Token come source of truth

- Colori, spaziature, raggi, tipografia sono **token** (CSS custom properties in
  `src/styles/`). I componenti li **consumano**; non ridefiniscono token e non
  usano valori raw dove un token esiste.
- Valori ammessi senza token: `0`, `1px` per bordi, percentuali, `currentColor`,
  `color-mix()` di soli token. Se manca un token per un valore ricorrente,
  **aggiungi il token**, non il valore raw.

## CSS Modules

- Uno `*.module.css` co-locato al componente. Classi semantiche
  (`.card`, `.cardTitle`), non utilitarie.
- Niente Tailwind nei componenti a migrazione conclusa
  ([ADR-0005](../adr/0005-design-system.md#css-modules)).

## Accessibilità

- Contrasto **AA**: ≥ 4.5:1 testo normale, ≥ 3:1 testo grande / UI.
- **Focus visibile** su ogni elemento interattivo (`:focus-visible` con outline da
  token); mai `outline: none` senza sostituto.
- Elementi cliccabili non nativi con gestione tastiera e ruoli corretti; preferisci
  elementi nativi.

## Motion

- Rispetta sempre `prefers-reduced-motion`.
- La logica di animazione resta in `src/lib/motion` / `src/components/motion`, non
  sparsa nei componenti ([ADR-0005](../adr/0005-design-system.md#motion)).

## Semplicità

- YAGNI/KISS: non astrarre un componente prima di averne 2-3 usi reali.
- Il nuovo codice legge come quello attorno: stessa densità di commenti, stesse
  convenzioni di naming.
