import Link from "next/link";
import type { Service } from "@/lib/services";
import { caseStudiesByService, getCaseStudyBySlug } from "@/lib/case-studies";
import {
  beforeAfter,
  integrations,
  painPoints,
  securityPoints,
  useCases,
} from "@/lib/ai-automation";
import { Breadcrumbs } from "./Breadcrumbs";
import { FaqList } from "./FaqList";
import { JsonLd } from "./JsonLd";
import { ServiceIcon } from "./ServiceIcon";
import { faqPageSchema, serviceSchema } from "@/lib/schema";

const linkClass =
  "underline decoration-black/20 underline-offset-4 hover:decoration-black dark:decoration-white/20 dark:hover:decoration-white";

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 h-4 w-4 flex-none text-accent"
    >
      <path d="M4 10.5l3.5 3.5L16 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The full /services/ai-automation page. Rendered from services/[slug] so the URL,
// static params, and sitemap entry stay exactly as they were.
export function AiAutomationService({ service }: { service: Service }) {
  const heading = service.metaTitle ?? service.name;
  const relatedWork = caseStudiesByService(service.slug);
  const example = getCaseStudyBySlug(beforeAfter.caseStudy);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd
        data={serviceSchema({
          name: heading,
          serviceType: "AI workflow automation",
          description: service.summary,
          slug: service.slug,
        })}
      />
      <JsonLd data={faqPageSchema(service.faqs)} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: heading },
        ]}
      />

      <section className="mt-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent-soft text-accent"
          >
            <ServiceIcon slug={service.slug} className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-accent">{service.priceSignal}</p>
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
          We automate the repetitive work slowing your team down, using AI where it helps
          and simple code where it doesn&apos;t.
        </p>
        <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">{service.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Book free consultation
          </Link>
          <a
            href="#what-we-automate"
            className="inline-block rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            See examples
          </a>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Where the hours go</h2>
        <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">
          Most businesses don&apos;t need an AI strategy. They need a few hours a week back
          from jobs like these.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-xl border border-black/10 p-6 dark:border-white/10"
            >
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{point.example}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="what-we-automate" className="mt-20 scroll-mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">What we automate</h2>
        <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">
          Each automation starts with a trigger, does one job, and produces something your
          team can use or check.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {useCases.map((useCase) => {
            const project = useCase.example ? getCaseStudyBySlug(useCase.example) : undefined;
            return (
              <div
                key={useCase.title}
                className="flex flex-col rounded-xl border border-black/10 p-6 dark:border-white/10"
              >
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    { label: "Trigger", value: useCase.trigger },
                    { label: "What the AI does", value: useCase.action },
                    { label: "Output", value: useCase.output },
                  ].map((row) => (
                    <div key={row.label}>
                      <dt className="text-xs font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 text-black/70 dark:text-white/70">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                {project && (
                  <p className="mt-4 pt-4 text-sm border-t border-black/10 dark:border-white/10">
                    Related work:{" "}
                    <Link href={`/work/${project.slug}`} className={`font-medium text-accent ${linkClass}`}>
                      {project.name}
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {example && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Before and after: {example.client ? `${example.client} ticket routing` : example.name}
          </h2>
          <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">{example.challenge}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { label: "Before", steps: beforeAfter.before, accent: false },
              { label: "After", steps: beforeAfter.after, accent: true },
            ].map((column) => (
              <div
                key={column.label}
                className={`rounded-xl border p-6 ${
                  column.accent
                    ? "border-accent/40 bg-accent-soft"
                    : "border-black/10 dark:border-white/10"
                }`}
              >
                <h3 className={`text-lg font-semibold ${column.accent ? "text-accent" : ""}`}>
                  {column.label}
                </h3>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-black/70 dark:text-white/70">
                  {column.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          {example.metrics && example.metrics.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Results</h3>
              <ul className="mt-3 space-y-2">
                {example.metrics.map((metric) => (
                  <li key={metric} className="flex gap-3 text-black/70 dark:text-white/70">
                    <Check />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            // TODO: no verified metrics on record for this case study yet.
            <p className="mt-6 text-sm text-black/60 dark:text-white/60">
              Results will be added once verified.
            </p>
          )}
          <p className="mt-4 text-xs text-black/60 dark:text-white/60">
            {example.outcomeNote} {example.credit}
          </p>
          <p className="mt-4 text-sm">
            <Link href={`/work/${example.slug}`} className={`font-medium text-accent ${linkClass}`}>
              Read the full case study
            </Link>
          </p>
        </section>
      )}

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>
        <ol className="mt-6">
          {service.process.map((step, index) => {
            const isLast = index === service.process.length - 1;
            return (
              <li key={step.title} className="relative pb-6 pl-12 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-9 bottom-0 w-px bg-black/10 dark:bg-white/10"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-xs font-medium text-black/50 dark:border-white/15 dark:text-white/50"
                >
                  {index + 1}
                </span>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">{step.detail}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 rounded-xl border border-black/10 p-4 text-sm text-black/70 dark:border-white/10 dark:text-white/70">
          A person stays in the loop for anything high-stakes. Payments, customer-facing
          replies, and decisions about people get human review before they go out.
        </p>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tools we connect to</h2>
          <p className="mt-3 text-black/70 dark:text-white/70">
            We build into the systems your team already uses rather than adding another app
            to log in to.
          </p>
          <ul className="mt-4 space-y-2">
            {integrations.map((tool) => (
              <li key={tool} className="flex gap-3 text-black/70 dark:text-white/70">
                <Check />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{service.priceSignal}</p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">
            Directional range. Your fixed quote comes after the audit.
          </p>
          <ul className="mt-4 space-y-3 text-black/70 dark:text-white/70">
            <li>
              <span className="font-medium text-foreground">Project:</span> one workflow,
              fixed price, agreed in writing before the build starts.
            </li>
            <li>
              <span className="font-medium text-foreground">Retainer:</span> ongoing tuning,
              monitoring, and new workflows over time, billed monthly.
            </li>
            {/* TODO: confirm the audit/pilot price before publishing a figure here. */}
            <li>
              <span className="font-medium text-foreground">Where to start:</span> a small
              paid audit or pilot on your real data, so you see it work before you commit to a
              full build.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Data and security</h2>
        <ul className="mt-4 space-y-3">
          {securityPoints.map((point) => (
            <li key={point} className="flex gap-3 text-black/70 dark:text-white/70">
              <Check />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {relatedWork.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">Related work</h2>
          <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">
            Automation and machine learning projects delivered by our ML lead, Pavlo
            Holubchykov, some of them before Raw Code was founded.
          </p>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {relatedWork.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className={`text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white ${linkClass}`}
                >
                  {project.name}
                </Link>
                {project.client && (
                  <span className="text-black/50 dark:text-white/50"> — {project.client}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-black/70 dark:text-white/70">
            Looking for something else?{" "}
            <Link href="/services" className={linkClass}>
              See all services
            </Link>
            .
          </p>
        </section>
      )}

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6">
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      <div className="mt-16 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">Got a workflow eating your team&apos;s week?</p>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          A free 30-minute call is enough to tell whether it&apos;s worth automating and
          roughly what it would cost.
        </p>
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
