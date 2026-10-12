import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "@/components/MobileMenu";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/what-is-raw-code", label: "What is Raw Code" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  return (
    <header className="relative border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-background transition-opacity hover:opacity-90"
            >
              <span className="hidden sm:inline">Book free consultation</span>
              <span className="sm:hidden">Free consultation</span>
            </Link>
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
