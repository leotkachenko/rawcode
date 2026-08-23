# Internal linking

How pages link to each other inside the site. The biggest leverage point for distributing PageRank, defining topic clusters, and helping crawlers find new pages.

## Hub-and-spoke (pillar-and-cluster)

The canonical site architecture for content-driven SEO.

```
                    Pillar page
                  (broad topic)
                       │
       ┌───────────────┼───────────────┐
       │               │               │
   Cluster 1       Cluster 2       Cluster 3
   (sub-topic)     (sub-topic)     (sub-topic)
```

Every cluster links back to the pillar. The pillar lists every cluster. Sibling clusters cross-link when topically related.

### Example for a renovation site

- **Pillar**: `/bathroom-renovation/` (broad topic)
- **Clusters**:
  - `/bathroom-renovation-mississauga/` (city variant)
  - `/bathroom-renovation-toronto/` (city variant)
  - `/bathroom-renovations-near-me/` (intent variant)
  - `/small-condo-bathroom-renovation-ideas-toronto/` (informational)
  - `/projects/midtown-toronto-modern-bathroom-remodel/` (case study)

### Why this works
- The pillar consolidates topical authority for the broad query
- Clusters target long-tail variants
- Internal links pass PageRank to the pillar
- Crawlers find every cluster from the pillar
- Users navigate the topic naturally

## Anchor text diversity

Don't use the same exact-match anchor text every time. Google flags over-optimization.

### Mix these types

| Type | Example |
|---|---|
| Exact match | "bathroom renovation mississauga" |
| Partial match | "bathroom renovations in Mississauga" |
| Branded | "Osoba Renos" |
| URL | "osobarenos.ca/bathroom-renovation-mississauga/" |
| Natural | "our Mississauga bathroom team" |
| Generic | "see our work", "learn more here" |

Target mix: 30% exact/partial, 30% branded, 30% natural, 10% generic.

### Anti-patterns

- ❌ Every internal link to a page uses the same anchor text
- ❌ Anchor text doesn't match the destination page's H1 at all
- ❌ Generic "click here" 90%+ of the time
- ❌ Keyword-stuffed anchors ("cheap fast bathroom renovation Toronto Mississauga services")

## Where to plant links

### Contextual (highest value)
Inside body copy, surrounded by relevant text:

> Our team handles full City of Toronto building permits as part of every basement renovation. For more on what's required, see our [Etobicoke permits guide](/etobicoke-home-renovation-permits-2026-homeowner-guide/).

Google reads surrounding text as context. Plant 2–4 per long-form page.

### Footer (medium value)
Site-wide consistency, good for crawl discovery. Use for category hubs, top city variants, trust/legal pages.

### Navigation (medium value)
Primary nav and breadcrumbs. Heavy crawl signal but less topical relevance.

### Below-content recommendations (medium-low value)
"Related posts" / "You might also like" sections. Good for cluster reinforcement.

### Sidebars (low value)
Repeated, ignored by users, often discounted.

## Orphan page prevention

An orphan page has no incoming internal links. Crawlers find it via sitemap but trust it less.

### Detect

```bash
grep -rl "your-orphan-page-slug" src/ | wc -l
# 0 means orphan
```

For each new page you create, verify at least one other page links to it.

### Standard cross-link sources for new pages

- Parent service page (in body or footer)
- Sibling pages of the same type
- Site-wide footer column
- Homepage (only for high-priority new pages)
- Related blog posts

## Link depth from homepage

Every important page should be reachable in ≤3 clicks from the homepage.

```
Homepage → Services hub → Bathroom Renovation → Bathroom Renovation Mississauga
   0           1                  2                       3
```

### Methods to surface deep pages
- Site-wide footer columns
- Featured rotators on home/category pages
- Topic clusters with pillar at depth 1
- HTML sitemap

## Cross-linking siblings

When you have parallel pages (cities, services), cross-link liberally.

### Example for city-service pages

At the bottom of `/bathroom-renovation-mississauga/`:

> Also serving:
> - [Bathroom Renovation in Toronto & GTA](/bathroom-renovation/)
> - [Bathroom Renovation in Etobicoke](/bathroom-renovation-etobicoke/)
> - [Bathroom Renovation in Oakville](/bathroom-renovation-oakville/)

## Outbound links

Link to authoritative external sources where appropriate:
- Building code references (municipality site)
- Manufacturer documentation
- Industry standards
- Trusted publications

### Rules
- ✅ `target="_blank"` for external links
- ✅ `rel="noopener noreferrer"` for security
- ✅ Link to a stable, deep, relevant page
- ❌ Don't link to direct competitors
- ❌ Don't link to spammy sites

## Link count

- **Service / city page**: 5–15 internal links typical
- **Blog post**: 8–25 internal links typical
- **Homepage**: 30–80 (lots of navigation)
- **Footer**: 20–40 site-wide

Too many dilutes the equity each one passes.

## Breadcrumbs

Every non-homepage. Three purposes:
1. User wayfinding
2. Internal link to every ancestor
3. SERP enhancement (Google shows breadcrumbs in some result formats)

With `BreadcrumbList` JSON-LD (see [schema-cookbook.md](schema-cookbook.md)).

## Anchor text → destination alignment

The anchor text should overlap with the destination page's primary keyword.

✅ Link text "bathroom renovation in Mississauga" → destination H1 "Bathroom Renovation in Mississauga"
❌ Link text "click here" → destination H1 "Bathroom Renovation in Mississauga" (no signal)
❌ Link text "kitchen ideas" → destination H1 "Bathroom Renovation in Mississauga" (mismatch confuses crawlers)

## Internal-link audits

