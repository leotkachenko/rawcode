# Content hierarchy

How to structure headings, semantic HTML, and document flow so both Google and LLM crawlers parse the page correctly. Hierarchy is the skeleton; everything else hangs off it.

## H1 rules

- **Exactly one H1 per page.** Multiple H1s confuse parsers (older Googlebot, all LLMs).
- **Primary keyword phrase verbatim.** What the page is about.
- **Placement**: visually the first heading on the page (hero section). HTML order matters more than visual placement.
- **Length**: 4–10 words. Long enough to communicate, short enough to scan.
- **No site name in H1.** That's what the title tag is for.

### H1 patterns

| Page type | H1 pattern | Example |
|---|---|---|
| Service | `[Service]` or `[Service] in [Region]` | "Bathroom Renovation in Toronto & GTA" |
| City-service | `[Service] in [City]` | "Bathroom Renovation in Mississauga" |
| Near-me hub | `[Service] Near Me — [Region]` | "Bathroom Renovations Near Me — Toronto, Mississauga & GTA" |
| Blog post | Natural-language question or claim | "How to Choose a Renovation Contractor in Toronto: 7 Key Questions" |
| Project | Project name + location | "Midtown Toronto Luxury Penthouse Renovation" |
| Category hub | `[Category]` | "Renovation Services" |
| Homepage | Brand value prop with keyword | "№1 Home Remodeling Contractors In Toronto & GTA" |

## H2 rules

H2s mark major sections of the page. They're the table of contents.

- **3–7 H2s** per long-form page (service, blog post)
- **1–4 H2s** per short page (contact, project detail)
- **Each H2 can include a secondary keyword** — but naturally, not stuffed
- **Phrase as labels, not full sentences** — "Recent Projects", not "Here Are Some of Our Recent Projects"

### Typical H2 set for a city-service page

1. (Hero is H1)
2. "[Intro statement]" (often the only H2 above the fold)
3. "Recent [Service] Projects"
4. "Why Choose Us"
5. "[Service] Features" or "What's Included"
6. (Optional) "Neighbourhoods We Serve"
7. "[Service] FAQ — [City]"
8. "Contact"

### Typical H2 set for a blog post

1. (H1 = post title)
2. "Table of Contents" (optional, can be H2 or just a list)
3. Section 1 H2
4. Section 2 H2
5. ...
6. "FAQ" (optional)
7. "Conclusion" or "Related posts" (skip conclusion per [humanization.md](humanization.md))

## H3 rules

H3s are sub-sections of H2s. They support natural-language phrasings and long-tail keyword targeting.

- **Used when** an H2 section has 2+ distinct sub-topics
- **Phrasing**: full sentences or natural questions ("How much does a bathroom renovation cost in Mississauga?")
- **For FAQ items**: use H3s, not bold spans. Schema FAQPage requires Question/Answer pairs that are typically parsed from heading + paragraph structure.

### H3 in neighborhoods grid

When using a "Neighbourhoods we serve" section, each card's heading should be H3:
- H2: "Mississauga neighbourhoods we serve"
- H3 (per card): "Renovation contractor in Port Credit"

This captures sub-area queries in the heading hierarchy.

## H4–H6

Use sparingly. Most pages don't need them.

- **H4** for sub-sub-sections (rare; usually a sign the section is too dense)
- **H5, H6** almost never needed — use them only if there's genuine hierarchy

Don't use H4–H6 for styling smaller text. Use CSS for that.

## Heading hierarchy mistakes

- ❌ **Skipping levels** (H1 → H3 with no H2 between)
- ❌ **Multiple H1s** on one page
- ❌ **H1 inside an `<article>` that's inside another article with its own H1** (in modern HTML5, multiple H1s in sectioning contexts is technically allowed, but Google still prefers one per page)
- ❌ **Using headings for visual styling** (e.g. making something an H4 because you want smaller text)
- ❌ **Heading that's an image** (text in an image isn't indexable — use real text)
- ❌ **Heading with only generic text** ("Welcome", "Learn More", "Click Here")

