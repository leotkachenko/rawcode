import Link from "next/link";
import type { Metadata } from "next";
import { team } from "@/lib/site-config";
import { caseStudiesByMember } from "@/lib/case-studies";
import { Avatar } from "@/components/Avatar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LinkedInLink } from "@/components/LinkedInLink";
import { personSchema } from "@/lib/schema";

const title = "Team";
const description =
  "The people who build Raw Code projects: Can Mustafa Patlar, Pavlo Holubchykov, and Oles Chura.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title,
    description,
    url: "/team",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {team.map((member) => (
        <JsonLd key={member.slug} data={personSchema(member)} />
      ))}

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Team" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Team</h1>
      <p className="mt-3 text-black/70 dark:text-white/70">
        A small studio — the people below are the people who do the work. No
        account layer, no bench of names you&apos;ll never meet.
      </p>

      <div className="mt-10 space-y-10">
        {team.map((member) => {
          const credits = caseStudiesByMember(member.slug);

          return (
            <article
              key={member.slug}
              id={member.slug}
              className="scroll-mt-8 border-t border-black/10 pt-8 dark:border-white/10"
            >
              <div className="flex items-start gap-4">
                <Avatar name={member.name} photo={member.photo} />
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-sm text-black/60 dark:text-white/60">{member.role}</p>
                  <div className="mt-2">
                    <LinkedInLink
                      url={member.linkedin}
                      label={`${member.name.split(" ")[0]} on LinkedIn`}
                    />
                  </div>
                </div>
              </div>

              {member.bio && (
                <p className="mt-4 text-black/70 dark:text-white/70">{member.bio}</p>
              )}

              {member.focus && member.focus.length > 0 && (
                <>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
                    Focus
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {member.focus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/70 dark:border-white/10 dark:text-white/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {credits.length > 0 && (
                <>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">
                    Work
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-black/70 dark:text-white/70">
                    {credits.map((project, index) => (
                      <li key={project.slug}>
                        <Link
                          href={`/work/${project.slug}`}
                          className="underline decoration-black/20 underline-offset-4 hover:decoration-black dark:decoration-white/20 dark:hover:decoration-white"
                        >
                          {project.client ?? project.name}
                        </Link>
                        {index < credits.length - 1 && <span aria-hidden>,</span>}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <p className="font-medium">Want one of us on your project?</p>
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
