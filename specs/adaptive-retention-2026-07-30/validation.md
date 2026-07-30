# Phase 11 — Adaptive Retention Re-Checks: Validation

How to know this phase is actually done and the `adaptive-retention-2026-07-30` branch can be merged.

---

## Checks

- [ ] Given seeded assessment history for two topics — one mastered on a single clean attempt, one mastered only after multiple attempts/a prior diagnosed gap — the computed re-check intervals are visibly different (shaky topic gets the shorter interval).
- [ ] A topic whose computed interval has elapsed appears as "due for re-check"; a topic whose interval hasn't elapsed does not.
- [ ] Due re-checks are surfaced to the learner (e.g., in the plan view) rather than executed silently without the learner's awareness.
- [ ] A re-check invokes the same assessment mechanism as the topic's original mastery assessment (same real-world-scenario framing, same implementation-pattern check) — not a separate, simplified quiz path.
- [ ] Passing a re-check cleanly lengthens that topic's next interval (widening spacing, not a reset to a fixed default).
- [ ] Failing or struggling on a re-check shortens the next interval **and** feeds back into the skill profile and triggers the same plan-adjustment path a fresh assessment failure would — confirmed by a deliberately-failed test re-check producing an actual profile/plan change, not just a log line.
- [ ] `npm run build`, `npm run lint`, `npm run test` all pass.

## Merge criteria

All checks above pass, **and** a manual read confirms the resulting behavior matches `specs/product.md` §5.16 and the decisions recorded in this phase's `requirements.md` — then merge `adaptive-retention-2026-07-30` into `master`.

## Explicitly not required for this phase

- No changes to how initial topic mastery is assessed (Phase 7/8 own that).
- No re-check scheduling for topics not yet mastered.
- No learner-configurable override of the adaptive schedule — not in scope for this phase.
