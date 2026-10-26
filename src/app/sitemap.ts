import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { solutionPages } from "@/lib/solution-pages";

// Bump when page content changes materially. Google ignores lastmod that changes
// on every build, so this is a hand-set date, not new Date().
const CONTENT_UPDATED = "2026-10-26";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/software-development-toronto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/website-development-toronto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.6, changeFrequency: "monthly" },
  { path: "/team", priority: 0.5, changeFrequency: "monthly" },
  { path: "/what-is-raw-code", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: CONTENT_UPDATED,
    priority,
    changeFrequency,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: CONTENT_UPDATED,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  const caseStudyRoutes = caseStudies.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified: CONTENT_UPDATED,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const solutionRoutes = solutionPages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: CONTENT_UPDATED,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...serviceRoutes, ...solutionRoutes, ...caseStudyRoutes];
}
