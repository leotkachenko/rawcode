---
name: seo
description: SEO + GEO playbook for content sites. Covers keyword triage from Google Search Console data, page rules (when to create vs strengthen vs skip), URL/metadata/H1 conventions, schema.org JSON-LD, content humanization (anti-AI-voice), Core Web Vitals, internal linking, search intent matching, NAP/citations, E-E-A-T. Invoke when the user asks for SEO work, GSC analysis, creating city/local pages, content audits, schema implementation, AI-search optimization (GEO), title/description writing, or humanizing AI-generated copy.
---

# SEO Playbook

A structured knowledge base for SEO and Generative Engine Optimization (GEO) work. **Don't try to hold all of it in context at once.** Each reference file is a focused module — load the ones you need via the Read tool, ignore the rest.

The architecture: thin orchestrator agents (like [local-seo-pages](../../agents/local-seo-pages.md)) → this skill's task router → individual reference files.

## When this skill is invoked

1. Identify which task category the user's request falls into (see "Task router" below).
2. Read the relevant reference file(s) from `references/` with the Read tool.
3. Execute, applying the rules from those references.
4. After completing the task, follow the [self-improvement protocol](references/self-improvement.md).

## Task router

| User intent | Required reading |
|---|---|
| "Here are GSC top queries — what should we build?" | [keywords-triage.md](references/keywords-triage.md), [page-rules-builder.md](references/page-rules-builder.md) |
| "Create city-service pages from this keyword list" | [keywords-triage.md](references/keywords-triage.md), [page-rules-builder.md](references/page-rules-builder.md), [url-rules.md](references/url-rules.md), [metadata-structure.md](references/metadata-structure.md), [schema-cookbook.md](references/schema-cookbook.md) |
| "Write copy for X" / "this sounds AI-generated, rewrite" | [humanization.md](references/humanization.md), [content-priorities.md](references/content-priorities.md), [search-intent.md](references/search-intent.md) |
| "Optimize for AI / LLM search" / "ChatGPT, Perplexity, Gemini" | [geo.md](references/geo.md), [schema-cookbook.md](references/schema-cookbook.md), [content-hierarchy.md](references/content-hierarchy.md) |
| "Add structured data / JSON-LD / schema.org markup" | [schema-cookbook.md](references/schema-cookbook.md) |
| "Title tag" / "meta description" / "Open Graph" | [metadata-structure.md](references/metadata-structure.md) |
| "Image optimization" / "alt text" / "CLS from images" | [image-seo.md](references/image-seo.md) |
| "Site is slow" / "Core Web Vitals" / "LCP / CLS / INP" | [core-web-vitals.md](references/core-web-vitals.md) |
| "Internal linking" / "topic clusters" / "pillar pages" | [internal-linking.md](references/internal-linking.md) |
| "What kind of page should this be?" / "intent mismatch" | [search-intent.md](references/search-intent.md), [page-rules-builder.md](references/page-rules-builder.md) |
| "E-E-A-T" / "trust signals" / "credentials" | [eeat.md](references/eeat.md) |
| "NAP" / "Google Business Profile" / "directory citations" | [nap-citations.md](references/nap-citations.md) |
| "Set sitemap priority" / "what content matters most" / "above the fold" | [content-priorities.md](references/content-priorities.md) |
| "Heading structure" / "semantic HTML" / "document outline" | [content-hierarchy.md](references/content-hierarchy.md) |
| "Two of our pages are competing" / "cannibalization" / "which page should rank" | [cannibalization.md](references/cannibalization.md), [keywords-triage.md](references/keywords-triage.md) |

## Reference library

| File | Scope (one line) |
|---|---|
| [keywords-triage.md](references/keywords-triage.md) | Parse GSC query data; classify into 4 buckets (covered / new page / strengthen / skip) |
| [page-rules-builder.md](references/page-rules-builder.md) | Decision tree: given a query, which page type to build and how |
| [url-rules.md](references/url-rules.md) | Slug conventions, location-last rule, URL↔H1↔title alignment |
| [metadata-structure.md](references/metadata-structure.md) | Title (50–60), description (150–160), canonical, OG/Twitter, robots |
| [schema-cookbook.md](references/schema-cookbook.md) | JSON-LD recipes: Service, FAQPage, LocalBusiness, BreadcrumbList, AggregateRating, Review, Article, HowTo, Product, Organization, VideoObject |
| [content-priorities.md](references/content-priorities.md) | Sitemap priority numbers; above-fold hierarchy; which pages to optimize first |
| [content-hierarchy.md](references/content-hierarchy.md) | H1→H2→H3 rules, semantic HTML, document outline for SEO + accessibility |
| [humanization.md](references/humanization.md) | Anti-AI-voice rules: forbidden words, sentence variance, concrete claims, voice tests |
| [geo.md](references/geo.md) | Generative Engine Optimization: llms.txt, citability, AI-crawler considerations |
| [eeat.md](references/eeat.md) | Experience/Expertise/Authority/Trust signals, YMYL handling |
| [image-seo.md](references/image-seo.md) | Filename, alt, dimensions for CLS, WebP, srcset, lazy loading, image sitemap |
| [core-web-vitals.md](references/core-web-vitals.md) | LCP/CLS/INP targets and tactical fixes |
| [internal-linking.md](references/internal-linking.md) | Hub-and-spoke, anchor diversity, orphan prevention |
| [search-intent.md](references/search-intent.md) | Informational / commercial / transactional / navigational → page type |
| [nap-citations.md](references/nap-citations.md) | Byte-identical NAP, directory citations, Google Business Profile |
| [cannibalization.md](references/cannibalization.md) | Detect / prevent / fix two same-site pages competing for one query |
| [consensus-review.md](references/consensus-review.md) | Four-agent independent review panel (SEO compliance, UI/UX, content quality, infra/schema) that gates shipping |
| [self-improvement.md](references/self-improvement.md) | Protocol for adding new knowledge to this library |

