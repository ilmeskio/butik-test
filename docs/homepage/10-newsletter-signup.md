# 10 · NewsletterSignup

**File codice**: `src/components/home/NewsletterSignup.astro` (nuovo)
**Sezione wireframe**: "Non perderti nessuna novità"

## Scopo

Box di iscrizione newsletter prima del footer. Form essenziale: solo email.

## Layout & contenuto

```
              H2: "Non perderti nessuna novità"

       Subtitle: "Progetti, bandi, opportunità e approfondimenti
       sul turismo musicale e la progettazione culturale:
       iscriviti per non perderti nulla"

       ┌──────────────────────┐  ┌─────────────┐
       │ La tua email         │  │  Iscriviti  │
       └──────────────────────┘  └─────────────┘

       Accetti i nostri termini e la nostra privacy policy
```

- Sezione centrata, max-width ridotta (es. `max-w-2xl mx-auto`).
- Form orizzontale su desktop (input + bottone affiancati), verticale su mobile.
- Privacy note piccola sotto.

## Contenuto (dal wireframe)

- **H2**: "Non perderti nessuna novità"
- **Subtitle**: "Progetti, bandi, opportunità e approfondimenti sul turismo
  musicale e la progettazione culturale: iscriviti per non perderti nulla"
- **Input placeholder**: "La tua email"
- **CTA**: "Iscriviti"
- **Privacy note**: "Accetti i nostri termini e la nostra privacy policy
  sulla privacy" (link)

## Props

Nessuna nella prima versione.

## Stile

- Container: `py-24 bg-butik-light`.
- Wrapper: `max-w-2xl mx-auto px-6 text-center`.
- H2: `font-heading text-4xl md:text-5xl font-bold text-butik-dark mb-6`.
- Subtitle: `font-sans text-base text-butik-dark/70 mb-10`.
- Form: `flex flex-col md:flex-row gap-3`.
- Input: `flex-1 px-5 py-4 border border-butik-dark/30 bg-white font-sans text-base focus:outline-none focus:border-butik-red`.
- Bottone: `bg-butik-dark text-white px-8 py-4 font-display text-xs font-bold tracking-widest uppercase hover:bg-butik-red`.
- Privacy note: `font-sans text-xs text-butik-dark/50 mt-4`.

## Backend / submit

**Per la prima implementazione**: nessun backend. Tre opzioni in ordine di
preferenza:

1. **Mailto link**: `action="mailto:newsletter@wearebutik.it"` + email in
   body. Funziona ma è brutto, apre il client mail.
2. **JS intercept**: il form ha `action="#"` + onsubmit JS che mostra un
   "Grazie, ti scriveremo a breve!" senza inviare nulla. **Mock**, ma
   l'utente vede esito immediato.
3. **Servizio esterno** (Mailchimp/Buttondown/Listmonk): l'`action` punta
   al loro endpoint. Più lavoro, ma reale.

Suggerisco **opzione 2** (mock con JS) per la prima versione, sostituendola
con un servizio reale appena lo scegli.

## Interazioni

- Submit form → mock JS che sostituisce il form con un messaggio "Grazie".
- Validazione `type="email" required` browser-native.
- Hover su bottone: cambio colore.

## Mobile

Sotto `md` (< 768px):

- **Layout form**: verticale (`flex-col md:flex-row`).
- **Input**: full-width, `py-3` (touch target ~48px).
- **Bottone**: full-width, `py-3`, sotto l'input con `gap-3`.
- **H2**: `text-3xl md:text-5xl`.
- **Subtitle**: invariato (`text-base`), ma `max-w-none` su mobile (su
  desktop resta `max-w-2xl mx-auto`).
- **Privacy note**: invariato (`text-xs`), centrato.
- **Padding sezione**: `py-16 md:py-24`.
- **Form max-width**: nessun limite su mobile (full-bleed dentro `px-6`),
  `max-w-xl mx-auto` da `md` in su.

## Domande aperte

1. **Quale servizio newsletter** vogliamo usare? (Mailchimp, Buttondown,
   Brevo, Substack, ...). Se decidi ora, configuro l'`action` corretta.
2. **Privacy policy esiste?** Link a `/privacy` (404) o testo statico?
3. **Honeypot anti-bot**: aggiungo un campo nascosto per evitare spam?
4. **Doppia opt-in**: gestita dal servizio scelto, non da noi.
