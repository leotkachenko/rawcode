import { siteConfig, team, type TeamMember } from "./site-config";
import type { CaseStudy } from "./case-studies";
import type { Faq } from "./services";

// Only emitted once a real profile URL is on record — an empty sameAs array is
// worse than no sameAs at all for entity resolution.
function sameAs(...urls: (string | undefined)[]) {
  const present = urls.filter((url): url is string => Boolean(url));
  return present.length > 0 ? { sameAs: present } : {};
}

// Emitted only once a street address is on record — a PostalAddress with just a
// city reads as an incomplete NAP and helps nobody.
function postalAddress() {
  const { address } = siteConfig;
  if (!address.streetAddress) return {};
  return {
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: address.addressCountry,
    },
  };
}

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;

// Cities first (Etobicoke is a Place: it is part of Toronto), then the metro — the GTA municipalities our
// Toronto clients actually serve, not a padded list.
export const TORONTO_AREA_SERVED = [
  { "@type": "City", name: "Toronto" },
  { "@type": "City", name: "Mississauga" },
  { "@type": "Place", name: "Etobicoke" },
  { "@type": "City", name: "Markham" },
  { "@type": "City", name: "Vaughan" },
  { "@type": "City", name: "Oakville" },
  { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
];

export function personSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    url: `${siteConfig.url}/team#${member.slug}`,
    ...(member.bio ? { description: member.bio } : {}),
    ...(member.focus ? { knowsAbout: member.focus } : {}),
    ...sameAs(member.linkedin),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    ...postalAddress(),
    ...sameAs(siteConfig.linkedinUrl),
    employee: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      url: `${siteConfig.url}/team#${member.slug}`,
      ...sameAs(member.linkedin),
    })),
  };
}

export function caseStudySchema(project: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteConfig.url}/work/${project.slug}`,
    ...(project.image ? { image: `${siteConfig.url}${project.image}` } : {}),
    ...(project.client
      ? { sourceOrganization: { "@type": "Organization", name: project.client } }
      : {}),
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  // Either a /services/<slug> page or a full path for pages outside /services.
  slug?: string;
  path?: string;
  serviceType?: string;
  areaServed?: object[];
}) {
  const path = params.path ?? `/services/${params.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.serviceType ?? params.name,
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}${path}`,
    ...(params.areaServed ? { areaServed: params.areaServed } : {}),
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// Returns null until a street address is on record: Google's LocalBusiness
// markup expects one, and a ProfessionalService without it is just noise.
export function localBusinessSchema(params: { path: string; description: string }) {
  if (!siteConfig.address.streetAddress) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}${params.path}#business`,
    name: siteConfig.name,
    url: `${siteConfig.url}${params.path}`,
    description: params.description,
    email: siteConfig.contactEmail,
    ...postalAddress(),
    areaServed: TORONTO_AREA_SERVED,
    parentOrganization: { "@id": ORGANIZATION_ID },
    ...sameAs(siteConfig.linkedinUrl),
  };
}

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
