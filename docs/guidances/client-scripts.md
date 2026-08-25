# Client scripts under the view-transitions router

> Recommendation, not an enforced rule. Context: `apps/web/src/layouts/BaseLayout.astro`
> renders `<ClientRouter />` (Astro view transitions) on every page.

## The rule

A component `<script>` in Astro is bundled as an ES module, and **an ES module
executes once per browser session**. The view-transitions router replaces the
DOM on every client-side navigation without reloading the page, so the module
does **not** run again — while the elements it captured are swapped for fresh
nodes.

The listener survives. The node it points at does not. Nothing throws.

So: **anything a `<script>` wires up must be re-wired on `astro:page-load`.**

```astro
<script>
  function initThing() {
    const el = document.getElementById('thing');
    if (!el) return;
    // …wire up listeners, observers, initial state
  }

  document.addEventListener('astro:page-load', initThing);
</script>
```

`astro:page-load` fires on the first load *and* after every client-side
navigation, so it replaces — not supplements — a bare top-level call.

## Idempotence

`initThing()` may run more than once against the same node (the event can fire
without a DOM swap). Two cases, two different answers:

- **Fresh node every time** — re-querying from scratch is enough; the old
  listeners go away with the old nodes.
- **The node may survive** — guard, or you double-bind. A dataset flag is
  enough, and it works precisely because it lives in the mutated DOM, not in
  the HTML the router re-inserts:

  ```js
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';
  ```

Double-binding is worst where a handler has side effects beyond the page. A
duplicated `trackEvent` is a silently wrong number in the analytics funnel — it
does not look like a bug from the code.

Long-lived observers (`IntersectionObserver`, `ResizeObserver`) that are
re-created per navigation should be disconnected on `astro:before-swap`, or
guarded the same way, so they stop observing detached nodes.

## Prefer deleting the script

The best fix for this class of bug is not having client state at all. It also
keeps the site closer to static-first ([ADR-0002](../adr/0002-runtime-and-delivery.md)).

Before writing an init function, check whether the behaviour has a CSS or
native-HTML form:

- disclosure / dropdown / accordion → `<details>` + `<summary>`;
- state driven by scroll position → a scroll-driven animation on a registered
  custom property (see the browser-support note in
  [design-approach.md](design-approach.md#browser-support));
- state driven by an element entering the viewport → `animation-timeline: view()`.

`apps/web/src/components/Header.astro` went this way: its scroll state and its
mobile menu were both JavaScript, both broke after a view transition, and both
are now CSS and native HTML. No init function to forget.

## Why this is written down

This failure mode is invisible in review and in the build. It produced three
separate bugs in a single PR — a header that stopped changing colour, carousel
dots that stopped responding, and a newsletter form whose conversion event
stopped firing — and each was diagnosed from scratch.
