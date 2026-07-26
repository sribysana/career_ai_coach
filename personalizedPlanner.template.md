# Personalized Plan — Private (Template)

**Copy this file to `personalizedPlanner.md` and fill it in — that copy is gitignored and stays private to you.** This template itself contains no personal data and is safe to commit. It is one instance of the generic AI Interview Preparation Coach described in `docs/REQUIREMENTS.md` (see §8 — Learner Data Architecture), organized into the same three layers: Profile/Instructions, Memory/Facts, Library/Progress Log.

Last updated: <date>

---

## 1. Profile / Instructions (how the coach should operate for this learner)

- **Ultimate target role**: <e.g. Senior Frontend Engineer, Engineering Manager, Product Marketing Manager — any field>
- **Sequencing rule**: <e.g. finish foundational topics before role-specific prep — state your own sequencing if it differs>
- **Time budget**: <hours/day available, and how urgent the timeline is>
- **Session structure (default)**: 2–3 topics per day, interleaved, in ~45–75 minute chunks — not single-topic marathon blocks (see docs/REQUIREMENTS.md §5.5). Each topic-block opens with a 5–10 min recall check of that topic's last session before introducing new material. Adjust the chunk size/topic count here if it doesn't fit you.
- **Time-boxing**: large/bulk topics capped at 2–3 hours total (across chunks); smaller topics get a proportionally smaller cap.
- **Trust rule**: nothing already "completed" (including anything carried over from a prior prep doc) counts as validated until it passes the Learn → Apply → Evaluate → Diagnose → Prescribe → Re-validate → Track loop (docs/REQUIREMENTS.md §5.6). Re-test, don't assume.
- **Weekly allocation** is a time-share target across the week, not a same-day instruction (docs/REQUIREMENTS.md §5.5).
- **Plan reset trigger**: any change in target role, timeline, or major drift must be surfaced explicitly and re-planned — never silently absorbed.
- **Depth target**: <interview-sufficient (default) — or state your own bar, e.g. full mastery/self-sufficiency per topic. This is your call to make; see docs/REQUIREMENTS.md §5.4.>
- **Daily habit rule**: end-of-day, before anything gets marked as carried over, log a short honest entry in your Daily Progress Log (§3.5) — what got done, which recall check (if any) failed, energy level. This is the raw signal root-cause diagnosis (docs/REQUIREMENTS.md §5.9) runs on.
- **Streak tracking**: track a running count of consecutive days with a completed §3.5 entry. Two or more consecutive misses should trigger an explicit drift check-in (root-cause diagnosis, §5.9) before any new topic starts — don't let it pass silently as "will catch up later."
- **Lag detection & root-cause diagnosis (§5.9)**: a topic counts as lagging the moment *either* its time-box is exceeded without being validated, *or* its recall check fails two sessions in a row — don't wait for it to also show up as a missed daily log. Diagnose the actual cause (conceptual gap, wrong/unclear resource, unrealistic time budget, prerequisite gap, or behavioral) before rescheduling, and target the fix to that cause.
- **Assessment style — never a single straightforward question**: probe with follow-ups, "why," "what if this changed," and scenario variations rather than one-shot recall questions (docs/REQUIREMENTS.md §5.7). A direct question only tells you *that* something is shaky, not *why*.
- **Diagnose the specific barrier behind a wrong, slow, or hesitant answer** — don't just score it. Distinguish: a genuine conceptual gap, a speed/fluency gap (understands but too slow under pressure), confidence/anxiety (knows it but freezes or second-guesses), or a communication gap (understands it, can't articulate it). Match the fix to the actual cause — re-teach, timed drilling, confidence-building reps, or practice explaining aloud — never default to "study more."
- **60–90 day filter (anti-context-switch rule, optional — set your own horizon)**: before adding any new topic outside your current phase's checklist, ask "will this materially improve my chances in the next <N> days?" If no, log it as a deferred topic (§3.3) and continue the current plan.
- <If applicable: a source-code/employer-IP handling constraint — e.g., "proprietary code from my employer must never be pasted into this coach; use it for explain-back learning instead." Only relevant if your situation has this constraint.>
- <Any other house rules specific to you>

---

## 2. Memory / Facts (stable, changes rarely)

**Background**
- <years of experience, current role, core strengths>
- <what you're currently deepening / genuinely new ground for you>
- <environment: company scale, domain, notable context>

**Current employer / project**
- Employer: <name — optional, only if you're comfortable recording it here>
- Project: <name and one-line description>
- Use for: STAR story material (docs/REQUIREMENTS.md §5.12)

**Qualification self-assessment vs. target**
- <under-qualified / roughly qualified / over-qualified, and why>

**Target companies**
- <list, if you have specific ones in mind — this raises/lowers the bar used in gap analysis (§5.4) and mock-interview calibration (§5.14)>

**Target locations**
- <list, or "flexible">

**Existing interview stories**
- <list any STAR stories already prepared>

---

## 3. Library / Progress Log (living — updates as work happens)

### 3.1 Phase 1 — <name your first phase>

| Topic | Sub-areas | Status |
|---|---|---|
| <topic> | <sub-areas> | Not yet validated |

**Weekly allocation** (time-share across the week, not a same-day instruction — docs/REQUIREMENTS.md §5.5):

| Area | Allocation |
|---|---|
| <area> | <%> |

### 3.2 Phase 2 — <name your next phase, if any>

- <known gap areas for this phase>

### 3.3 Phase 3 — Deferred topics (if any)

Topics you're consciously deferring until earlier phases are validated, to avoid the context-switching trap. If this includes ongoing personal projects (e.g., building something with AI) that span beyond this one prep effort, consider tracking those at a system/user level instead of duplicating them here — link to that tracker rather than copying its content.

### 3.4 Real Interview Feedback Log

Populate per docs/REQUIREMENTS.md §5.13 once interviews begin:

| Date | Company/Role | Questions Asked | Feedback Received | Outcome | Plan Adjustment Made |
|---|---|---|---|---|---|

### 3.5 Daily Progress Log

Today / tomorrow / week visibility per docs/REQUIREMENTS.md §5.5:

| Day | Topic Blocks (45–75 min each) | Recall Check Result | Validation Status | Carry-Over | Remarks |
|---|---|---|---|---|---|
