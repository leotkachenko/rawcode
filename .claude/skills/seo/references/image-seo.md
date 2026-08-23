# Image SEO

Images affect rankings four ways: image search (Google Images, Bing Visual), Core Web Vitals (LCP from hero, CLS from missing dimensions), E-E-A-T (real vs stock), and accessibility (alt text doubles as a screen-reader signal).

## Filename

Descriptive, keyword-relevant, hyphen-separated, lowercase.

### Pattern
`[service]-[location]-[detail].jpg`

### Examples
- ✅ `bathroom-renovation-toronto-walk-in-shower.jpg`
- ✅ `condo-kitchen-mississauga-port-credit-marble-island.jpg`
- ✅ `basement-renovation-etobicoke-before-after.jpg`
- ❌ `IMG_2384.jpg`
- ❌ `image1.jpg`
- ❌ `hero.jpg`
- ❌ `Bathroom_Renovation.jpg` (no underscores, no caps)
- ❌ `bathroom-renovation-2026-final-FINAL-v3.jpg`

### Rules
- Hyphens, not underscores
- Lowercase
- ASCII only (no accented characters)
- ≤80 characters total filename length
- Avoid version markers and dates in filenames

## Alt text

The `alt` attribute is read by:
- Screen readers (accessibility)
- Google Image Search (ranking signal)
- LLM crawlers (when image content matters)
- Browsers when image fails to load

### Rules

