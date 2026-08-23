# Page rules builder

Decision tree for choosing the right page type for a query, then the right template, then the right structure. Used after [keywords-triage.md](keywords-triage.md) sends a query to the "new page" bucket.

## Page type decision tree

```
Is the query a question / "how to" / "what is" / "guide" / "vs"?
├─ YES → BLOG/GUIDE POST (informational)
│       Template: long-form article with TOC, H2/H3 hierarchy, definitions, FAQ section
│       Schema: Article, BlogPosting, optionally HowTo
│
└─ NO → Is it [service] + [city/neighborhood]?
        ├─ YES → CITY-SERVICE PAGE
        │       Template: hero + intro + projects + features + city-specific FAQ + contact
        │       Schema: Service + areaServed (city + neighborhoods + region) + FAQPage
        │
        └─ NO → Is it [service] + "near me"?
                ├─ YES → NEAR-ME HUB
                │       Template: hero + service-area cards + how-to-choose + FAQ + CTA
                │       Schema: LocalBusiness with PostalAddress + areaServed + FAQPage
                │
                └─ NO → Is it [service] + [intent qualifier] (services, cost, timeline)?
                        ├─ YES → SERVICE PAGE VARIANT
                        │       Template: matches parent service page; H1 reflects qualifier
                        │       Schema: Service + FAQPage
                        │
                        └─ NO → Default to STRENGTHEN existing page
                                (re-check bucket — should this be in "skip" or "covered"?)
```

## Page type catalogue

### City-service page

**When**: query is `[service] [city]` (e.g. `bathroom renovation mississauga`).

**Slug**: `/[service]-[city]/` — service first, city last. See [url-rules.md](url-rules.md).

**Required sections** (in order):
1. **PageHead** — title (50–60 chars), description (150–160), canonical
2. **Breadcrumbs** with `BreadcrumbList` JSON-LD
3. **Hero** — H1 (`[Service] in [City]`), subtitle naming 3–4 neighborhoods, primary CTA
4. **Intro** (2–3 sentences) — anchor locally with business address + 1–2 internal links to existing related content
5. **Showcase projects** — 4–6 cards, prefer projects in or near the city
6. **Trust strip** (WhyChooseUs or equivalent)
7. **Features/services list** — match parent service page; optional local tinting
8. **Optional: neighborhoods grid** (when sub-area queries exist) — 6–9 cards with H3 `Renovation contractor in [Neighborhood]`
9. **City-specific FAQ** — 5–7 questions (required topics: cost, timeline, permit, neighborhoods, vertical-specific Q)
10. **Cross-link footer** — "Also serving [parent region] →"
11. **Contact + estimate form** — namespace `idPrefix` to avoid React key collisions

**Schema** (see [schema-cookbook.md](schema-cookbook.md)):
- `Service` with `areaServed` = city + 4–8 named places + region + GTA-equivalent
- `FAQPage` with all FAQ entries
- `BreadcrumbList` from the Breadcrumbs component

### Near-me hub

**When**: query is `[service] near me` or `[service] near you`.

**Slug**: `/[service]s-near-me/` (plural) — matches the natural query phrasing.

**Required sections**:
1. PageHead with strong locality keywords in description
2. Breadcrumbs (`Home → [Service]s Near Me`)
3. **Hero** with H1 `[Service]s Near Me — [Region]`, CTA, phone above fold
4. **Service-area cards** — 4 cards linking to each city variant (Mississauga, Toronto, Etobicoke, Oakville) with 2–3 sentence descriptions and "see our X page →" CTAs
5. **How to choose a [service] near you** — 5 numbered tips (licensing, references, itemised quote, timeline, warranty)
6. **FAQ** — 3–4 broad questions (how to find, cost, timeline, permits)
7. **Bottom CTA** with phone

**Schema**:
- `LocalBusiness` with full `PostalAddress`, `telephone`, `email`, `areaServed` array
- `FAQPage`

Distinguishing feature vs city pages: emphasis is **"local provider"**, not **"this service in this city"**. Don't dump service feature lists; focus on locality signals.

### Service page variant (intent qualifier)

**When**: query is `[service] [qualifier]` like `condo renovation services`, `ensuite bathroom renovation oakville`, `bathroom renovation cost toronto`.

Two options:
- **Retitle existing page** if the qualifier is broad and the existing target page has weak rankings. E.g. `condo renovation services` → retitle `/condo-renovation/` from "Condo Renovation in Toronto" to "Condo Renovation Services in Toronto."
- **New page** if the qualifier creates a distinct intent. E.g. `ensuite bathroom renovation oakville` → new `/bathroom-renovation-oakville/` with ensuite focus.

