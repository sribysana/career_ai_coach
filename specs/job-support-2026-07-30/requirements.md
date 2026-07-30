# Phase 10 — Job Support: Requirements

Implements `specs/roadmap.md` Phase 10 (`specs/product.md` §5.15). Scope, decisions, and context for this phase only — durable product decisions live in `specs/product.md`, `specs/mission.md`, and `specs/tech_stack.md`; this file does not re-decide those, only applies them.

---

## Scope

Give the learner a way to bring a **specific, real job posting** into the coaching loop — ingest it, extract what it actually requires, merge that against the existing role-comparison signal, and use it to both prioritize learning and tailor the learner's resume.

In scope:
- Ingest a job description as **pasted text or an uploaded file (PDF or Word `.docx`)**.
- Extract a structured **Role Profile** (title, seniority, must-have vs. nice-to-have skills, tools, domain, years of experience, responsibilities) and have the learner **confirm or correct it** before anything downstream uses it.
- Merge the confirmed Role Profile into the existing gap analysis (§5.4) alongside the current→target role-comparison signal (§5.3a), producing **one gap list with every item tagged by source**, ordered: confirmed-by-both → job-description-only → role-comparison-only.
- Produce market-trend commentary **explicitly labeled as model training knowledge with a recency caveat** — never presented as live data.
- Tailor the learner's existing resume to the confirmed Role Profile, producing a draft **plus a change log** of what changed and why.
- Persist ingested job descriptions, confirmed Role Profiles, and resume drafts as learner Library artifacts (§8), gitignored.

Out of scope for this phase (deferred, per `specs/product.md` §11):
- **Job-portal URL ingestion** — pasting a link and having the coach fetch/scrape the posting. Deferred to Phase 18 (§5.3b Tier 2), pending the same ToS/access-rights resolution required there.
- Aggregating trends across multiple postings — this phase analyzes **one job description at a time**. Cross-posting aggregation is Phase 18's job, once real multi-posting data exists to back a trend claim.
- Generating a finished, submission-ready document (`.docx`/PDF) — this phase produces a tailored text draft plus change log; document rendering/templating is not built here.
- Any new AI provider, surface beyond the existing CLI, or UI — those are separate, already-scheduled phases.

## Context (from prior decisions)

Carried forward from `tech_stack.md` and `product.md` — not re-decided here:
- **Architecture boundary**: `packages/core` holds the ingestion/extraction/merge/tailoring logic; `packages/ai-adapter` holds the prompts that call the model; `apps/cli` is the surface. Core never imports a vendor SDK directly.
- **Data storage**: local, file-based, gitignored, per the learner's Library layer (§8) — no hosted store.
- **No-hallucination rule (§6)**: applies directly to Role Profile extraction (state vs. infer), trend commentary (label as model knowledge), and resume tailoring (never fabricate).

## Decisions made for this phase

Resolved via stakeholder Q&A on 2026-07-30:

| Decision | Choice | Why |
|---|---|---|
| Input formats (v1) | **Pasted text + file upload (PDF, Word)**; URL ingestion deferred | Matches the spec's existing caution about job-portal ToS/scraping (§5.3b) — text/file needs no platform access at all |
| Signal-combination rule | **One merged list, every item tagged by source** (confirmed-both → JD-only → role-comparison-only) | Satisfies §6's transparency rule (learner must always see *why* a topic is prioritized) while still producing one actionable list, not two to reconcile manually |
| Role Profile confirmation | **Learner confirms/corrects before it drives gap analysis or resume rewrite** | Mirrors §5.1's existing confirm-the-skill-profile pattern; a mis-extracted "must-have" would otherwise silently corrupt both the plan and the resume |
| Market trend scope | **Single JD at a time**; trend commentary included but labeled as model training knowledge with a recency caveat, never live data | Matches the roadmap's thin-MVP-first principle and §6's no-hallucination rule — honest about what an offline single-posting analysis can and can't know |
| Resume tailoring depth | **Tailored draft + change log, real experience only** — no invention of skills, titles, employers, or dates | §6 factual-reliability + §5.12's "reframe real experience" pattern, applied to a document submitted to a real employer |
| Roadmap placement | **New Phase 10**, immediately after the Phase 9 MVP completes; old Phase 16 crawler reshaped into Phase 18 as this feature's automated-tier extension | Respects the roadmap's stated thin-MVP-first scoping principle |

## Defaults applied (not explicitly asked, flagged here for visibility — adjust if wrong)

- File parsing: PDF and `.docx` text extraction only — no OCR of scanned/image-based PDFs in v1.
- Resume input: this phase reuses whatever resume-reading capability exists by the time it's built. **Do not assume Phase 3 already built file-based resume upload** — §5.1 lists resume upload as one of several intake methods, but Phase 3's roadmap entry only commits to conversational self-reported-skill intake. If Phase 3 didn't add resume file parsing, this phase adds it, reusing the same PDF/`.docx` extraction built here for job descriptions rather than a second parser.
- The tailored resume draft is returned as text/markdown output through the CLI, not a rendered file — consistent with "no document generation" being out of scope.

## Success criteria pointer

See `validation.md` in this same folder for the concrete, checkable definition of "this phase is done."
