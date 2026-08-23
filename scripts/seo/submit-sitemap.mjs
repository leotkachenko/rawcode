#!/usr/bin/env node
// Register the live sitemap with Google Search Console.
//
//   SEARCH_CONSOLE_SITE=sc-domain:rawcode.ai \
//   SITE_URL=https://rawcode.ai \
//   GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json \
//     npm run seo:submit-sitemap
//
// Optional first argument overrides the sitemap URL (default: $SITE_URL/sitemap.xml).
//
// Requires: Search Console API enabled on the project, and the service account
// added as a VERIFIED OWNER of the property in Search Console. A merely
// "restricted"/"full" user gets 403 on this endpoint.

import { getAccessToken, apiFetch } from "./lib/google-auth.mjs";

const SCOPES = ["https://www.googleapis.com/auth/webmasters"];

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

async function main() {
  const site = requireEnv("SEARCH_CONSOLE_SITE");
  const sitemapUrl =
    process.argv[2] || `${requireEnv("SITE_URL").replace(/\/$/, "")}/sitemap.xml`;

  // Fail loudly if the sitemap isn't actually being served — otherwise Search
  // Console accepts the submission and reports the fetch error days later.
  const probe = await fetch(sitemapUrl);
  if (!probe.ok) {
    throw new Error(`${sitemapUrl} returned ${probe.status} — not submitting.`);
  }

  const token = await getAccessToken(SCOPES);
  const endpoint =
    "https://www.googleapis.com/webmasters/v3/sites/" +
    `${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

  await apiFetch(endpoint, { token, method: "PUT" });
  console.log(`Submitted ${sitemapUrl} to ${site}`);

  // Read back what Search Console now knows about it.
  try {
    const status = await apiFetch(endpoint, { token });
    console.log(
      `  lastSubmitted=${status.lastSubmitted ?? "n/a"} ` +
        `warnings=${status.warnings ?? 0} errors=${status.errors ?? 0}`,
    );
  } catch (error) {
    console.warn(`  (could not read back sitemap status: ${error.message})`);
  }
}

main().catch((error) => {
  console.error(`submit-sitemap failed: ${error.message}`);
  process.exit(1);
});
