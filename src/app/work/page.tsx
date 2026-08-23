import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = "Work";
const description =
  "Real projects built by Raw Code, including novelmaker.co, lumirank.ca, osobarenos.ca, and yadesign.studio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title,
    description,
    url: "/work",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Work</h1>
      <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">
        A short list of what we&apos;ve built. This page grows as new projects ship — no
        placeholder projects, no invented metrics.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-black/10 transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt ?? `${project.name} screenshot`}
                width={1200}
                height={630}
                className="h-40 w-full object-cover"
              />
            ) : (
              // No image on record for this project — the client name stands in for a
              // logo rather than stock art that would misrepresent the work. The card
              // body drops its client line here so the name isn't printed twice.
              <div
                aria-hidden
                className="flex h-40 w-full items-center justify-center border-b border-black/10 bg-accent-soft px-6 text-center text-sm font-medium text-accent dark:border-white/10"
              >
                {project.client}
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-base font-semibold">{project.name}</h2>
              {project.client && project.image && (
                <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                  {project.client}
                </p>
              )}
              <p className="mt-2 flex-1 text-sm text-black/70 dark:text-white/70">
                {project.summary}
              </p>
              <span className="mt-4 text-sm font-medium text-accent">
                Read case study →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
