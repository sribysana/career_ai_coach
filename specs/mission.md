# Mission

**Source of requirements**: this project's stakeholder requirements were drawn from a sibling project, `interview_preparation_coach`, specifically:
- `specs/product.md` — the full generic product specification (primary source)
- `personalizedPlanner.md` / `personalizedPlanner.template.md` — a real (and a templated) instantiation of that spec, used here as a grounding reference, not as a source of requirements in their own right. **No personal data from that instance (employer, project names, target companies, etc.) is carried into this project** — only the generic patterns they demonstrate.

This document is the durable "why" for career_ai_coach. It should change rarely, and only deliberately — treat it as this project's constitution alongside `tech_stack.md` and `roadmap.md`.

---

## What This Is

An AI-driven coach that takes a person from their current skill level to interview-ready for a target role — and keeps them there. It builds a personalized, living learning plan grounded in the learner's actual skills, validates that they genuinely understand each topic (not just that they studied it), tests them, keeps them honest against the plan when life gets in the way, and runs mock interviews before the real ones.

## The Problem

Interview preparation today is self-directed and fragile:

- Learners don't have an accurate, current picture of their own skill gaps relative to the roles they actually want.
- Study plans are generic (course curricula, checklists) instead of personalized to the learner's background and target role.
- There's no feedback loop — learners consume content but rarely find out whether they *actually* understood it until the real interview.
- Plans drift. Life interrupts. Nothing is watching for it or helping recover.
- Progress is invisible — no persistent record of what was learned, tested, and mastered over time.
- Confidence and actual competence silently diverge — overconfident learners get blindsided; underconfident ones over-prepare on things they've already mastered.

## Who This Is For

- **Primary**: working professionals actively preparing to move from their current role/level to a specific next role, who have existing experience but need to close specific, identifiable gaps.
- **Secondary**: early-career learners preparing for their first role in a field.

No fixed role or profession taxonomy — current profession and target role are open input, not a predefined list. This must eventually work for any field, not just tech roles, though initial depth will be strongest wherever it's built out first (see `roadmap.md`).

## What Success Looks Like

A learner using this product can, for their chosen target role:

- See an accurate, evidence-based skill profile and gap analysis, calibrated to whether they're under-, appropriately, or over-qualified.
- Follow a concrete daily/weekly/monthly plan built from that gap analysis, time-boxed and interleaved rather than open-ended.
- Have their understanding validated and corrected per topic — nothing counts as "done" just because it was studied or previously recorded elsewhere.
- Pass topic-level assessments that reflect real interview-style questioning, with an honest confidence-vs-competence check along the way.
- Get timely warnings when off-plan, with the actual root cause diagnosed (content, resource, time budget, or behavior) rather than just a generic "you're behind."
- Turn real work experience into structured, role-appropriate interview stories.
- Practice against AI-conducted mock interviews at multiple levels before the real thing.
- Have real interview outcomes — once they start interviewing — actually change the plan going forward, not just get logged.

## Non-Negotiable Principles

These carry forward from the source requirements and should not be silently relaxed as the project grows:

1. **Personalization over generic content.** Recommendations and explanations should reference the learner's actual background wherever possible.
2. **Focus enforcement.** Actively discourage unproductive topic-switching rather than passively allowing it — this was a named, expensive failure mode in the manual process this project replaces.
3. **Honesty over comfort.** Confidence calibration and reality-checks are not optional politeness features; engagement/motivation must never come at the cost of an honest assessment.
4. **Privacy separation.** Personal learner data never lives in this project's own generic specification, defaults, or examples — only in a learner's own private, gitignored artifact.
5. **Nothing is trusted just because it's recorded.** Prior progress — self-reported or imported — is re-validated through the same loop as everything else before it counts as done.
