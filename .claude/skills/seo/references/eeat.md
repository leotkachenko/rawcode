# E-E-A-T

Experience, Expertise, Authoritativeness, Trust. Google's quality framework. Critical for YMYL verticals (Your Money or Your Life — health, finance, legal) and increasingly weighted for trade/contractor/service sites.

LLM search engines also weight these signals heavily — they need to know which sources to trust.

## The four pillars

### Experience
Has the author or business actually done this thing?
- Project case studies with photos, dates, addresses (or neighborhoods)
- First-person accounts ("On the Etobicoke job in March, we hit a stack vent we hadn't planned for...")
- Before/after galleries
- Crew bios with years on the job

### Expertise
Does the author/business demonstrate technical knowledge?
- Specific brand names of tools and materials used
- Correct use of trade terminology
- Citations of code requirements (building code section, electrical bulletin)
- Process details that only an expert would know

### Authoritativeness
Is the author/business recognized in their field?
- Industry certifications (Renomark, BBB Accreditation, manufacturer-authorized installer)
- Press mentions, awards
- Backlinks from authoritative sites (other contractors, trade associations, news)
- Inclusion in industry directories

### Trust
Can users trust this business?
- HTTPS, no security warnings
- Real business address, phone, email
- Visible license number
- Insurance + bonding amounts
- Real reviews on independent platforms
- Privacy policy, terms of service
- Refund/warranty policy
- No deceptive practices (no fake reviews, no bait pricing, no clickbait)

## Required E-E-A-T elements per page type

### Homepage
- Business name + tagline
- Logo
- NAP visible above fold (or in immediate footer)
- License # or "Licensed and insured" claim
- Review count / rating
- Years in business
- 3+ trust signals (certifications, awards, industry memberships)

### Service / city pages
- Real project examples with photos
- Specific brand names of materials/tools used
- Lead crew member named (humanizes)
- Process explanation
- Warranty terms
- Real testimonials

### Blog / guide posts
- Author byline with name and role
- `Person` schema linking author to credentials
- Publish date + last-modified date
- Sources/references where claims are based on data
- Reviewer (for medical/legal/financial content)

### Contact page
- Full NAP byte-identical to homepage
- Map embed
- Hours
- Multiple contact methods (phone, email, form)
- Response time commitment

## Credentials in body copy and schema

### Body copy
Drop credentials naturally into:
- About section / paragraph
- Footer
- Estimate request blurb ("All work is covered by $2M liability insurance and a 5-year workmanship warranty.")
- FAQ answers when relevant

### JSON-LD
For service businesses, add to `LocalBusiness` or `Service` schema:

```json
{
  "@type": "LocalBusiness",
  "name": "...",
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Renomark Certified Contractor",
      "credentialCategory": "Industry certification",
      "url": "https://renomark.ca/member/osoba-renos"
    }
  ],
  "knowsAbout": ["Bathroom renovation", "Basement finishing", "Condo renovation"],
  "yearsInBusiness": 17
}
```

`hasCredential` and `yearsInBusiness` aren't widely indexed yet but cost nothing and feed AI engines.

## Real photos vs stock

AI image detectors are increasingly used to flag stock/AI-generated photos as low-trust signals.

Use:
- ✅ Real before/after photos from actual jobs
- ✅ Real photos of the crew on real job sites
- ✅ Photos of the actual business location (storefront, sign, address visible)

Avoid:
- ❌ Stock photography of "happy homeowner with contractor"
- ❌ AI-generated room renders sold as "completed projects"
- ❌ Manufacturer stock photos of materials (use them in product pages, not project pages)

EXIF data: keep dates intact. Stripped EXIF is a minor flag.

## Reviews and ratings

### AggregateRating placement
- On homepage
- On every service page
- On every city-service page
- In LocalBusiness JSON-LD

### Where to source
- **Google Business Profile reviews** (most weight)
- **Yelp** (declining but still indexed)
- **HomeStars / Houzz** (industry-specific for contractors)
- **BBB** (declining trust value but counts)

