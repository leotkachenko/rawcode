# SEO + GEO skill

A modular knowledge base for SEO and Generative Engine Optimization work. Used by Claude Code agents (notably [local-seo-pages](../../agents/local-seo-pages.md)) when working on city-service pages, keyword analysis, schema markup, content humanization, and AI-search optimization.

Every page the orchestrator builds is gated by a four-agent consensus review panel before handoff — see [consensus-review.md](references/consensus-review.md) and the "Reviewer agents" section below.

## Layout

```
.claude/skills/seo/
├── SKILL.md                  ← Entry point. Task router. Read this first.
├── README.md                 ← This file. For humans.
└── references/
    ├── keywords-triage.md       Parse GSC data → 4-bucket triage
    ├── page-rules-builder.md    Decision tree: which page type to build
    ├── url-rules.md             Slug, location-last, URL↔H1↔title alignment
    ├── metadata-structure.md    Title (50–60), description (150–160), OG, canonical
    ├── schema-cookbook.md       JSON-LD recipes (Service, FAQPage, LocalBusiness, ...)
    ├── content-priorities.md    Sitemap priority, above-fold hierarchy
    ├── content-hierarchy.md     H1/H2/H3 rules, semantic HTML
    ├── humanization.md          Anti-AI-voice rules
    ├── geo.md                   Generative Engine Optimization (AI search)
    ├── eeat.md                  E-E-A-T signals, YMYL handling
    ├── image-seo.md             Filename, alt, dimensions, WebP, srcset
    ├── core-web-vitals.md       LCP/CLS/INP targets and tactics
    ├── internal-linking.md      Hub-and-spoke, anchor diversity
    ├── search-intent.md         Info/commercial/transactional/navigational → page type
    ├── nap-citations.md         NAP consistency, Google Business Profile, directories
    ├── cannibalization.md       Detect / prevent / fix two same-site pages competing for one query
    ├── consensus-review.md      Four-agent independent panel that gates shipping
    └── self-improvement.md      Protocol for adding new knowledge
```

## How agents use this

```
1. Agent invoked (e.g. user pastes GSC queries to local-seo-pages)
2. Agent reads SKILL.md to identify the task type
3. Agent reads the 2–4 reference files the task router points to
4. Agent executes following the rules in those references
5. Before handoff, agent spawns the 4-agent consensus review panel (see below)
   and only ships on ≥3/4 approval
6. At end, agent appends any novel knowledge to the right reference (per self-improvement.md)
```

Agents do NOT load the entire library into context. They load on demand. Keeps context windows lean.

## Reviewer agents (consensus panel)

Four read-only agents, each an independent vote gating whether a built page ships. Protocol: [consensus-review.md](references/consensus-review.md). Spawned in parallel by `local-seo-pages`, never used to build pages themselves.

| Agent file | subagent_type | Lane |
|---|---|---|
| [seo-compliance-reviewer.md](../../agents/seo-compliance-reviewer.md) | `seo-compliance-reviewer` | Critical rules, cannibalization, URL/metadata/schema conventions |
| [ui-ux-analyzer.md](../../agents/ui-ux-analyzer.md) | `ui-ux-analyzer` | Layout, responsiveness, accessibility, visual consistency |
| [content-quality-auditor.md](../../agents/content-quality-auditor.md) | `content-quality-auditor` | Humanization, search-intent match, E-E-A-T |
| [infra-schema-auditor.md](../../agents/infra-schema-auditor.md) | `infra-schema-auditor` | Independent re-check of the five-place wiring + JSON-LD validity |

## How to use from outside an agent

You can invoke the skill directly:

```
/seo
```

Or be more specific:

```
/seo triage these queries: ...
/seo humanize this content: ...
/seo what schema should this page have?
```

The skill's task router (in SKILL.md) directs to the right reference.

## How to copy to another repo

This skill is project-scoped (lives in `.claude/skills/`). To share with another repo:

```bash
# From the destination repo's root:
mkdir -p .claude/skills
cp -r /path/to/this/repo/.claude/skills/seo .claude/skills/

# Also copy the orchestrator agent and its consensus review panel:
mkdir -p .claude/agents
cp /path/to/this/repo/.claude/agents/local-seo-pages.md .claude/agents/
cp /path/to/this/repo/.claude/agents/{seo-compliance-reviewer,ui-ux-analyzer,content-quality-auditor,infra-schema-auditor}.md .claude/agents/
```

The orchestrator's Phase 5.5 hard-depends on all four reviewer agents existing — copy them together, not just the orchestrator.

Then commit. Other contributors get the skill on next clone.

## How to make it user-level (available across all your projects)

```bash
mkdir -p ~/.claude/skills
cp -r .claude/skills/seo ~/.claude/skills/

# And the agents (orchestrator + consensus panel):
mkdir -p ~/.claude/agents
cp .claude/agents/{local-seo-pages,seo-compliance-reviewer,ui-ux-analyzer,content-quality-auditor,infra-schema-auditor}.md ~/.claude/agents/
```

User-level skills are available in every Claude Code session, every project, no per-repo setup.

## How to extend

The library grows via the [self-improvement protocol](references/self-improvement.md). Short version:

1. After completing an SEO task, ask yourself: "Did I learn something generalizable that isn't already in the library?"
2. If yes, edit the relevant reference file. Add a `_Added YYYY-MM-DD:_` date stamp.
3. If the new knowledge doesn't fit any existing reference, add a new one and update the SKILL.md task router.

Don't add content for the sake of activity. The library grows slowly on purpose.

## Stability and versioning

The library has no formal version number. Each file evolves independently as evidence accumulates. Date stamps at the end of sections show when content was added or refined.

Anti-pattern: don't rewrite an entire reference because "the structure feels off" — that breaks anything that links to specific sections. Edit incrementally.

## Validation

Run a sanity check on the library after changes:

```bash
# All cross-links point to real files
grep -roh '\.md)' .claude/skills/seo/ | sort -u

# Frontmatter present on SKILL.md
head -5 .claude/skills/seo/SKILL.md

# No broken Markdown
# (use a linter like markdownlint or vale)
```

## Related

- **Orchestrator agent**: [`.claude/agents/local-seo-pages.md`](../../agents/local-seo-pages.md) — thin wrapper that uses this skill
- **Consensus review panel**: [seo-compliance-reviewer](../../agents/seo-compliance-reviewer.md), [ui-ux-analyzer](../../agents/ui-ux-analyzer.md), [content-quality-auditor](../../agents/content-quality-auditor.md), [infra-schema-auditor](../../agents/infra-schema-auditor.md) — four independent votes gating every page the orchestrator ships, protocol in [consensus-review.md](references/consensus-review.md)
- **User-level cron job** (session-only): updates this library nightly when active. See conversation history for details.

## Credits

Initial bootstrap: 2026-06-06, derived from a live SEO restructure of the Osoba Renos & Design site. Grew from a single-file agent into this library.
