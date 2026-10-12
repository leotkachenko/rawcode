import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { team } from "@/lib/site-config";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `This file is a curated index of every canonical page on ${siteConfig.url}, grouped by section, intended for use by AI assistants and crawlers that prefer a structured Markdown index over a sitemap. See https://llmstxt.org for the format spec.`,
  );
  lines.push("");

  lines.push("## Main pages");
  lines.push(`- [Home](${siteConfig.url}/)`);
  lines.push(`- [Services](${siteConfig.url}/services)`);
  lines.push(`- [Software Development in Toronto](${siteConfig.url}/software-development-toronto)`);
  lines.push(`- [Website Development in Toronto](${siteConfig.url}/website-development-toronto)`);
  lines.push(`- [Work](${siteConfig.url}/work)`);
  lines.push(`- [Team](${siteConfig.url}/team)`);
  lines.push(`- [What is Raw Code?](${siteConfig.url}/what-is-raw-code)`);
  lines.push(`- [Contact](${siteConfig.url}/contact)`);
  lines.push("");

  lines.push("## Services");
  for (const service of services) {
    lines.push(`- [${service.name}](${siteConfig.url}/services/${service.slug})`);
  }
  lines.push("");

  lines.push("## Case studies");
  for (const project of caseStudies) {
    const client = project.client ? ` (client: ${project.client})` : "";
    const live = project.url ? ` — live at ${project.url}` : "";
    lines.push(
      `- [${project.name}](${siteConfig.url}/work/${project.slug})${client}${live} — built by ${siteConfig.name}`,
    );
  }
  lines.push("");

  lines.push("## Team");
  for (const member of team) {
    const profile = member.linkedin ? ` — LinkedIn: ${member.linkedin}` : "";
    lines.push(
      `- [${member.name}](${siteConfig.url}/team#${member.slug}) — ${member.role}${profile}`,
    );
  }

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
