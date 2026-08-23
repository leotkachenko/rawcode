# Metadata structure

Title tags, meta descriptions, Open Graph, Twitter cards, canonical, robots. The data that lives in `<head>` and determines how a page shows up in SERPs, social shares, and AI summaries.

## Title tag

The single most important on-page SEO element. Owns the SERP click-through rate.

### Length
- **Target**: 50–60 characters
- **Hard max**: 60 chars before Google truncates (varies by font width; pixel-based)
- **Don't go below**: 30 chars — looks thin, gives less keyword surface

### Format pattern

For service/city pages: `[Primary keyword phrase] | [Brand]`

Examples:
- `Bathroom Renovation Mississauga | Osoba Renos & Design` (53 chars)
- `Basement Renovation in Toronto & GTA | Osoba Renos` (51 chars)
- `Bathroom Renovations Near Me — Toronto, Mississauga & GTA` (57 chars)

For blog posts: `[Question or claim from H1] | [Brand or section]`
- `How to Choose a Renovation Contractor in Toronto: 7 Key Questions` (long; truncates but the keyword is at the front)

### Rules
1. **Primary keyword in the first 30 characters** — Google weights leading words higher
2. **No keyword stuffing**: one primary phrase, max one secondary phrase, no duplicates
3. **No "Home"** or "Welcome to" — wasted characters
4. **Brand at the end**, separated by `|` or `—`. Drop the brand only if you need every character.
5. **No clickbait** (clickbait gets click-throughs but tanks dwell time, which hurts rankings)
6. **Match the H1's primary keyword phrase verbatim** — see [url-rules.md](url-rules.md)

### Common mistakes
- Generic title that doesn't differentiate ("Home Renovation Services")
- ALL CAPS or excessive punctuation (Google rewrites it; you lose control)
- Year in title when content isn't year-specific ("2026" only if content actually updates yearly)

## Meta description

Doesn't directly rank, but drives CTR — which indirectly affects rankings.

### Length
- **Target**: 150–160 characters
- **Hard max**: 160 chars (mobile truncates earlier — ~120)

### Format

Two-sentence structure:
1. **What the page offers** (with primary keyword once, naturally)
2. **Why click** (specific value: "Free estimate", "Same-day quote", "15+ projects done in [city]", "5-year warranty")

Examples:
- "Spa-style bathroom renovation in Mississauga. Walk-in showers, custom tilework, designer vanities, and freestanding tubs. Local Mississauga contractor."
- "Looking for bathroom renovations near you? Osoba Renos & Design serves Toronto, Mississauga, Etobicoke, and the GTA with walk-in showers, tilework, and vanities."

### Rules
1. **Include the primary keyword once**, not stuffed
2. **Be specific** — numbers, locations, value props
3. **Include a soft CTA** ("Free estimate", "Same-day call back") when conversion is the goal
4. **Don't quote the H1** — duplicate signal, wasted real estate
5. **Don't end with ellipsis** — Google adds one if it truncates; you don't need to

## Canonical URL

Every page needs `<link rel="canonical" href="https://example.com/path/" />`.

Rules:
- Absolute URL, not relative
- Always trailing slash (or always not — pick one site-wide and be consistent)
- HTTPS, not HTTP
- Lowercase
- No tracking parameters (`?utm_*`)
- Self-referencing on all unique pages
- Pages with parameter variants → canonical to the parameter-less version

## Open Graph + Twitter cards

For social shares and AI summaries (LLM crawlers read OG tags too).

```html
<meta property="og:title" content="<same as title or shorter>" />
<meta property="og:description" content="<same as meta description>" />
<meta property="og:url" content="<canonical URL>" />
<meta property="og:image" content="<absolute URL to 1200x630 image>" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="<brand>" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<og:title>" />
<meta name="twitter:description" content="<og:description>" />
<meta name="twitter:image" content="<og:image>" />
```

### Image
- **Dimensions**: 1200 × 630 px (1.91:1 ratio)
- **File size**: ≤1 MB ideally
- **Format**: JPEG or PNG. WebP works for some platforms but not all — JPEG is safest.
- **Text on image**: keep ≤20% of pixels (Facebook used to penalize, no longer strict, but readable text matters more)

## Robots meta

Default for indexable pages:
```html
<meta name="robots" content="index, follow" />
```

