# Content priorities

What to optimize first, what gets sitemap priority, what goes above the fold, and how to spend limited content-creation budget.

## Sitemap priority numbers

`<priority>` in sitemap.xml is a hint to crawlers about relative importance within your site. Values: 0.0–1.0. Google barely uses it; Bing and others still weight it. Set anyway — costs nothing.

### Standard scale

| Priority | Page type | Examples |
|---|---|---|
| `1.0` | Homepage | `/` |
| `0.9` | Top-level service pages | `/bathroom-renovation/`, `/home-renovation-toronto/` |
| `0.9` | City-service variants of top services | `/bathroom-renovation-mississauga/` |
| `0.8` | Major hub pages | `/services/`, `/projects/`, `/bathroom-renovations-near-me/` |
| `0.7` | Project detail pages (portfolio items) | `/projects/midtown-toronto-luxury-penthouse-renovation/` |
| `0.6` | Blog/guide posts, FAQ, How-it-works | `/posts/`, `/faq/`, `/bathroom-renovation-timeline-toronto-week-by-week/` |
| `0.5` | Secondary marketing pages | `/contact/`, `/about/` |
| `0.3` | Thank-you, confirmation pages | `/thank-you/` (often `noindex` instead) |

### Rules
- Don't give everything `1.0` — defeats the point
- Project detail pages can vary: featured projects → `0.8`, archive projects → `0.6`
- Time-decay if you want: posts <1 year old at `0.7`, older at `0.5`

## Change frequency

`<changefreq>` is also a hint, also weak signal, also set anyway.

| Freq | Use for |
|---|---|
| `daily` | News sites only |
| `weekly` | Homepage, frequently updated category pages |
| `monthly` | Service pages, project pages, blog posts |
| `yearly` | About, contact, terms, privacy |

## Above-the-fold priority

The first viewport visitors see determines bounce rate, dwell time, and conversion. These are ranking signals.

### Required above the fold (mobile, ~600px)

In strict order of priority:

1. **H1** — primary keyword phrase, immediately readable
2. **Subhead or trust line** — 1 sentence reinforcing what you do for whom
3. **Primary CTA** — button, not a "learn more" link; high-contrast colour
4. **Phone number** (for service businesses) — `tel:` link, tap-callable
5. **One trust signal** — review count, rating stars, years in business, or a single named brand/cert (e.g. "Renomark certified")

