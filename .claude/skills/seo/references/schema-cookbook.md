# Schema cookbook

JSON-LD recipes for schema.org markup. Copy, adapt, paste. Validate every block at <https://search.google.com/test/rich-results> before deploying.

All examples use the JSON-LD format. Place blocks inside `<script type="application/ld+json">` tags in `<head>` or just before `</body>`.

## Quick reference: which schema per page type

| Page type | Required | Recommended additions |
|---|---|---|
| Homepage | `Organization` or `LocalBusiness` | `WebSite` with `SearchAction`, `BreadcrumbList` |
| City-service page | `Service`, `FAQPage`, `BreadcrumbList` | `LocalBusiness` (only if it's a primary service area) |
| Near-me hub | `LocalBusiness`, `FAQPage`, `BreadcrumbList` | `Service` |
| Service top-level | `Service`, `FAQPage`, `BreadcrumbList` | `AggregateRating` if reviews exist |
| Project / case study | `Article` or `CreativeWork`, `BreadcrumbList` | `ImageObject` per gallery image |
| Blog / guide | `Article` or `BlogPosting`, `BreadcrumbList` | `FAQPage` for inline FAQ, `HowTo` if step-by-step |
| Comparison post | `Article`, `BreadcrumbList` | none |
| FAQ page | `FAQPage` | `BreadcrumbList` |
| Product (ecom) | `Product`, `BreadcrumbList` | `Offer`, `AggregateRating`, `Review` |
| Contact | `LocalBusiness` | `BreadcrumbList` |

## Service

For service/category pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Bathroom Renovation",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Osoba Renos & Design",
    "url": "https://osobarenos.ca/"
  },
  "areaServed": [
    { "@type": "City", "name": "Mississauga" },
    { "@type": "AdministrativeArea", "name": "Peel Region" },
    { "@type": "Place", "name": "Port Credit" },
    { "@type": "Place", "name": "Streetsville" },
    { "@type": "Place", "name": "Erin Mills" },
    { "@type": "AdministrativeArea", "name": "Greater Toronto Area" }
  ],
  "url": "https://osobarenos.ca/bathroom-renovation-mississauga/"
}
```

### areaServed rules
- Use `City` for the primary city
- Use `Place` for sub-neighborhoods
- Use `AdministrativeArea` for region/county/metro
- 4–8 entries is the sweet spot; more is noise, less is thin

### Optional `Service` fields

- `priceRange`: `"$$"` or `"$25,000–$40,000"` — surfaces in some SERP features
- `hasOfferCatalog` with `OfferCatalog` listing specific sub-services — for sites with many bundled services
- `aggregateRating` — see AggregateRating section below

## FAQPage

For pages with a FAQ section. Required for AI-engine quotability.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a basement renovation cost in Mississauga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Mississauga basement renovations range from $25,000 to $40,000, depending on finishes, flooring, bathroom addition, and any structural or electrical upgrades."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a building permit for a basement renovation in Mississauga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — basement finishing in Mississauga requires a City of Mississauga building permit..."
      }
    }
  ]
}
```

### Rules
- Answers must be **plain text strings**, not HTML or React nodes
- Each answer: 40–80 words is the sweet spot for AI extraction
- Question text matches the visible question on the page exactly
- 4–8 questions per page — more dilutes signal
- Don't repeat the same answer across pages (Google flags duplicate)

## LocalBusiness

