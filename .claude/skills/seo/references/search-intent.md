# Search intent

Match the page type to what the searcher actually wants. Mismatched intent is the #1 reason pages rank but don't convert (or never rank at all despite good content).

## The four intents

### Informational
The user wants to learn something.

**Query signals**: how to, what is, why, when, where, vs, guide, tutorial, definition.

**Examples**:
- "how long does a bathroom renovation take"
- "what is microcement"
- "why are condo renovations more expensive"
- "engineered hardwood vs vinyl plank"

**Right page type**: blog post, guide, FAQ entry.

**Wrong page type**: service page with "Get Free Estimate" buttons. The user isn't ready to buy.

**Page structure**:
- Long-form (1500–3000 words)
- TOC with jump links to H2s
- Definitions and concepts
- Tables, diagrams, comparisons
- FAQ section
- Soft CTAs ("Want help with this? Free estimate →") at the end, not the top
- Related reading at the bottom

### Commercial investigation
The user is comparing options, getting close to buying but not there yet.

**Query signals**: best, top, reviews, comparison, vs, alternatives, [brand] vs [brand], cheapest, near me (sometimes), [year].

**Examples**:
- "best bathroom contractor toronto"
- "renomark vs homestars"
- "kitchen renovation cost vs bathroom cost"
- "[brand] review"

**Right page type**: comparison page, listicle, review page.

**Wrong page type**: pure service page (too sales-y), pure blog post (not actionable enough).

**Page structure**:
- Hook with the question they're investigating
- Quick recommendation up top (TL;DR)
- Comparison table
- Pros/cons of each option
- Pricing ranges (real numbers)
- Detailed evaluation per option
- Verdict
- Strong but not pushy CTA

### Transactional
The user wants to buy / book / hire.

**Query signals**: hire, book, buy, get, [service] + [city], [service] + "near me", cost, quote, estimate.

**Examples**:
- "bathroom renovation mississauga"
- "hire a contractor"
- "basement renovation quote"
- "renovation contractor near me"
- "bathroom contractor toronto"

**Right page type**: service page, city-service page, near-me hub.

**Wrong page type**: long blog post with the CTA buried at the bottom. The user wants to take action now.

**Page structure**:
- H1 with the service + location (matches query)
- Strong CTA above the fold
- Phone number above fold (tap-callable)
- 1 trust signal above fold (rating, certification)
- Below the fold: project gallery, features, FAQ, contact form
- Multiple CTAs throughout (not just at the bottom)

### Navigational
The user wants a specific brand or page.

**Query signals**: brand name, brand + something specific, "[brand] contact", "[brand] login".

**Examples**:
- "osoba renos"
- "osoba renos toronto"
- "osoba renos contact"
- "amazon"

**Right page type**: homepage, brand page, contact page.

**Wrong page type**: blog post about the brand (Wikipedia ranks first anyway).

**Page structure**:
- Brand front and center
- Clear navigation to whatever they're looking for
- Contact info prominent
- Recent / featured content if it's the homepage

## How to determine intent from a query

### Look at the SERP

Type the query into Google. The dominant page types in the top 10 results tell you what intent Google has identified.

- Mostly blog posts? → informational
- Mostly comparison/listicle pages? → commercial investigation
- Mostly service pages with CTAs? → transactional
- Brand homepage at top? → navigational

If you target an intent different from what's already ranking, you'll fight an uphill battle.

### Look at the query modifier

| Modifier | Intent |
|---|---|
| how, why, what, when | informational |
| best, top, vs, review | commercial |
| cost, price, [service] in [city], near me | transactional |
| Brand name without modifier | navigational |

### Look at the GSC click pattern

If a page has high impressions but low CTR, possible intent mismatch — your snippet doesn't promise what users wanted.

## Intent mismatch examples

### Mismatch 1: service page targeting informational query

`/bathroom-renovation-cost/` with H1 "Bathroom Renovation in Toronto" and a "Get Free Estimate" CTA above the fold.

User typed "bathroom renovation cost." They want to know the cost. The page should be a blog post or guide with cost ranges, breakdowns, factors that affect cost.

**Fix**: change the page to be informational. Title: "How Much Does a Bathroom Renovation Cost in Toronto in 2026?" Long-form with tables and ranges. Soft CTA at bottom.

### Mismatch 2: blog post targeting transactional query

`/blog/bathroom-renovation-mississauga/` with H1 "All About Bathroom Renovations in Mississauga" and 2500 words of background.

User typed "bathroom renovation mississauga" wanting to hire someone. The page reads like an essay. CTA is at word 2200.

**Fix**: change the page to be a service page. Hero with H1 and CTA above fold. Service features. Project gallery. FAQ. Move the long-form content to a separate blog post linked from this page.

### Mismatch 3: comparison page sold as a service page

`/services/best-bathroom-contractor/` claiming to be a service page.

User typed "best bathroom contractor toronto" wanting a comparison. They expect to evaluate options, not commit.

**Fix**: turn it into an honest comparison. Or rename to `/bathroom-renovation/` and lean into the service-page format.

## Multi-intent queries

Some queries split between intents. Google often serves a mixed SERP.

**Example**: "bathroom renovation toronto" — partly transactional (people looking to hire), partly informational (people researching).

**Approach**: choose the dominant intent based on SERP analysis. If SERP is split, you can either:
- Build a hybrid page (service page with a substantial informational section)
- Build two pages: a transactional service page and an informational guide, cross-linked

For "near me" queries specifically: usually transactional + local. Service page or near-me hub.

## Localized intent

When the query has a location, intent often becomes more transactional.

- "bathroom renovation" → mixed
- "bathroom renovation toronto" → more transactional
- "bathroom renovation mississauga" → more transactional
- "bathroom renovation cost toronto" → still mostly informational despite the city

Rule of thumb: city in the query without a cost/timing modifier → transactional.

## Year-specific intent

Queries with a year (e.g. "2026") are usually informational and current-year specific.

- "bathroom renovation trends 2026" → informational, blog post format
- Republish or update annually

## Intent at the page level vs the query level

A single page can rank for multiple queries with different intents. Don't optimize for one query at the expense of others.

Example: `/bathroom-renovation/` ranks for:
- "bathroom renovation toronto" (transactional)
- "what does a bathroom renovation cost in toronto" (informational)
- "how to choose a bathroom contractor" (informational)

A well-built service page handles all three by having:
- Strong CTA above fold (transactional intent)
- FAQ with cost ranges (informational intent)
- "Why choose us" / process section (commercial investigation intent)

Don't make the page entirely transactional; you'll lose the informational queries.

## Search intent → page template mapping

| Intent | Page template |
|---|---|
| Informational | Blog post / guide |
| Commercial investigation | Comparison / listicle / "best of" |
| Transactional | Service page / city-service / near-me hub |
| Navigational | Homepage / brand page / contact |

See [page-rules-builder.md](page-rules-builder.md) for the full decision tree.

## Common intent mistakes

- ❌ Targeting all four intents on the homepage (too broad, ranks for nothing)
- ❌ Service pages that read like blog posts (user can't find the CTA)
- ❌ Blog posts that read like landing pages (user feels pitched, bounces)
- ❌ Ignoring the SERP — building the page you think is best when Google has already shown what users actually expect
- ❌ Mixing pricing pages and service pages when users want one or the other clearly
- ❌ Putting "near me" content on the homepage instead of a dedicated hub

_Added 2026-06-06: initial extraction from local-seo-pages agent + expanded with intent mismatch examples and SERP analysis._
