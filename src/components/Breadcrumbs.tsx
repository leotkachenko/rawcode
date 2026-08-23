import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-black/50 dark:text-white/50">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.name} className="flex items-center gap-1.5">
                {index > 0 && <span aria-hidden>/</span>}
                {isLast || !item.href ? (
                  <span aria-current={isLast ? "page" : undefined}>{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-black dark:hover:text-white">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
