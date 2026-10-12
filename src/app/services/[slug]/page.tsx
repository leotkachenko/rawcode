import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, services } from "@/lib/services";
import { caseStudiesByService } from "@/lib/case-studies";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { serviceSchema, faqPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = `/services/${service.slug}`;

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: service.name,
      description: service.metaDescription,
      url,
    },
    twitter: {
      card: "summary",
      title: service.name,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedWork = caseStudiesByService(service.slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.summary,
          slug: service.slug,
        })}
      />
      <JsonLd data={faqPageSchema(service.faqs)} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-accent-soft text-accent"
        >
          <ServiceIcon slug={service.slug} className="h-5 w-5" />
        </span>
        <p className="text-sm font-medium text-accent">{service.priceSignal}</p>
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{service.name}</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">{service.summary}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">What&apos;s included</h2>
        <ul className="mt-4 space-y-3">
          {service.included.map((item) => (
            <li key={item} className="flex gap-3 text-black/70 dark:text-white/70">
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
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Process</h2>
        <ol className="mt-4">
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
      </section>

      {relatedWork.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">Related work</h2>
          <ul className="mt-4 space-y-2">
            {relatedWork.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="text-black/70 underline decoration-black/20 underline-offset-4 hover:text-black hover:decoration-black dark:text-white/70 dark:decoration-white/20 dark:hover:text-white dark:hover:decoration-white"
                >
                  {project.name}
                </Link>
                {project.client && (
                  <span className="text-black/50 dark:text-white/50"> — {project.client}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-4">
          <FaqList faqs={service.faqs} />
        </div>
      </section>

      <div className="mt-12 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">Ready to scope this?</p>
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
