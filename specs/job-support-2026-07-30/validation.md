# Phase 10 — Job Support: Validation

How to know this phase is actually done and the `job-support-2026-07-30` branch can be merged. Every item must be checked, not sampled — the no-fabrication guardrail in particular is the entire point of this feature, so it gets validated directly, not assumed from the prompt design.

---

## Checks

- [ ] A real job description, pasted as **text**, runs end to end through the CLI and produces a confirmed Role Profile, a source-tagged gap list, and a tailored resume draft with a change log.
- [ ] The same end-to-end run succeeds with the job description supplied as a **PDF** file.
- [ ] The same end-to-end run succeeds with the job description supplied as a **Word (`.docx`)** file.
- [ ] The extracted Role Profile visibly distinguishes what the posting **states** from anything **inferred** beyond the literal text — not presented as a single undifferentiated list.
- [ ] The learner's correction to a deliberately-wrong Role Profile field (e.g., planting a false "must-have" in a test posting) actually changes the downstream gap list and resume tailoring — confirming the confirm-before-use gate isn't cosmetic.
- [ ] The merged gap list tags every item with its source (confirmed-by-both / job-description-only / role-comparison-only) and is ordered in that priority.
- [ ] Market-trend commentary in the output is explicitly labeled as model training knowledge with a recency caveat — grep the actual output for this framing, don't just confirm the prompt asks for it.
- [ ] **No-fabrication check (the core guardrail)**: using a test resume with a deliberate, known gap relative to the test posting (a skill/title/date the posting wants that the resume doesn't have), confirm the tailored resume draft does **not** introduce that missing skill, title, employer, responsibility, or date. Every line in the change log traces back to content actually present in the source resume.
- [ ] Ingested job description, confirmed Role Profile, and resume draft + change log are persisted as gitignored Library artifacts and are readable back on a second run — not held only in-memory for that one session.
- [ ] `npm run build`, `npm run lint`, `npm run test` all pass.

## Merge criteria

All checks above pass, **and** a manual read confirms the resulting behavior matches `specs/product.md` §5.15 and the decisions recorded in this phase's `requirements.md` — then merge `job-support-2026-07-30` into `master`.

## Explicitly not required for this phase

- No job-portal URL ingestion or scraping (deferred to Phase 18).
- No cross-posting trend aggregation — one job description at a time is sufficient for this phase.
- No rendered/downloadable resume file (`.docx`/PDF output) — a text/markdown draft is sufficient.
- No OCR for scanned/image-based PDFs.
