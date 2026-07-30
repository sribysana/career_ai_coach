# Roadmap

High-level implementation ordering, in very small phases. Each phase should be small enough to finish and validate before starting the next — no phase should require guessing at a later phase's design.

**Scoping principle** (per stakeholder decision): build a **thin, end-to-end MVP first** — one profession, one target role, the core loop only — before adding breadth (job-market scraping, mock interviews, multi-profession depth, additional AI providers, additional surfaces). Depth and polish come after the loop is real, not before.

This roadmap sequences the capabilities defined in the source `specs/product.md` (§5.1–§5.16); each phase notes which section(s) it implements.

---

## Phase 0 — Project Scaffolding
- Monorepo structure (`packages/core`, `packages/ai-adapter`, `apps/cli`) per `tech_stack.md`.
- TypeScript config, linting, base tooling. No coaching logic yet.

## Phase 1 — Core Data Model
- Define the Profile / Memory / Library schema in code (TypeScript types), matching the source spec's Learner Data Architecture (§8).
- Simple local file read/write for one learner instance. No AI calls yet.

## Phase 2 — AI Adapter Plumbing
- Define the `CoachAI` interface in `packages/ai-adapter`.
- Implement the Claude adapter (Anthropic SDK) with one basic capability (e.g. a plain prompt/response call).
- Smoke-test only — no coaching logic wired in yet.

## Phase 3 — Skill Profiling (Intake)
- Implements §5.1. CLI-only conversational intake: capture current role/profession and self-reported skills, infer proficiency, let the learner confirm/correct.
- Persist into the Phase 1 data model. No gap analysis yet.

## Phase 4 — Qualification Check
- Implements §5.2. Assess under-/appropriately-/over-qualified relative to current and target role; surface it to the learner explicitly.

## Phase 5 — Gap Analysis (Single Signal Only)
- Implements §5.3(a) and §5.4 — **only** the current→target role comparison signal. The live job-market signal (§5.3b) is explicitly deferred to a later phase.
- Produce a prioritized gap list.

## Phase 6 — Personalized Plan (Basic)
- Implements §5.5, minimally: sequenced topics with rough time estimates from the gap list. Time-boxing and interleaving refinement comes in a later phase — get a plan existing before making it sophisticated.

## Phase 7 — Validation Loop (Single Topic, End-to-End)
- Implements §5.6 for one topic at a time via the CLI: Study → Apply → Evaluate → Diagnose → Prescribe → Re-validate → Track, through the Claude adapter.
- Includes the "nothing trusted just because it's recorded" rule, confidence calibration, real-world-scenario practice tasks on an adaptive difficulty ladder (presented as a checklist), and the implementation-pattern check at the Evaluate step.

## Phase 8 — Assessments
- Implements §5.7: the portable, model-agnostic assessment prompt; the 80–90% completion threshold; the coach's independent re-confirmation gate; the same real-world-scenario framing and adaptive difficulty ladder as Phase 7's practice tasks. Wired into Phase 7's loop.

## Phase 9 — Progress Tracking
- Implements §5.11: persist topic/assessment/status history back to the data model; a CLI command to view it.
- **This completes the thin end-to-end MVP**: profile → qualification check → gap analysis (single signal) → plan → validate → assess → track, all via CLI, Claude-only.

---

## Phase 10 — Job Support
- Implements §5.15: ingest a job description (pasted text, PDF, or Word doc); extract and confirm a structured Role Profile; merge it into the gap analysis (5.4) alongside the existing role-comparison signal, per the source-tagged merge rule that resolves §10.2's former signal-combination question; produce honestly-labeled market-trend commentary; tailor the learner's resume to the posting with a change log, under the no-fabrication hard rule.
- The first thing built after the MVP, per this roadmap's thin-MVP-first principle — see `job-support-2026-07-30/` for the detailed spec triad.

## Phase 11 — Adaptive Retention Re-Checks
- Implements §5.16: periodically re-test mastered topics, with re-check spacing driven by each topic's own assessment history rather than a fixed calendar. Resolves §10.2's former retention/spaced-repetition question.
- Placed here, not earlier, because it reads the progress-history store Phase 9 just built.

## Phase 12 — Plan Adherence Monitoring
- Implements §5.9: detect drift/slow progress; diagnose root cause (content, resource, time budget, or behavioral) before proposing a fix.

## Phase 13 — Plan Reset / Re-planning
- Implements §5.10: reset/re-derive the plan on request or on diagnosed drift, preserving already-validated progress.

## Phase 14 — Doubt Clarification
- Implements §5.8: free-form Q&A at any point, tied back to the learner's own context where possible.

## Phase 15 — Session Structure Refinement
- Implements the interleaving/time-boxing detail of §5.5 (2–3 topics/day, 45–75 min chunks, recall checks, always-visible today/tomorrow/week horizon, automatic carry-over).

## Phase 16 — Web App Surface
- Wrap the existing `packages/core` in a minimal React (Vite) web UI. No new coaching logic — this phase is purely surface/UX.

## Phase 17 — Behavioral / Experience Story Generation
- Implements §5.12: turn real work experience into STAR-format stories, shaped by target role/designation.

## Phase 18 — Job Support: Automated Market Signal
- Implements §5.3(b) Tier 2: the agentic job-market workflow (LinkedIn, Naukri, Indeed, etc.), respecting each platform's ToS/API constraints. Extends Phase 10's Job Support feature with aggregate, cross-posting market signal — the source-tagged merge rule and resume-tailoring guardrails from Phase 10 already apply and are not re-decided here.

## Phase 19 — Real Interview Feedback Loop
- Implements §5.13: log real interview outcomes, introspect for patterns, feed back into an actual plan update.

## Phase 20 — AI-Conducted Mock Interviews
- Implements §5.14: simulated mock interviews calibrated to current/target/stretch levels, feeding back into skill profile, gap analysis, and plan.

## Phase 21 — Chat Surface
- Third platform leg (`apps/chat`), reusing `packages/core` — no new coaching logic, integration work only.

## Phase 22 — Second AI Provider
- Add a second `CoachAI` implementation (e.g. OpenAI) to validate the provider-agnostic interface actually holds under a real second implementation, not just in theory.

## Phase 23 — Multi-Profession Depth
- Per `mission.md`'s "no fixed taxonomy" principle: generalize topic libraries and assessment styles beyond the first profession this was built for.

---

## Explicitly Not Scheduled Yet

Decisions the source spec (`specs/product.md` §10.2) still leaves open that this roadmap deliberately does not resolve in advance: profession-specific depth ordering, assessment format depth (code execution vs. conceptual only), and automatic vs. always-confirm plan-reset triggers. Resolve each at the phase that actually needs the answer, not earlier. (Signal-combination and retention/spaced-repetition were open questions here too, but are now resolved — see Phase 10 and Phase 11 above.)