### Allowed below
- Hero image (can be there but isn't required for ATF rendering)
- Long intro paragraphs
- Project galleries
- Feature lists
- FAQ

### Anti-patterns
- ❌ "Welcome to [Brand]" as H1 (no keywords, no value)
- ❌ Hero image so large the H1 is below the fold on mobile
- ❌ Carousel as hero (slows LCP, only first slide ever gets seen)
- ❌ CTA below 2 paragraphs of prose
- ❌ Phone number only in footer

## Content priority order (where to invest first)

Limited time. You can't optimize everything. Order:

1. **Money pages first** — pages that drive revenue. For a service business: top-level service pages + top 3 city pages. These get the deepest copy, best photos, full schema, full FAQ.
2. **High-impression GSC pages second** — pages already ranked 5–15 in GSC with high impressions. Small improvements move them to the first page.
3. **Internal-linking glue third** — pages that link a lot of money pages together (services hub, projects index). Often neglected but high-value for site architecture.
4. **Supporting content fourth** — blog posts that target informational queries adjacent to money queries. They feed into pillar pages.
5. **Long tail last** — sub-neighborhood pages, near-me hubs, comparison pages. High volume, low individual value, but cumulatively significant.

## Page importance scoring

When deciding which page gets the biggest treatment:

```
priority_score = (monthly_search_volume × commercial_intent_score × current_position_potential) / effort_to_rank
```

Where:
- **monthly_search_volume**: from GSC impressions or Ahrefs/SEMrush
- **commercial_intent_score**: 1.0 for transactional ("hire X"), 0.5 for commercial investigation ("best X"), 0.2 for informational ("what is X")
- **current_position_potential**: position 1–3 → 0.3 (small upside), position 5–15 → 1.0 (big upside), position 30+ → 0.5 (long road)
- **effort_to_rank**: 1 (just metadata tweak) to 10 (new pillar content + backlinks)

Score everything you might do, do the highest-score items first.

## Content depth budget

Not every page needs to be 3000 words. Match depth to intent:

| Intent | Target length | Notes |
|---|---|---|
| Transactional service page | 800–1500 words | Above fold counts most. Below: features, FAQ, projects, social proof. |
| City-service variant | 800–1200 words | Match parent depth; tint with city-specific copy. |
| Informational guide / blog | 1500–3000 words | Long enough to be the definitive answer; not padded. |
| Comparison / "vs" post | 1200–2500 words | Tables, pros/cons, real numbers |
| FAQ hub | 500–1000 words | Concise answers; let schema do the heavy lifting. |
| Near-me hub | 500–800 words | Cards + how-to-choose; not a feature dump. |
| Project case study | 300–600 words | Photos do the work; copy provides context. |

### Word counts that flag a problem

- **<300 words on a money page** → too thin, probably won't rank
- **>3000 words on a transactional service page** → too padded, CTA buried
- **<150 words on a blog post** → not enough to be useful for AI summary

## Heading priority

Each H tag has a purpose; mismatching them is a common SEO mistake.

- **H1** — once per page, the primary keyword phrase
- **H2** — major sections of the page, each can include a secondary keyword
- **H3** — sub-sections of H2 sections; supports natural language phrasings
- **H4–H6** — fine-grained sub-sections; rarely needed; use for genuine hierarchy, not styling

See [content-hierarchy.md](content-hierarchy.md) for full rules.

## Element priority on a service page

The order things should appear in a service page, by priority:

1. Hero (H1 + CTA + phone)
2. Trust strip (reviews, certifications)
3. Intro (1 paragraph anchoring locally, with 1–2 internal links)
4. Showcase / projects (visual proof of work)
5. Features / scope (what you do)
6. Why-us (differentiators)
7. FAQ (commonly Googled questions, captures featured snippets)
8. Process / how-it-works (reassures the buyer)
9. Contact / final CTA with form
10. Footer with related links

### What can be skipped
- Long origin story (push to /about/)
- Team photos (push to /about/)
- Pricing table (push to /pricing/ or omit)
- News/blog (push to footer)

## Trust signal priorities

Order of effectiveness (most to least):

1. **Aggregate rating with review count** (e.g. "4.9 stars from 87 Google reviews") — high CTR boost in SERPs
2. **Named recent projects in specific neighborhoods** (proves locality)
3. **Industry certifications** (Renomark, BBB, manufacturer-authorized installer)
4. **License number visible** (state/provincial trade licenses)
5. **Insurance and bonding amounts** ($2M liability, WSIB clearance)
6. **Years in business** (only useful if ≥5)
7. **Generic logos** ("As seen on…") — declining trust value, almost decorative

## When to deprioritize SEO entirely

Some pages exist for conversion, not search:

- Landing pages for paid ads (intentionally noindex, hyper-focused on CTA)
- Confirmation / thank-you pages
- Internal account / login pages
- Calculator tools (might rank for the tool name, but optimize for tool use first)

Don't over-engineer SEO on these. Make them noindex and focus on what they're really for.

## Thin content: "Discovered/Crawled – currently not indexed"

When a set of templated pages (process steps, service tiles, location pages) won't get indexed, the cause is usually **thin content**, not a crawl-infrastructure gap. Check infrastructure first (in sitemap? in llms.txt? SSR'd, not blank-until-hydrate?) — but if those pass, the problem is too little unique text and near-identical siblings.

Diagnosis: count the *unique rendered* words per page (exclude shared chrome, CTA, repeated FAQ framing, and JSON-LD that's identical across siblings). ~250–300 words of mostly-boilerplate prose across N structurally-identical pages reads as low-value, so Google deprioritizes indexing it.

Fix without losing equity: **add** a long-form body section to the page's data model — e.g. a `body: { heading; paras[] }[]` field rendered as H2 + prose — and write 3 unique, specific sections per page (~230+ words). This roughly doubles each page and differentiates siblings. Do NOT broaden/rewrite the H1, title, description, or slug to "add content" (violates the never-rewrite rule). Adding a new section ≠ rewriting the page. For bilingual sites, populate every language block or the type won't compile.

_Added 2026-06-28: diagnosed thin /process/* and /services/* pages (4 each, ~280 unique words, identical HowTo schema); fixed by adding a `body` long-form field to the data model and rendering it, EN+UK._

_Added 2026-06-06: initial draft. Will expand as we observe what works for renovation-vertical sites specifically._
