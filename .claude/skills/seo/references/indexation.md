# Indexation diagnosis

"Pages aren't indexed" has three very different causes. Diagnose with evidence before touching tags.

## Step 1 — get per-URL verdicts

Use the URL Inspection API (or the repo's `seo:index-uncrawled` script / its CI workflow). The `coverageState` tells you which problem you have:

| Verdict | Meaning | Where the fix is |
|---|---|---|
| `URL is unknown to Google` | Never discovered or never queued, even if it's in a submitted sitemap | Crawl demand: inbound links, internal links from crawled pages |
| `Discovered - currently not indexed` | Known, but Google chose not to spend a crawl on it | Crawl demand + site-wide quality signals |
| `Crawled - currently not indexed` | Fetched and judged not worth indexing | Page quality: thin/duplicate/templated content |
| `Excluded by noindex` / `Alternate page with proper canonical` / `Blocked by robots.txt` | Technical | Tags, headers, robots |

If the technical checks pass (200, self-canonical, no `noindex`/`X-Robots-Tag`, robots allows, sitemap has 0 errors) and most URLs are "unknown" or "discovered", **stop editing tags**. The problem is demand.

## Step 2 — read the server logs for *verified* Googlebot

The user-agent string alone is worthless: most "Googlebot" hits are vulnerability scanners probing `/.env`, `/@fs/…`, and so on (and your own curl tests). Filter to Google's crawler ranges (`66.249.*`, or a reverse-DNS check against `googlebot.com`).

Cloud Run example:
```
gcloud logging read 'resource.type="cloud_run_revision" AND resource.labels.service_name="<svc>" AND httpRequest.userAgent:"Googlebot" AND httpRequest.remoteIp:"66.249."' --project=<id> --freshness=30d --format='value(timestamp,httpRequest.status,httpRequest.latency,httpRequest.requestUrl)'
```
The default `_Default` log bucket keeps 30 days, so `--freshness` beyond that returns nothing older.

**Signature of a crawl-demand problem:** Googlebot polls `robots.txt`, `/`, and `sitemap.xml` repeatedly but fetches almost no inner HTML URLs.

## Step 3 — fixes for crawl demand (in order of leverage)

1. **Inbound links from already-indexed sites**: client sites with a "Built by X" footer link to the specific case-study URL, LinkedIn posts, directory listings. For a new domain this beats any on-page change.
2. **Links from the pages Google *does* crawl** (usually only the homepage) to the pages you most need indexed. Body links count; nav links already exist and weren't enough.
3. **Cut site-wide thinness.** Ten templated ~80-word pages that share a boilerplate line drag the whole domain's crawl priority down. Add verifiable facts per page (e.g. counts read off the client's live sitemap, with the date checked), or consolidate.
4. Rotate "related" links so they aren't always the same first three items; otherwise the tail of a collection gets no internal links.
5. Accurate `lastmod` in the sitemap, set by hand rather than `new Date()` on every build.
6. Manual "Request indexing" in the GSC UI for the top ~10 URLs (UI only; the Indexing API is officially for JobPosting/BroadcastEvent).
7. Remove server latency on `robots.txt`. On scale-to-zero hosts (Cloud Run `min-instances=0`) the first request after idle is a 2–3s cold start, and it's usually Googlebot's `robots.txt` fetch.

_Added 2026-10-12: rawcode.ai, 7 weeks post-launch, 2/25 URLs indexed with 17 "unknown"; logs showed one inner-page fetch by real Googlebot in 30 days. Root cause was crawl demand, not tags._
