#!/usr/bin/env node
// Report which of our URLs Google has NOT indexed, via the Search Console URL
// Inspection API. Optionally nudge them with the Indexing API (see the warning
// below before turning that on).
//
// Input, in priority order:
//   --stdin              read newline-separated URLs from stdin
//   <url> [<url> ...]    URLs as positional args
//   (nothing)            fall back to parsing ./public/sitemap.xml
//
// NOTE for this repo: there is no committed public/sitemap.xml — Next serves
// /sitemap.xml from src/app/sitemap.ts at runtime. So the fallback will not
// find anything locally; pipe the live sitemap in via --stdin instead (that is
// what .github/workflows/seo-ping.yml does).
//
// Flags:
//   --limit=N        cap how many URLs are inspected (default 200; the URL
//                    Inspection API allows 2000/day per property)
//   --indexing-api   also POST each un-indexed URL to the Indexing API
//
// !! The Indexing API is officially only supported for JobPosting and
// !! BroadcastEvent pages. For ordinary marketing pages Google either ignores
// !! the ping or errors, so it is OFF by default rather than pretending to
// !! work. Sitemap submission (npm run seo:submit-sitemap) is the supported
// !! path for getting these pages crawled.
//
// Env: SEARCH_CONSOLE_SITE, GOOGLE_APPLICATION_CREDENTIALS (path to SA key).

import { readFile } from "node:fs/promises";
import { getAccessToken } from "./lib/google-auth.mjs";

const INSPECT_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

const SCOPE_INSPECT = "https://www.googleapis.com/auth/webmasters.readonly";
const SCOPE_INDEXING = "https://www.googleapis.com/auth/indexing";

// URL Inspection allows 600 queries/minute per property; 150ms keeps us clear.
const INSPECT_DELAY_MS = 150;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function parseUrlList(text) {
  return [...new Set(text.split(/\s+/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s)))];
}

async function urlsFromSitemapFile() {
  const xml = await readFile("public/sitemap.xml", "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function collectUrls(args) {
  if (args.includes("--stdin")) return parseUrlList(await readStdin());

  const positional = args.filter((a) => !a.startsWith("--"));
  if (positional.length) return parseUrlList(positional.join("\n"));

  try {
    return await urlsFromSitemapFile();
  } catch {
    throw new Error(
      "No URLs given and public/sitemap.xml is not readable. This app serves " +
        "/sitemap.xml at runtime — pipe the live sitemap in with --stdin.",
    );
  }
}

async function post(url, token, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`${response.status}: ${text}`);
    error.status = response.status;
    throw error;
  }
  return text ? JSON.parse(text) : {};
}

async function main() {
  const args = process.argv.slice(2);
  const site = process.env.SEARCH_CONSOLE_SITE;
  if (!site) throw new Error("SEARCH_CONSOLE_SITE is required.");

  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : 200;
  const useIndexingApi = args.includes("--indexing-api");

  const all = await collectUrls(args);
  if (!all.length) throw new Error("No URLs to inspect.");

  const urls = all.slice(0, limit);
  if (all.length > urls.length) {
    console.log(`Note: ${all.length} URLs supplied, inspecting the first ${limit} (--limit).`);
  }

  const scopes = useIndexingApi ? [SCOPE_INSPECT, SCOPE_INDEXING] : [SCOPE_INSPECT];
  const token = await getAccessToken(scopes);

  const notIndexed = [];
  let failed = 0;

  for (const url of urls) {
    try {
      const result = await post(INSPECT_URL, token, {
        inspectionUrl: url,
        siteUrl: site,
        languageCode: "en-CA",
      });
      const status = result.inspectionResult?.indexStatusResult ?? {};
      const indexed = status.verdict === "PASS";
      if (!indexed) notIndexed.push({ url, coverageState: status.coverageState ?? "unknown" });
      console.log(`${indexed ? "indexed    " : "NOT indexed"}  ${url}`);
    } catch (error) {
      failed += 1;
      console.warn(`inspect failed  ${url}  ${error.message}`);
    }
    await sleep(INSPECT_DELAY_MS);
  }

  console.log(
    `\n${urls.length - notIndexed.length - failed} indexed, ` +
      `${notIndexed.length} not indexed, ${failed} inspection errors.`,
  );

  for (const { url, coverageState } of notIndexed) {
    console.log(`  ${url}  (${coverageState})`);
  }

  if (!useIndexingApi || !notIndexed.length) return;

  console.log(`\nPushing ${notIndexed.length} URL(s) to the Indexing API...`);
  for (const { url } of notIndexed) {
    try {
      await post(PUBLISH_URL, token, { url, type: "URL_UPDATED" });
      console.log(`  published  ${url}`);
    } catch (error) {
      // Expected for non-JobPosting/BroadcastEvent pages — warn, don't fail.
      console.warn(`  publish failed  ${url}  ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error(`index-uncrawled failed: ${error.message}`);
  process.exit(1);
});