Decision rule: if retitling would lose >50% of current ranking signal (verify in GSC), create a new page instead.

### Blog/guide post

**When**: query is informational. Question words, "how to", "what is", "vs", "guide", "best", "cost of X in Y year".

**Slug**: descriptive, ≤7 words, can include year. e.g. `/how-to-choose-renovation-contractor-toronto-7-questions/`.

**Required sections**:
1. PageHead
2. Breadcrumbs (`Home → Blog → Post title`)
3. H1 = full natural question or guide title
4. Table of contents (jump links to H2s)
5. Body with H2/H3 hierarchy
6. Inline FAQs where appropriate
7. Author byline with `Person` schema
8. Related posts at bottom (internal linking)

**Schema**:
- `Article` or `BlogPosting` with `datePublished`, `dateModified`, `author`
- Optional `HowTo` if step-by-step
- `BreadcrumbList`

## Template reuse rules

When creating a new page, **always copy an existing page of the same type** and edit. Never write a page from scratch — too easy to miss imports, JSX shape conventions, className strings the project uses, or schema shapes.

Naming convention for templates:
- City-service variant of `BathroomRenovationPage.jsx` → `BathroomRenovationMississaugaPage.jsx`
- Near-me variant → `BathroomRenovationsNearMePage.jsx`
- Service-qualifier variant → use existing naming as guide, e.g. `BathroomRenovationServicesPage.jsx`

After copying:
1. Rename component (default export, all internal refs)
2. Update SEO key reference (`SEO['/route-path']`)
3. Replace H1, hero subtitle, intro, FAQ, showcase projects
4. Update JSON-LD `areaServed` and `url`
5. Namespace any `idPrefix`, form IDs, section IDs
6. Update breadcrumb label
7. Add cross-link to parent service page

## Required infrastructure checklist

Every new page needs all five of these. Miss any one and the page ships broken (orphan / not prerendered / not in sitemap / not crawled). **Track each in TodoWrite — don't try to remember.**

| # | Update | Verify with |
|---|---|---|
| 1 | SEO data entry: `'/route-path/': { title, description, primary, secondary, h1 }` | `grep -c "'/<slug>/'" src/data/seoKeywords.js` |
| 2 | Route registered: `<Route path>` (React Router) or file at `app/<slug>/page.tsx` (Next.js) | `grep -c "path=\"<slug>\"" src/App.jsx` |
| 3 | Prerender entry: `reactSnap.include` in `package.json` (react-snap), `next-sitemap.config` (Next), or framework equivalent | `grep -c "/<slug>/" package.json` |
| 4 | Footer link added to relevant column (cities, services, etc.) | `grep -rc "/<slug>/" src/components/*ooter*.jsx` |
| 5 | Sitemap + llms.txt regenerated (most projects auto-extract routes — just rerun the generator) | `grep -c "/<slug>/" public/sitemap.xml public/llms.txt` |

Run the verification commands as a single Bash block after Phase 4 is "done." If any return 0, you are not done — return to Phase 4.

### Common stack-specific gotchas

- **react-snap (Vite SPA)**: prerender list is `reactSnap.include` in `package.json`. New routes are NOT auto-added — you must hand-edit this array. Forgetting it is the #1 silent failure.
- **Next.js (App Router)**: file-routing means step 2 and step 3 are the same act; verify the page actually rendered with `npm run build` looking for the slug in `.next/server/app/`.
- **Next.js (Pages Router)**: same as App Router for routing; sitemap depends on `next-sitemap`.
- **Astro**: file routing; check `astro.config.mjs` sitemap integration.
- **Plain HTML**: no router/prerender — just the file + a link in nav/footer + a sitemap entry.
- **TanStack Start (SSR, e.g. on Cloud Run)**: file routing in `src/routes/*.tsx` (`index.tsx`→`/`, `foo.tsx`→`/foo`, `foo.$slug.tsx`→dynamic, `__root.tsx`→skip). There is **no prerender list** — every route is server-rendered on request, so the "5 places" collapses to 4 (SEO data, route file, footer link, sitemap); skip the prerender step. The sitemap generator emits into `public/`, and Vite copies `public/*` into `dist/client/` at build, which `server.mjs` serves statically — so wire generation as a `prebuild` npm script (`"prebuild": "node scripts/seo/generate-sitemap.mjs"`) rather than committing the files. JSON-LD can't rely on the head-`scripts` API across versions; render `<script type="application/ld+json" dangerouslySetInnerHTML>` in the SSR'd component body instead — Google and LLM crawlers read body JSON-LD fine.

### Running the sitemap generator

