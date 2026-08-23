import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = "Services";
const description =
  "Five ways to work with Raw Code: small builds, fixed-scope builds, SEO/GEO website builds, AI automation, and staff augmentation, each with a price signal.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title,
    description,
    url: "/services",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const FEATURED_SLUG = "fixed-scope-builds";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Services</h1>
      <p className="mt-3 max-w-xl text-black/70 dark:text-white/70">
        Each tier has a defined process and a price signal up front. Start at the top of the
        ladder and go as deep as fits — a small build is the easiest way in, staff augmentation
        is the deepest commitment.
      </p>

      <ol className="mt-12 max-w-3xl">
        {services.map((service, index) => {
          const isFeatured = service.slug === FEATURED_SLUG;
          const isLast = index === services.length - 1;

          return (
            <li key={service.slug} className="relative pb-10 pl-16 last:pb-0 sm:pl-20">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute left-[19px] top-10 bottom-0 w-px bg-black/10 dark:bg-white/10 sm:left-[23px] sm:top-12"
                />
              )}
              <span
                aria-hidden
                className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${
                  isFeatured
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-black/15 text-black/40 dark:border-white/15 dark:text-white/40"
                }`}
              >
                <ServiceIcon slug={service.slug} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>

              <Link
                href={`/services/${service.slug}`}
                className={`block rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/10 ${
                  isFeatured
                    ? "border-accent/40 bg-accent-soft p-7 sm:p-8"
                    : "border-black/10 hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold sm:text-xl">{service.name}</h2>
                  <span
                    className={`whitespace-nowrap text-sm font-medium ${
                      isFeatured ? "text-accent" : "text-black/50 dark:text-white/50"
                    }`}
                  >
                    {service.priceSignal}
                  </span>
                </div>
                {isFeatured && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent">
                    Most engagements start here
                  </p>
                )}
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  {service.tileDescription}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