For homepages, contact pages, near-me hubs, and any page where the business location matters.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Osoba Renos & Design",
  "url": "https://osobarenos.ca/",
  "telephone": "+1-647-562-4275",
  "email": "osobarenos@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3819 Forest Bluff Crescent",
    "addressLocality": "Mississauga",
    "addressRegion": "ON",
    "postalCode": "L5N 7T8",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.5890,
    "longitude": -79.7090
  },
  "openingHours": "Mo-Sa 08:00-18:00",
  "priceRange": "$$",
  "image": "https://osobarenos.ca/images/hero/home-hero-desktop-1920.jpg",
  "areaServed": [
    { "@type": "City", "name": "Toronto" },
    { "@type": "City", "name": "Mississauga" }
  ],
  "sameAs": [
    "https://www.facebook.com/...",
    "https://www.instagram.com/...",
    "https://www.yelp.ca/biz/...",
    "https://g.co/kgs/..."
  ]
}
```

### LocalBusiness subtypes

Use more specific subtypes where applicable (better SERP eligibility):
- `HomeAndConstructionBusiness` → for contractors, renovators
- `GeneralContractor` → for general contractors specifically
- `Plumber`, `Electrician`, `Roofer`, etc. → for specialty trades
- `Restaurant`, `Store`, `Dentist`, etc. for other verticals

### NAP rules

`name`, `address`, and `telephone` must be **byte-identical** across:
- Homepage schema
- Every page that has LocalBusiness schema
- Google Business Profile listing
- Every third-party directory citation

Even a `St` vs `Street` mismatch can hurt local rankings. See [nap-citations.md](nap-citations.md).

## BreadcrumbList

Every non-homepage. Emitted by the breadcrumb component on the page.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://osobarenos.ca/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://osobarenos.ca/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Bathroom Renovation Mississauga"
    }
  ]
}
```

### Rules
- The final item (current page) has **no `item`** property — only `name`
- All other items have `item` with absolute URL (with trailing slash matching site convention)
- `position` is 1-indexed
- Order: parent → child, never deeper than 5 levels

## AggregateRating + Review

For pages with real reviews. **Never fabricate.** Schema with fake reviews is search fraud.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Osoba Renos & Design",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah K."
      },
      "datePublished": "2026-03-15",
      "reviewBody": "They finished our ensuite in 3 weeks flat..."
    }
  ]
}
```

### Rules
- `reviewCount` must match the count of reviews you actually have (across Google, Yelp, your site — be honest about scope)
- `ratingValue` must match what's calculable from those reviews
- `review` array can be a subset (5–10 best) but the aggregate must reflect the full set
- Each `Review` needs real reviewer name + real date + real text — copy from the actual review platform

## Article / BlogPosting

For blog posts and guides.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Choose a Renovation Contractor in Toronto: 7 Key Questions",
  "description": "Seven questions to ask before hiring a renovation contractor in Toronto: licensing, insurance, crew, scope, timeline, payments, and communication.",
  "image": "https://osobarenos.ca/images/blog/choose-contractor/hero-1280.jpg",
  "datePublished": "2026-01-15T00:00:00Z",
  "dateModified": "2026-06-06T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Leo Tkachenko",
    "url": "https://osobarenos.ca/about/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Osoba Renos & Design",
    "logo": {
      "@type": "ImageObject",
      "url": "https://osobarenos.ca/logo.png"
    }
  },
  "mainEntityOfPage": "https://osobarenos.ca/how-to-choose-renovation-contractor-toronto-7-questions/"
}
```

### Rules
- `dateModified` updated whenever content materially changes
- `image` must be an absolute URL, ≥1200×630 px ideally
- `author` is a person; `publisher` is an organization (logo required for `publisher`)

## HowTo

For step-by-step tutorials. Eligible for rich-result rendering in SERPs.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Prepare for a Bathroom Renovation",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Measure the space",
      "text": "Measure the bathroom in inches from wall to wall, ceiling to floor."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Photograph the existing layout",
      "text": "Take wide and detail shots from all four corners."
    }
  ]
}
```

### Rules
- `totalTime` in ISO 8601 duration format (`PT2H` = 2 hours, `PT30M` = 30 minutes)
- Steps in order
- Each step: 1–3 sentences

## Product

For ecommerce. Skip for service businesses.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://example.com/product.jpg",
  "description": "Product description.",
  "sku": "SKU-12345",
  "brand": { "@type": "Brand", "name": "Brand" },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product/",
    "priceCurrency": "CAD",
    "price": "299.99",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "23" }
}
```

## Organization (with sameAs)

