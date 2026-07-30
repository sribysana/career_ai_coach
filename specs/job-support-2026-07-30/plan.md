# Phase 10 — Job Support: Plan

Numbered task groups, one per pipeline stage. Each group is independently checkable before moving to the next — see `validation.md` for the checks that gate merge.

---

## 1. Ingest & parse
- Accept a job description as pasted text via the CLI, or a file path to a PDF or `.docx`.
- Extract plain text from PDF and `.docx` inputs (text extraction only — no OCR).
- Confirm (or add, if missing) the same extraction path for the learner's resume — reuse this stage's parser rather than building a second one (see `requirements.md`'s note on Phase 3).
- Group is done when: a real PDF, a real `.docx`, and pasted text all yield the same plain-text shape downstream.

## 2. Extract the Role Profile
- Prompt (in `packages/ai-adapter`) that turns the parsed job-description text into a structured Role Profile: title, seniority, must-have vs. nice-to-have skills, tools, domain, years of experience, responsibilities.
- Explicitly separate what the posting **states** from anything the extraction **infers** beyond the literal text (§6).
- Group is done when: the same posting run twice produces a stable Role Profile shape, and the state-vs-infer distinction is visible in the output, not collapsed together.

## 3. Confirm with the learner
- Present the extracted Role Profile back to the learner; accept corrections before anything downstream uses it.
- Persist only the **confirmed** Role Profile — the unconfirmed extraction is not written to the Library as if it were final.
- Group is done when: correcting a deliberately-wrong field (e.g. a fabricated "must-have") changes what stages 4–5 actually use.

## 4. Merge into the gap list
- Feed the confirmed Role Profile into the existing gap-analysis logic (§5.4, built in Phase 5) alongside the current→target role-comparison signal.
- Produce one prioritized list where every item carries a source tag: confirmed-by-both, job-description-only, or role-comparison-only — ordered in that priority.
- Attach market-trend commentary to relevant items, explicitly labeled as model training knowledge with a recency caveat (never presented as live data).
- Group is done when: a gap list from a real posting shows all three source tags where applicable, and the trend label is present and honestly worded.

## 5. Tailor the resume
- Given the learner's parsed resume and the confirmed Role Profile, produce a tailored resume draft aligned to the posting's language and likely ATS keyword expectations.
- Produce an accompanying change log: what changed, and why, per edit.
- Enforce the no-fabrication rule at this stage specifically: no skill, title, employer, responsibility, or date appears in the draft that isn't traceable to the parsed input resume.
- Group is done when: every line of the change log points to a real line in the source resume, and a deliberately-planted gap in the source resume (a skill the posting wants but the learner's resume doesn't have) is *not* silently added.

## 6. CLI wiring & storage
- Wire stages 1–5 into a single CLI command flow.
- Persist the ingested job description, confirmed Role Profile, and resume draft + change log under the learner's Library artifacts, gitignored.
- Group is done when: running the command against a real posting and a real resume, end to end, produces persisted artifacts a second run can read back.

## 7. End-to-end verification
- Run the full flow with all three input formats (pasted text, PDF, `.docx`) and a real resume.
- Confirm the no-fabrication guardrail explicitly, not just informally — see `validation.md`.

---

Execute in order — later groups assume the artifacts of earlier groups exist (a confirmed Role Profile before merging; a merged, tagged gap list conceptually available before tailoring, since the resume tailoring should be consistent with what the gap analysis already surfaced).
