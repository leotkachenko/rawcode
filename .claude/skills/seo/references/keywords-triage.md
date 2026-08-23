# Keywords triage

How to turn a pasted Google Search Console "Top queries" table into actionable work. See also [page-rules-builder.md](page-rules-builder.md) for what to do once a query is bucketed.

## Inputs you'll see

GSC, Ahrefs, SEMrush, and similar tools all paste tables with these columns. Don't insist on a specific format — extract what's there.

| Column variants | What it means |
|---|---|
| Query / Keyword / Term | What was typed into search |
| Impressions | How many times site appeared in results |
| Clicks | How many times a result was clicked |
| CTR | Clicks / Impressions |
| Position / Avg. position | Where in SERPs the site ranked (1–100) |

What matters most: **impressions** (signal of opportunity) and **position** (signal of how close you are). A query with 500 impressions and position 7 is more valuable than 50 impressions at position 3.

## The four buckets

Every query goes into exactly one.

### 1. Covered

Existing page already targets this query. Confirm by `grep`-ing the query terms across the site's SEO data file and key page bodies. **Don't touch the page.**

Examples:
- `bathroom renovation toronto` → covered by `/bathroom-renovation/` titled "Bathroom Renovation in Toronto & GTA"
- `home remodeling toronto` → covered by `/` (homepage targeting "Home Remodeling Contractors In Toronto & GTA")

### 2. Create new dedicated page

Query has location, neighborhood, intent qualifier, or modifier the site doesn't yet target. Standard patterns:

- **`[service] [city]`** (e.g. `bathroom renovation mississauga`) → new `/service-city/` page. See [page-rules-builder.md](page-rules-builder.md#city-service-page).
- **`[service] near me`** → new hub page with LocalBusiness schema + links to all city variants. See [page-rules-builder.md](page-rules-builder.md#near-me-hub).
- **`[service] [intent qualifier]`** (e.g. `condo renovation services`, `ensuite bathroom renovation oakville`) → could be a new page OR a retitle of existing. Default: new page unless the existing target page has minimal SEO equity to lose.
- **`[service] in [city] [year]`** → blog/guide post, not a service page (informational intent — see [search-intent.md](search-intent.md))

### 3. Strengthen existing page

Query is generic, a synonym variant, or a long-tail of an existing target. Append to the page's `secondary` keyword array. Optionally insert one body-copy mention.

Examples:
- `bathroom renos` → strengthen `/bathroom-renovation/` (add to secondary)
- `condo reno services` → strengthen `/condo-renovation/`
- `bathroom contractors` → strengthen `/bathroom-renovation/`

**Never change** the URL, title, H1, or description of an existing ranking page when strengthening. Append-only to the `secondary` array. Touching the rendered head fields of a winning page risks the queries you can't see in this paste — and the user does not have visibility into what you'd lose.

#### Don't dilute the winner (anti-pattern)

When a GSC paste asks you to capture a new city or qualifier, your first instinct may be to broaden an existing high-ranking page's title — e.g. "Bathroom Renovation in Toronto & GTA" → "Bathroom Renovation in Toronto, Mississauga, and the GTA". **Don't.** This dilutes the page's existing topical focus and can drop it for the original head query without guaranteeing it ranks for the new one.

Instead: create a new dedicated `/bathroom-renovation-mississauga/` page. Mississauga gets its own focused page. Toronto/GTA page stays untouched. Both can rank.

### 4. Skip

Three sub-cases:

- **Branded** queries (company name, product name, founder name) — already winning them, no work.
- **Too generic** (`renos`, `contractors`, `renovation`, `home`) — single-word queries with no specificity. Page targeting these dies to brand competitors and Wikipedia.
- **Accidental match / low intent** (e.g. `timeless home renovation springbank` when "Timeless Home Renovation" happens to be a project name in Thornhill, not Springbank) — Google misattribution. Doesn't reflect real demand.

Surface skipped queries in your report so the user can confirm.

## Sub-neighborhood handling

When you see 3–5 queries like `renovation contractor erin mills`, `renovation contractor port credit`, `renovation contractor streetsville` (all sub-neighborhoods of the same city) — **don't create one thin page per neighborhood**. Each has impressions usually ≤100. Thin pages get penalized.

Instead: **add a "Neighborhoods we serve" section** to the parent city page with a grid of cards, each H3 = `[service] contractor in [neighborhood]`. One card per neighborhood, 1–2 sentences each. Captures all sub-area queries in one strong page.

Threshold: if a single sub-neighborhood query has ≥150 impressions on its own, then it justifies a dedicated page. Below that, neighborhoods section.

## Output format

Always produce a markdown table:

```markdown
| Query | Impressions | Clicks | Position | Bucket | Action |
|---|---|---|---|---|---|
| bathroom renovation mississauga | 192 | 1 | 8.4 | New page | `/bathroom-renovation-mississauga/` |
| bathroom renos | 58 | 0 | 22.1 | Strengthen | Add to /bathroom-renovation/ secondary |
| osoba renos & design | 23 | 8 | 1.2 | Skip | Branded |
| renos | 35 | 0 | 64 | Skip | Too generic |
| renovation contractor erin mills | 12 | 0 | 18 | Strengthen | Neighborhoods section on /home-renovation-mississauga/ |
```

Always end with a count: "X new pages, Y strengthens, Z skipped."

## Edge cases

- **Query duplicates** ("bathroom renovation mississauga" + "mississauga bathroom renovation") — same intent, same target page. Don't create two pages. Add both as `secondary` keywords.
- **Query with brand + service** ("osoba bathroom renovation") — skip, already winning.
- **Misspellings with real volume** — don't create misspelling pages. Google handles spell correction.
- **Voice search style** ("who does bathroom renovations in mississauga") — same target as the short-form query. Don't create separate pages.
- **Comparison queries** ("kitchen vs bathroom renovation cost") — informational. Blog post, not service page.

## Trending-style cluster handling (informational sites)

When a GSC/trends paste shows a cluster of named-style queries all spiking at once (e.g. `brutalist`, `transitional`, `mediterranean`, `french country`, `modern vs contemporary` interior design), don't spin up one thin post per style. Build **one flagship post on the single highest-growth style** (it has the strongest standalone demand and is the most "unusual"/citable), then fold the rest in as a "if this isn't for you, here's what to choose instead" section + FAQ entries. Captures the whole cluster's intent in one strong, non-cannibalizing page. Same principle as the sub-neighborhood rule: concentrate equity, don't dilute into thin pages.

Also: trend pastes are noisy with scraper/content-farm domains embedded in queries (`x.com interior design`, `drhomey`, `designmode24`, food/crypto queries mixed in). Skip those — see [geo.md "Suspect / unknown-brand keywords"](geo.md). Job-board and education queries (`interior design jobs calgary`, `mount royal university`) are off-business for a studio site — skip too.

_Added 2026-06-06: initial extraction from local-seo-pages agent._
_Added 2026-06-27: trending-style-cluster folding (one flagship + fold rest); skip embedded-scraper-domain and job/education queries in trend pastes._