For pages you don't want indexed (thank-you pages, internal search results, duplicate parameter variants):
```html
<meta name="robots" content="noindex, follow" />
```

`nofollow` is rarely needed for first-party pages. Use `noindex, follow` so link equity still flows.

## Author, publish, modified dates (for articles)

For blog posts / guides, include these in metadata AND in JSON-LD:

```html
<meta property="article:published_time" content="2026-01-15T00:00:00Z" />
<meta property="article:modified_time" content="2026-06-06T00:00:00Z" />
<meta property="article:author" content="<author name or URL>" />
```

The corresponding JSON-LD `Article` schema is in [schema-cookbook.md](schema-cookbook.md).

LLM search engines weight recent content heavily. **Update `dateModified` whenever you make a substantive change**, even small ones.

## Hreflang (multilingual sites)

For sites with multiple language versions:

```html
<link rel="alternate" hreflang="en-CA" href="https://example.com/" />
<link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Rules:
- Every language version must reciprocate (page A points to B, B points to A)
- Use full locale codes (`en-CA` not just `en`) when targeting specific countries
- `x-default` for the fallback when no locale matches
- Don't use hreflang for region-only variants of the same language unless content actually differs

## SEO data file structure

Most React/Next/Astro projects keep SEO copy in a single data file keyed by route. Standard shape:

```js
export const SEO = {
  '/bathroom-renovation-mississauga': {
    title: 'Bathroom Renovation Mississauga | Osoba Renos & Design',     // 50–60 chars
    description: 'Spa-style bathroom renovation in Mississauga...',       // 150–160 chars
    primary: 'Bathroom Renovation in Mississauga',                        // appears verbatim in H1
    secondary: [                                                          // body/anchor text variants
      'bathroom renovation mississauga',
      'mississauga bathroom renovation',
      // ...
    ],
  },
};
```

### Field rules
- **Key**: route path without trailing slash, except `/`
- **`title`**: target 50–60 chars not counting any suffix the framework adds
- **`description`**: target 150–160 chars
- **`primary`**: must appear verbatim in the page's `<h1>` — this is enforced by code review, not the framework
- **`secondary`**: 3–8 phrases. Used as anchor text variations, internal links, body copy targets. Not visible to users directly.

## Anti-patterns

- ❌ Title and H1 are identical word-for-word (waste — title can include brand)
- ❌ Description repeats the title (no new info for SERPs)
- ❌ Description >160 chars (gets truncated mid-word)
- ❌ Title with bracketed sub-claims `[Best 2026] [Toronto] [Free Quote]` (clickbait flag)
- ❌ Multiple pages with the same title (cannibalization — Google picks one to show, ignores the others)
- ❌ Missing canonical on a page with parameter variants
- ❌ Self-referencing canonical that uses `http://` when site is `https://`
- ❌ OG image is a logo (boring, low CTR — use a hero photo from the page)

_Added 2026-06-06: initial extraction from local-seo-pages agent + expanded with OG, hreflang, robots, and anti-patterns._

## Don't reuse the on-page summary as the meta description

A data model with one `summary`/`description` field that's rendered both as visible body copy *and* passed straight into `generateMetadata` will drift past 160 chars immediately — on-page summaries want 2-3 sentences of context, meta descriptions want one tight SERP snippet. Symptom: every templated page in a set (service tiers, city pages) comes in at 250-350 chars, 60-120% over the hard max, because the field was never designed for the constraint. Fix: add a distinct `metaDescription` field (150-160 chars, two-sentence structure) to the data model alongside the existing body-copy field, and point `generateMetadata`/`<meta name="description">` at the new field. Don't try to trim the existing field down to 160 chars — that breaks the on-page copy instead.

## Next.js Metadata API requires an explicit canonical — `metadataBase` alone doesn't emit one

Setting `metadataBase` in the root layout only resolves *relative URLs* inside other URL-based fields (`openGraph.images`, etc.) — it does not add a `<link rel="canonical">` tag by itself. Every route needs its own `alternates: { canonical: '/path' }` (relative paths resolve against `metadataBase`). Audit for this by checking rendered HTML (`curl | grep 'rel="canonical"'`), not by checking whether `metadataBase` is set — a site can have `metadataBase` configured and zero canonical tags on every page.

_Added 2026-08-11: rawcode.ai audit — all 5 service-tier pages had 259-348 char descriptions (summary field reused verbatim) and zero pages had canonical tags despite metadataBase being set._
