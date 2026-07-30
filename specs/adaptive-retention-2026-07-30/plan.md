# Phase 11 — Adaptive Retention Re-Checks: Plan

Numbered task groups. Each group is completable and checkable before moving to the next — see `validation.md` for the checks that gate merge.

---

## 1. Interval computation
- From a topic's assessment history (Phase 8/9 data — number of attempts to reach the 80–90% threshold, margin over threshold, any prior diagnosed gaps), compute an initial re-check interval.
- Define the widening rule for repeated clean passes (each additional clean re-check pushes the next interval further out) and the tightening rule for a struggled or failed re-check (interval shrinks, and the topic re-enters closer monitoring).
- Group is done when: two topics with different assessment histories (one clean pass, one shaky multi-attempt pass) get visibly different initial intervals.

## 2. Due-check surfacing
- Identify which mastered topics are due for re-check as of "today," using the intervals from group 1.
- Surface due re-checks to the learner alongside the existing plan view (today/tomorrow/week) rather than running them silently in the background.
- Group is done when: a topic whose computed interval has elapsed shows up as due; one whose interval hasn't shows up as not due.

## 3. Re-check execution
- Invoke the existing assessment mechanism (Phase 8) against the due topic — same real-world-scenario framing, same implementation-pattern check, same completion-threshold logic — rather than building a second, lighter-weight quiz path.
- Group is done when: a re-check for topic X uses the same prompt/mechanism path as topic X's original mastery assessment, just re-invoked.

## 4. Feedback into profile & plan
- On a passed re-check: log it, and lengthen the next interval per group 1's widening rule.
- On a failed/weak re-check: feed the failure back into the skill profile (§5.1) and trigger the same drift/re-planning path (§5.9/§5.10) an initial assessment failure would — not a silent log-only event.
- Group is done when: a deliberately-failed re-check (in a test run) visibly changes the skill profile and produces a plan adjustment, not just a log entry.

## 5. End-to-end verification
- Run the full cycle against seeded history: one topic with a clean-pass history reaches a long interval and, when re-checked and passed again, gets an even longer one; one topic with a shaky history reaches a short interval and, when re-checked and failed, triggers the profile/plan feedback from group 4.

---

Execute in order — later groups assume the interval logic (group 1) and due-surfacing (group 2) already exist.
