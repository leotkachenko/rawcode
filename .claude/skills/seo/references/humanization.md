# Humanization

Rules for stripping AI tells from generated content. Google and Bing have classifiers that flag AI-generated text. So do LLM search engines (Perplexity, ChatGPT) when they pick what to cite. AI-flavored copy gets demoted regardless of accuracy.

Run all generated content through this filter before shipping.

## The forbidden word list

These words and phrases are the #1 AI tell. Search-and-replace every occurrence, even when "they fit." Substitutes in parentheses.

### Verbs / actions
- **delve** → look at, dig into
- **leverage** → use
- **utilize** → use
- **facilitate** → help, run, handle
- **ensure** → make sure, see that
- **navigate** → handle, work through
- **streamline** → simplify, speed up
- **optimize** → tune, improve
- **enable** → let, allow
- **deliver** → ship, hand off, give
- **foster** → grow, build, encourage
- **showcase** → show, present
- **embark on** → start, begin
- **unlock** → open, unlock (literal only)
- **harness** → use, tap
- **revolutionize** → change, replace
- **transform** → change, rebuild (be specific about what)
- **elevate** → raise, lift (literal only)

### Adjectives
- **robust** → strong, solid, reliable
- **comprehensive** → full, complete, thorough
- **seamless** → smooth, clean, fast
- **innovative** → new (or just describe what it does)
- **cutting-edge** → new (or describe specifically)
- **state-of-the-art** → new, top
- **myriad** → many, lots of
- **vibrant** → lively, busy, loud (rarely useful)
- **dynamic** → active, changing
- **bespoke** → custom
- **holistic** → whole, complete
- **paradigm-shifting** → just delete this entire sentence

### Connectors and openers
- **In the realm of** → in
- **In the world of** → in
- **It's important to note that** → just say it
- **It's worth noting that** → just say it
- **In conclusion** → don't write conclusions
- **To put it simply** → just put it simply
- **Furthermore** → also, and
- **Moreover** → also, and
- **Additionally** → also, and
- **Subsequently** → then, next, after
- **Henceforth** → from now on (rarely useful)
- **Indeed** → delete
- **Notably** → delete or replace with the actual notable thing

### Sentence-end junk
- **a testament to** → delete
- **a tapestry of** → delete
- **a journey** → delete (unless literally a journey)
- **stands out** → delete
- **at its core** → delete
- **at the end of the day** → delete

## Voice rules

### Concrete over abstract

Bad: "Our team uses high-quality materials to ensure a beautiful finish."
Good: "We install Schluter-Kerdi waterproofing and porcelain tile from Olympia Tile."

Bad: "Bathroom renovations take varying amounts of time depending on scope."
Good: "A standard ensuite renovation takes 14–18 working days. Add 3–5 days for floor-to-ceiling tile, 5–7 for moving the toilet drain."

Bad: "Many homeowners struggle to find a reliable contractor."
Good: "We get 4 referrals a month from homeowners who fired their first contractor mid-project."

The pattern: **replace vague qualifiers with specific numbers, brands, names, dates, examples.**

### Sentence length variance

AI writes in metronomic, similar-length sentences. Humans don't.

Read your draft aloud. If every sentence sounds like the last one, break the rhythm:
- One short fragment. Like this.
- One long sentence that takes its time and contains a comma or two, the kind of sentence a person writes when they have something to actually explain.
- A medium sentence in between.

Target: 30–40% short (≤10 words), 40–50% medium (11–25 words), 10–20% long (>25 words), and an occasional 1–3 word fragment for punch.

### Active voice, first person where the business shows up

- "We pulled the permit, drew the layout, and finished framing in three days." (We did things.)
- Not: "The permit was pulled and the layout drawn before framing was completed."

### One claim per sentence

If you can split a sentence into two without losing meaning, split it.

