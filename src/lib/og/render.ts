// Renderer delle card OG: costruisce l'albero con Satori (solo flexbox + CSS
// basilare) e lo rasterizza in PNG con resvg. Gira a build-time dentro
// l'endpoint /og/[...path].png.ts. Replica la "Variante A · Editoriale chiaro"
// del prototipo /lab/og-card.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { OgCard } from '../../data/ogCards';

// Path risolti dalla root del progetto: durante `astro build` cwd è la root e
// src/ esiste (l'import.meta.url verrebbe riscritto dal bundler verso dist/).
const fromRoot = (p: string) => join(process.cwd(), p);

// Font TTF dedicati alle card (Satori non legge i woff2 del sito).
const spartan700 = readFileSync(fromRoot('src/assets/fonts-og/league-spartan-700.ttf'));
const clear400 = readFileSync(fromRoot('src/assets/fonts-og/clear-sans-latin-400.ttf'));
const clear700 = readFileSync(fromRoot('src/assets/fonts-og/clear-sans-latin-700.ttf'));

// Logo come data URI (Satori lo incorpora nell'<img>).
const logoSvg = readFileSync(fromRoot('src/assets/logos/bollo-rosso.svg'));
const logoDataUri = `data:image/svg+xml;base64,${logoSvg.toString('base64')}`;

// Freccia come SVG inline: il glifo "→" non è nel subset di League Spartan,
// così resta nitida e indipendente dal font. Colorata come il testo CTA.
function arrowDataUri(color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const RED = '#e21929';
const DARK = '#071108';
const LIGHT = '#fff2f1';
const SPARTAN = 'League Spartan';
const CLEAR = 'Clear Sans';

// Mini-helper per costruire l'albero senza JSX (file .ts).
type Node = { type: string; props: Record<string, unknown> };
function h(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style, ...(children !== undefined ? { children } : {}) } };
}

/** Tronca un testo a maxChars parole intere, aggiungendo l'ellissi. */
function clamp(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxChars).trimEnd()}…`;
}

function buildCard(card: OgCard, handle: string): Node {
  const head: Node[] = [
    h('div', {
      fontFamily: SPARTAN,
      fontSize: 26,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: RED,
    }, card.kind),
    h('div', {
      fontFamily: SPARTAN,
      fontSize: 72,
      lineHeight: 1,
      color: DARK,
      marginTop: 16,
    }, clamp(card.title, 70)),
    h('div', {
      fontFamily: CLEAR,
      fontSize: 28,
      lineHeight: 1.3,
      color: DARK,
      opacity: 0.7,
      marginTop: 20,
      maxWidth: 880,
    }, clamp(card.subtitle, 150)),
  ];
  if (card.meta?.length) {
    head.push(
      h('div', {
        fontFamily: SPARTAN,
        fontSize: 22,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: DARK,
        opacity: 0.55,
        marginTop: 18,
      }, card.meta.join('  ·  ')),
    );
  }

  const footer = h('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, [
    h('div', { display: 'flex', alignItems: 'center' }, [
      { type: 'img', props: { src: logoDataUri, width: 64, height: 64 } },
      h('div', {
        fontFamily: SPARTAN,
        fontSize: 30,
        letterSpacing: '0.04em',
        color: DARK,
        marginLeft: 20,
      }, handle),
    ]),
    h('div', {
      display: 'flex',
      alignItems: 'center',
      fontFamily: SPARTAN,
      fontSize: 32,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: LIGHT,
      backgroundColor: RED,
      padding: '22px 40px',
      borderRadius: 999,
    }, [
      h('div', {}, card.cta),
      { type: 'img', props: { src: arrowDataUri(LIGHT), width: 30, height: 30, style: { marginLeft: 16 } } },
    ]),
  ]);

  return h('div', {
    width: 1200,
    height: 630,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: LIGHT,
    border: `12px solid ${RED}`,
    padding: '64px 72px',
  }, [
    h('div', { display: 'flex', flexDirection: 'column' }, head),
    footer,
  ]);
}

export async function renderCardPng(card: OgCard, handle: string): Promise<Buffer> {
  const svg = await satori(buildCard(card, handle) as unknown as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: SPARTAN, data: spartan700, weight: 700, style: 'normal' },
      { name: CLEAR, data: clear400, weight: 400, style: 'normal' },
      { name: CLEAR, data: clear700, weight: 700, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();
  return Buffer.from(png);
}
