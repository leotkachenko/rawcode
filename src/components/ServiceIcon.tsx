import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  "small-builds": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  "fixed-scope-builds": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8.5 15.5l7-7" strokeLinecap="round" />
    </>
  ),
  "seo-geo-website-builds": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  "ai-automation": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M13 7.5l-4 5.5h3l-1 4 4-5.5h-3z" strokeLinejoin="round" />
    </>
  ),
  "staff-augmentation": (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
};

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
    >
      {paths[slug] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
