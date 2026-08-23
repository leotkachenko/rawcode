# URL rules

How to construct URLs that match search query patterns, support analytics, and don't fight the rest of the site.

## The location-last rule

**Service first, location last.** Always.

✅ `/bathroom-renovation-mississauga/`
❌ `/mississauga-bathroom-renovation/`

✅ `/condo-renovation-etobicoke/`
❌ `/etobicoke-condo-renovation/`

Why: this matches how people actually type queries into Google ("bathroom renovation mississauga", not "mississauga bathroom renovation"). The URL itself is a (weak) ranking signal. URL phrasing matching query phrasing is a (weak but cumulative) bonus.

It also matches how users skim breadcrumbs and SERP titles.

## URL ↔ H1 ↔ title alignment

These three must agree on the **primary keyword stem**.

| Element | Example |
|---|---|
| URL slug | `/bathroom-renovation-mississauga/` |
| H1 | `Bathroom Renovation in Mississauga` |
| Title (in head) | `Bathroom Renovation Mississauga \| Osoba Renos & Design` |
| Primary keyword phrase | `Bathroom Renovation in Mississauga` |

Notice:
- All three contain the words **bathroom, renovation, mississauga**
- The H1 uses natural English ("in")
- The title drops "in" to fit character budget
- The URL uses hyphens

Misalignment is one of the most common SEO bugs. Always cross-check.

## Slug construction rules

### Casing and separators
- **Lowercase only**
- **Hyphens** as word separators
- Never underscores (`bathroom_renovation` is a different URL than `bathroom-renovation` to Google)
- Never spaces (will be URL-encoded as `%20`, looks broken)
- Never camelCase

### Trailing slashes

Pick one site-wide convention and enforce it. Most React/Vue/Next/Astro sites use trailing slashes; many static sites do too. Decide once, then:

- All canonicals use the chosen form
- Redirect the non-canonical form (server-side 301)
- Sitemap entries use the canonical form
- Internal links use the canonical form

### Length

- **Target**: 3–6 words in the slug
- **Hard max**: 60 chars before the trailing slash
- **Avoid**: stopwords (`a`, `the`, `of`, `for`) unless they're meaningful (`/in-the-news/` is fine; `/the-bathroom-renovation-page/` is not)

### Stems vs full words

Use full words, not stems:
- ✅ `/bathroom-renovation/`
- ❌ `/bath-reno/`

Exception: where stems are themselves common terms ("reno" is widely understood, but still prefer "renovation" for SEO clarity).

### Dates in URLs

Avoid dates in URLs unless the content is genuinely date-locked:

- ✅ `/bathroom-renovation-trends-2026/` (content explicitly about 2026)
- ❌ `/2026-blog/blog-post-title/` (date adds nothing)

Reason: dated URLs feel stale after the date passes. URLs are forever.

## Plural vs singular

Match the dominant query pattern. Check GSC.

Common conventions:
- Service pages: usually singular (`/bathroom-renovation/`) — matches "bathroom renovation toronto"
- Hub / category pages: plural (`/projects/`, `/services/`, `/posts/`)
- Near-me pages: plural (`/bathroom-renovations-near-me/`) — matches "bathroom renovations near me"

When unsure, check GSC: which form do users search more?

## Multi-word locations

For locations with multiple words:
- ✅ `/bathroom-renovation-north-york/` (hyphen between location words)
- ❌ `/bathroom-renovation-northyork/` (no separator — Google may not parse)
- ❌ `/bathroom-renovation-north_york/` (underscore)

For locations with apostrophes or other special chars:
- `St. John's` → `st-johns` (no apostrophe, no period)
- `O'Brien` → `obrien`
- `Saint-Léonard` → `saint-leonard` (no diacritics in URLs)

## When to break the location-last rule

Rarely. Two cases:

1. **The site's existing URL structure** uses location-first and changing it would require renaming a high-ranking page. Don't rename — keep the existing URL, accept the suboptimal slug. Make new URLs location-last; legacy stays as-is.
2. **Geographic disambiguation** when the location is the primary subject (e.g. a city guide page `/toronto-renovation-guide/` where the city is the noun, not a modifier).

In all other cases: location-last.

## Slug for near-me pages

