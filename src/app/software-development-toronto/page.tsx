import Link from "next/link";
import type { Metadata } from "next";
import { getServiceBySlug, services } from "@/lib/services";
import { caseStudies, torontoCaseStudies } from "@/lib/case-studies";
import { formattedAddress, siteConfig, team } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientCard } from "@/components/ClientCard";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, localBusinessSchema, serviceSchema, TORONTO_AREA_SERVED } from "@/lib/schema";

const torontoClients = torontoCaseStudies();
const maintainedCount = torontoClients.filter((project) => project.maintained).length;
const livePageCount = torontoClients.reduce(
  (total, project) => total + (project.liveSite?.pageCount ?? 0),
  0,
);

const path = "/software-development-toronto";
const title = "Software Development Toronto: Apps & AI";
const description = `Raw Code is a Toronto software and AI studio. We maintain ${maintainedCount} live GTA client sites, ${livePageCount} pages in all, and build apps, AI automation, and SEO/GEO websites.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title,
    description,
    url: path,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const checkedDate = new Date(`${torontoClients[0]?.liveSite?.checked}T12:00:00Z`).toLocaleDateString(
  "en-CA",
  { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
);
const price = (slug: string) => getServiceBySlug(slug)?.priceSignal ?? "";
const remoteClients = caseStudies
  .filter((project) => !project.toronto && project.client && project.creditMember)
  .map((project) => project.client as string);

const stats = [
  { value: String(maintainedCount), label: "GTA client sites we still maintain" },
  { value: String(livePageCount), label: "live pages across those sites" },
  { value: String(services.length), label: "ways to work with us, each priced up front" },
  { value: String(caseStudies.length), label: "projects written up on our work page" },
];

const faqs = [
  {
    question: "How much does software development cost in Toronto with Raw Code?",
    answer: `It depends on the tier. Small builds run ${price("small-builds")}, fixed-scope app or website builds run ${price("fixed-scope-builds")}, AI automation runs ${price("ai-automation")}, and staff augmentation is ${price("staff-augmentation")}. Every quote is fixed against a written scope before work starts.`,
  },
  {
    question: "Do you keep supporting a project after it launches?",
    answer: `Yes. All ${maintainedCount} of our Greater Toronto Area client sites are still maintained by us after launch: NovelMaker, LumiRank, Osoba Renos & Design, and YaDesign Studio. Ongoing work runs as a retainer or as quoted follow-on builds.`,
  },
  {
    question: "Do you only work with Toronto companies?",
    answer: `No. Toronto and the GTA are home, but our work page also covers machine learning projects for ${remoteClients.slice(0, 3).join(", ")}, delivered by our ML lead, Pavlo Holubchykov, some of them before Raw Code was founded. The process and pricing are the same wherever you are.`,
  },
  {
    question: "Who will I actually work with?",
    answer: `The people who write the code. Raw Code is ${team.length} people: ${team
      .map((member) => `${member.name} (${member.role})`)
      .join(", ")}. There is no account manager in between.`,
  },
];

export default function SoftwareDevelopmentTorontoPage() {
  const address = formattedAddress();
  const businessSchema = localBusinessSchema({ path, description });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {businessSchema && <JsonLd data={businessSchema} />}
      <JsonLd
        data={serviceSchema({
          name: "Software Development in Toronto",
          serviceType: "Software development",
          description,
          path,
          areaServed: TORONTO_AREA_SERVED,
        })}
      />
      <JsonLd data={faqPageSchema(faqs)} />

      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Software Development in Toronto" }]}
      />

      <section className="mt-4">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Software Development in Toronto
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
          {maintainedCount} Greater Toronto Area businesses run on sites we built and still
          look after. Between them that&apos;s {livePageCount} live pages, from Etobicoke
          kitchen-renovation pages to a bedtime-story app published in 8 languages.
        </p>
        <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
          Raw Code is a small software and AI studio based in Toronto. We build web apps,
          AI automation, and websites structured for Google and AI answer engines. Most tiers
          come with a price range before you talk to us.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Book free consultation
          </Link>
          <Link
            href="/work"
            className="inline-block rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            See our work
          </Link>
        </div>
      </section>

      <section aria-label="Raw Code in numbers" className="mt-14">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-black/10 p-5 dark:border-white/10"
            >
              <dt className="text-sm text-black/60 dark:text-white/60">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-black/60 dark:text-white/60">
          Page counts come from each client&apos;s public sitemap, checked {checkedDate}.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Toronto clients we build for and maintain
        </h2>
        <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">
          These are live, and we still work on all of them. Two are local service businesses,
          one is a search agency, one is a consumer app.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {torontoClients.map((project) => (
            <ClientCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">What we build for Toronto businesses</h2>
        <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">
          Five tiers, from a fixed-fee small build up to an engineer embedded on your team.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-xl border border-black/10 p-6 transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <span className="whitespace-nowrap text-sm text-black/60 dark:text-white/60">
                  {service.priceSignal}
                </span>
              </div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {service.tileDescription}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-black/70 dark:text-white/70">
          Need a website specifically?{" "}
          <Link href="/website-development-toronto" className="font-medium text-accent hover:underline">
            Website development in Toronto
          </Link>{" "}
          covers how we build sites like the four above.
        </p>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Where we are</h2>
          <p className="mt-3 text-black/70 dark:text-white/70">
            {address ?? `${siteConfig.address.addressLocality}, Ontario, Canada`}
          </p>
          <p className="mt-2 text-black/70 dark:text-white/70">
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:no-underline">
              {siteConfig.contactEmail}
            </a>
          </p>
          <p className="mt-4 text-black/70 dark:text-white/70">
            All four clients above are in the Greater Toronto Area. The sites we&apos;ve built
            for them reach much further, with pages for 20 GTA cities and neighbourhoods, from
            Scarborough and North York to Oakville, Ajax, and Whitby.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Beyond Toronto</h2>
          <p className="mt-3 text-black/70 dark:text-white/70">
            Not everything on our work page is local. The machine learning projects delivered
            by Pavlo Holubchykov, some before Raw Code was founded, include ticket routing for Skanska, defect detection on a
            Wienerberger roof-tile line, and electricity forecasting for Jera.{" "}
            <Link href="/work" className="underline hover:no-underline">
              All {caseStudies.length} projects are on the work page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6">
          <FaqList faqs={faqs} />
        </div>
      </section>

      <div className="mt-16 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">Building something in Toronto?</p>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          A free 30-minute call is enough to scope it and put a price on it.
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
