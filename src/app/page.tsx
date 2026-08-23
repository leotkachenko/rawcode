import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { team } from "@/lib/site-config";
import { Avatar } from "@/components/Avatar";

// The full list lives on /work — the home page shows a short slice of it.
const featuredCaseStudies = caseStudies.slice(0, 6);

const title = "Software & AI Studio";
const description =
  "Raw Code builds software, AI automation, and SEO/GEO-optimized websites — fixed pricing, real proof of work, one clear path from pilot to full engagement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          We turn a spec into working software — priced up front.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-black/70 dark:text-white/70">
          Raw Code is a dev studio and AI consultancy. Start small to see how we work, or go
          straight to a fixed-scope build — every tier below has a clear price signal and a
          defined process, not an open-ended quote.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Book a call
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-xl border border-black/10 p-6 transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <span className="whitespace-nowrap text-sm text-black/50 dark:text-white/50">
                  {service.priceSignal}
                </span>
              </div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {service.tileDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Case studies</h2>
          <Link href="/work" className="text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {featuredCaseStudies.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="overflow-hidden rounded-xl border border-black/10 transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.name} screenshot`}
                  width={1200}
                  height={630}
                  className="h-32 w-full object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Team</h2>
          <Link href="/team" className="text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
            Meet the team
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {team.map((member) => (
            <Link
              key={member.slug}
              href={`/team#${member.slug}`}
              className="flex items-center gap-3 rounded-xl border border-black/10 p-4 transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25"
            >
              <Avatar name={member.name} photo={member.photo} size={44} />
              <span className="min-w-0">
                <span className="block font-medium">{member.name}</span>
                <span className="block text-sm text-black/60 dark:text-white/60">
                  {member.role}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
