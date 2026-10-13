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
  // Optional <title> override when the page targets a query the service name
  // doesn't contain. Falls back to `name`.
  metaTitle?: string;
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
    metaTitle: "AI Workflow Automation for Businesses",
    tileDescription:
      "Automate one repetitive workflow, such as document processing, ticket triage, or reporting. Not a generic AI strategy deck.",
    priceSignal: "$3k–$30k project or retainer",
    summary:
      "Raw Code builds AI workflow automation for small and mid-sized businesses: data entry, inbox and ticket triage, reporting, lead routing, and document processing. We connect it to the tools you already use and keep a person in the loop for anything high-stakes. Engagements run as a fixed-price project or a monthly retainer.",
    metaDescription:
      "AI workflow automation for small and mid-sized businesses: document processing, ticket triage, lead routing, and reports. Start with a paid audit or pilot.",
    included: [
      "A paid audit to pick one concrete workflow and define what \"done\" looks like",
      "A prototype tested on your real data before the full build",
      "Integration with your existing tools and accounts, not a standalone demo",
      "Documentation, monitoring, and the source code at handover",
    ],
    process: [
      {
        title: "Discovery and audit",
        detail:
          "We map the workflow as it runs today, find the steps worth automating, and agree what \"done\" looks like.",
      },
      {
        title: "Prototype on real data",
        detail:
          "We test the approach on a sample of your actual documents, emails, or tickets, so you see how it handles your edge cases before committing to a build.",
      },
      {
        title: "Build and integrate",
        detail:
          "We build the automation into the tools your team already uses, with a human review step wherever a mistake would be costly.",
      },
      {
        title: "Handover, monitoring, and iteration",
        detail:
          "You get the code, documentation, and monitoring. We hand it over, or stay on retainer to tune it and automate the next workflow.",
      },
    ],
    // TODO: confirm a typical timeline range with the team, then replace the
    // timeline answer below with real numbers. No range is on record yet.
    faqs: [
      {
        question: "How much does AI workflow automation cost?",
        answer:
          "Most projects cost $3,000 to $30,000, as a fixed-price project or a monthly retainer. A single workflow that touches one or two systems sits at the low end. Several connected workflows, or ongoing tuning, sit at the high end. These ranges are directional. You get a fixed quote after a small paid audit or pilot.",
      },
      {
        question: "How long does an automation project take?",
        answer:
          "It depends on the workflow, and you get the timeline in writing before the build starts. The prototype comes first, so you see the automation working on your own data early, not at the end of the project.",
      },
      {
        question: "Do we need clean data before we start?",
        answer:
          "No. Most businesses don't have clean data, and most automations don't need it. Reading messy emails, PDFs, and free-text fields is exactly where AI helps. The audit shows where gaps in your data would cause problems, and the prototype tests that on real examples.",
      },
      {
        question: "Will AI automation replace our staff?",
        answer:
          "It replaces tasks, not judgment. The automation takes on repetitive steps like copying, sorting, and summarizing. Your team still makes the decisions and reviews anything high-stakes. What you do with the time it frees up is your call.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "We pick the model for the task, not the other way round. That's often a hosted model from OpenAI, Anthropic, or Google, sometimes an open-source model running in your own cloud, and plain code with no AI at all when a rule does the job more reliably.",
      },
      {
        question: "How do you handle our data and security?",
        answer:
          "The automation gets the least access it needs, and your data stays in your own accounts wherever possible. We don't use your data to train models. We work with GDPR, PIPEDA, and Quebec Law 25 in mind, and we tell you up front which third-party services will see your data.",
      },
      {
        question: "Who owns the code and the automation?",
        answer:
          "You do. At handover you get the full source code, documentation, and admin access to everything running in your accounts. You can keep us on retainer to maintain it, or run it yourself.",
      },
      {
        question: "Do we need our own AI or engineering team?",
        answer:
          "No. Most of our clients don't have one, and that's the point of the engagement. We scope, build, and document the automation so the people who already run the workflow can operate it.",
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