Always invoke via the project's npm script (e.g. `npm run seo:sitemap`), not via bare `node`. npm resolves the local binary even when `node` isn't on the shell PATH. If you can't tell the right script name, read `package.json` `scripts` once — don't search the filesystem for `node`.

_Added 2026-06-06: initial extraction + expanded with explicit decision tree and template reuse rules._
_Added 2026-06-06: converted infra-updates section to a verifiable checklist after agent shipped 8 routes without prerender entries or footer links in a prior session._
_Added 2026-06-27: TanStack Start SSR case — no prerender list (4 places not 5); public/→dist/client copy; prebuild sitemap; body JSON-LD over head-scripts API._
_Added 2026-06-27: On a data-driven blog (posts in a typed `posts.ts`, one dynamic `blog.$slug.tsx` route, index auto-lists + "more reading" auto-cross-links, footer already links `/blog`), a new blog post collapses to **2 acts**: append the post object to `posts.ts` + regen sitemap (auto-extracts the new slug via regex). No new route, no footer edit, no prerender. Verify by grepping the slug regex match, not by editing 5 places. If `node`/`npm` is absent in the sandbox, the sitemap/llms.txt are uncommitted build artifacts (generated at `prebuild`) — confirm the slug regex matches and stop; you cannot and need not run the generator by hand._
_Added 2026-06-27: CRITICAL gotcha for this TanStack Start sitemap generator — dynamic `$slug` routes are NOT auto-discovered for the sitemap. `extractStaticRoutes()` explicitly SKIPS any filename containing `$`, so each new dynamic collection (`/projects`, `/blog`, `/services`, `/process`) needs its OWN hand-written `extractXRoutes(dataTs)` + a `read('src/data/X.ts')` call in `main()` + (for friendly llms.txt titles) an `xTitleMap()` + a `groups.x` bucket and `renderSection`. Wiring a new collection of pages = **5 edits to generate-sitemap.mjs** on top of the data file + route file + homepage hub link. Symptom of forgetting: pages render fine but never appear in sitemap.xml/llms.txt (silent orphan from a crawler's view). When adding one collection, also grep whether a sibling collection (e.g. `/services`) is missing its extractor — found services unwired while adding process. A new SECTION of pages backed by a typed data file + one dynamic route + a homepage "hub" section (cards become stretched-`<Link>`s) is the right pattern; the homepage section is the internal-linking hub, so a footer link is optional when the hub sits on the highest-authority page and the detail pages cross-link each other._

### Service landing page (no city) — when homepage tiles need real pages

Not every service page is a city-service page. When homepage service tiles (Residential / Commercial / Virtual / Styling) should become standalone, indexable pages, build **service landing pages** with no city in the slug. Slug = the searched service phrase, service-first: `residential-interior-design`, `commercial-interior-design`, `virtual-design-consultation`, `interior-styling`. Schema: `Service` (provider `@id`→Organization, `areaServed` = the studio's cities) + `FAQPage` + `BreadcrumbList`. Sections: hero (H1 = service name, lede, CTA), "what's included" (3 items), FAQ (3), CTA to the booking/intake route, and a sibling-services cross-link block (kills orphans). Wire the homepage tile as a **stretched link** (`<Link className="absolute inset-0 z-10">` over the existing animated card) so the whole tile is clickable without losing its hover animation; give it an `aria-label`.

Prefer the repo's dynamic-route + data-file + generator-extraction idiom over N hand-written static files: one `services.$slug.tsx`, one `src/data/services.ts`, plus a new `extractServiceRoutes()` in the sitemap generator (mirror `extractBlogRoutes`; also add `serviceTitleMap`, a priority rule, an llms.txt group, and pass the map into `buildLlmsTxt`). One template, DRY, sitemap auto-tracks new entries. For a bilingual site, keep both languages in the data file and localize the body via `useLang()`; `head()` has no language context, so emit the canonical (English) title/description there.

### TanStack `routeTree.gen.ts` is stale-by-design — never hand-edit it

The committed `routeTree.gen.ts` lags the actual route files (e.g. `/blog` routes were absent even after blog shipped). The Router/Start vite plugin regenerates it on `dev`/`build`; the committed copy is `@ts-nocheck` and gets overwritten. After adding a route file, the IDE shows transient `to="/new-route"` type errors ("not assignable to …") until regen. **Do not "fix" these by hand-editing the gen file** — run `dev`/`build`, or just note it. They resolve on regeneration.

_Added 2026-06-27: service landing pages (no-city) from homepage tiles; stretched-link tiles; bilingual data file + English `head()`; TanStack gen-file is stale-by-design — transient route type errors resolve on plugin regen, don't hand-edit._
