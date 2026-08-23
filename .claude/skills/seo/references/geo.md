# GEO — Generative Engine Optimization

Optimizing for AI search: ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews, Bing Copilot, You.com.

Why this matters: GEO traffic is replacing some blue-link traffic. By 2026, ~40% of B2C research starts in an AI engine. Sites that don't optimize for GEO lose share regardless of how well they rank in classical SERPs.

## How AI engines source content

Two paths:

1. **Indexed**: the engine has a crawler (or licenses Bing/Google index) and retrieves pages at query time. ChatGPT search, Perplexity, Bing Copilot, Google AI Overviews work this way.
2. **Trained**: the engine has the page in its training corpus. ChatGPT's default mode, Claude's default mode. Static — your new pages won't show up until the next training cut-off.

GEO optimizes for path 1 — making indexed content easy to find, parse, quote, and cite.

## llms.txt

The de facto standard for telling LLM crawlers what's on your site. Specification: <https://llmstxt.org>.

### Format

A markdown file at `/llms.txt` (root). Curated index of canonical URLs grouped by section.

```markdown
# Brand Name

> One-sentence description of what the site is and offers.

This file is a curated index of every canonical page on https://example.com, grouped by section, intended for use by AI assistants and crawlers that prefer a structured Markdown index over a sitemap. See https://llmstxt.org for the format spec.

## Main pages
- [Home](https://example.com/)
- [Contact](https://example.com/contact/)

## Services
- [Bathroom Renovation](https://example.com/bathroom-renovation/)
- [Bathroom Renovation Mississauga](https://example.com/bathroom-renovation-mississauga/)
```

