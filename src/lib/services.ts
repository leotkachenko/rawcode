export type Faq = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tileDescription: string;
  priceSignal: string;
  summary: string;
  metaDescription: string;
  included: string[];
  process: ProcessStep[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "small-builds",
    name: "Small Builds & Pilots",
    shortName: "Small Builds",
    tileDescription:
      "A fast, low-risk way to work with us before committing to a bigger engagement.",
    priceSignal: "$1.5k–$5k",
    summary:
      "Small Builds are fixed-fee, fast-turnaround engagements: a landing page, a small internal tool, or a single MVP feature. They're built for speed and low risk — a way to see how we work before scoping a larger project, and the source of the case studies below.",
    metaDescription:
      "A fixed-fee landing page, small tool, or MVP feature delivered in days to weeks for $1.5k–$5k. The low-risk way to see how Raw Code works before a bigger build.",
    included: [
      "One landing page, small web tool, or single MVP feature",
      "Fixed scope agreed before work starts — no surprise invoices",
      "Delivery in days to a couple of weeks, not months",
      "Direct handoff of source code and deployment access",
    ],
    process: [
      {
        title: "Scope call",
        detail: "A short call to pin down exactly what's being built and what's out of scope.",
      },
      {
        title: "Fixed quote",
        detail: "A flat price and delivery date, confirmed in writing before any work starts.",
      },
      {
        title: "Build",
        detail: "We build and share progress; feedback happens async, not through change orders.",
      },
      {
        title: "Handoff",
        detail: "You get the code, deployment access, and a short walkthrough.",
      },
    ],
    faqs: [
      {
        question: "What counts as a small build?",
        answer:
          "A landing page, a single-purpose internal tool, or one well-defined MVP feature — anything scoped tightly enough to quote a fixed price and deliver in days to a couple of weeks.",
      },
      {
        question: "Can a small build turn into a bigger project?",
        answer:
          "Yes — this tier is designed as the entry point into larger Fixed-Scope Builds once we've established how we work together.",
      },
      {
        question: "Is the price really fixed?",
        answer:
          "Yes. Scope is agreed before work starts. If requirements change materially mid-build, we re-quote the difference rather than silently absorbing or padding it.",
      },
      {
        question: "How do I pay?",
        answer:
          "Small builds can be paid directly online via our payment link — see the Contact page — without a sales call, for anyone who already knows what they want built.",
      },
    ],
  },
  {
    slug: "fixed-scope-builds",
    name: "Fixed-Scope Builds",
    shortName: "Fixed-Scope Builds",
    tileDescription:
      "\"Make Your Idea Real\" — a full app or website build from a spec, for a fixed price.",
    priceSignal: "$5k–$50k+",
    summary:
      "Fixed-Scope Builds take a real spec — a product idea, an app, a full marketing site — from design through launch. Branding and UI/UX design are handled as part of this engagement, not as separate line items. Price and timeline are fixed against an agreed spec before development starts.",
    metaDescription:
      "A full app or website built from a written spec, for $5k–$50k+, including UI/UX design and branding. Price and timeline are fixed before development starts.",
    included: [
      "Discovery and scope definition, ending in a written spec",
      "UI/UX design and branding as needed for the build",
      "Full-stack development through launch",
      "One agreed round of revisions built into the fixed price",
    ],
    process: [
      {
        title: "Briefing",
        detail: "We gather requirements, constraints, and success criteria directly from you.",
      },
      {
        title: "Ideating",
        detail: "We turn the brief into a concrete spec, design direction, and fixed quote.",
      },
      {
        title: "Prototyping",
        detail: "We build toward the spec in reviewable milestones, not a single black-box delivery.",
      },
      {
        title: "Testing & launch",
        detail: "We test against the original spec and ship, with a short post-launch support window.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between a Small Build and a Fixed-Scope Build?",
        answer:
          "A Small Build is one landing page, tool, or feature delivered in days to weeks. A Fixed-Scope Build is a full app or website built from a spec — bigger, longer, and inclusive of design and branding work.",
      },
      {
        question: "Do you handle design as well as development?",
        answer:
          "Yes. Branding and UI/UX design are included as part of a Fixed-Scope Build rather than sold separately — you get one team responsible for how it looks and how it works.",
      },
      {
        question: "How is the price fixed if scope can change?",
        answer:
          "We fix price against a written spec agreed during the Ideating stage. Changes to that spec after development starts are quoted separately rather than folded silently into the original price.",
      },
      {
        question: "What do I get at the end?",
        answer:
          "A launched, working product, full source code, and a short post-launch support window to catch anything that surfaces under real usage.",
      },
    ],
  },
  {
    slug: "seo-geo-website-builds",
    name: "SEO/GEO-Optimized Website Builds",
    shortName: "SEO/GEO Builds",
    tileDescription:
      "Sites engineered to rank in classic search and get cited by AI answer engines.",
    priceSignal: "Scoped per project",
    summary:
      "We build websites structured for two audiences at once: search engines and AI answer engines (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews). That means clean semantic structure, direct Q&A content AI engines can quote, and the technical fundamentals — structured data, fast static rendering, clear entity signals — that both rely on.",
    metaDescription:
      "Websites engineered to rank in Google and cited by ChatGPT, Perplexity, and Gemini — semantic structure, FAQ schema, static rendering, scoped per project.",
    included: [
      "Semantic heading structure and clean information architecture",
      "FAQ content written in direct, citation-friendly Q&A format",
      "Organization, Service, and FAQPage structured data",
      "Statically generated pages for speed and crawlability",
    ],
    process: [
      {
        title: "Audit & entity mapping",
        detail: "We map what the site needs to be unambiguously about, for both search engines and AI crawlers.",
      },
      {
        title: "Content architecture",
        detail: "We structure pages, headings, and FAQ blocks around real queries, not keyword stuffing.",
      },
      {
        title: "Build",
        detail: "We build a fast, statically generated site with structured data wired in from the start.",
      },
      {
        title: "Launch & monitor",
        detail: "We ship, submit to search consoles, and monitor early indexing and citation behaviour.",
      },
    ],
    faqs: [
      {
        question: "What is GEO?",
        answer:
          "GEO (generative engine optimization) is structuring a site so AI answer engines like ChatGPT, Perplexity, Gemini, and Google AI Overviews can accurately cite it — direct Q&A content, clear entity signals, and structured data, alongside classic SEO fundamentals.",
      },
      {
        question: "Is GEO different from SEO?",
        answer:
          "They overlap heavily — both reward clean structure, clear writing, and fast pages — but GEO adds an emphasis on directly quotable, self-contained answers, since AI engines cite passages rather than ranking whole pages.",
      },
      {
        question: "Do you guarantee rankings or AI citations?",
        answer:
          "No. No one can guarantee search rankings or AI citations. We build the structural and content fundamentals that make both more likely, and report on what actually happens post-launch rather than promising outcomes up front.",
      },
      {
        question: "What's an example of this work?",
        answer:
          "See the case studies page for real projects, including lumirank.ca — a GEO-focused studio whose own site follows these same structural patterns.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation Consulting & Implementation",
    shortName: "AI Automation",
    tileDescription:
      "Practical automation of a specific workflow, not a generic AI strategy deck.",
    priceSignal: "$3k–$30k project or retainer",
    summary:
      "We identify a specific, well-bounded workflow that's slow, manual, or error-prone, and build the AI-backed automation that fixes it — internal tools, document/data pipelines, or LLM-backed features inside an existing product. Engagements run as a fixed-price project or an ongoing retainer, depending on scope.",
    metaDescription:
      "We automate one specific manual workflow — document processing, data entry, or an LLM feature — for $3k–$30k. Not a generic AI strategy deck.",
    included: [
      "A scoping session to identify one concrete workflow to automate",
      "Design and implementation of the automation, including any LLM integration",
      "Integration with your existing tools and data, not a standalone demo",
      "Documentation so your team can maintain and extend it",
    ],
    process: [
      {
        title: "Workflow audit",
        detail: "We find the specific manual process worth automating, and what \"done\" looks like.",
      },
      {
        title: "Design",
        detail: "We design the automation and, where relevant, choose and evaluate the LLM/model approach.",
      },
      {
        title: "Implementation",
        detail: "We build and integrate it against real data and existing systems, not a synthetic demo.",
      },
      {
        title: "Handoff or retainer",
        detail: "We hand off with documentation, or continue on retainer to extend and maintain it.",
      },
    ],
    faqs: [
      {
        question: "What kind of workflows do you automate?",
        answer:
          "Specific, bounded ones: document processing, data entry and reconciliation, internal reporting, or adding an LLM-backed feature to an existing product — not open-ended \"AI strategy.\"",
      },
      {
        question: "Do I need my own AI/ML team already?",
        answer:
          "No. Most clients don't have one — that's the point of the engagement. We scope, build, and document the automation so your existing team can run and extend it afterward.",
      },
      {
        question: "Project or retainer — how do you decide?",
        answer:
          "A single, well-defined automation is usually a fixed-price project. Ongoing extension, monitoring, or multiple workflows over time is better suited to a retainer.",
      },
      {
        question: "Can you show a real before/after example?",
        answer:
          "We're building out a documented before/after case study for this line of work; check the case studies page for current, verified examples in the meantime.",
      },
    ],
  },
  {
    slug: "staff-augmentation",
    name: "Staff Augmentation",
    shortName: "Staff Augmentation",
    tileDescription:
      "Embed a Raw Code engineer directly on your team, on retainer.",
    priceSignal: "$8k–$15k/mo per engineer",
    summary:
      "Staff Augmentation — previously listed as Talent Resourcing — embeds a Raw Code engineer directly into your team on a monthly retainer. It's the slowest engagement to ramp, since it depends on trust and available bench capacity, but it's the right fit once a working relationship is already established through one of the project-based tiers above.",
    metaDescription:
      "Embed a Raw Code engineer on your team for $8k–$15k per month. Direct communication with the engineer, month-to-month after an initial trial term.",
    included: [
      "A dedicated engineer working inside your existing team and tools",
      "Monthly retainer billing, month-to-month after an initial term",
      "Direct communication with the engineer, not a relayed account manager",
      "Ramp-down notice period instead of an abrupt end of engagement",
    ],
    process: [
      {
        title: "Fit call",
        detail: "We confirm the skill set, timezone, and team fit needed before committing capacity.",
      },
      {
        title: "Trial period",
        detail: "A short initial term to confirm working fit on both sides before a longer commitment.",
      },
      {
        title: "Embedded work",
        detail: "The engineer works inside your sprint process and tools like a team member, not a vendor.",
      },
      {
        title: "Ongoing or wind-down",
        detail: "The retainer continues month-to-month, or winds down with notice when the need ends.",
      },
    ],
    faqs: [
      {
        question: "Is Staff Augmentation the same as the old Talent Resourcing offer?",
        answer:
          "Yes — same offer, renamed for clarity, now with an explicit pricing signal instead of a request-a-quote-only model.",
      },
      {
        question: "How fast can an engineer start?",
        answer:
          "This is the slowest tier to ramp, since it depends on current bench availability. We're upfront about timeline during the fit call rather than overpromising a start date.",
      },
      {
        question: "Is there a minimum term?",
        answer:
          "Engagements start with a short initial term to confirm fit, then continue month-to-month with a notice period for wind-down.",
      },
      {
        question: "Who does the engineer report to?",
        answer:
          "You. The engineer works inside your team's existing process and communicates directly with your team, not through a relayed account manager.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