Periodically check:
- **Orphan pages**: 0 incoming internal links
- **Broken internal links**: 404s within the site
- **Redirect chains**: link → 301 → 301 → final (collapse to single hop)
- **Too-deep pages**: requiring >4 clicks from homepage
- **Cannibalization candidates**: two pages with similar incoming anchors competing for the same query

## Anti-patterns

- ❌ Hidden links (display: none, white-on-white) — manual penalty
- ❌ Same destination linked 5+ times on one page (only first counts in most measurements)
- ❌ Fingerprint links: same anchor across every page
- ❌ JS-only links that don't render in static HTML (LLM crawlers miss them)

_Added 2026-06-06: initial extraction from local-seo-pages agent._

## "Discovered – currently not indexed" → check for orphans first

When GSC lists URLs as *Discovered – currently not indexed* with `Last crawled: N/A`, Google knows the URL (from the sitemap) but won't spend crawl budget on it. Triage in this order before assuming "just newness":

1. **Does it 200?** Redirects/404s waste discovery — fix the sitemap.
2. **Is it in the sitemap?** Confirm, but sitemap presence alone does NOT earn crawls.
3. **Does it have a crawlable internal link in the *prerendered* HTML?** This is the usual culprit. Sitemap-only URLs with no link path get deprioritized indefinitely. A page well-linked from nav/footer/body (e.g. in `Navbar.jsx` + `ContactFooter.jsx`) is fine — its "not indexed" is genuine crawl-budget/newness and clears on its own; request indexing and move on.

**The load-more / pagination trap (real case, 2026-06-22):** a listing that renders `items.slice(0, INITIAL_COUNT)` and reveals the rest via a JS "Load more" button orphans every item past the initial count — react-snap prerenders only the initial slice, so crawlers never see links 10+. Fix: render the *full* filtered list into the DOM and cap visibility with the `hidden` attribute (`hidden={index >= visibleCount}`) instead of slicing the array. Links stay in the static HTML; "Load more" just unhides.

Nuance vs the "hidden links = penalty" anti-pattern above: penalties target links hidden to *deceive* (white-on-white, off-screen keyword stuffing). Links inside a legitimately user-revealable `hidden`/`display:none` region (load-more, tabs, accordions) are crawled and followed normally — Google parses them from the DOM. The intent and UX context are what differ.

_Added 2026-06-22: orphan-via-load-more diagnosis for "Discovered not indexed"; display:none links are crawlable when legitimately revealable._

## Single-source breadcrumbs (visible trail + JSON-LD from one component)

A page that ships `BreadcrumbList` JSON-LD but no *visible* breadcrumb is half a breadcrumb — you get (maybe) the SERP enhancement but none of the user wayfinding or the crawlable ancestor links. And maintaining the schema separately from the visible trail drifts. Build **one** `<Breadcrumbs items={[…]} />` component that renders the visible `<nav><ol>` *and* emits the JSON-LD from the same array. When you add it to a page that already had a standalone `breadcrumbLd` block, delete the old block — two `BreadcrumbList` scripts on one page is a duplicate-schema warning.

- Final crumb = current page: visible text only (no link), and **no `item`** in the schema.
- Ancestor links can be plain `<a href="/blog/">` rather than the framework's typed `<Link>`. They stay in the prerendered HTML (crawlable) and sidestep typed-router route-union friction. Reserve `<Link>` for in-body/nav links where SPA transition matters.
- Audit target: every non-home route gets one. Detail pages (`/blog/$slug`, `/projects/$slug`) are the usual miss — projects pages especially tend to ship with zero breadcrumb schema.

## "Trending" / popular-posts module as an interlinking surface

A curated "Trending" module is one of the cheapest high-value internal-link surfaces for a content site: a compact numbered list of cornerstone posts, rendered into static HTML, placed on the listing index **and** in a sidebar on every post. Result: every post links to your money/cornerstone posts (PageRank funnel) and homepage→post depth drops to 1 when you also drop it on the homepage.

- Drive it off a `trending?: boolean` flag in the post data, newest-first, with a **fallback to most-recent** so the module never renders thin if few are flagged. Don't gate it on analytics you don't have — curate.
- Anchor text = the post **title** (matches destination H1 → topical signal), not "read more".
- It's fine that trending posts also appear in the full grid/feed below — the module is a highlight, not a dedup concern.

_Added 2026-06-27: single-source Breadcrumbs component (kill duplicate BreadcrumbList JSON-LD; <a> ancestors stay crawlable); Trending module as a reusable interlinking surface driven by a `trending` flag with recency fallback._

## Case-study detail pages must link back to their service pillar + city page

Project/case-study pages (`/projects/$slug`) are the richest *clusters* in the hub-and-spoke (they prove the service in a specific place) but ship orphaned of their pillars by default — all the equity flows in, none flows back. For each project, add a contextual in-body line linking to (a) its **service pillar** (`/services/<service-slug>`) and (b) its **city page** (`/interior-design-<city>`), with anchor text that overlaps each destination's H1 ("residential interior design", "interior design in Toronto"). Drive it off two fields on the project record (`service`, `location`) rather than hardcoding per page. This also gives the thin detail page genuine contextual links (highest-value placement) instead of only nav/breadcrumb links.

Pair with a body-length floor: detail pages under ~1500 chars of prose read as thin to Google. Expand the `description[]` with paragraphs that naturally carry the service + city keywords (humanized — match the existing voice), and add visible `<figcaption>`s (see image-seo.md) as a second on-page-text surface. Count prose alone against the 1500 floor; treat captions as additive, not as a way to hit the number.

_Added 2026-06-28: case-study → service-pillar + city-page back-links (data-driven `service`/`location` fields, H1-aligned anchors) and the ~1500-char prose floor for thin detail pages, after the YaDesign projects review._
