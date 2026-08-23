# Consensus review panel

Before shipping any new or changed page, run the proposed diff past four independent reviewer agents instead of relying on the builder's own judgment. The agent that wrote the page is the worst-positioned judge of it — it's confirming its own work. A panel that never saw the build reasoning catches what the builder can't see in itself.

## The panel

| Agent | subagent_type | Judges |
|---|---|---|
| SEO Compliance Reviewer | `seo-compliance-reviewer` | Critical rules from SKILL.md, cannibalization, url/metadata/schema conventions |
| UI/UX Analyzer | `ui-ux-analyzer` | Layout, mobile responsiveness, accessibility, visual consistency with sibling pages, CTA placement |
| Content Quality Auditor | `content-quality-auditor` | Humanization, search-intent match, E-E-A-T, readability, no fabricated claims |
| Infra & Schema Auditor | `infra-schema-auditor` | Five-place wiring checklist, JSON-LD validity, sitemap/prerender entries |

Each is a separate agent definition under `.claude/agents/` — read-only (no Edit/Write), so they cannot "fix as they go" and blur the review back into the build.

## Protocol

1. **Spawn all four in a single message, in parallel.** They must not see each other's verdicts — independence is the point.
2. Give each the same input: the list of changed/new files, the slug(s) involved, and a pointer to the 1–2 reference files relevant to their lane (see table above).
3. Require each to return a fixed-shape verdict: `verdict` (`APPROVE`/`REVISE`), `blocking_issues` (list of `{file, issue, rule_violated}`, empty if none), `notes` (non-blocking, optional).
4. **Consensus rule**: ship only when ≥3 of 4 return `APPROVE`.
5. **Veto override**: any single agent flagging a hard-rule violation (existing-URL/title/H1/description rewrite without approval, fabricated review/credential/rating, unresolved cannibalization, invalid schema, missing wiring) blocks shipping regardless of the other three votes. Hard rules are enumerated in [SKILL.md "Critical rules"](../SKILL.md#critical-rules-read-every-time-before-any-work).
6. **On REVISE**: fix only the flagged `blocking_issues`, then re-submit — but only to the agent(s) that flagged something, not the full panel. Re-running an agent that already approved wastes a call and risks a flip-flop with no new information to justify it.
7. **Cap at 2 rounds.** If disagreement persists after round 2, stop and surface it in the handoff under "Unresolved panel disagreement" instead of self-adjudicating a tie-break — that decision belongs to the user.
8. Log the round-1 (and round-2, if run) verdict table in the handoff regardless of outcome. Silence about a flag that got overridden is itself a problem.

## Verdict table format for handoff

| Page | SEO Reviewer | UI/UX | Content | Infra/Schema | Result |
|---|---|---|---|---|---|
| /bathroom-renovation-mississauga/ | ✅ | ✅ | ✅ | ✅ | Shipped |
| /condo-renovation-oakville/ | ✅ | ❌ (missing alt text) | ✅ | ✅ | Fixed, re-verified, shipped |

## What the panel is not

- **Not a substitute for the orchestrator's own Phase 5 wiring greps.** The infra-schema-auditor re-checks them independently, but the orchestrator's own verification gate still runs first. Belt and suspenders — don't skip Phase 5 because the panel exists.
- **Not a rubber stamp.** If all four approve on round 1 for every single page, every time, with no notes at all, that's a signal the reviewers aren't actually independent — check their prompts aren't just echoing the builder's own summary back instead of re-deriving the verdict.
- **Not a scope-creep gate.** The panel judges the change that shipped, not whether more pages should be built. Scope questions stay in Phase 3 (Confirm scope).

_Added 2026-07-13: introduced after a request to layer multi-agent consensus review onto the existing single-orchestrator SEO build flow._