Use the natural query phrasing:
- ✅ `/bathroom-renovations-near-me/`
- ❌ `/near-me-bathroom-renovations/`
- ❌ `/bathroom-renovation-near-me/` (singular doesn't match "bathroom renovations near me" — plural matches GSC pattern)

## Slug for blog/guide posts

More natural-language friendly. Can be longer (up to ~70 chars).

- `/how-to-choose-renovation-contractor-toronto-7-questions/` — clear, matches the title
- `/bathroom-renovation-timeline-toronto-week-by-week/` — clear, matches the title
- `/condo-renovation-in-toronto-and-gta-how-to-take-your-space-to-the-next-level-in-2026/` — too long; should have been `/condo-renovation-toronto-2026-guide/`

Don't try to cram every keyword into a blog slug. Pick 3–5 stem words.

## Filtered / parameter URLs

For pages with parameters (filters, sorts, search results):

- **Canonical to the parameter-less version** when the parameter doesn't change content meaningfully
- **Self-canonical** when the parameter creates a genuinely distinct page (e.g. `/projects/?category=bathroom`)
- **noindex** for purely operational parameters (e.g. `?sort=newest`)

Rule of thumb: if two parameter variants would produce the same description in SERPs, they should canonical to one of them.

## Slug renames (when forced)

If you must rename a URL:

1. **Keep the old URL working** with a 301 redirect to the new URL
2. **Update internal links** to point to the new URL (don't rely on the 301 forever)
3. **Update sitemap.xml** to remove the old URL and add the new one
4. **Re-submit sitemap** in Google Search Console
5. **Expect ranking turbulence** for 2–6 weeks; sometimes longer
6. **Monitor GSC "Pages" report** for indexing issues

Don't ever rename a URL without doing all six. Half-done renames lose ranking permanently.

## URL conventions for specific elements

### Trailing pagination
- ✅ `/posts/page/2/`
- ❌ `/posts/?p=2` (canonical to first page, often `noindex`)

### Tag/category archives
- Often `noindex, follow` — they're internal navigation aids, not search targets
- If they ARE search targets (have unique content above the archive listing), then index

### User-generated content URLs
- Slug from user-provided title, sanitized (lowercase, hyphens, ASCII-only)
- Handle duplicates with `-2`, `-3` suffix

### Geographic disambiguation
- `/projects/etobicoke-bathroom-renovation-double-vanity/` — old style (location-first project)
- `/projects/bathroom-renovation-double-vanity-etobicoke/` — new style (location-last)
- For project portfolio pages, location-first is sometimes acceptable since the city is part of the project's narrative identity

## Common URL bugs

- ❌ Double slashes (`/path//to/page/`) — usually a string-concat bug
- ❌ Mixed case (`/Bathroom-Renovation/`) — Google treats as a different URL
- ❌ URL-encoded characters that don't need to be (`%20` instead of `-`)
- ❌ Trailing query string with no value (`/path/?`)
- ❌ Fragment in canonical (`/path/#section` — fragments are client-side, not for canonicals)
- ❌ HTTP canonical on HTTPS site
- ❌ Self-canonical that doesn't match the actual URL (cache bug or template bug)

_Added 2026-06-06: initial extraction from local-seo-pages agent + expanded with edge cases._

## Trailing-slash canonicalization (the silent indexation killer)

Pick ONE form (with or without trailing slash) and make **all five signals agree**, or Google indexes neither cleanly:

1. **Rendered `<link rel="canonical">`** — must equal the URL that actually serves 200.
2. **The redirect** — the other form must **301** (permanent) to the canonical form, never **307/302**. Temporary redirects don't consolidate ranking signals; Google keeps both URLs and re-crawls forever. (SSR frameworks like TanStack Router emit a 307 by default for trailing-slash normalization — override it with a 301 in the server layer.)
3. **sitemap.xml** — list only the canonical form. Listing the redirecting form = "Page with redirect", never indexed.
4. **llms.txt + image sitemap** — same form.
5. **Layout/parent routes must NOT emit a canonical.** In nested routing (TanStack, Next layouts), a parent's `head()` canonical **also renders on every child page** (link tags dedupe only by exact string), giving child pages TWO canonicals → Google ignores both. Only leaf routes set canonical; index/listing pages self-canonicalize by URL.

Diagnosis: `curl -sS -o /dev/null -w "%{http_code} -> %{redirect_url}\n"` both forms; then `curl … | grep -aoc '<link rel="canonical"'` per page (expect exactly 1; use `grep -a` — SSR HTML with em-dashes trips grep's binary detection and silently drops matches).

_Added 2026-07-04: yadesign.studio audit — served no-slash 200 but canonical/sitemap/llms declared slash form which 307-redirected → most pages "Crawled/Discovered - currently not indexed." Fixed by canonicalizing to no-slash across all five signals._
