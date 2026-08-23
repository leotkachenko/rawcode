export const siteConfig = {
  name: "Raw Code",
  domain: "rawcode.ai",
  url: "https://rawcode.ai",
  tagline: "Where Vision Meets Virtuosity",
  description:
    "Raw Code is a dev studio and AI consultancy that ships software, AI automation, and SEO/GEO-optimized websites — priced up front, backed by real work.",
  // TODO: confirm this inbox exists before launch.
  contactEmail: "hello@rawcode.ai",
  // TODO: not a real scheduling link yet — replace with the actual Calendly (or
  // equivalent) URL once one is set up. Left as "#" rather than a guessed slug so a
  // fake/unverified link can't accidentally go live.
  calendlyUrl: "#",
  // TODO: not a real Stripe Payment Link yet — replace once one is created in the
  // Stripe dashboard for the Small Builds tier.
  stripePaymentLinkUrl: "#",
  // Verified: this page's own website field points back to rawcode.ai, and it's
  // listed in Toronto. Every LinkedIn link on the site renders only when its URL is
  // filled in, so an empty string here hides the link rather than shipping a 404.
  linkedinUrl: "https://www.linkedin.com/company/rawcode-ai",
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  // Optional: only written where there's a source on record. No invented biography.
  bio?: string;
  // Optional: what this person actually works on, again only where sourced.
  focus?: string[];
  // TODO: no headshots exist in the repo yet. Drop a square image in public/team/
  // and point at it here; until then the team page falls back to initials.
  photo?: string;
  // TODO: real LinkedIn profile URLs. The live rawcode.ai site links none, and a
  // web search turned up only unconfirmed same-name candidates — LinkedIn blocks
  // automated profile reads, so none could be corroborated. Ask each person for
  // their own URL. Links render only when a URL is present, so empty is safe.
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    slug: "can-mustafa-patlar",
    name: "Can Mustafa Patlar",
    role: "Co-Founder / CEO",
    // TODO: bio, focus areas, and LinkedIn URL — nothing on record yet, so nothing
    // is published. Ask Can before filling these in.
  },
  {
    slug: "pavlo-holubchykov",
    name: "Pavlo Holubchykov",
    role: "Lead ML/AI Developer",
    // Sourced from Pavlo's own project deck (Pavlo-Holubchykov_Data-Scientist.pptx)
    // in the repo root — the same deck the ML case studies come from.
    bio:
      "Pavlo leads Raw Code's machine learning and AI work: 5+ years in data science on top of 6+ years in software development, delivered as production systems rather than notebooks. His project history spans computer-vision quality control on factory lines, NLP and retrieval-augmented chatbots, speech transcription pipelines, and time-series forecasting.",
    focus: [
      "Computer vision",
      "NLP and retrieval-augmented generation",
      "Time series forecasting",
      "Speech recognition and synthesis",
    ],
  },
  {
    slug: "oles-chura",
    name: "Oles Chura",
    role: "Lead Software Developer",
    // TODO: bio, focus areas, and LinkedIn URL — nothing on record yet, so nothing
    // is published. Ask Oles before filling these in.
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}
