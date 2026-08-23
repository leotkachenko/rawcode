# rawcode.ai Rebuild — Brief for Claude Code

## Current live site (as of this brief)

rawcode.ai is **not** a blank slate — it's a live single-page agency site:

- **Positioning:** "Unleashing Horizons" / "Where Vision Meets Virtuosity, We Transform
  Possibilities into Achievements." Aspirational, transformation-heavy tone.
- **Services listed:** Branding, UI/UX Design, Software Development, Talent Resourcing
  (= existing staff-aug offer under a different name).
- **Process:** Briefing → Ideating → Prototyping → Testing, via a contact form.
- **Team:** Pavlo Holubchykov (Lead ML/AI Developer), Oles Chura (Lead Software Developer),
  Can Mustafa Patlar (Co-Founder/CEO).
- **Gaps:** No pricing/cost transparency, no blog, no case studies, no differentiation
  between offers (one-page, one CTA for everything).

The rebuild should **evolve this existing brand and team**, not replace it with a generic
new agency identity. Keep the named team and "Talent Resourcing" lineage; fix the
undifferentiated-offer and no-proof gaps below.

## Business context

rawcode.ai is being rebuilt from scratch as a dev studio / AI consultancy. Current organic
search traffic (GSC) is small (~100–150 clicks/mo total) and is **navigational or
definitional** — "raw code," "rawcode," typo variants, and "what is raw code" (0 clicks on
46 impressions). None of it is commercial intent. Treat this traffic as a minor, cheap
top-of-funnel asset (one explainer page), **not** as the growth engine. Real pipeline for
this business comes from outbound/referral/network — the site's job is to look credible and
close deals sourced elsewhere, not to convert cold search traffic.

Do not assume search rankings alone will drive revenue. Do not fabricate traffic or
conversion numbers anywhere in copy.

## Services to offer (priority order)

Map onto and extend the existing four categories (Branding, UI/UX, Software Development,
Talent Resourcing) rather than discarding them — add pricing signals and proof they
currently lack:

1. **Small builds / pilots** — $1.5k–5k. Fast-turnaround landing pages, small tools, MVP
   features. Positioned as the low-risk entry point that leads into bigger engagements —
   also the case-study generator for a studio starting with no portfolio.
2. **Fixed-scope builds** ("Make Your Idea Real") — $5k–50k+. Full app/website builds from
   a spec.
3. **SEO/GEO-optimized website builds** — sites engineered to rank in classic search *and*
   get cited by AI answer engines (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews).
   Proof points to feature as case studies:
   - **novelmaker.co** — bedtime-story generator app, consumer-facing.
   - **lumirank.ca** — GEO/AI-search-visibility studio; itself a good structural reference
     for FAQ-block, entity-clarity, and citation-friendly content patterns.
   - **osobarenos.ca** — Toronto renovation contractor; strong local/geo-page SEO (city-level
     landing pages, review aggregation, service + location interlinking).
   Only use real, verifiable outcomes for these (traffic, rankings, client results) — ask the
   business owner for actual numbers before publishing any stat. Do not invent metrics.
4. **AI automation consulting/implementation** — $3k–30k project or retainer. Needs a real
   before/after example to differentiate from generic "we do AI" positioning.
5. **Staff augmentation** — $8–15k/mo per engineer, retainer. This is the existing "Talent
   Resourcing" line — keep the name recognition, add the pricing signal it currently lacks.
   Slowest to ramp — needs a bench and trust, not a priority for launch copy.

Branding and UI/UX Design (existing categories) fold into the small-build and fixed-scope
tiers as deliverables/add-ons rather than standalone offers — avoids the current
undifferentiated six-tile layout with no pricing or sequencing.

Secondary / not a primary CTA: a **free** newsletter as an email-capture lead magnet feeding
the funnel above. No paywall at launch — there's no existing audience to justify one yet.
Career coaching and interview-prep services were considered and deprioritized — crowded
market, low ticket, doesn't match the outbound-sold positioning above. Leave them out unless
explicitly revisited.

## Site structure

- **Home** — clear one-line positioning, 4–5 service tiles (small build → fixed-scope →
  SEO/GEO builds → AI automation → staff aug), case studies section, single clear CTA
  (book a call / get a quote).
- **Service pages** — one per offer above. Each: what's included, process, rough pricing
  signal, FAQ in direct Q&A format (favours LLM citation — see lumirank.ca pattern).
- **Case studies / portfolio** — novelmaker.co, lumirank.ca, osobarenos.ca, with what was
  built and (only real) outcomes. Structure for easy addition of future projects.
- **"What is Raw Code" page** — short, genuinely useful explainer answering the exact
  definitional query. Ends with a soft CTA into services. This is the only page aimed at
  the existing GSC traffic.
- **Contact / booking** — Calendly or equivalent for calls; a direct payment link (Stripe)
  for the small-build tier so it's truly self-serve.
- **Footer** — standard agency footer, newsletter signup, no dark patterns.

## SEO/GEO technical requirements

- Clean semantic heading hierarchy (H1–H3) per page.
- FAQ content in direct, definition-forward Q&A format on every service page (citation-
  friendly for AI answer engines, per the LumiRank pattern observed).
- Structured data: Organization, Service, FAQPage schema at minimum.
- Server-rendered or statically generated pages for crawlability and speed — recommend
  Next.js (App Router) with static generation where content allows, or an equivalent
  SSR/SSG framework. Confirm stack preference with the business owner before committing.
- Unique meta title/description per page. No thin/duplicate content across service pages.

## Explicit non-goals

- Don't build career coaching / interview-prep as offers.
- Don't paywall the newsletter at launch.
- Don't design the homepage to try to convert cold "what is raw code" searchers into
  $30k retainer buyers — wrong intent match, keep that page purely informational.
- Don't fabricate client results, testimonials, or traffic stats for the case studies.

## Open questions to resolve before/while building

- Real pricing figures to publish (ranges above are directional, confirm before shipping).
- Actual, verifiable outcomes for novelmaker.co, lumirank.ca, osobarenos.ca case studies.
- Hosting/tech stack preference if different from the Next.js recommendation above.
- Whether this business operates under any existing legal entity/brand constraints that
  affect copy or claims (e.g., unrelated to InteraXon/Muse — confirm no crossover before
  publishing).