Bad: "We use premium materials and have over 15 years of experience and offer a 5-year warranty."
Good: "We've been doing this since 2009. Every project comes with a 5-year warranty."

### Show, don't tell

Bad: "Our crew is highly experienced."
Good: "Our lead carpenter Vlad has framed 400+ bathrooms."

Bad: "We provide a transparent quoting process."
Good: "You get an itemised quote on a single page: demo, framing, plumbing, electrical, tile, fixtures, paint, cleanup. No 'miscellaneous' line."

### Avoid hedging

AI hedges constantly. Cut hedges unless they're factually required.

- "may" → "is" (if true) or delete
- "might" → "is" (if true) or delete
- "could potentially" → "can"
- "approximately" → drop, give a range instead ("3–4 weeks")
- "typically" → keep only if genuinely variable

## Structure rules

### Skip the closing summary

Don't write "In summary," "To conclude," or a recap paragraph. Just end on your last real point. If the article needs a CTA, write a real CTA — not a summary disguised as one.

### Don't open with the topic

Bad: "Bathroom renovations in Mississauga are an exciting project for many homeowners."
Good: "You probably already know the layout you want. The question is what it'll cost."

The opening should be a hook, a question, a specific scenario, or a counter-intuitive claim. Not a topic restatement.

### Avoid the bullet-list reflex

AI defaults to bullets for everything. Prose is often better for arguments, narratives, and reasoning. Reserve bullets for genuinely parallel items (lists of features, steps, options).

Test: if you can write the bullet list as a sentence with commas and it reads naturally, write it as prose.

### Em-dash usage

Em-dashes (—) are fine — humans use them — but AI overuses them. Limit to 1–2 per page. Use commas, parentheses, or a period instead.

### Numbers and dates

Use Arabic numerals for anything quantitative ("3 weeks", "$25,000", "4 weeks"). Spell out only when starting a sentence or in casual phrasing ("a couple of weeks").

Be specific with dates: "in 2026" beats "recently"; "since 2009" beats "for years."

## Voice tests

Before shipping a piece of content, run these:

1. **Read aloud**: Does it sound like something a person would say? If you'd never say it out loud, rewrite.
2. **Word-count test**: Does any paragraph have all sentences within 3 words of each other? Break the rhythm.
3. **Specificity sweep**: Find every adjective. Could you replace it with a number, brand, name, or date? Do it.
4. **AI-detector spot check**: Paste a paragraph into a free AI detector (originality.ai, GPTZero) — if it scores >50% AI, rewrite.
5. **First-paragraph test**: Does it open with a hook, scenario, question, or specific claim? Or does it restate the topic? Rewrite if it's the latter.
6. **Closing-summary check**: Does it end with "in summary" or a recap? Delete that paragraph.

## Local voice (regional adjustments)

For Canadian English content:
- "favour" not "favor", "colour" not "color", "honour" not "honor"
- "centre" not "center" (mostly), but accept either
- "renovations" plural is fine in headings
- Use named neighborhoods, suburbs, postal-code areas — they signal local presence to both humans and Google

For service-business voice:
- Use "we" not "our team" (less corporate)
- Use the founder/owner's first name occasionally if they're operationally involved
- Reference specific tools, brands, suppliers used — proves you're not just a referral marketer

## Examples

### Before (AI-ish)
"Our team of expert contractors leverages cutting-edge technology and innovative techniques to deliver comprehensive bathroom renovations that transform your space into a vibrant, modern oasis. We ensure every project is completed seamlessly, fostering a stress-free experience for our valued clients."

### After (human)
"We do bathrooms. Our crew installs Schluter waterproofing, sets large-format porcelain, and rough-ins the plumbing without hiring a sub. Most ensuites are done in 14–18 working days. You get one quote upfront with every line item priced — no surprise change orders."

The "after" is 47 words. The "before" is 49. Roughly the same length. Completely different voice.

_Added 2026-06-06: initial draft based on observed AI tells in renovation-industry content._