- **Describes the image** in 1 sentence
- **Includes 1 relevant keyword naturally** (don't stuff)
- **≤125 characters** (some readers cut off after that)
- **No "Image of..." or "Picture of..."** — screen readers already announce it's an image
- **Empty alt (`alt=""`) for decorative images** that add no information (icons, dividers, ornamental graphics)
- **Skip alt entirely** is a bug — always include the attribute, even if empty

### Examples

✅ `alt="Frameless glass walk-in shower with linear drain and large porcelain tiles in a Mississauga bathroom renovation."`

✅ `alt="Before and after of a basement waterproofing project showing exposed foundation and finished drywalled wall."`

❌ `alt="bathroom"`  (too vague — wasted opportunity)
❌ `alt="bathroom renovation toronto mississauga gta walk-in shower porcelain tile"` (keyword stuffed)
❌ `alt="Picture of a renovated bathroom"` (starts with "Picture of")

### Alt text for decorative images
```html
<img src="divider-line.png" alt="" />
```

## Width and height attributes

**Every `<img>` must have explicit width and height attributes.** Prevents CLS (Cumulative Layout Shift), which is a Core Web Vital and a ranking factor.

```html
<img
  src="/images/projects/midtown-toronto-luxury-penthouse-renovation/midtown-condo-living-dining-chevron-flooring-1152x1536.jpg"
  width="1152"
  height="1536"
  alt="Elegant living and dining room in Midtown Toronto penthouse featuring chevron hardwood flooring and skyline views."
  loading="lazy"
  decoding="async"
/>
```

The browser reserves the proportional space before the image loads. No layout shift.

### Common patterns

Some frameworks (Next.js Image, Astro Image) handle this automatically. Verify in rendered HTML — sometimes the abstraction omits the attributes.

For React projects using plain `<img>`:
- Store image dimensions in a utility (`src/utils/imageDimensions.js`)
- Helper function that reads dimensions from filename pattern (`...-1024x768.jpg`)
- Apply via spread: `{...dimensionsForSrc(src, IMAGE_DIM.PROJECT_CARD)}`

## Modern formats

Use WebP (or AVIF for cutting-edge) with JPEG fallback. WebP ~30% smaller than JPEG at same quality.

### `<picture>` with fallback

```html
<picture>
  <source srcset="/images/hero/bathroom-1280.avif" type="image/avif" />
  <source srcset="/images/hero/bathroom-1280.webp" type="image/webp" />
  <img
    src="/images/hero/bathroom-1280.jpg"
    width="1280"
    height="720"
    alt="..."
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

Most modern browsers handle WebP/AVIF natively. Fallback to JPEG covers ancient browsers and edge cases (some image scrapers).

## Responsive srcset

Don't serve a 1920w image to a 320w mobile viewport.

```html
<img
  src="/images/hero/bathroom-768.jpg"
  srcset="
    /images/hero/bathroom-768.jpg 768w,
    /images/hero/bathroom-1280.jpg 1280w,
    /images/hero/bathroom-1920.jpg 1920w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1280px"
  width="1280"
  height="720"
  alt="..."
/>
```

- `srcset` lists variants with their actual pixel widths
- `sizes` tells the browser how much display space the image will occupy at each viewport
- Browser picks the best variant given DPR and connection quality

## Lazy loading

`loading="lazy"` defers image load until the image is near the viewport. Improves initial page weight and LCP.

### Rules

- **All below-fold images**: `loading="lazy"`
- **Above-fold hero / LCP image**: `loading="eager"` + `fetchpriority="high"` (or omit `loading` attribute — default is eager)
- **Don't lazy-load the LCP image** — defeats the point

### Decoding

`decoding="async"` lets the browser decode the image off the main thread. Safe default for all images.

## LCP image preload

For the hero / LCP image, add a preload hint in `<head>`:

```html
<link
  rel="preload"
  as="image"
  href="/images/hero/bathroom-1280.jpg"
  fetchpriority="high"
/>
```

Or for responsive:

```html
<link
  rel="preload"
  as="image"
  href="/images/hero/bathroom-1280.jpg"
  imagesrcset="
    /images/hero/bathroom-768.jpg 768w,
    /images/hero/bathroom-1280.jpg 1280w,
    /images/hero/bathroom-1920.jpg 1920w
  "
  imagesizes="(max-width: 600px) 100vw, 1280px"
  fetchpriority="high"
/>
```

Don't preload more than 1–2 images per page — defeats the prioritization.

## Image sitemap

For sites with many images, include `<image:image>` entries in sitemap.xml:

```xml
<url>
  <loc>https://example.com/projects/bathroom-mississauga/</loc>
  <image:image>
    <image:loc>https://example.com/images/projects/bathroom-mississauga/walk-in-shower-1152x1536.jpg</image:loc>
  </image:image>
  <image:image>
    <image:loc>https://example.com/images/projects/bathroom-mississauga/double-vanity-1152x1536.jpg</image:loc>
  </image:image>
</url>
```

Auto-generate from project galleries; don't hand-maintain.

### Image sitemap rules
- Image URL must be absolute
- Image must be on the same domain as the page URL
- Up to 1,000 images per page entry
- Don't include hotlinked third-party images

## File size targets

Tighter is better, but aggressive compression visible in finishes (banding, blur) is worse than 100KB heavier file.

| Image type | Target file size |
|---|---|
| Hero image (1280–1920w) | 100–250 KB |
| Project gallery (1024–1152w) | 80–150 KB |
| Below-fold content (768–1024w) | 50–100 KB |
| Thumbnail (300–500w) | 20–50 KB |
| Logo (SVG preferred) | <10 KB |

Use a real compressor: ImageOptim, Squoosh, sharp (build-time), or a CDN-side optimizer (Cloudflare Images, Cloudinary).

## Image CDN considerations

If using a CDN with on-the-fly resizing:
- Confirm `srcset` URLs use the CDN's resizing parameters
- Set proper `Cache-Control` headers (1 year for versioned URLs)
- Confirm CDN serves WebP when browser accepts it (`Accept: image/webp`)

## EXIF and metadata

- **Keep EXIF dates** intact — minor E-E-A-T signal (real photos vs stock)
- **Strip GPS data** if it might reveal a customer's home address (privacy)
- **Strip camera model/serial** for security (rare but)

## Common image SEO bugs

- ❌ Image missing `width` and `height` (CLS regression)
- ❌ All images using `loading="lazy"` including the hero (LCP regression)
- ❌ Multiple images preloaded (defeats the priority)
- ❌ `srcset` with wrong width descriptors (browser picks wrong variant)
- ❌ Image URL in `srcset` doesn't actually exist (404s for some viewports)
- ❌ Alt text identical across many images on one page (parser confusion)
- ❌ Decorative image with descriptive alt (clutters screen-reader output)
- ❌ Image scaled in HTML/CSS without the resized source (downloads 1920w to display at 480w)
- ❌ Image format inconsistent with declared MIME type
- ❌ Image not in sitemap.xml when image search traffic matters

## Image search optimization

For pages that should rank in Google Image search:

- Use the image as part of the page content with surrounding text that describes it
- Include keyword in filename, alt, and surrounding text
- Caption the image (`<figcaption>`)
- Include image in sitemap with `<image:image>`
- Use `ImageObject` schema for important images:
  ```json
  {
    "@type": "ImageObject",
    "url": "https://example.com/image.jpg",
    "width": 1152,
    "height": 1536,
    "caption": "Frameless walk-in shower in Mississauga bathroom renovation"
  }
  ```

## Client media drops: HEIC → web pipeline

Client photos arrive as iPhone `.HEIC` — not web-renderable (Chrome/Firefox won't display it, Google won't index it). Convert with macOS-native `sips` (no node/imagemagick required):

```bash
sips -s format jpeg -Z 1600 -r 90 -s formatOptions 86 in.HEIC --out out.jpg
```

- `-Z 1600` caps the long edge (5712px originals → 1600); `formatOptions 86` ≈ quality 86.
- **Rotation gotcha:** iPhone HEICs often report `orientation: <nil>` yet come out sideways — `sips` doesn't bake the rotation. Convert one, view it, add `-r 90` (or 270) as needed. Re-read `pixelWidth/pixelHeight` *after* conversion and bake them into the filename (`-1200x1600.jpg`) so `dimensionsForSrc` can parse them for CLS.
- **Name from content, not IMG_1234:** view each frame, then name it descriptively + keyword-rich + location-first to match project convention (`{slug}-podium-freestanding-tub-1200x1600.jpg`). Filename drives auto-alt and is itself a signal.
- De-dupe any client "Before-After" subfolder against the main gallery by `md5` — they're often byte-identical picks, useful as the designated before/after pair for the process tabs.

## Video sitemap (`<video:video>`)

Self-hosted project films get a `<video:video>` block alongside `<image:image>` in the same `<url>`:

```xml
<url>
  <loc>https://example.com/projects/x/</loc>
  <video:video>
    <video:thumbnail_loc>https://example.com/images/projects/x/poster.jpg</video:thumbnail_loc>
    <video:title>...</video:title>
    <video:description>...</video:description>
    <video:content_loc>https://example.com/images/projects/x/film.mp4</video:content_loc>
    <video:duration>72</video:duration>
  </video:video>
</url>
```

- Add `xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"` to `<urlset>` only when ≥1 video present.
- `<video:duration>` is **integer seconds** (1–28800) — NOT ISO 8601. (VideoObject JSON-LD wants ISO 8601, e.g. `PT1M12S` — store seconds once, convert per consumer.)
- title/description are prose → XML-escape them (`& < > " '`), unlike URL paths.

## Filename-derived alt text (centralized galleries)

When alt text is auto-derived from filenames (large project galleries), the filenames usually embed the full project name as a prefix — so a naive "strip dimensions/hyphens → words" transform makes every photo on the page share the same ~50-char lead with the unique detail buried at the end. That trips the "alt text identical across many images" anti-pattern above.

Fix in the derivation function, not the data: strip the repeated project-title prefix (token-by-token match against the normalized title), **front-load the distinguishing detail**, then append the project for context, capped at 125 chars — `"Staircase rebuild — Pearl of Picton Mansion Restoration"`. Keep the old capitalized-stem behaviour when the filename doesn't share the title prefix (no regression). Extract such helpers to a plain util so they're unit-testable without bundling React (`node:test`, zero deps — repo has no other test runner).

_Added 2026-06-06: initial extraction from local-seo-pages agent + expanded with file size targets, CDN, image sitemap detail._
_Added 2026-06-22: HEIC→web sips pipeline (rotation + dimension-in-filename), content-based naming, and video sitemap, after the luxury Mississauga condo bathroom project._
_Added 2026-06-22: filename-derived alt should front-load the unique detail and strip the repeated project-name prefix; centralize + unit-test the transform._

## Bundler-hashed assets (Vite/webpack `import img from "..."`)

When images are imported as ES modules, the build emits `[name]-[hash].jpg` (e.g. `portfolio-1-Cz3kr15z.jpg`). The descriptive `[name]` portion **survives into the public URL**, so renaming the source file is still worth it — the keyword reaches Google Images. To rename: `git mv` the file (preserves history) then update every `import` string. Grep all of `src/` for the old basename — imports hide in data files (`projects.ts`, `posts.ts`, `services.ts`), not just route/`<img>` files. A single `grep -rn '<old>.jpg' src/` before declaring done catches the data-file imports a usage scan over `*.tsx` misses.

**Name by depicted content, not a project/city** when the same file is reused across multiple differently-located projects (one `portfolio-2.jpg` serving a Toronto *and* an LA project). Baking in a city would be wrong half the time; `room-type + style + "interior-design"` is accurate everywhere and still keyword-rich.

**Check alt text after any image swap.** If someone repoints imports (`project-new-*`) but leaves the old `alt`/`HERO_SLIDES` strings, every alt silently describes the wrong picture — actively misleads Google Images + screen readers, worse than generic alt. Open each image and confirm alt matches what's actually shown.

_Added 2026-06-27: Vite-hashed asset renaming (name survives hash, grep data-file imports), content-not-city naming for reused images, and post-swap alt audit, after the YaDesign asset rename._

## Sourcing license-free stock by ID (Pexels/Unsplash) + visual verify

When a section reuses the same handful of photos (e.g. every blog cover pulling from the portfolio's 5 kitchen shots), fix it with distinct, topic-matched, license-free images — don't just shuffle the existing ones.

- **Find by ID, download by CDN pattern.** `WebSearch "<topic> site:pexels.com"` returns `/photo/<slug>-<ID>/` URLs; the direct, key-free image is `https://images.pexels.com/photos/<ID>/pexels-photo-<ID>.jpeg?auto=compress&cs=tinysrgb&w=1280`. (Unsplash: `https://images.unsplash.com/photo-<ID>?w=1280`.) Both licenses allow commercial use, no attribution.
- **Always Read the downloaded file before committing it.** Search descriptions lie — verify the image actually depicts the topic and isn't off-brand (a gamer desk for an "AI tools" post, a museum for a "design show"). Download a batch to scratchpad, Read them, pick winners, then copy into `src/assets/` with SEO filenames.
- **CLS for inline `<img>` under `height:auto`:** article CSS (`.post-prose figure img { width:100%; height:auto }`) makes the browser derive the placeholder aspect-ratio from the `width`/`height` *attributes*. If they don't match the real pixel ratio, the image jumps on load. Set the attributes to the actual `sips -g pixelWidth -g pixelHeight` dims (covers are exempt — `object-cover` + fixed CSS height absorbs any ratio).
- **zsh gotcha when batch-downloading:** `for x in $list` does NOT word-split an unquoted string in zsh (unlike bash) — the whole string becomes one iteration and the URL gets spaces → `curl: (3) Malformed input`. Use an array `list=(a b c)` or `${=list}`. Also: background `curl ... &` jobs get killed when the tool's shell exits; download sequentially in the foreground.

_Added 2026-06-28: Pexels/Unsplash by-ID sourcing + mandatory visual verify, inline-img CLS under height:auto, and zsh batch-download gotchas, after replacing duplicated YaDesign blog photos with 9 distinct topic-matched stock images._

## Visible figcaptions on case-study galleries (NOT cloaked text)

When a client asks to "hide text in image captions" to pad a thin page, reframe it: **captions are a ranking surface only when they're visible.** Hidden/cloaked text (display:none-for-crawlers, white-on-white, off-screen keyword dumps) is a Google spam-policy violation that risks a manual penalty — refuse it and ship the visible version, which earns the same image-search + on-page-text benefit legitimately.

- Render a real `<figcaption>` per gallery image (index-aligned `captions[]` in the project data), styled small but readable — never visually hidden.
- **Caption describes what the photo actually shows, not the prose narrative.** When gallery assets are reused/illustrative (one shared `<img>` across multiple projects), the caption must match the depicted room or it misleads users + Google Images — same rule as the post-swap alt audit above. Weave in style + city for keyword value without stuffing.
- Caption ≠ `alt`: alt ≤125 chars for screen readers; the visible caption can carry the longer, richer descriptor.

_Added 2026-06-28: visible-figcaption pattern for project galleries + explicit anti-cloaking stance, after the YaDesign projects review ("hide text in captions" request)._
