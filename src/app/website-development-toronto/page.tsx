import Link from "next/link";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import { torontoCaseStudies } from "@/lib/case-studies";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientCard } from "@/components/ClientCard";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, serviceSchema, TORONTO_AREA_SERVED } from "@/lib/schema";

const parentService = getServiceBySlug("seo-geo-website-builds");
const torontoClients = torontoCaseStudies();
const pageCounts = torontoClients
  .map((project) => project.liveSite?.pageCount ?? 0)
  .filter((count) => count > 0);
const smallestSite = Math.min(...pageCounts);
const largestSite = Math.max(...pageCounts);

const path = "/website-development-toronto";
const title = "Website Development Toronto: SEO & GEO Sites";
const description = `Website development in Toronto: city pages, answer libraries, and multilingual sites. The ${torontoClients.length} GTA sites we build and maintain run ${smallestSite} to ${largestSite} pages each.`;

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

// Each pattern is tied to the client site where it's live today, so every claim
// on this page can be checked by visiting that site.
const patterns = [
  {
    title: "A page for each service in each city you serve",
    detail:
      "Osoba Renos & Design has a kitchen renovation page for 18 GTA cities and neighbourhoods, from Ajax to Whitby, plus bathroom, basement, and condo pages for many of the same places. Someone searching \"kitchen renovation etobicoke\" lands on a page about exactly that.",
    slug: "osobarenos",
  },
  {
    title: "City pages across the GTA",
    detail:
      "YaDesign Studio has its own page for Toronto, Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Oakville, and Burlington, plus Los Angeles.",
    slug: "yadesign-studio",
  },
  {
    title: "Answers AI engines can quote",
    detail:
      "LumiRank runs a library of 21 single-question pages. Each one opens with a \"Short answer\" before going into detail, so the answer can be lifted out on its own.",
    slug: "lumirank",
  },
  {
    title: "More than one language",
    detail:
      "NovelMaker publishes its pages in 8 languages, and YaDesign Studio runs a Ukrainian version beside the English one. Each language gets its own URLs instead of a translate button.",
    slug: "novelmaker",
  },
];

const faqs = [
  {
    question: "How much does website development cost in Toronto?",
    answer: `With us, an SEO/GEO website is ${parentService?.priceSignal.toLowerCase() ?? "scoped per project"}, because a 20-page site and a 180-page site are different jobs. A single landing page fits our Small Builds tier at ${getServiceBySlug("small-builds")?.priceSignal ?? "a fixed fee"}. You get a fixed quote against a written scope before any work starts.`,
  },
  {
    question: "Why do your sites have so many pages?",
    answer:
      "Because each page can only rank for a handful of searches. A renovation contractor that serves four cities and offers five services needs a page for each combination people actually search, plus guides that answer their questions before they call.",
  },
  {
    question: "Will my new website rank on Google or show up in ChatGPT?",
    answer:
      "Nobody can promise that, and we don't. We build the structure both rely on (clean headings, structured data, fast static pages, direct answers) and then report what actually happens after launch.",
  },
  {
    question: "What happens after the site launches?",
    answer: `The site keeps growing. On the ${torontoClients.length} GTA sites on this page, new city pages, guides, and project write-ups ship as ongoing work rather than a one-off handover.`,
  },
  {
    question: "Can you build pages for Mississauga, Oakville, or other GTA cities?",
    answer:
      "Yes. Between them, the sites we maintain have pages for 20 GTA cities and neighbourhoods, including Mississauga, Oakville, Brampton, Markham, Vaughan, Scarborough, and North York. A city page needs real local content to be worth indexing, so we only build the ones you actually serve.",
  },
];

export default function WebsiteDevelopmentTorontoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <JsonLd
        data={serviceSchema({
          name: "Website Development in Toronto",
          serviceType: "Website development",
          description,
          path,
          areaServed: TORONTO_AREA_SERVED,
        })}
      />
      <JsonLd data={faqPageSchema(faqs)} />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Software Development in Toronto", href: "/software-development-toronto" },
          { name: "Website Development in Toronto" },
        ]}
      />

      <section className="mt-4">
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Website Development in Toronto
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
          A five-page site gives Google five chances to show you. The Toronto sites we build
          and maintain run from {smallestSite} to {largestSite} pages, and each page is aimed at
          a search somebody actually types.
        </p>
        <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
          We build websites for GTA businesses that want to be found in Google and in AI
          answer engines. Below are the four we still run, and the patterns they share.
        </p>
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
        <h2 className="text-2xl font-semibold tracking-tight">Toronto sites we&apos;ve built</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {torontoClients.map((project) => (
            <ClientCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">How these sites are built</h2>
        <div className="mt-6 space-y-8">
          {patterns.map((pattern) => (
            <div key={pattern.title}>
              <h3 className="text-lg font-semibold">{pattern.title}</h3>
              <p className="mt-2 text-black/70 dark:text-white/70">{pattern.detail}</p>
              <Link
                href={`/work/${pattern.slug}`}
                className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
                aria-label={`See the ${torontoClients.find((p) => p.slug === pattern.slug)?.name ?? ""} case study`}
              >
                See the case study
              </Link>
            </div>
          ))}
        </div>
      </section>

      {parentService && (
        <p className="mt-10 max-w-3xl text-sm text-black/70 dark:text-white/70">
          What&apos;s included and the full process are on our{" "}
          <Link href={`/services/${parentService.slug}`} className="font-medium text-accent hover:underline">
            SEO/GEO website builds
          </Link>{" "}
          page. Need an app or an AI tool instead? See{" "}
          <Link href="/software-development-toronto" className="font-medium text-accent hover:underline">
            software development in Toronto
          </Link>
          .
        </p>
      )}

      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6">
          <FaqList faqs={faqs} />
        </div>
      </section>

      <div className="mt-16 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">Want a site like these?</p>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          Tell us which services and cities you cover, and we&apos;ll scope the pages.
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