### Rules
- One URL per line, markdown link format
- Group by section with `##` headings
- Include the descriptive one-line summary at top
- Auto-generate alongside sitemap.xml (don't hand-maintain)
- Don't include parameter URLs, login pages, thank-you pages

### Related: llms-full.txt

Some sites publish a second file with full prose content of each page concatenated. Useful for LLM training-corpus inclusion but bandwidth-expensive. Optional.

## Citability rules

AI engines lift specific claims, not whole paragraphs. Make your claims liftable.

### Format

Each citable claim should be:
- **Self-contained** — readable without surrounding context
- **Specific** — a number, date, name, or measurable fact
- **Attributed** — surrounded by who/where/when

#### Good
> "Most basement renovations in Mississauga cost $25,000–$40,000 in 2026, depending on whether a bathroom is added and what flooring is used."

This is liftable. It has a number range, a year, a city, and the variable factors. An AI engine can paste this verbatim into a summary with confidence.

#### Bad
> "The cost of a basement renovation can vary depending on several factors."

Not liftable. No numbers, no specificity, no value-add over what the model already knows.

### Where to put citable claims

- **Above the fold** — first paragraph of intro section
- **In FAQ answers** — each answer should contain at least one citable claim
- **In feature/service blurbs** — replace vague descriptions with specific ones
- **In data tables** — tables are easy for LLMs to parse

## Schema as citation surface

JSON-LD is the easiest way to feed structured facts to AI engines. They consume it preferentially over body text because it's pre-parsed.

Required schema for GEO (more in [schema-cookbook.md](schema-cookbook.md)):

- `FAQPage` — each Q&A becomes a citable unit
- `Organization` or `LocalBusiness` — owns the entity that gets cited as the source
- `Service` with `priceRange`, `areaServed`, `serviceType` — facts about what you offer
- `AggregateRating` with `reviewCount` and `ratingValue` — proof signal AI engines weight heavily
- `BreadcrumbList` — helps engines understand site hierarchy

## SSR vs CSR

Most LLM crawlers don't execute JavaScript. They see what `curl` sees.

Test:
```bash
curl -A "Mozilla/5.0 (compatible; Perplexity-User/1.0)" https://example.com/your-page/ | grep "your unique content phrase"
```

If your content phrase isn't in the output, the crawler doesn't see it. Fix by:
- Server-side rendering (Next.js SSR, Nuxt, SvelteKit, etc.)
- Static site generation (Astro, Next.js SSG, Hugo, react-snap on a Vite/CRA SPA)
- Hydration after first paint (works for some crawlers; risky)

Confirm SSR/SSG status before publishing GEO-targeted content.

## Date stamps everywhere

AI engines prefer recent content for the same reason humans do — relevance.

### Where to expose dates

- `<meta property="article:modified_time">` in head
- JSON-LD `dateModified` on `Article`, `WebPage`, or relevant schema type
- Visible date on the page itself ("Updated June 2026")
- llms.txt entries can optionally include a date

### Update strategy
- **Bump `dateModified`** whenever you make a substantive change. Don't bump for typo fixes.
- **Republish quarterly** for pages that should rank for "best X in [year]" — refresh content, refresh date.

## Entity linkage (sameAs)

Tell AI engines your business is the same entity across the web. Use the `sameAs` property on `Organization` / `LocalBusiness` JSON-LD:

```json
{
  "@type": "LocalBusiness",
  "name": "Osoba Renos & Design",
  "url": "https://osobarenos.ca",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61556571587046",
    "https://www.instagram.com/osobarenos/",
    "https://www.yelp.ca/biz/osoba-renos-and-design-mississauga",
    "https://g.co/kgs/HYwcg7K"
  ]
}
```

Include:
- Google Business Profile (via the shortened g.co URL)
- All social profiles
- Wikipedia article (if exists)
- Crunchbase, AngelList (B2B)
- LinkedIn company page
- BBB profile

The more legitimate `sameAs` links, the higher entity-recognition confidence.

## Semantic HTML

Structure matters for LLM parsing. `<div>` soup is harder to parse than:

- `<article>` for self-contained pieces
- `<section>` for thematic groupings
- `<header>` and `<footer>` for page/article chrome
- `<nav>` for navigation
- `<aside>` for sidebars / supplementary content
- `<figure>` + `<figcaption>` for images
- `<table>`, `<thead>`, `<tbody>`, `<th>` for data tables (not for layout)
- `<dl>`, `<dt>`, `<dd>` for definition lists
- `<details>` and `<summary>` for collapsible FAQ — works for both humans and LLMs

Avoid: nested `<div>`s 6+ deep, table-based layout, ARIA roles substituting for semantic tags.

## Anti-keyword-stuffing

Modern Google penalizes obvious SEO writing. LLM search engines penalize it more aggressively — they trained on the worst SEO content and learned to recognize it.

Tells the AI search demoter looks for:
- Same keyword phrase repeated 5+ times in a paragraph
- Awkward keyword insertions ("our bathroom renovation Toronto services")
- City-name spam (every paragraph mentions the target city)
- Service-list spam ("we do X, Y, Z, A, B, C, D services")

Cure: write for humans. See [humanization.md](humanization.md).

## Tracking GEO presence

Hard to measure. No GSC equivalent for AI engines. Proxies:

- **Manual queries**: type your target queries into ChatGPT/Claude/Perplexity weekly, note whether your site is cited
- **Brand mentions**: monitor for your brand name in AI-generated content (use brand monitoring tools)
- **Referral traffic**: in analytics, look for traffic from chat.openai.com, perplexity.ai, claude.ai, gemini.google.com
- **Bing Webmaster Tools**: Bing Copilot uses Bing index — Bing rankings predict Copilot citations

## Common GEO mistakes

- ❌ Content blocked by aggressive robots.txt or `noindex` rules — LLM crawlers won't see it
- ❌ Critical content behind JavaScript hydration that the crawler can't trigger
- ❌ FAQ implemented as accordion divs with no `FAQPage` JSON-LD
- ❌ Service area only listed in body text, not in `areaServed` schema
- ❌ Pricing only available "on request" — AI engines drop you in favor of competitors with public prices
- ❌ Reviews only on Google Business Profile, no `Review` schema on the site itself

## Suspect / unknown-brand keywords in a list

When a keyword list contains unfamiliar brand-domains (e.g. `bloomingdwelling.com`, `drhomey`, `designmode24`), web-vet them before referencing. Many are content farms or affiliate/gambling spam with invalid certs and no named authors. Don't link them. Instead, write the trustworthy answer to the implicit "is X legit?" query — name them as cautionary examples and give the reader a content-farm detector (named author? multiple angles? budgets/materials?). This captures the intent traffic without passing equity to spam or risking SEO poisoning. Drop list items that are off-topic entirely (a food blog in an interior-design list) rather than forcing a fit.

_Added 2026-06-06: initial draft. GEO is a fast-moving area — revisit quarterly._
_Added 2026-06-27: vet unknown-brand-domain keywords; answer "is X legit" instead of linking content farms._
