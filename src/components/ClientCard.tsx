import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/case-studies";

// Toronto pages: one card per GTA client, built from the verified `liveSite`
// facts on the case study rather than copy written per page.
export function ClientCard({ project }: { project: CaseStudy }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
      {project.image && (
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.name} screenshot`}
          width={1200}
          height={630}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-36 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-semibold">{project.name}</h3>
          {project.liveSite && (
            <span className="whitespace-nowrap text-sm font-medium text-accent">
              {project.liveSite.pageCount} live pages
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">{project.summary}</p>
        {project.liveSite && project.liveSite.points.length > 0 && (
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">
            {project.liveSite.points[0]}.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link
            href={`/work/${project.slug}`}
            className="font-medium text-accent hover:underline"
            aria-label={`Read the ${project.name} case study`}
          >
            Read the case study
          </Link>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 underline decoration-black/20 underline-offset-4 hover:text-black dark:text-white/60 dark:decoration-white/20 dark:hover:text-white"
            >
              {project.url.replace(/^https?:\/\//, "")}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