### What to NEVER do
- ❌ Fabricate reviews (search fraud — domain can be blacklisted)
- ❌ Pay for reviews
- ❌ Cherry-pick only 5-star reviews and hide 1-star (violates FTC and platform TOS)
- ❌ Use a review widget that only shows 5-star ones
- ❌ Inflate review counts in schema (must match real platform counts)

### Review schema example

```json
{
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87",
    "bestRating": "5"
  }
}
```

Both `ratingValue` and `reviewCount` must be accurate to what's actually visible. Auditable.

## Author bylines

For blog/guide content, every post needs a human author.

```html
<article>
  <h1>Post title</h1>
  <div class="byline">
    By <a href="/about/" rel="author">Leo Tkachenko</a>
    · Updated <time datetime="2026-06-06">June 6, 2026</time>
  </div>
  ...
</article>
```

With JSON-LD:
```json
{
  "@type": "BlogPosting",
  "author": {
    "@type": "Person",
    "name": "Leo Tkachenko",
    "url": "https://osobarenos.ca/about/",
    "jobTitle": "Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Osoba Renos & Design"
    }
  }
}
```

The author's URL should link to an `/about/` page that has:
- Bio (1–3 paragraphs)
- Photo
- Credentials
- LinkedIn / other professional profiles via `sameAs`
- Other content authored by this person (internal links)

## Trust badges and logos

Order of effectiveness (most to least):

1. **Real review count + star rating** (e.g. "4.9 ★ from 87 Google reviews")
2. **Industry certifications with logos** (Renomark, BBB, manufacturer-authorized)
3. **Insurance/bonding amounts** ($2M liability, WSIB)
4. **License number visible**
5. **Years in business** (only if ≥5)
6. **Featured-in logos** (declining effectiveness; almost decorative now)

Place at least one trust signal above the fold (in hero or trust strip immediately after).

## YMYL extra requirements

For YMYL pages (health, finance, legal, safety, anything that could substantially affect well-being):

- **Medical reviewer / fact-checker** named with credentials
- **Citations to authoritative sources** (peer-reviewed journals, government sites, official bodies)
- **Disclaimer**: "This article is for informational purposes only and is not [medical/legal/financial] advice."
- **Last-reviewed date** alongside last-modified date
- **Author credentials prominently displayed** (MD, JD, CPA, P.Eng, etc.)

Trade/contractor content isn't strictly YMYL, but treat permit-related and safety-related content (electrical, plumbing, structural) with extra rigor — citing code sections, not vibes.

## Trust anti-patterns

- ❌ "Best contractor in [city]" without evidence
- ❌ Vague "we use only the best materials" without naming brands
- ❌ "Family-owned for generations" without naming the family or generation count
- ❌ Generic stock photos of suited "consultants"
- ❌ Hidden fees disclosed only in fine print
- ❌ Pressure tactics ("Only 2 spots left this month!" when not actually constrained)
- ❌ Fake countdown timers
- ❌ Reviews suspiciously all dated within the same week
- ❌ Reviews suspiciously all written in the same tone/length

Don't do any of these. Even if Google misses them, customers and AI engines won't.

_Added 2026-06-06: initial extraction from local-seo-pages agent + expanded with anti-patterns and YMYL._

## Conceptual / unbuilt portfolio pieces (AI renders, vision studies)

When a "project" is a concept or AI-rendered vision rather than a completed, client-commissioned build, do NOT borrow the voice of a finished case study (real client, "two years on it still runs", measured results) — that fabricates experience and trust signals (org anti-fabrication rule + YMYL-adjacent E-E-A-T). Instead, state plainly in the intro, body, and a dedicated FAQ that it's a concept/vision study and the images are renders, then say the design is buildable. You keep full SEO/Pinterest value (rich prose, captioned gallery, FAQPage schema, image-search filenames) without claiming a build that didn't happen. City can still be the studio's home base ("a concept from our Toronto studio") for the location cross-link — just don't imply a real address. Name concept images by depicted content + style, not city (the concept is location-agnostic).

_Added 2026-06-28: honesty framing for conceptual/AI-render portfolio entries, after the all-white "Maison Nuage" sculptural-minimalism concept._
