import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqPageSchema } from "@/lib/schema";

const title = "What is Raw Code?";
const description =
  "\"Raw code\" is source code in its original, unprocessed, human-written form — before compilation, minification, or other build-time transformation.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/what-is-raw-code",
  },
  openGraph: {
    title,
    description,
    url: "/what-is-raw-code",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const faqs = [
  {
    question: "What is raw code?",
    answer:
      "Raw code is source code in its original, human-written form — the files a developer actually writes, before a build process compiles, bundles, minifies, or otherwise transforms it into what actually runs in production.",
  },
  {
    question: "Why is it called \"raw\"?",
    answer:
      "\"Raw\" is used the same way it's used for raw data or a raw image file: unprocessed. Raw code hasn't been through a compiler, transpiler, or minifier yet — it's the direct, readable input to that process, not the processed output.",
  },
  {
    question: "Is raw code the same as source code?",
    answer:
      "In practice, yes — \"raw code\" and \"source code\" both refer to the original, human-readable files a project is written in, as opposed to compiled binaries, bundled JavaScript, or minified output.",
  },
  {
    question: "Why does the distinction matter?",
    answer:
      "It matters for debugging and auditing: raw code is what you read and reason about, while the built/minified output is what actually executes. Source maps exist specifically to trace runtime behaviour in built code back to the raw code that produced it.",
  },
];

export default function WhatIsRawCodePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <JsonLd data={faqPageSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "What is Raw Code" }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">What is Raw Code?</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">
        Raw code is source code in its original, unprocessed, human-written form — the files a
        developer actually edits, before any build step (compiling, bundling, minifying,
        transpiling) turns them into what actually ships to a browser, server, or device.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70">
        The term borrows the same sense as &quot;raw&quot; in raw data or a raw image file:
        unprocessed input, as opposed to the transformed output of a pipeline. A minified
        JavaScript bundle running in a browser is the built output; the TypeScript files a
        developer wrote are the raw code behind it.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">FAQ</h2>
      <div className="mt-4">
        <FaqList faqs={faqs} />
      </div>

      <div className="mt-12 border-t border-black/10 pt-8 dark:border-white/10">
        <p className="text-black/70 dark:text-white/70">
          Raw Code is also the name of our studio — we build software, AI automation, and
          websites for other businesses.{" "}
          <Link href="/services" className="underline hover:no-underline">
            See what we do
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
