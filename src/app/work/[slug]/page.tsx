import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { getTeamMemberBySlug } from "@/lib/site-config";
import { getServiceBySlug } from "@/lib/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { caseStudySchema } from "@/lib/schema";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) return {};

  const url = `/work/${project.slug}`;
  const title = project.client ? `${project.name} — ${project.client}` : project.name;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: project.summary,
      url,
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
    twitter: {
      card: project.image ? "summary_large_image" : "summary",
      title,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  const creditMember = project.creditMember
    ? getTeamMemberBySlug(project.creditMember)
    : undefined;
  const service = project.service ? getServiceBySlug(project.service) : undefined;
  // Same-service projects first, then the ones that follow this one in the list
  // (wrapping round), so every case study is linked from its neighbours instead of
  // every page pointing at the same first three.
  const index = caseStudies.findIndex((other) => other.slug === project.slug);
  const rotated = [...caseStudies.slice(index + 1), ...caseStudies.slice(0, index)];
  const others = [
    ...rotated.filter((other) => service && other.service === service.slug),
    ...rotated.filter((other) => !service || other.service !== service.slug),
  ].slice(0, 3);
  const checkedDate = project.liveSite
    ? new Date(`${project.liveSite.checked}T12:00:00Z`).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : undefined;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={caseStudySchema(project)} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: project.name },
        ]}
      />

      {project.client && (
        <p className="mt-4 text-sm font-medium text-accent">{project.client}</p>
      )}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{project.name}</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">{project.summary}</p>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-black/60 underline decoration-black/20 underline-offset-4 hover:text-black dark:text-white/60 dark:decoration-white/20 dark:hover:text-white"
        >
          Visit {project.url.replace(/^https?:\/\//, "")}
        </a>
      )}

      {project.image && (
        <div className="mt-8 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.name} screenshot`}
            width={1200}
            height={630}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {project.timeline && (
        <p className="mt-4 text-sm text-black/50 dark:text-white/50">{project.timeline}</p>
      )}

      {project.whatWeBuilt.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">What we built</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-black/70 dark:text-white/70">
            {project.whatWeBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {project.liveSite && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">The live site today</h2>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            {project.liveSite.pageCount} pages in its public sitemap, checked {checkedDate}
            {project.maintained ? ". Raw Code still maintains it." : "."}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-black/70 dark:text-white/70">
            {project.liveSite.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {service && (
        <p className="mt-10 text-black/70 dark:text-white/70">
          Related service:{" "}
          <Link
            href={`/services/${service.slug}`}
            className="font-medium text-accent hover:underline"
          >
            {service.name}
          </Link>
          .
          {project.toronto && (
            <>
              {" "}A Greater Toronto Area client; see{" "}
              <Link
                href="/software-development-toronto"
                className="font-medium text-accent hover:underline"
              >
                our work in Toronto
              </Link>
              .
            </>
          )}
        </p>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">Growth &amp; metrics</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-black/70 dark:text-white/70">
            {project.metrics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 space-y-2 border-t border-black/10 pt-6 text-sm text-black/50 dark:border-white/10 dark:text-white/50">
        {project.credit && (
          <p>
            {creditMember ? (
              <>
                Delivered by{" "}
                <Link
                  href={`/team#${creditMember.slug}`}
                  className="underline decoration-black/20 underline-offset-4 hover:text-black hover:decoration-black dark:decoration-white/20 dark:hover:text-white dark:hover:decoration-white"
                >
                  {creditMember.name}
                </Link>
                , Raw Code&apos;s {creditMember.role}.
              </>
            ) : (
              project.credit
            )}
          </p>
        )}
        <p className="italic">{project.outcomeNote}</p>
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">More work</h2>
          <ul className="mt-4 space-y-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/work/${other.slug}`}
                  className="text-black/70 underline decoration-black/20 underline-offset-4 hover:text-black hover:decoration-black dark:text-white/70 dark:decoration-white/20 dark:hover:text-white dark:hover:decoration-white"
                >
                  {other.name}
                </Link>
                {other.client && (
                  <span className="text-black/50 dark:text-white/50"> — {other.client}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">Want something like this built?</p>
        <Link
          href="/contact"
          className="mt-3 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Book free consultation
        </Link>
      </div>
    </div>
  );
}