## Critical rules (read every time, before any work)

These are non-negotiable. If you find yourself about to break one, stop and ask the user.

1. **Never rename, retitle, rewrite the H1 of, or rewrite the description of an existing URL** without explicit user approval. Lost SEO equity is real and irreversible without 301 redirects + 2–6 weeks of ranking decay. To capture a new query, build a new page — don't broaden the existing one (see [keywords-triage.md "Don't dilute the winner"](references/keywords-triage.md#dont-dilute-the-winner-anti-pattern)).
2. **Every new route must be wired in five places** — SEO data, router, prerender list, footer link, sitemap. Run the verification grep block from [page-rules-builder.md "Required infrastructure checklist"](references/page-rules-builder.md#required-infrastructure-checklist) before handoff. A missed step is not a "consider next" — it's an unshipped page.
3. **Check for cannibalization before shipping.** Grep existing entries' primary keywords for substring overlap with the proposed new slug. See [cannibalization.md](references/cannibalization.md).
4. **Never invent file paths or page templates.** Read the site's actual structure first.
5. **Location goes LAST** in URLs, titles, and H1s — `/bathroom-renovation-toronto/`, not `/toronto-bathroom-renovation/`. Matches query patterns.
6. **Match search intent** to page type. Transactional query → service page with strong CTA. Informational query → guide/blog. Mismatch is the #1 cause of "ranked but no traffic."
7. **Ignore branded queries** (company name variants) — already winning them, no work needed.
8. **Skip generic single-word queries** (`renos`, `contractors`, `seo`). Too low-intent for a dedicated page.
9. **Never fabricate reviews, ratings, credentials, or testimonials.** Schema with fake reviews is search fraud and can blacklist the domain.
10. **Validate schema** at `https://search.google.com/test/rich-results` before deploying. Invalid JSON-LD ≈ no JSON-LD.
11. **Don't keyword-stuff.** Modern Google and all LLM search engines penalize over-optimization.
12. **Humanize all generated copy.** Run it through [humanization.md](references/humanization.md) before shipping. AI-detectable copy gets demoted.

## Workflow (default for keyword-driven page work)

1. **Discover the site** — locate SEO data file, routing table, sitemap generator, footer, parent service pages. Read one existing page top-to-bottom to learn the template.
2. **Triage the keywords** — using [keywords-triage.md](references/keywords-triage.md). Output a table mapping each query → bucket.
3. **Confirm scope** with the user only if ambiguous (URL renames, branded/generic edge cases, large-scope expansion). Otherwise proceed.
4. **Build** — for each "new page" row: SEO entry → page file (copy parent and edit) → route → prerender entry → footer link.
5. **Verify** — run sitemap generator, confirm URLs in `sitemap.xml` and `llms.txt`, cross-check 3 sources of truth (SEO data ↔ routes ↔ prerender list).
6. **Consensus review** — gate every page through the four-agent panel in [consensus-review.md](references/consensus-review.md) before handoff. Ship only on ≥3/4 approval; any hard-rule violation vetoes regardless of vote count.
7. **Handoff** — what changed, build commands, spot-checks, panel verdict table. Under 200 words.

## Self-improvement protocol

At the end of every invocation, before returning to the parent conversation:

1. Reflect on what you learned this session — was there a novel pattern, a refinement, a new framework, a new constraint, a new schema type?
2. Identify the right reference file for that knowledge (use the Task router table to find a match, or add a new reference if no fit).
3. Append a short, dense addition. Date-stamp it: `_Added YYYY-MM-DD: <one-line reason>._`
4. Don't restate in your user-facing reply that you updated. Just do it.

Full protocol details: [references/self-improvement.md](references/self-improvement.md).
