import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloud Run deploys from a Docker image (see Dockerfile + cloudbuild.yaml).
  // `standalone` emits .next/standalone with a self-contained server.js, so the
  // runtime image doesn't need node_modules installed.
  output: "standalone",
};

export default nextConfig;
