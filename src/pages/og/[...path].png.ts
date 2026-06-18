// Endpoint statico: a build-time genera una PNG OG per ogni rotta con card.
// getStaticPaths enumera tutte le rotte → Astro scrive i file in dist/og/*.png.
// A runtime (GitHub Pages) non gira nulla: vengono serviti i PNG già pronti.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllOgCards, routeToParam, type OgCard } from '../../data/ogCards';
import { renderCardPng } from '../../lib/og/render';

export const getStaticPaths: GetStaticPaths = async () => {
  const cards = await getAllOgCards();
  return [...cards.entries()].map(([route, card]) => ({
    params: { path: routeToParam(route) },
    props: { card },
  }));
};

export const GET: APIRoute = async ({ props, site }) => {
  // Handle mostrato in card = host del dominio (SITE). Cambi dominio → cambia
  // da solo. In dev `site` può non esserci: fallback ragionevole.
  const handle = site ? site.host : 'wearebutik.github.io';
  const png = await renderCardPng(props.card as OgCard, handle);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
