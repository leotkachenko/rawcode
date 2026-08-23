# Core Web Vitals

Google ranking factor since 2021. Three metrics: LCP (loading), CLS (visual stability), INP (interactivity).

Field data (Chrome User Experience Report) is what Google actually uses for rankings — not lab data. Lab data (PageSpeed Insights) is a proxy.

## Targets

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP — Largest Contentful Paint | <2.5s | 2.5–4.0s | >4.0s |
| CLS — Cumulative Layout Shift | <0.1 | 0.1–0.25 | >0.25 |
| INP — Interaction to Next Paint | <200ms | 200–500ms | >500ms |

Site must hit "good" on **75% of page loads** for the URL group to count as passing.

## LCP (loading speed)

The time until the largest visible element renders. Usually the hero image on service pages, or a large heading/text block.

### Diagnose
1. Run PageSpeed Insights on the URL
2. Look at the "LCP element" — what is it?
3. Look at the LCP breakdown:
   - TTFB (server response time)
   - Resource load delay
   - Resource load duration
   - Element render delay

### Fix tactics

#### Hero image is the LCP
- **Preload** with `<link rel="preload" as="image" href="..." fetchpriority="high">`
- **Optimize**: convert to WebP/AVIF, compress to ≤250 KB
- **Right-size**: serve the actual display dimensions via `srcset`, not 1920w to a 320w viewport
- **Eager load**: `loading="eager"`, never `loading="lazy"` on LCP image
- **CDN-cached**: ensure image is served from a CDN with proper caching headers

#### Server response slow (TTFB > 600ms)
- **SSG/prerender** instead of SSR or CSR (static HTML serves from edge)
- **CDN** in front of origin
- **Cache** at multiple layers
- **Database queries** optimized for the page (no N+1)

#### Fonts blocking text render
- `font-display: swap` (text renders with fallback font, swaps when custom font loads)
- **Subset fonts** — include only the characters used
- **Self-host** Google Fonts to avoid third-party DNS lookup
- **Preload** primary font: `<link rel="preload" as="font" href="..." type="font/woff2" crossorigin>`

#### Render-blocking CSS / JS
- **Inline critical CSS** (~14KB for first viewport)
- **Defer non-critical CSS** via `media="print"` swap trick or `<link rel="preload" as="style" onload="...">`
- **`async` or `defer`** on `<script>` tags that aren't critical for first paint
- **Code-split** JS bundles so the route bundle is smaller

#### Third-party scripts blocking
- Audit Google Analytics, Facebook Pixel, chat widgets, A/B test tools
- Defer non-critical ones to after first paint
- Use lighter alternatives (Plausible vs GA, Sentry vs full-stack monitoring)

## CLS (visual stability)

Sum of layout shift contributions during page load and over the session.

### Diagnose

1. PageSpeed Insights "Avoid large layout shifts" diagnostic
2. Chrome DevTools → Performance tab → Layout shifts highlighted
3. Lighthouse → details on which element shifted

### Fix tactics

#### Images without dimensions
- Add `width` and `height` attributes to every `<img>` (see [image-seo.md](image-seo.md))
- For responsive images, use the intrinsic dimensions (browser preserves aspect ratio)

#### Late-loading content pushing other content
- Reserve space with CSS `min-height` or `aspect-ratio`
- Skeleton placeholders while content loads
- Move late-loading content below the fold

#### Fonts causing FOIT/FOUT shift
- `font-display: swap` accepts the shift but minimizes it
- `font-display: optional` falls back if font doesn't load within 100ms
- Match fallback font metrics to custom font (`@font-face` with `size-adjust`, `ascent-override`)

#### Ads / embeds without reserved space
- Reserve known dimensions in CSS
- Display ad-blocked placeholders that match dimensions
- Use `aspect-ratio` for video embeds

#### Cookie/consent banners
- Top-anchored banner is fine if it's there from first paint
- Bottom-anchored banner causes CLS if content scrolls up after appearance
- Best: render banner from SSR, no late insertion

