// Minimal service-account -> OAuth2 access token exchange.
//
// Deliberately dependency-free: signing a JWT is ~20 lines with node:crypto,
// and pulling in `googleapis` (tens of MB) for two REST calls isn't worth it.
//
// Credentials are read from GOOGLE_APPLICATION_CREDENTIALS, which must be a
// PATH to a service-account JSON key file (that is what the CI workflows write
// the secret to). Never inline a key in this repo.

import { readFile } from "node:fs/promises";
import { createSign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

async function loadServiceAccount() {
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!path) {
    throw new Error(
      "GOOGLE_APPLICATION_CREDENTIALS is not set. It must be the PATH to a " +
        "service-account JSON key file, not the key body itself.",
    );
  }

  let raw;
  try {
    raw = await readFile(path, "utf8");
  } catch (cause) {
    throw new Error(`Cannot read service-account key at ${path}: ${cause.message}`);
  }

  const key = JSON.parse(raw);
  if (key.type !== "service_account" || !key.client_email || !key.private_key) {
    throw new Error(
      `${path} is not a service-account key (expected type "service_account" ` +
        "with client_email and private_key).",
    );
  }
  return key;
}

/**
 * Exchange a service-account key for an access token.
 * @param {string[]} scopes OAuth scopes to request.
 * @returns {Promise<string>} bearer token
 */
export async function getAccessToken(scopes) {
  const key = await loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);

  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope: scopes.join(" "),
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(key.private_key).toString("base64url");
  const assertion = `${header}.${claims}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    // Body can contain the error description but not the key material.
    throw new Error(`Token exchange failed (${response.status}): ${body}`);
  }
  return JSON.parse(body).access_token;
}

/** fetch() wrapper that throws with the response body on non-2xx. */
export async function apiFetch(url, { token, method = "GET", body } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`${method} ${url} -> ${response.status}: ${text}`);
    error.status = response.status;
    throw error;
  }
  return text ? JSON.parse(text) : {};
}
