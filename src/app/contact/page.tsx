import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const title = "Contact";
const description =
  "Get a free consultation about your project with Raw Code, or pay directly online for a small build.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 text-black/70 dark:text-white/70">
        Two ways in: book a free consultation to scope anything from a Small Build to Staff Augmentation, or
        pay directly online if you already know you want a Small Build.
      </p>

      <section className="mt-10 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-semibold">Get a free consultation about your project</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          A free 30-minute call to talk through your project, scope the work, and confirm price
          and timeline.
        </p>
        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Book free consultation
        </a>
      </section>

      <section className="mt-6 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-semibold">Pay for a Small Build directly</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          For a landing page, small tool, or single MVP feature, skip the call and pay online —
          we&apos;ll follow up to confirm scope right after.
        </p>
        <a
          href={siteConfig.stripePaymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
        >
          Pay for a Small Build
        </a>
      </section>

      <section className="mt-6 rounded-xl border border-black/10 p-6 dark:border-white/10">
        <h2 className="text-lg font-semibold">Email</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          Prefer email? Reach us directly at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline hover:no-underline">
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
