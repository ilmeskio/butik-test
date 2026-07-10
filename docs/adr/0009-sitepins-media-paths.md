---
status: accepted
date: 2026-07-10
tags: [sitepins, content, media, images, cms, astro]
---

# ADR-0009: Sitepins media path convention

## Context

Content is edited through **Sitepins** (git-native CMS) and the Astro app lives
under `apps/web` (ADR-0007). Media fields (project hero images, partner logos,
founder photos) must resolve **both** at build time (Astro) and in the Sitepins
editor.

Two path conventions collide:

- **Astro content `image()`** resolves a `/`-absolute path from the **project
  root** (`apps/web`) — so it needs `/src/assets/logos/x.png` and throws
  `[ImageNotFound]` on anything else.
- **Sitepins** writes a media field value as `/<basename of the configured Media
  Folder>/<path within it>`. With Media Folder = `apps/web/src/assets`, saving a
  logo through the editor wrote `/assets/logos/x.png` → Astro can't resolve it →
  **the build breaks**.

This was found empirically: the first media ever saved through the Sitepins editor
(after fixing write permissions, below) produced `/assets/...` and broke `astro
build`.

## Decision

Set the **Sitepins Media Folder to `apps/web/src`** (not `apps/web/src/assets`).
Its basename `src` becomes Sitepins' written prefix, so the editor now writes
`/src/assets/logos/x.png` — exactly what Astro `image()` resolves. **All content
media references use the `/src/assets/...` convention.**

Consequences of this single config choice:

- Every collection (`pagine`, `progetti`, `servizi`) is editable through Sitepins
  with native Astro image optimization and **zero application code**.
- `.sitepins/config.json` carries `"media": "apps/web/src"`.

**Operational prerequisite (recorded because it cost us time):** Sitepins needs
its **GitHub App installed on the repo with `Contents: read+write`**. The repo is
public, so Sitepins can *read* without the app, but commits (saves/uploads) fail
with "permission to commit" until it's installed. This broke when the repo moved
from a personal org to `wearebutik` (the app installation didn't transfer);
reinstalling it on the org restored writes.

## Alternatives considered

### Keep Media Folder = `apps/web/src/assets` and resolve `/assets/...` in code

Type media fields as `z.string()` (not `image()`) and map the Sitepins value to an
`ImageMetadata` via `import.meta.glob('/src/assets/**', { eager: true })`,
normalizing `/assets/...` → `/src/assets/...`. This keeps the media browser rooted
cleanly at `assets/`, but needs a resolver and migrating every collection off
`image()`. **Kept as the fallback** if the downside below becomes a problem.

### Move CMS media to `public/` and reference by URL

Store logos/photos under `apps/web/public` and reference `/logos/x.png`. Simple,
but forfeits Astro's build-time image optimization. Rejected.

## Consequences

### Positive

- Zero code; native `image()` optimization; one path convention across all
  collections; `progetti`/`servizi` become Sitepins-editable for free.

### Negative / accepted risks

- The Sitepins media browser now roots at `apps/web/src`, so it lists **non-media
  folders** (`components`, `layouts`, `lib`, `pages`, `styles`) next to `assets`.
  Editors must navigate into `assets/`, and could mistakenly upload into a code
  folder. Accepted for now.

### When to deviate (revisit triggers)

- Editors upload into the wrong folders, or the browser clutter is unacceptable →
  switch to the `import.meta.glob` resolver (Media Folder back to
  `apps/web/src/assets`), the alternative recorded above.
