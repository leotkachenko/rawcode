# NAP + citations

NAP = **N**ame, **A**ddress, **P**hone. The foundation of local SEO. Inconsistent NAP across the web tanks local rankings.

## The byte-identical rule

Your business NAP must be **byte-identical** across every place it appears.

### Required places

1. Homepage (visible + schema)
2. Contact page (visible + schema)
3. Footer (every page)
4. About page
5. `LocalBusiness` JSON-LD on every page that has it
6. Google Business Profile listing
7. Yelp, BBB, HomeStars, Houzz, industry-specific directories
8. Social profiles (Facebook, Instagram, LinkedIn)
9. Any third-party citation (news mention, blog mention, directory listing)

### What "byte-identical" means

Even small differences hurt:

- ❌ "3819 Forest Bluff Crescent" vs "3819 Forest Bluff Cres."
- ❌ "Mississauga, ON" vs "Mississauga, Ontario"
- ❌ "L5N 7T8" vs "L5N7T8" (no space)
- ❌ "+1 (647) 562-4275" vs "(647) 562-4275" vs "647-562-4275"
- ❌ "Osoba Renos" vs "Osoba Renos & Design"

Pick one canonical form. Document it. Use it everywhere.

### Canonical NAP for Osoba Renos & Design

```
Name:    Osoba Renos & Design
Address: 3819 Forest Bluff Crescent, Mississauga, ON L5N 7T8, Canada
Phone:   +1-647-562-4275
Display: 647-562-4275
Email:   osobarenos@gmail.com
```

For JSON-LD use `+1-647-562-4275` (E.164 international format).
For display in HTML use `647-562-4275` or `(647) 562-4275` — pick one display form.

## Why it matters

Google's local algorithm cross-references citations across the web to confirm:
1. The business is real
2. The business location is what you claim
3. The business is still operating

Inconsistent citations confuse the algorithm:
- "Is this two different businesses?"
- "Did they move?"
- "Are they still open?"

The result: lower local pack rankings, missing Knowledge Panel data, worse `Place` results in Google Maps.

## Citation building strategy

For a new local business, build citations in this order:

### Tier 1 (required)

| Platform | Notes |
|---|---|
| Google Business Profile | The single most important. Claim, verify, fill 100%. |
| Bing Places | Second-most-important for citation building. |
| Apple Maps Connect | Required for iOS Maps + Siri results. |
| Facebook Business Page | Cross-platform citation. |

### Tier 2 (high value)

| Platform | Notes |
|---|---|
| Yelp | Declining but indexed. Build a basic listing. |
| BBB (Better Business Bureau) | Strong trust signal even when most users don't visit. |
| Industry directory | The biggest one in your vertical (e.g. HomeStars for contractors, Avvo for lawyers). |
| LinkedIn Company | Required for B2B; useful for B2C. |
| Instagram | Citation if NAP appears in bio. |

### Tier 3 (long tail)

Dozens of niche directories per industry. For contractors in Canada:
- Renomark
- Houzz (also a portfolio site)
- Trustedpros
- Reno-Mark
- Industry trade association directories (e.g. local builders' associations)

Don't pay aggregators ("we'll submit to 200 directories") — most are spam, and bad citations harm rankings.

## Google Business Profile in depth

### Required fields

- Business name (exactly as canonical)
- Address (or service-area-only for businesses without storefront)
- Phone
- Website
- Business hours
- Categories (primary + 9 secondary max)
- Services (specific service list)
- Attributes (online appointments, accessibility, etc.)
- At least 3 photos (logo, cover, interior or work samples)

### Categories

Pick the most specific primary category that matches your business:
- ❌ "Construction Company" (too broad)
- ✅ "General Contractor"
- ✅ "Bathroom Remodeler"

Add secondary categories for adjacent services you provide:
- "Kitchen Remodeler"
- "Basement Remodeler"
- "Tile Contractor"

### Services

List specific services with descriptions. These appear in Google's local pack:
- Bathroom Renovation (Mississauga, Toronto, Etobicoke)
- Basement Renovation (Mississauga, Toronto, Etobicoke)
- Condo Renovation (Toronto, Mississauga)
- Kitchen Renovation
- Full Home Renovation

### Posts

Post regularly — at least weekly. Updates show in local pack and prompt re-crawling:
- Project completions
- Seasonal promotions
- Educational content (mini-blog format)
- Events

### Reviews

- Ask every satisfied customer for a Google review
- Respond to every review (positive and negative) within 48 hours
- Don't incentivize reviews (against GBP policy)
- Don't fake reviews (will be detected and result in profile suspension)

### Photos

- Add new photos monthly
- Real photos (not stock or AI-generated)
- Mix interior, exterior, completed projects, team
- Geotag photos when possible

### Q&A

Pre-populate common questions. Answer questions promptly. Q&A content is indexed and surfaced in some AI engines.

## Service-area businesses (no storefront)

For businesses that travel to customers (contractors, plumbers, mobile groomers):

- GBP supports "service area" listings with no public address
- Hide address, show service-area cities instead
- For NAP citations elsewhere, the address can still be your business HQ — but mark address-private wherever the directory supports it
- Some directories require an address — use HQ or registered business address

Don't list a fake storefront address. Google verifies via postcard or video and removes fake listings.

## Local landing pages and NAP

Every service-area page (city-service variants) should display NAP:

- In the contact section
- Optionally in the page-specific `LocalBusiness` JSON-LD (use the same NAP — don't make up local "branches")

Don't create fake "branches" with separate addresses to rank in multiple cities. Google penalizes this aggressively.

## Citation audit

Periodically audit your citations:

### Tools

- Moz Local
- BrightLocal
- Whitespark
- Yext (heavier, enterprise)

### Manual audit

Search:
- `"Your Business Name"` (with quotes) on Google
- `"Your phone number"` (in various formats)
- `"Your address"` (various forms)

Cross-reference results. Flag inconsistencies. Correct in order of authority (Tier 1 first, then Tier 2).

### What to fix
- Phone number mismatches (most common — businesses change numbers)
- Address mismatches (moves)
- Old business names
- Duplicate listings (claim and merge)
- Listings with no website link
- Listings with wrong category

## Citations and AI search

LLM search engines increasingly source from:
- Google Business Profile data
- Yelp business pages
- BBB profiles
- Wikipedia (for larger businesses)
- Industry directories

Strong citations across these platforms = the AI engine knows what your business is and can cite it. Weak/inconsistent citations = the AI engine can't confidently mention you.

## Anti-patterns

- ❌ Multiple business names ("Osoba Renos", "Osoba Renos & Design", "Osoba Renovations") — pick one canonical, retire the rest
- ❌ Different phone numbers on different pages (call tracking can do this, but only via routing — display same number)
- ❌ Address listed in some places, hidden in others
- ❌ Fake branch offices in other cities
- ❌ Buying citation packages from "rank in 200 directories" services (mostly spam, often harmful)
- ❌ Listings on directories that are dead / unmaintained / spam (don't help, can hurt)
- ❌ Ignoring negative reviews instead of responding professionally

## Cross-platform consistency check

After updating any NAP detail, sweep:

1. Website (homepage, contact, footer, schema)
2. Google Business Profile
3. Bing Places
4. Apple Maps Connect
5. Tier 2 directories
6. Tier 3 directories
7. Social profiles
8. Recent press mentions / blog mentions (request updates where possible)

This is a multi-day project after a real change (move, rename, number change). Plan for it.

_Added 2026-06-06: initial extraction from local-seo-pages agent + expanded with GBP detail and AI-search implications._