For homepage. Strengthens entity recognition with AI engines.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Osoba Renos & Design",
  "url": "https://osobarenos.ca/",
  "logo": "https://osobarenos.ca/logo.png",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61556571587046",
    "https://www.instagram.com/osobarenos/",
    "https://www.yelp.ca/biz/osoba-renos-and-design-mississauga",
    "https://g.co/kgs/HYwcg7K"
  ]
}
```

## VideoObject

For embedded video.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video title",
  "description": "Description of the video content.",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "uploadDate": "2026-04-01T00:00:00Z",
  "duration": "PT3M24S",
  "contentUrl": "https://example.com/video.mp4",
  "embedUrl": "https://www.youtube.com/embed/XXXX"
}
```

## CreativeWork (portfolio / project case study)

For project or case-study pages where the page documents a built work (interior design, architecture, branding), not an article. Use `CreativeWork` with one `ImageObject` per gallery image.

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Casa Lumière",
  "headline": "Casa Lumière — Mediterranean Modern residential interior in Toronto",
  "description": "A light-soaked residence where Mediterranean warmth meets Canadian restraint.",
  "url": "https://yadesign.studio/projects/casa-lumiere/",
  "dateCreated": "2025",
  "image": [
    { "@type": "ImageObject", "url": "https://yadesign.studio/assets/cover.jpg", "caption": "...", "width": 1080, "height": 1920 }
  ],
  "locationCreated": { "@type": "Place", "name": "Toronto, Canada" },
  "creator": { "@type": "Organization", "name": "YaDesign Inc.", "url": "https://yadesign.studio/" },
  "about": ["Interior Design", "Mediterranean Modern", "Residential"],
  "keywords": "Mediterranean Modern, residential interior design, Toronto interior designer"
}
```

- Dedupe the cover against `gallery[0]` (they're often the same file) before mapping to `ImageObject`s.
- `image` URLs must be absolute — bundled asset imports resolve to a root-relative path (`/assets/…`); wrap with a `toAbs()` helper.

## CollectionPage + ItemList (portfolio / archive index)

For a "/projects", "/work", or blog-archive index page. Pairs with the `BreadcrumbList` the breadcrumb component already emits.

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Interior Design Projects",
  "url": "https://yadesign.studio/projects/",
  "isPartOf": { "@type": "WebSite", "name": "YaDesign Inc.", "url": "https://yadesign.studio/" },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 4,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": "https://yadesign.studio/projects/casa-lumiere/", "name": "Casa Lumière" }
    ]
  }
}
```

_Added 2026-06-28: CreativeWork for portfolio case studies + CollectionPage/ItemList for archive index pages. Watch for rich body copy that lives in the data file but is never rendered on the page — surfacing it is a free indexable-content win._

## Combining multiple schemas on one page

Put each block in its own `<script type="application/ld+json">` tag. Don't merge them into one array unless they're genuinely the same type.

Example for a city-service page:
```html
<script type="application/ld+json">{ "@type": "Service", ... }</script>
<script type="application/ld+json">{ "@type": "FAQPage", ... }</script>
<script type="application/ld+json">{ "@type": "BreadcrumbList", ... }</script>
```

## Validation checklist

Before deploying any page with new schema:

1. Paste the rendered page URL into <https://search.google.com/test/rich-results>
2. Confirm: no errors, no warnings (warnings are OK for optional fields you don't need)
3. Confirm: the schema types you expected are detected
4. Test in incognito with cache cleared
5. After deployment, monitor Search Console "Enhancements" report for any new errors

## Common schema mistakes

- ❌ Building a URL string with `+` concatenation that produces double slashes
- ❌ Missing `@context` (most common parser failure)
- ❌ `image` URLs that are relative instead of absolute
- ❌ `dateModified` earlier than `datePublished` (invalid)
- ❌ FAQ `text` containing HTML tags (use plain text only)
- ❌ Schema for content not visible on the page (Google flags as deceptive)
- ❌ Multiple competing `LocalBusiness` blocks with different addresses
- ❌ `priceRange` as a number instead of a string (`"$$"` not `2`)
- ❌ `telephone` not in international format (`+1-647-562-4275` not `647-562-4275`)

_Added 2026-06-06: initial extraction + expansion with all common schema types._
