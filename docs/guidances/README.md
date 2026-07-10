# Guidances

Raccomandazioni per il sito, **non** meccanicamente enforced. Due tipi, ciascuno
apre con un banner che dichiara quale:

- **Scelta per-feature** — decisioni che non fissiamo a livello globale perché
  dipendono dal caso concreto (es. quale runtime serverless per una funzione
  dinamica). Quando adotti una scelta stabile e valida per tutto il sito,
  registrala come [ADR](../adr/README.md).
- **Consigliata, non enforced** — pratiche di design che un linter non può
  meccanizzare (il vocabolario di design), da applicare dentro i confini decisi.

| Guidance | Tipo | Copre |
|---|---|---|
| [Functions](./functions.md) | scelta per-feature | Dove mettere la logica dinamica: Cloudflare Workers, Supabase, servizi gestiti |
| [Design approach](./design-approach.md) | consigliata | Token come source of truth, CSS Modules, accessibilità AA, motion |
| [Product decisions](./product-decisions.md) | consigliata | Come scrivere i PDR in `docs/product/` e portarli in review |

Vedi [ADR-0001](../adr/0001-recording-decisions.md) per come le guidance si
relazionano agli ADR.
