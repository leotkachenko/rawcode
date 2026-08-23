# Self-improvement protocol

How this knowledge base grows over time without becoming a junkyard.

## When to update

At the end of every SEO-related invocation, before returning to the parent conversation. Skip if nothing genuinely novel surfaced — don't pad the files for the sake of activity.

## What counts as "novel"

Add to the library when you encounter:

1. **A new pattern** — a query type, a page template, or a workflow you used for the first time on this session
2. **A refinement** — clarification of an existing rule, a corrected schema shape, a more precise URL convention
3. **A new platform or framework** — adapting the playbook to a new stack (Astro, Next.js App Router, Remix, etc.)
4. **A new constraint surfaced by a user** — e.g. "always include WSIB clearance number in trade-business schema"
5. **A new technical mechanism** — a new HTML attribute (`fetchpriority="high"`), spec (llms.txt), schema type, build tool
6. **A real-world result** — an experiment with a measurable outcome that confirms or contradicts an existing rule

## What does NOT count as novel

Don't add:

- Reiterations of rules already in the library (just don't help)
- Anecdotes without generalizable rule ("we did X for client Y" — fine in memory, not in the playbook)
- Vendor-specific tutorial content ("how to use Yoast plugin" — too narrow)
- Personal preference that isn't backed by data or industry consensus
- Anything you're not 75% confident about ("I think this might work" — wait until you've validated)

## Where to add

| What you learned | Where it goes |
|---|---|
| New query pattern or bucketing rule | [keywords-triage.md](keywords-triage.md) |
| New page type or template | [page-rules-builder.md](page-rules-builder.md) |
| URL convention refinement | [url-rules.md](url-rules.md) |
| Title / description / OG tweak | [metadata-structure.md](metadata-structure.md) |
| New JSON-LD recipe or fix | [schema-cookbook.md](schema-cookbook.md) |
| Sitemap priority / above-fold rule | [content-priorities.md](content-priorities.md) |
| Heading or semantic HTML rule | [content-hierarchy.md](content-hierarchy.md) |
| Anti-AI-voice tell or rewrite rule | [humanization.md](humanization.md) |
| AI search / GEO tactic | [geo.md](geo.md) |
| E-E-A-T signal or anti-pattern | [eeat.md](eeat.md) |
| Image optimization technique | [image-seo.md](image-seo.md) |
| Performance fix | [core-web-vitals.md](core-web-vitals.md) |
| Internal linking strategy | [internal-linking.md](internal-linking.md) |
| Search intent insight | [search-intent.md](search-intent.md) |
| NAP / citation / GBP rule | [nap-citations.md](nap-citations.md) |
| Doesn't fit any existing file | Add a new reference; update [SKILL.md](../SKILL.md) task router |

## How to write the addition

### Format

Append to the appropriate section of the appropriate file. Use the existing heading structure — don't reinvent.

### Style
- Direct, dense, scannable
- Numbers, named brands, concrete examples
- Bullets for lists of parallel items; prose for explanations
- Follow [humanization.md](humanization.md) — even the knowledge base itself shouldn't read like AI slop

### Date-stamp
End the changed section with a one-line note:

```
_Added 2026-06-06: <one-line reason for the addition>._
```

If editing an existing line (refinement), don't add a date stamp — just edit. Date stamps are for new content.

### Cross-link
If your addition relates to content in another reference, link to it using standard Markdown link syntax pointing at the relative `.md` filename — for example, linking to [humanization.md](humanization.md) when discussing content voice.

## How to update

```
1. Read the relevant reference file to find the right section
2. Use the Edit tool to insert / append your addition
3. Add the date-stamp line
4. Save
```

Don't:
- Restructure existing sections unless they're genuinely broken
- Delete existing content unless it's been contradicted by something better
- Add content twice (check first)

## When to add a new reference file

Only when:
- You've encountered a topic 3+ times in different invocations
- No existing reference fits even with stretching
- The topic is generalizable (not project-specific)

When adding a new file:
1. Create at `.claude/skills/seo/references/<name>.md`
2. Add an entry to the task router table in [SKILL.md](../SKILL.md)
3. Add an entry to the reference library table in [SKILL.md](../SKILL.md)
4. Cross-link from related existing references

Don't add a new reference for a one-off observation. Wait until the pattern repeats.

## When to delete

Rarely. Reasons to remove content:
- A rule has been definitively superseded by a new one (e.g. a deprecated HTML attribute)
- A tactic has been shown to harm rankings (Google algorithm update, documented evidence)
- Content was added speculatively and 6+ months later still hasn't been validated

When deleting:
- Note in commit message what was removed and why
- If replaced, link to the replacement
- Don't delete just because content is "old" — old rules can still be true

## Quality bar

Before saving any addition, ask:

1. **Is this generalizable?** If only true for one project or vertical, don't add.
2. **Is this actionable?** "Authority matters" is not actionable. "Add `sameAs` to Organization schema with LinkedIn, Wikipedia, Yelp, GBP" is.
3. **Could I tell a human SEO this and they'd nod, not roll their eyes?** If it's obvious, skip. If it's controversial, validate first.
4. **Does it add ≥1 piece of information I couldn't deduce from the existing files?** If not, skip.

## The library should grow slowly

A library that doubles in size every quarter is a library no one reads. Each addition should pay for the attention it costs the next reader.

If you're not sure whether to add something — don't. Wait until you encounter it again. The third encounter is the right time to write it down.

## Don't restate in your user-facing reply

When you update a reference file, don't tell the user "I've updated the SEO playbook." Just do it. The user will see the diff in `git status` if they care. Mentioning it makes the agent feel performative.

Exception: if the user explicitly asked you to update the playbook, then yes — confirm what you added.

_Added 2026-06-06: initial draft of the protocol itself._
