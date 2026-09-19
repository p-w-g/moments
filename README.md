# moments

A photography portfolio — cities at odd hours, the animals in them, and the small
moments in between. Built as a personal site for my own work, and kept deliberately
small: one landing page, one detail view, and a CMS behind it.

**Live:** [moments.exposed](https://moments.exposed)

## Stack

- **[SvelteKit](https://kit.svelte.dev) 2 / Svelte 5** — SSR, no client-side router gymnastics
- **[Sanity](https://www.sanity.io)** — content, image hosting, and on-the-fly image transforms
- **TypeScript** throughout
- **Playwright** for end-to-end tests
- **Netlify** for hosting, **Umami** for (cookieless) analytics

Plain CSS with custom properties. No component library, no CSS framework, no state
management library — at this size they'd cost more than they'd save.

## Running locally

```bash
npm install
cp .env.example .env    # fill in your own Sanity project id
npm run dev
```

The site reads published content from a public Sanity dataset, so a project id and
dataset name are enough to boot. The API token in `.env.example` is only needed for
`/dev/heroes` (see below) and can be left blank otherwise.

```bash
npm run lint       # prettier + eslint
npm run check      # svelte-check
npm run test:e2e   # playwright
```

Lint runs on staged files via a husky pre-commit hook, so CI shouldn't be the first
place a formatting error shows up.

## Notable implementation details

The interesting parts of this codebase are mostly small correctness details rather
than architecture. A few worth pointing at:

**The hero rotates daily, deterministically.** [`pickForToday`](src/lib/dailyHero.ts)
hashes the current date to index into the hero-eligible pool. A plain `Math.random()`
would pick a different photo on the server than on the client and flicker on hydration;
hashing the date means every request that day agrees, and the choice still changes
tomorrow.

**Thumbnails handle the hydration race.** On a hard refresh the browser can start _and
finish_ loading an SSR-rendered `<img>` from cache before hydration attaches the
`on:load` handler — the event fires into the void and the image stays stuck behind its
blur placeholder. [`GalleryImage`](src/lib/GalleryImage.svelte) re-checks `img.complete`
once hydrated. There's a [regression test](e2e/gallery-hydration.test.ts) for it.

**EXIF is an explicit allowlist.** Sanity extracts a lot of metadata at upload time.
[`summarizeExif`](src/lib/sanity.ts) renders only camera, lens, exposure settings and
date — the fields a photographer would actually want to read — rather than spreading
whatever happens to be in the file onto the page.

**Misconfiguration fails loudly, at import time.** A blank `PUBLIC_SANITY_PROJECT_ID`
in a deploy environment used to surface as an opaque 500 from inside the Sanity SDK.
[`sanity.ts`](src/lib/sanity.ts) now throws a named error naming the thing to go fix.

**Filtering intersects, it doesn't union.** Selecting _landmark_ and _nature_ finds
photos that are both, not either — narrowing as you add chips is what the interaction
looks like it should do.

**The draft-preview route can't ship.** [`/dev/heroes`](src/routes/dev/heroes/+page.server.ts)
renders unpublished hero candidates at three viewport sizes so a photo can be judged
with real overlay text before publishing. It reads drafts with a write-capable token,
so it `throw error(404)`s outside dev and keeps the token strictly server-side.

**Categories come from the CMS.** They started as a hardcoded union type and became
Sanity documents, so adding or renaming one is an editorial act rather than a deploy.

## Project layout

```
src/
  lib/
    sanity.ts          Sanity client, types, EXIF summariser, image url builder
    GalleryImage.svelte Responsive srcset + LQIP placeholder
    dailyHero.ts       Deterministic date-seeded pick
    jsonLd.ts          Structured data helpers
  routes/
    +page.svelte       Landing: hero + filterable gallery
    highlights/[slug]/ Single photo view with caption and EXIF
    dev/heroes/        Dev-only hero candidate preview
    sitemap.xml/, robots.txt/
e2e/                   Playwright specs
```

## License

Code is MIT licensed — see [LICENSE](LICENSE). Take what's useful.

**The photographs are not.** All images, in this repository and on the live site, are
© Przemek Grzelczyk, all rights reserved. They're here because they're the content the
code exists to display, not as free assets. Please don't reuse them without asking.
