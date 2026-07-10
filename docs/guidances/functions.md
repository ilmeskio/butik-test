> **Scelta per-feature.** Il sito è static-first e host-agnostic
> ([ADR-0002](../adr/0002-runtime-and-delivery.md)). Questa guidance NON fissa un
> runtime: elenca le opzioni e i criteri per scegliere, di volta in volta, dove
> mettere la logica dinamica di una singola feature. Quando una scelta diventa
> stabile e vale per tutto il sito, promuovila ad ADR.

# Functions — dove mettere la logica dinamica

Il sito è statico. Quando una feature ha bisogno di logica a runtime (invio form,
lettura/scrittura dati, auth, webhook, generazione on-demand), la si aggiunge come
**funzione isolata**, chiamata dal client. Non si introduce SSR globale.

## Le opzioni

### 1. Servizio gestito (nessun backend nostro)

Per casi standard e ben serviti da SaaS. Esempio già in uso: **Web3Forms** per il
form contatti (nessun server, la key è pubblica by-design). Preferisci questa
strada quando un servizio maturo copre il bisogno.

- ✅ Zero infra da mantenere, veloce.
- ❌ Vendor lock-in leggero, meno controllo.

### 2. Cloudflare Workers / Pages Functions

Per logica custom leggera vicina all'edge (proxy, trasformazioni, piccoli
endpoint). Il repo ha già un `wrangler.jsonc` di prova.

- ✅ Edge veloce, si integra bene se un domani il sito passa a Cloudflare Pages.
- ❌ Un runtime in più da conoscere; stato/persistenza richiede KV/D1/R2.

### 3. Supabase (edge functions + Postgres/Storage/Auth)

Quando serve **stato persistente**: database, autenticazione, storage file.

- ✅ Backend completo opensource, DB relazionale, auth pronta.
- ❌ Più pesante; ha senso solo se il bisogno di dati lo giustifica.

## Come scegliere

1. **C'è un servizio gestito che lo copre bene?** → usa quello (opzione 1).
2. **Serve solo logica stateless leggera?** → Cloudflare Worker (opzione 2).
3. **Serve stato persistente (dati, auth, file)?** → Supabase (opzione 3).

Regole trasversali:

- La funzione è **isolata e sostituibile**: il client la chiama dietro
  un'interfaccia chiara, così cambiare fornitore è un cambio locale.
- I segreti non finiscono nel bundle client (solo le key pubbliche by-design,
  come Web3Forms, possono).
- Se una scelta si ripete su più feature e diventa "il modo in cui butik fa X",
  smetti di deciderla caso per caso e scrivi un **ADR**.