## Semantic HTML structure

Beyond headings, the HTML structure itself matters for parsability.

### Page-level structure

```html
<header>
  <!-- site logo, primary nav -->
</header>

<main>
  <article>  <!-- or <section> for non-article content -->
    <header>
      <!-- page-specific intro, breadcrumbs -->
      <h1>...</h1>
    </header>

    <section>
      <h2>...</h2>
      ...
    </section>

    <section>
      <h2>...</h2>
      ...
    </section>

    <footer>
      <!-- article-specific footer: author, date, share -->
    </footer>
  </article>
</main>

<footer>
  <!-- site-wide footer -->
</footer>
```

### What goes in what

| Element | Use for |
|---|---|
| `<header>` | Page or article chrome (logo, nav, title) |
| `<nav>` | Navigation menus (primary, secondary, breadcrumbs) |
| `<main>` | The unique content of this page; only one per document |
| `<article>` | Self-contained content (blog post, project case study, FAQ entry) |
| `<section>` | Thematic grouping inside an article or main |
| `<aside>` | Tangentially related content (sidebar, callout box) |
| `<footer>` | Site or article footer (links, attribution, related) |
| `<figure>` + `<figcaption>` | Images with captions |
| `<dl>` + `<dt>` + `<dd>` | Definition lists (good for glossaries, term:meaning pairs) |
| `<details>` + `<summary>` | Native collapsible (used for FAQ accordions) |
| `<table>` + `<thead>` + `<tbody>` + `<th>` + `<td>` | Data tables (not for layout) |

### Anti-patterns

- ❌ `<div>` soup 6+ levels deep when semantic elements would do
- ❌ `<table>` for layout (Google ignores these; humans on screen readers can't navigate them)
- ❌ ARIA roles substituting for semantic elements (`role="article"` on a div instead of just using `<article>`)
- ❌ Heading elements used for visual styling

## Lists

### When to use which

- **Ordered list** (`<ol>`) — when sequence matters (steps, ranked items)
- **Unordered list** (`<ul>`) — when sequence doesn't matter (features, options, criteria)
- **Definition list** (`<dl>`) — when each item has a term + definition pair

### Avoid the bullet-list reflex

See [humanization.md](humanization.md). Bullets are right for genuinely parallel items. Prose is better for arguments, narratives, and reasoning.

## Tables

Use real `<table>` markup for tabular data. Don't fake it with divs.

```html
<table>
  <thead>
    <tr>
      <th scope="col">Service</th>
      <th scope="col">Typical cost</th>
      <th scope="col">Timeline</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Bathroom renovation</th>
      <td>$12,000–$20,000</td>
      <td>2–4 weeks</td>
    </tr>
  </tbody>
</table>
```

Tables are highly liftable by AI engines. Use them where appropriate.

## TL;DR / summary boxes

For long content, an above-fold TL;DR helps both humans and AI parsers extract the key claim.

```html
<aside class="tldr">
  <h2>TL;DR</h2>
  <p>Full home renovations in Mississauga cost $80,000–$250,000, take 6–12 weeks, and require a City of Mississauga building permit.</p>
</aside>
```

This is also a citable block for LLMs.

## Anchor links and IDs

For long content, add IDs to H2s so users (and AI engines) can deep-link.

```html
<h2 id="cost">How much does it cost?</h2>
```

IDs should be:
- Lowercase
- Hyphen-separated
- Short
- Stable (don't change them once published — breaks external deep links)

A table of contents at the top of long posts:

```html
<nav aria-label="Contents">
  <ul>
    <li><a href="#cost">How much does it cost?</a></li>
    <li><a href="#timeline">How long does it take?</a></li>
    <li><a href="#permits">What permits are required?</a></li>
  </ul>
</nav>
```

## Reading order

The visual reading order on the page should match the DOM order. Don't use CSS positioning to put content visually first while it appears later in the HTML — both screen readers and LLMs read DOM order, and rearranging hurts both.

_Added 2026-06-06: initial draft. Will expand with examples from real audited pages._