#### Interactive elements moving on hover/focus
- Use `transform` for animations, not `width`/`height`/`margin` (transform doesn't cause layout)
- Reserve space for hover states

## INP (interactivity)

Replaces FID (First Input Delay) as of 2024. Measures responsiveness across all interactions during the session, not just the first.

### Diagnose
1. PageSpeed Insights "INP" diagnostic
2. Chrome DevTools → Performance → record an interaction
3. Look for long tasks (>50ms blocks on main thread)

### Fix tactics

#### Long JavaScript tasks on main thread
- **Code-split** so route bundles are smaller
- **Defer hydration** for non-critical components
- **Web Workers** for heavy computation
- **`requestIdleCallback`** for non-urgent work
- **Break up long loops** with `setTimeout(0)` or `scheduler.yield()`

#### Heavy event handlers
- **Debounce / throttle** scroll, resize, input handlers
- **Passive listeners** for scroll: `addEventListener('scroll', fn, { passive: true })`
- **Virtualize** long lists (react-virtual, react-window)

#### Slow third-party scripts
- Same audit as for LCP — defer or replace

#### Excessive React re-renders
- `useMemo` and `useCallback` for expensive computations and stable callbacks
- `React.memo` for components that re-render unnecessarily
- Lift state up or use a separate store to avoid waterfall re-renders
- React 18 concurrent features: `useTransition`, `useDeferredValue`

## Measurement

### Field data (what Google actually uses)
- **Chrome User Experience Report (CrUX)**: aggregated real-user data from Chrome users who've opted in
- **Search Console "Core Web Vitals" report**: per-URL group status (Good/Needs Improvement/Poor)
- **PageSpeed Insights "Field Data" section**: 28-day rolling CrUX data for the URL/origin

### Lab data (proxy)
- **PageSpeed Insights "Lab data"**: synthetic Lighthouse run
- **Lighthouse in Chrome DevTools**: same engine, runs locally
- **WebPageTest**: more detailed waterfall

### Real user monitoring (RUM)
- Vercel Speed Insights, Cloudflare Web Analytics, SpeedCurve, Calibre, etc.
- Better than lab data because it reflects real users, real devices, real connections

## Per-framework gotchas

### React + Vite SPA without prerender
- Default has poor LCP because shell ships before content
- Use react-snap or similar for prerender at build
- Or migrate to Next.js / Astro / Remix for built-in SSR/SSG

### Next.js App Router
- Server Components are good for LCP (no JS bundle for static content)
- Client Components shouldn't be in the LCP path
- `next/image` handles width/height + srcset; verify in rendered HTML

### Astro
- Default zero-JS approach helps INP
- Use `client:load` sparingly — that's where JS gets shipped
- `client:visible` is better for below-fold interactivity

### WordPress + plugins
- Most CWV failures come from third-party plugin scripts
- Audit, deactivate, replace with lighter alternatives
- Critical CSS plugins help LCP
- Lazy-load plugin can cause CLS if not configured with dimensions

## Budget recommendations

For a service-business site:
- **JS bundle for the route**: <100 KB minified+gzipped
- **CSS**: <30 KB minified+gzipped (inline first 14 KB)
- **Hero image**: <200 KB
- **Total page weight (above fold)**: <500 KB
- **Total HTTP requests for first paint**: <30
- **Third-party scripts**: <5, with at most 2 above the fold

Set as targets in your build pipeline. Bundlephobia, size-limit, and Lighthouse CI can enforce.

## Common CWV mistakes

- ❌ Hero image with `loading="lazy"` (LCP regression)
- ❌ Image preloaded but its `srcset` is in a `<picture>` (browser preloads wrong variant)
- ❌ Carousel as hero — multiple images load, all but one wasted
- ❌ Google Fonts loaded without `font-display: swap`
- ❌ Cookie banner injected late (CLS)
- ❌ Layout shift from late chat widget injection
- ❌ Massive React bundle on a landing page (defer hydration or use static)
- ❌ All-CSS-in-one-file with no critical inline (LCP regression)
- ❌ Image dimensions in CSS but not HTML attributes (browser can't reserve space pre-CSS-load)

## When to optimize CWV

Diminishing returns. After hitting "Good" on all three metrics for the URL group, the next ranking gain is small. Don't spend weeks chasing sub-1s LCP if you're already at 1.5s.

Priority order:
1. Get to "Good" on all three metrics first
2. Optimize the slowest metric to add buffer
3. Move to content quality, more pages, better keywords — much higher ROI

_Added 2026-06-06: initial extraction from local-seo-pages agent + per-framework gotchas and budget._
