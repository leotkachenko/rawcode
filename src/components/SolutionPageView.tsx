import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudyBySlug, type CaseStudy } from "@/lib/case-studies";
import { getTeamMemberBySlug } from "@/lib/site-config";
import { getServiceBySlug } from "@/lib/services";
import { solutionPages, type SolutionPage } from "@/lib/solution-pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientCard } from "@/components/ClientCard";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, serviceSchema, TORONTO_AREA_SERVED } from "@/lib/schema";

export function solutionPageMetadata(page: SolutionPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export function SolutionPageView({ page }: { page: SolutionPage }) {
  const projects = page.projectSlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((project): project is CaseStudy => Boolean(project));
  const parentService = getServiceBySlug(page.parentService);
  const siblings = solutionPages.filter((other) => other.path !== page.path);
  const projectName = (slug: string) => getCaseStudyBySlug(slug)?.name ?? slug;
  const creditMember = page.credit ? getTeamMemberBySlug(page.credit.memberSlug) : undefined;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd
        data={serviceSchema({
          name: page.h1,
          serviceType: page.serviceType,
          description: page.description,
          path: page.path,
          areaServed: TORONTO_AREA_SERVED,
        })}
      />
      <JsonLd data={faqPageSchema(page.faqs)} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Software Development in Toronto", href: "/software-development-toronto" },
          { name: page.h1 },
        ]}
      />

      <section className="mt-4">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{page.h1}</h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">{page.lede}</p>
        <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">{page.intro}</p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Book free consultation
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">{page.projectsHeading}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ClientCard key={project.slug} project={project} />
          ))}
        </div>
        {page.credit && (
          <p className="mt-4 text-sm text-black/60 dark:text-white/60">
            {page.credit.text}
            {creditMember && (
              <>
                {" "}
                <Link href={`/team#${creditMember.slug}`} className="underline hover:no-underline">
                  More about {creditMember.name.split(" ")[0]}
                </Link>
                .
              </>
            )}
          </p>
        )}
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">{page.patternsHeading}</h2>
        <div className="mt-6 space-y-8">
          {page.patterns.map((pattern) => (
            <div key={pattern.title}>
              <h3 className="text-lg font-semibold">{pattern.title}</h3>
              <p className="mt-2 text-black/70 dark:text-white/70">{pattern.detail}</p>
              <Link
                href={`/work/${pattern.slug}`}
                className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
              >
                {projectName(pattern.slug)} case study
              </Link>
            </div>
          ))}
        </div>
      </section>

      {parentService && (
        <p className="mt-10 max-w-3xl text-sm text-black/70 dark:text-white/70">
          Process and what&apos;s included are on our{" "}
          <Link
            href={`/services/${parentService.slug}`}
            className="font-medium text-accent hover:underline"
          >
            {parentService.name}
          </Link>{" "}
          page.
        </p>
      )}

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6">
          <FaqList faqs={page.faqs} />
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-lg font-semibold">More of our work in Toronto</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <Link href="/software-development-toronto" className="text-accent hover:underline">
              Software development in Toronto
            </Link>
          </li>
          <li>
            <Link href="/website-development-toronto" className="text-accent hover:underline">
              Website development in Toronto
            </Link>
          </li>
          {siblings.map((other) => (
            <li key={other.path}>
              <Link href={other.path} className="text-accent hover:underline">
                {other.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">{page.cta.title}</p>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">{page.cta.detail}</p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Book free consultation
        </Link>
      </div>
    </div>
  );
}
