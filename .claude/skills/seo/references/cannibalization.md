# Keyword cannibalization

Two pages on the same site competing for the same query. Google picks one — often the wrong one — and the loser bleeds rank from the winner. Common when new pages are created without checking the existing target footprint.

## When it happens

- A new `[service]-[city]` page is created where a generic `[service]` page already ranks for the same query (e.g. `/renovation-toronto/` vs `/home-renovation/`, both trying to rank for "renovation toronto")
- A `[service]-[qualifier]` variant overlaps the parent service page (e.g. `/condo-bathroom-renovation/` vs `/condo-renovation/` for "condo bathroom")
- A near-me hub overlaps the parent service (e.g. `/bathroom-renovations-near-me/` vs `/bathroom-renovation/`)
- A blog post about a transactional topic competes with the service page (e.g. `/blog/bathroom-renovation-mississauga/` vs `/bathroom-renovation-mississauga/`)

## How to detect

### Before shipping (preferred)

Grep the SEO data file and route table for any existing page whose H1, title, or `primary` keyword overlaps the proposed new page's primary keyword.

```bash
# Proposed new slug: renovation-toronto, primary keyword: "renovation toronto"
grep -in "renovation toronto\|toronto renovation" src/data/seoKeywords.js src/App.jsx
```

If you find an existing page whose primary keyword is a substring of (or a superstring of) the new page's primary keyword, you have potential cannibalization. Decide before building:

- **Strengthen the existing page** instead (add new query to its `secondary` array)
- **Differentiate the new page** with a sharper qualifier (e.g. `/renovation-toronto/` is too broad — narrow to `/condo-renovation-toronto/` or `/luxury-home-renovation-toronto/`)
- **Build both**, but only if the SERP shows distinct intent at the top 10 results (rare — verify by typing both queries into Google)

### After shipping (audit)

If two pages were already built and you suspect cannibalization:

1. Pull the GSC URL-inspection report for both pages on the shared query
2. Look at the average position chart: see-saw between the two URLs = Google can't decide = cannibalization
3. Look at CTR — split impressions across two URLs usually means lower combined CTR than one consolidated page would get

## How to fix existing cannibalization

Three options, in order of preference:

### 1. Consolidate (highest effort, biggest payoff)

Pick the stronger page (more backlinks, longer-tenured, better content). Merge the weaker page's content into it. 301-redirect the weaker page's URL to the winner. Update internal links.

When to choose: the two pages cover materially the same topic and there's no clear way to differentiate them.

### 2. Differentiate (medium effort)

Rewrite the weaker page's title, H1, and `primary` keyword to target a distinct sub-intent. Add the original target query to the winner's `secondary` array.

Example: `/renovation-toronto/` and `/home-renovation/` both ranking for "home renovation toronto" — rewrite `/renovation-toronto/` H1 from "Renovation in Toronto" to "Renovation Services Across the GTA — Toronto, Mississauga, Etobicoke" so its primary becomes broader geographic, while `/home-renovation/` keeps the head-term focus.

When to choose: both pages have decent traffic on different long-tails and you don't want to lose either. **Confirm with the user** before rewriting the weaker page — title/H1 changes carry the risks in [keywords-triage.md "Don't dilute the winner"](keywords-triage.md#dont-dilute-the-winner-anti-pattern).

### 3. Canonicalize (lowest effort, weakest fix)

On the weaker page, add `<link rel="canonical" href="<winner-url>">` to point all signals at the winner. Page still exists for users but search engines treat it as the winner.

When to choose: stop-gap when you can't consolidate or differentiate immediately and need to stop the bleeding.

### What NOT to do

- Don't `noindex` the weaker page without consolidation — you lose the page's existing backlinks/authority
- Don't delete the weaker page without 301-redirecting — same authority loss, plus 404 errors
- Don't change the URL of either page — see Critical Rule #1 in SKILL.md

## Prevention rules

1. **Read the SEO data file first.** Every new slug must be checked against existing entries' titles, H1s, and primary keywords for substring overlap. Two minutes of grep saves a 6-week cannibalization fight.
2. **Sub-neighborhoods don't get pages.** A grid of neighborhood cards on the parent city page captures sub-area queries without spawning thin competitors. See [keywords-triage.md "Sub-neighborhood handling"](keywords-triage.md#sub-neighborhood-handling).
3. **Don't create both `/[service]` and `/[service]-[head-city]`** unless the head city has its own distinct sub-intent. E.g. `/bathroom-renovation/` already targets Toronto; don't also create `/bathroom-renovation-toronto/`. Do create `/bathroom-renovation-mississauga/` (different city).
4. **One page per intent + location combination.** If two queries map to the same intent + location, they're the same page.

## Watching for cannibalization after launch

For 4–6 weeks after shipping a borderline pair (e.g. `/condo-renovation/` vs `/condo-renovation-toronto/`), monitor weekly in GSC:

- Performance → Pages → filter by shared query → confirm only one URL ranks at a time
- Performance → Queries → filter by shared page → confirm impressions are stable, not halved

If both URLs are appearing for the same query with a see-saw pattern in average position, escalate to fix #1 or #2 above.

_Added 2026-06-06: created after agent shipped `/renovation-toronto/` alongside `/home-renovation/` and `/condo-renovation/` alongside `/condo-renovation-toronto/` in a prior session, both at risk of head-term cannibalization._
