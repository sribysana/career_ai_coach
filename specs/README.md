# Specs Index

Not sure which document answers your question? Start here.

| Doc | Answers | Changes |
|---|---|---|
| [`mission.md`](mission.md) | Why this exists at all — the durable pitch, who it's for, non-negotiable principles. | Rarely, deliberately. |
| [`product.md`](product.md) | What the product must do — the full, stakeholder-authored capability spec (§1–§12). | When a capability is added, scoped, or resolved (e.g. an open question in §10.2 gets answered). |
| [`tech_stack.md`](tech_stack.md) | What it's built with, and why. | Rarely, deliberately. |
| [`roadmap.md`](roadmap.md) | What order it gets built in, phase by phase. | When phases are added, reordered, or reshaped. |
| [`feature-name-YYYY-MM-DD/`](.) | One phase's concrete spec triad: `requirements.md` (scope/decisions for this phase only), `plan.md` (task breakdown), `validation.md` (checkable done/merge criteria). | Once, when that phase is planned; not revisited after merge except to fix a broken cross-reference. |

## Conventions

- Phase folders are named `feature-name-YYYY-MM-DD` — e.g. `project-scaffolding-2026-07-27`, `job-support-2026-07-30` — where the date is the day the spec work started, not the phase's target/build date. Check `roadmap.md` for how a given folder maps to a phase number and build order; the folder name itself doesn't encode sequence.
- `product.md` is the single source of truth for *what* the product does. `mission.md`, `tech_stack.md`, and `roadmap.md` summarize or sequence it — they don't restate it; if you find a real conflict, `product.md` wins.
- A phase's `requirements.md` applies `product.md` and `tech_stack.md` to that phase's scope — it doesn't re-decide durable product or technical decisions, only cites them.
- Learner-personal content (a specific learner's background, resume, job descriptions, progress) never lives in `specs/` — see `product.md` §8 for where it actually lives (gitignored, per-clone).
