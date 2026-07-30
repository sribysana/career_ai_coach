# Phase 11 — Adaptive Retention Re-Checks: Requirements

Implements `specs/roadmap.md` Phase 11 (`specs/product.md` §5.16). Scope, decisions, and context for this phase only — durable product decisions live in `specs/product.md`; this file does not re-decide those, only applies them.

---

## Scope

Once a topic is marked mastered (Phase 7/8's validation loop), it doesn't stay tracked forever untouched. This phase periodically re-tests mastered topics to catch skill decay before it surfaces at a real interview, with the re-check schedule driven by the learner's own history rather than a fixed calendar.

In scope:
- For each mastered topic, compute a **re-check interval** from that topic's own assessment history (Phase 8/9 data): topics the learner struggled with (multiple attempts, low margin over the 80–90% threshold, prior diagnosed gaps) get a shorter interval; topics passed cleanly get a longer one, widening further each time a re-check is passed cleanly again.
- Surface due re-checks to the learner (e.g., alongside the daily/weekly plan view) rather than silently running them unannounced.
- Run the re-check using the **existing assessment mechanism** (§5.7, Phase 8) — same format, same real-world-scenario framing, same implementation-pattern check — not a separate lightweight quiz mechanism.
- If a re-check reveals decay, feed that back into the skill profile (§5.1) and plan (§5.9/§5.10) exactly as an initial assessment failure would — a re-check failure is a real regression, not a formality to dismiss.

Out of scope for this phase:
- Any change to how the initial mastery assessment works (Phase 7/8 own that; this phase only adds a scheduled re-invocation of it).
- Retention scheduling for topics not yet mastered — this phase only concerns already-mastered topics.
- A configurable/manual retention schedule override — not asked for; the adaptive default is the only mode in this phase.

## Context (from prior decisions)

Carried forward — not re-decided here:
- **Dependency**: this phase reads the progress/assessment history Phase 9 persists. It cannot be built before Phase 9 exists, which is why it's sequenced after Phase 9 rather than folded into Phase 7/8 directly (stakeholder decision, 2026-07-30).
- **Practice format**: Phase 7/8 already carry the real-world-scenario framing, adaptive difficulty ladder, and implementation-pattern-naming check for practice and initial assessment (per `specs/product.md` §5.6/§5.7, amended 2026-07-30). This phase reuses that mechanism for re-checks rather than defining a new one.
- **No-hallucination rule (§6)**: applies to a re-check's diagnosis exactly as it does to an initial assessment — no fabricated "you've decayed on X" without the assessment actually showing it.

## Decisions made for this phase

Resolved via stakeholder Q&A on 2026-07-30:

| Decision | Choice | Why |
|---|---|---|
| Re-check cadence | **Adaptive spacing** — driven by each topic's own assessment history, not a fixed schedule or on-request-only | Concentrates re-check time where decay is actually likely (shaky topics) rather than spending it evenly or leaving decay undetected until an interview — the exact failure mode §5.16 exists to prevent |
| Where this lands in the roadmap | **Own phase, right after Phase 9** (not folded into Phase 7/8, not deferred past the MVP) | Needs the Phase 9 history store to compute spacing from; folding it into Phase 7/8 would mean building against history that doesn't exist yet |

## Success criteria pointer

See `validation.md` in this same folder for the concrete, checkable definition of "this phase is done."
