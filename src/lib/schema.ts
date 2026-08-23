import { siteConfig, team, type TeamMember } from "./site-config";
import type { CaseStudy } from "./case-studies";
import type { Faq } from "./services";

// Only emitted once a real profile URL is on record — an empty sameAs array is
// worse than no sameAs at all for entity resolution.
function sameAs(...urls: (string | undefined)[]) {
  const present = urls.filter((url): url is string => Boolean(url));
  return present.length > 0 ? { sameAs: present } : {};
}

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
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
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
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}/services/${params.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
