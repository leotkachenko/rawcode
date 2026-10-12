import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";
import { NewsletterForm } from "./NewsletterForm";
import { LinkedInLink } from "./LinkedInLink";

const companyLinks = [
  { href: "/software-development-toronto", label: "Software Development in Toronto" },
  { href: "/website-development-toronto", label: "Website Development in Toronto" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/what-is-raw-code", label: "What is Raw Code" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            {siteConfig.tagline}.
          </p>
          <div className="mt-3">
            <LinkedInLink url={siteConfig.linkedinUrl} label="LinkedIn" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-2 space-y-1 text-sm text-black/60 dark:text-white/60">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-black dark:hover:text-white">
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-2 space-y-1 text-sm text-black/60 dark:text-white/60">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-black dark:hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Stay in the loop</p>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Occasional notes on what we&apos;re building. No spam, unsubscribe anytime.
          </p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-8 text-xs text-black/40 dark:text-white/40">
        © {new Date().getUTCFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
