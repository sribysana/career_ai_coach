# AI Interview Preparation Coach — Product Requirements

## 1. Purpose

An AI-powered coach that takes a person from "current skill level" to "interview-ready for a target role," and keeps them there. It builds a personalized, living learning plan grounded in the learner's actual skills and the real job market, then continuously validates understanding, tests knowledge, answers doubts, and keeps the learner honest against the plan — adjusting it when life gets in the way.

This document is the stakeholder-authored source of requirements for the product and is the reference point for all design and implementation decisions.

---

## 2. Problem Statement

Interview preparation today is self-directed and fragile:

- Learners don't have an accurate, current picture of their own skill gaps relative to roles they actually want.
- Study plans are generic (course curricula, checklists) instead of personalized to the learner's background and target role.
- There's no feedback loop — learners consume content but rarely find out whether they *actually* understood it until the real interview.
- Plans drift. Life interrupts. There's no system watching for it or helping recover.
- Progress is invisible — no persistent record of what was learned, tested, and mastered over time.

A companion project (`reference/manual-process.md`) shows this problem lived out manually by one learner (a senior frontend engineer) — this product is the generalized, AI-driven version of that manual process.

---

## 3. Target Users / Personas

- **Primary**: Working professionals actively preparing to move from their current role/level to a specific next role, who have existing experience but need to close specific, identifiable gaps.
- **Secondary**: Early-career learners preparing for their first role in a field.

**No fixed role or profession taxonomy.** Current profession and target role are captured as **open, free-text input during intake**, not chosen from a predefined list — this must work for software development, marketing, sales, advertising, pharma, research, and any other field, not just tech roles. A fixed list (e.g., "UI Developer," "Architect," "Engineering Director") would bake in assumptions the product shouldn't make.

> **v1 scope note**: initial depth of coaching (topic libraries, assessment styles) will naturally be strongest wherever it's built out first, and generic elsewhere. The intent is to start generic and progressively deepen per-profession support based on real usage — not to hardcode a role list now. This is a deliberate placeholder, not a final design.

---

## 4. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Accurately capture learner's current skill level | Skill profile validated by learner + reflected in assessment results |
| Keep learning aligned to real job market demand | Plan topics traceable to skills required by target-role job postings |
| Ensure understanding, not just exposure | ≥1 assessment completed per topic before it's marked "mastered" |
| Keep learner on track | Plan-adherence warnings delivered before a target is missed, not after |
| Make progress visible over time | Learner can see trend of mastery/assessment scores by topic over weeks |
| Get the learner to interview-ready | Learner reports (or self-certifies via assessment) readiness across all required topics for target role |

---

## 5. Core Capabilities

### 5.1 Skill Understanding (Skill Profiling)
- Ingest the learner's current profession/role and skills — via resume upload, self-reported skill list, profile import, and/or a conversational intake ("tell me about your current role and experience").
- Infer proficiency level per skill (beginner / intermediate / advanced / expert), not just presence/absence.
- Allow the learner to confirm, correct, or expand the AI's inferred profile.
- Re-assess and update the profile continuously as assessments and study progress produce new evidence (not just a one-time intake).

### 5.2 Level / Qualification Check
- Assess where the learner currently stands relative to their **current stated role**, and separately relative to their **target/next role**: under-qualified, appropriately-qualified, or over-qualified for each.
- This calibrates the plan's starting point and tone — e.g., an over-qualified learner may need positioning/interview-signaling help more than fundamentals; an under-qualified learner may need a foundations phase before role-specific prep begins.
- Surface this assessment to the learner explicitly (not just use it silently) so they can confirm or push back on it.

### 5.3 Target/Next-Role Awareness
Two distinct input signals feed the gap analysis (5.4). **How they combine is resolved — see §10.1**: both are required, not either/or, and are merged into one source-tagged list per §5.15.

- **(a) Current → target role comparison**: given the learner's current role/skills and their stated target/next role, derive what's typically expected to move from one to the other.
- **(b) Live job market signal**: understand real, current job openings/requirements for the target role (title, seniority, domain) and extract the skills/competencies that show up repeatedly, including what's trending up/down — so the plan reflects current market demand, not just a static role-to-role delta. **Mechanism (two tiers, resolved)**:
  - **Tier 1 — learner-supplied job description (near-term; see §5.15)**: the learner pastes or uploads a specific job posting; the coach extracts the role's requirements directly from it. No scraping or platform-access concerns — the learner already has the posting.
  - **Tier 2 — automated multi-platform crawling (later)**: an agentic workflow that goes through job platforms (e.g., LinkedIn, Naukri, Indeed) directly, aggregating signal across many postings without the learner sourcing each one manually. This must respect each platform's ToS/API constraints — use official APIs where available, stay rate-limit/auth-aware, and fall back to learner-supplied postings (Tier 1) where automated access isn't permitted. Scraping in violation of a platform's terms is not an acceptable implementation path.

### 5.4 Skill Gap Analysis & Recommendations
- Compare the learner's skill profile and qualification level (5.1–5.2) against the target/next-role signals (5.3).
- Produce a prioritized gap list: what's missing, what's weak, what's already strong (and can be deprioritized).
- Recommend which skills to learn or refresh, and roughly how much depth is needed for interview purposes (not mastery for its own sake). **This is a default depth target, not a hard ceiling**: an individual learner may set a stricter personal bar (e.g., full mastery/self-sufficiency rather than interview-sufficiency) via their own house rules (§8 Profile/Instructions) — the product must support that override, not silently cap depth at the interview bar for everyone.

### 5.5 Personalized Learning Plan
- Generate a plan with **daily, weekly, and monthly targets**, derived from the gap analysis and the learner's available time.
- Plan should sequence topics sensibly (foundational before advanced, related topics grouped) rather than context-switching randomly.
- **Time-boxing**: large/bulk topics get a capped total study budget (default guidance: 2–3 hours max) rather than open-ended study time; smaller topics get a proportionally smaller cap. At the end of that budget, the coach runs a digestion check (5.6) before letting the learner move on — time spent is not itself evidence of learning.
- **Session structure — interleaved, not marathon blocks**: that time budget is delivered as 2–3 topics per day in ~45–75 minute chunks, interleaved, rather than one topic occupying an entire session — single-topic marathon blocks measurably hurt next-day recall. Each topic-block opens with a brief recall check of that topic's prior session before introducing new material (an instance of the digestion check in 5.6).
- **Always-visible horizon**: at any point, the learner can see what's scheduled for **today**, **tomorrow**, and **the rest of this week** — not just a single day in isolation. A weekly allocation target (e.g., "30% of this week on a given topic" — React+TS for a frontend engineer, negotiation tactics for a sales role, clinical trial design for a pharma researcher) is a time-share target across the week, not an instruction to do it in one sitting.
- **Automatic carry-over**: whatever's left pending at the end of a day/period automatically rolls into the next day/period's plan and re-prioritizes it — this is normal day-to-day operation, not just a response to major drift (that's 5.10). Resource recommendations travel with the topic when it carries over.
- When the learner's target role changes mid-plan, the coach must ask whether to finish the current target's remaining topics first (sequential) or pivot immediately — never assume one or the other (see 5.10).
- Plan is a living artifact: it updates as topics are mastered, deprioritized, or reset (see 5.10).
- All plan progress (today/tomorrow/week, carry-overs, completions) must be documented, not held only in conversation (feeds 5.11).

### 5.6 Understanding Validation & Correction — the Learn → Validate → Improve Loop
Every topic goes through the same quantified loop, not just passive study:

1. **Study** the topic (time-boxed per 5.5).
2. **Apply it** to a concrete problem, drawn from **real-world scenarios** rather than abstract puzzles (e.g., for DSA: a problem framed like one that actually comes up on the job, not just an arbitrary practice-platform exercise; for other topics: an applied scenario, a design exercise, or an explain-it-back grounded in a realistic situation). Tasks are presented as a **checklist** the learner works through, and follow an **adaptive difficulty ladder**: a clean pass moves the next task up in difficulty, a struggle drops it back down and re-teaches first — the ladder responds to actual performance rather than marching a fixed sequence regardless of how it's going.
3. **Evaluate quality**, not just correctness — how good was the approach/understanding, not just right-or-wrong. This includes an explicit **implementation-pattern check**: did the learner reach for the right approach/pattern for this kind of problem, not just arrive at a working answer? Name the pattern explicitly. A solution that works but used the wrong pattern is still flagged — that gap is precisely what a real interviewer probes for.
4. **Diagnose**: decide explicitly whether improvement is needed or the topic is solid enough for the interview bar — and when improvement is needed, diagnose *why* an answer was wrong, slow, or hesitant, not just that it was. Distinguish at minimum: a genuine conceptual gap, a speed/fluency gap (understands but too slow/rusty under interview time pressure), confidence/anxiety (knows it but freezes, second-guesses, or rushes and self-sabotages), or a communication gap (understands it, can't articulate it clearly). This mirrors the root-cause diagnosis §5.9 already requires for plan drift — it should exist at the individual-assessment level too, not just the plan level.
5. **Prescribe**: if improvement is needed, recommend specific resources/practice targeting the *actual diagnosed cause* from step 4 — re-teach the concept, timed drilling for a fluency gap, lower-stakes confidence-building reps for anxiety, or practice explaining aloud for a communication gap. Never default to "study more" regardless of which cause was diagnosed.
6. **Re-validate** after the learner acts on the recommendation — confirm the gap actually closed.
7. **Track** topic → resource used → validation outcome over time (feeds 5.11), so the learner (and coach) can see what's genuinely solid vs. still shaky.

Detect misconceptions during this loop and correct them directly, with explanation — not just a right/wrong verdict. **That correction/explanation must itself be factually grounded, never fabricated** — an inaccurate "correction," delivered with the same confidence as a correct one, is worse than no correction at all, because the learner trusts it and it corrupts the very signal this loop exists to produce. If genuinely unsure or the fact is fast-changing/hard to verify, say so explicitly and point to an authoritative source rather than asserting.

**Nothing is trusted just because it was recorded elsewhere.** Progress claimed from outside this system (imported notes, prior logs, a learner's own "I already know this") must pass through this loop before it counts as validated — it can go through quickly if it turns out solid, but it isn't assumed solid up front.

**Confidence calibration**: the learner's self-rated confidence and the assessment's measured understanding are two different signals — when they diverge, especially when the learner is overconfident, the coach must surface that gap honestly and directly rather than let the self-assessment stand uncorrected. Encouragement should never come at the cost of an honest reality check.

### 5.7 Knowledge Testing / Assessments
- Every learning unit must have an associated assessment — either checkpoint assessments during the topic or a final assessment at the end (per topic, and periodically across topics for retention), as part of the loop in 5.6.
- Assessments should mix formats appropriate to the topic (conceptual Q&A, applied/scenario questions, coding or design exercises where relevant), grounded in real-world scenarios and following the same adaptive difficulty ladder as practice (5.6 step 2) — the assessment gate should feel like a continuation of practice, not a different, disconnected test.
- **Prefer follow-up/scenario-based probing over single-shot recall questions.** A direct question only reveals *that* understanding is missing or shaky, never *why* — and the diagnosis in §5.6 step 4 depends on knowing why. Ask "why," "what if this changed," and scenario variations rather than stopping at one correct/incorrect answer.
- Assessment results feed back into the skill profile (5.1) and plan (5.5) — a failed/weak assessment should adjust the plan, not just log a score.
- **Portable, model-agnostic execution**: the assessment step (generate questions → validate the learner's answers → explain *why* a wrong answer is wrong → confirm the corrected understanding) must be expressible as a single, self-contained prompt that works in any LLM — so it survives the primary coach session running low on context/tokens, not just as a feature of one specific chat session.
- **Completion threshold**: that assessment only produces a completion report once the learner demonstrates roughly **80–90% understanding**. The primary AI coach then independently **re-confirms** that report before marking the topic officially complete/fulfilled — two gates, not one.

### 5.8 Doubt Clarification
- Learner can ask free-form questions at any time (about the current topic or otherwise) and get clear, correct answers.
- The coach should tie clarifications back to the learner's existing context/experience where possible — real/familiar examples from the learner's own background, not just generic textbook ones.

### 5.9 Plan Adherence Monitoring
- Track actual progress against the daily/weekly/monthly targets.
- Proactively warn the learner when they are falling behind or drifting from the plan (e.g., missed daily targets, topic taking longer than allotted, context-switching into unplanned topics).
- Warnings should be early and actionable, not just a retrospective report.
- **When progress on a topic is slow, diagnose the root cause before just re-scheduling it** — e.g., is the topic genuinely harder than expected, is the resource unclear/wrong for this learner, is the time budget unrealistic, is it a prerequisite gap from an earlier topic, or is it availability/fatigue? The fix prescribed in re-planning (5.10) should target that actual cause, not just push the same approach into more days.
- **The fix isn't always the plan.** If the diagnosed cause is behavioral (e.g., studying at a low-energy time of day, sessions running long and losing focus, skipping the recall check, distraction-heavy environment) the coach should suggest a concrete behavior change alongside — or instead of — a plan/content change. Both are legitimate outputs of the same diagnosis, not just plan edits.

### 5.10 Plan Reset / Re-planning
- Learner (or the coach, with confirmation) can reset or re-derive the plan when circumstances change (falling behind, priorities shift, new target role, more/less time available).
- Re-planning should preserve progress already made (don't re-litigate mastered topics) and re-sequence remaining work realistically.

### 5.11 Progress Tracking
- Persistent record of what was studied, when, assessment results, and mastery status per topic over time.
- Learner can view trends (e.g., improving/declining scores on a topic, time spent vs. planned) to understand their own trajectory.
- History should be exportable/reviewable.

### 5.12 Behavioral / Experience Story Generation
- Help the learner turn their real work experience (specific projects, roles, incidents) into structured stories (e.g., STAR format) for behavioral interview questions.
- Stories should be shaped by the **target role and designation** — the same underlying experience is framed differently for an IC role vs. a leadership/management role.
- The underlying experience details (employer, project names, specifics) are personal data — they live only in the learner's private artifact (§8), never in this specification.

### 5.13 Real Interview Feedback Loop
- After the learner actually interviews somewhere, let them log what happened — questions asked, feedback received, outcome (rejected/advanced/offer) — separate from the practice assessments in 5.7.
- Introspect across logged interviews for patterns (e.g., a topic that keeps coming up as weak, a recurring type of question) — real interview signal outranks self-assessment or practice-assessment signal when they conflict.
- **This must feed back into an actual plan update (5.10)** — introspection that doesn't change the plan is just a report; the point is to close the loop, not just observe it.

### 5.14 AI-Conducted Mock Interviews, at Multiple Levels
- The coach can run simulated mock interviews on demand, drawing on technical topics from the plan, system design, and the learner's own behavioral/STAR stories (5.12).
- Mock interviews are calibrated to different **levels**, at minimum: (a) the learner's current stated role level, (b) the target/next role level, and (c) a stretch level above target — so the learner can gauge readiness against multiple bars, not just one.
- Mock interview performance feeds back into the skill profile (5.1), gap analysis (5.4), and plan (5.10) — same mechanism as the real-interview loop (5.13), but treated as a **lower-confidence signal** than an actual interview outcome when the two disagree.
- Usable as a checkpoint at the end of any topic/phase, not reserved only as a final readiness gate.
- Distinguish from §11: **human-staffed** mock interviews (a real person interviewing the learner) are out of scope; this AI-simulated capability is in scope.

### 5.15 Job Support — Job Description Ingestion, Role Intelligence & Resume Tailoring
Gives the learner a way to bring a *specific* real posting into the coaching loop, rather than relying only on the generic role-comparison signal (5.3a). This is Tier 1 of the live job market signal (5.3b).

**Ingest.** Accept a job description as pasted text, a PDF, or a Word (`.docx`) document. **Job-portal URL ingestion is out of scope for v1** (see §11) — pending the same ToS/access-rights consideration already required for Tier 2 crawling (5.3b).

**Extract a Role Profile.** Parse the posting into a structured profile: title, seniority, must-have vs. nice-to-have skills, tools/technologies, domain, years of experience expected, and core responsibilities.
- What the posting **states** must be kept distinct from what the coach **infers** beyond the literal text — an inferred "must-have" presented as if the posting said so outright violates §6's factual-reliability rule.
- **The learner must confirm or correct the extracted Role Profile before it drives anything downstream** (gap analysis, plan, or resume tailoring) — the same confirm-the-inferred-profile pattern §5.1 already applies to the skill profile. A silently wrong "must-have" would otherwise corrupt both the learning plan and the tailored resume without the learner ever seeing the mistake.

**Merge into the gap analysis (5.4).** The confirmed Role Profile feeds the same gap analysis as the generic role-comparison signal (5.3a). **Signal-combination rule (resolves the former §10.2 open question)**: produce **one prioritized gap list, with every item tagged by the source(s) that surfaced it**, ordered:
1. Confirmed by both the job description and the current→target role comparison
2. Job-description-only
3. Role-comparison-only

Source tagging is required, not cosmetic — §6 already requires the learner always be able to see *why* a topic is prioritized, and a merged-but-untagged list would hide exactly that.

**Market trends — scoped honestly.** With a single learner-supplied posting and no live data feed, any commentary on what's "trending" in the market can only draw on the AI model's training knowledge, not real-time data. Such commentary **must be explicitly labeled as model knowledge with a recency caveat**, never presented as live market data — this is §6's no-hallucination rule applied to the exact spot where it would be tempting to overstate currency. Real cross-posting trend aggregation is Tier 2's job (5.3b), once multiple postings' data actually exists to back a trend claim.

**ATS-friendly resume tailoring.** Given the learner's existing resume and the confirmed Role Profile, produce a tailored resume draft aligned to the posting's language and likely ATS keyword matching, **accompanied by a change log** explaining each edit made and why.
- **Hard rule**: the coach may only **reframe experience the learner actually has**. It must never invent a skill, title, employer, responsibility, or date to better match the posting. This is §6's factual-reliability principle and §5.12's "reframe real experience for the target role" pattern, applied to a document the learner will submit to a real employer — fabrication here is worse than a hallucinated study fact, because it can cost the learner their credibility or their offer.

**Storage.** Ingested job descriptions and generated resume drafts are learner artifacts and belong to the Library layer (§8), gitignored like all other personal data — never merged into this specification.

### 5.16 Retention Re-Checks
Resolves the former §10.2 open question on retention/spaced repetition: **yes, mastered topics are periodically re-tested, with adaptive spacing** — not a one-time gate per topic, and not a fixed calendar applied uniformly.
- A topic's next re-check interval is driven by its own assessment history (5.7, 5.11): topics the learner struggled with return sooner; topics passed cleanly return rarely, at widening intervals over time.
- A re-check that reveals decay feeds back into the skill profile (5.1) and plan (5.10/5.9) the same way an initial assessment failure would — decay discovered here is a real regression, not a formality.
- Depends on the progress history (5.11) existing to compute spacing from — see `roadmap.md` for phase sequencing.

---

## 6. Non-Functional Requirements

- **Personalization over generic content**: recommendations and explanations should reference the learner's actual background/experience wherever possible.
- **Focus enforcement**: the system should actively discourage unproductive topic-switching (a named failure mode in the manual precursor to this project) rather than passively allowing it.
- **Transparency**: the learner should always be able to see *why* a topic is prioritized (linked to a job-market signal or a diagnosed gap), not receive an opaque plan.
- **Low-friction check-ins**: daily/weekly interaction should be quick — logging progress and receiving guidance shouldn't itself become a time sink.
- **Privacy separation**: this generic specification (and any shared/public product documentation) must never contain a real learner's personal data. Individual learner data lives only in that learner's own private artifacts (see §8) — never merged into the product's own spec, defaults, or examples.
- **Engagement**: the journey should feel motivating and genuinely interesting to the learner, not a mechanical content-delivery-and-test pipeline — vary tone and framing, acknowledge progress, keep it human. This must coexist with, not soften, the honesty required by confidence calibration (5.6): engaging is not the same as flattering.
- **Factual reliability — no hallucination, especially during validation/assessment**: when evaluating an answer, explaining why something is right or wrong, diagnosing a barrier (5.6), or presenting any factual claim (a technical explanation, a resource recommendation, an interview-process detail), the coach must never present fabricated or uncertain information with unwarranted confidence. This applies most acutely at the exact moments the product exists for — validating and assessing the learner's knowledge — since a hallucinated "fact" there is graded and trusted, not just read. When genuinely unsure, or the fact is fast-changing/hard to verify, say so explicitly and flag it for external verification instead of asserting it.

---

## 7. Data Inputs & Sources

- Learner-provided: resume, self-reported skills, target role(s)/companies, available study time, existing notes (e.g., prior manual prep docs), real interview feedback/outcomes (5.13), a specific job description to ingest (text/PDF/Word, 5.15).
- Job market: current job postings/requirements for target role(s) — learner-supplied posting (5.15, Tier 1) near-term; automated multi-platform crawling (5.3b, Tier 2) later.
- System-generated: assessment results, topic study logs, plan-adherence history, extracted Role Profiles and tailored resume drafts (5.15).

---

## 8. Learner Data Architecture

Each learner's data is organized into three layers, kept separate so permanent facts, evolving content, and the product's own generic documentation never bleed into each other:

- **Profile / Instructions** — stable "how to coach this learner" rules: target role, learning priorities, house rules (e.g., no unplanned topic-switching, time-boxing per topic, preferred reporting format). Changes rarely, edited deliberately.
- **Memory / Facts** — stable facts about the learner: background, experience, current employer/project (only if the learner opts to share it), preferences, chosen resources, target locations. Not day-to-day noise.
- **Library / Progress Log** — the living, continuously-updated content: roadmaps, topic notes, interview stories, daily/weekly/monthly progress logs, assessment results (the output of 5.6/5.7/5.11 over time), ingested job descriptions and their confirmed Role Profiles, and generated resume drafts with their change logs (5.15).

**This split is a hard requirement, not a convention.** A learner's Profile/Memory/Library lives in that learner's own private artifact(s) — e.g. a personal plan file — which are not part of, and never get merged into, this product specification or any shared/public documentation.

**Precedence rule**: this specification defines sane defaults and required capabilities, not a ceiling. Where a learner's Profile/Instructions (house rules) conflict with a generic default stated elsewhere in this spec (e.g., §5.4's default depth target, §5.5's default session structure), **the learner's own Profile/Instructions take precedence for that learner's coaching.** The generic spec should never silently override what a learner has explicitly decided for themselves.

**Distribution model (resolved, see §10)**: this project is distributed as a git template repo — each learner clones it and personalizes their own copy, rather than logging into a hosted multi-tenant service. Consequently, a learner's private artifact (e.g. `personalizedPlanner.md`) must be excluded from version control (`.gitignore`) in every clone, while a non-personal template of the same structure (e.g. `personalizedPlanner.template.md`) is the thing actually committed and shared.

---

## 9. High-Level User Flow

1. Learner provides background (resume/skills) and target role.
2. Coach builds initial skill profile and confirms it with the learner.
3. Coach analyzes target-role job market and produces a gap analysis.
4. Coach generates a daily/weekly/monthly plan from the gap analysis.
5. Learner studies a topic; coach validates understanding and clarifies doubts along the way.
6. Coach administers assessment(s) for the topic; results update skill profile and plan.
7. Coach monitors adherence; warns and/or offers to reset the plan if the learner drifts.
8. In parallel, coach helps generate behavioral/experience stories from the learner's real work (5.12).
9. Learner reviews progress/history at any time, and can take an AI-conducted mock interview at any level to check readiness (5.14).
10. Once real interviews start, learner logs outcomes/feedback; coach introspects and updates the plan (5.13) — the cycle continues rather than ending at "interview-ready."

---

## 10. Assumptions & Open Questions

### 10.1 Resolved Decisions

- **Job market data source**: two tiers (see §5.3b) — learner-supplied job description ingestion (§5.15, Tier 1, near-term) and an agentic workflow crawling job platforms (LinkedIn, Naukri, Indeed, etc.) directly (Tier 2, later), respecting each platform's ToS/API constraints.
- **Single-user vs. multi-user**: distributed as a **git template repo** — not a hosted multi-tenant service. Each learner clones the repo and personalizes their own copy; personal artifacts are gitignored per clone (see §8).
- **Platform**: a **combination** — web app, CLI, and chat interface all supported, not just one.
- **Combining the two target-role signals (5.3)**: resolved by §5.15 — one prioritized gap list, every item tagged by which signal(s) surfaced it, ordered confirmed-by-both → job-description-only → role-comparison-only.
- **Retention/spaced repetition**: resolved by §5.16 — mastered topics are re-tested periodically, with adaptive spacing driven by each topic's own assessment history, not a fixed calendar or a one-time gate.

### 10.2 Still Open

These need stakeholder decisions before/during design:

- **Profession-specific depth (§3)**: which profession(s) get real coaching depth first (topic libraries, assessment styles), and how/when does the product expand beyond the first one? Placeholder — not decided.
- **Assessment format depth**: Should assessments include code execution/grading, or are they conceptual/verbal (chat-based) only for v1?
- **Plan reset triggers**: Should resets ever happen automatically, or always require learner confirmation?
- **Web app / CLI / chat parity**: now that platform is a combination, does every capability (5.1–5.16) need to work identically across all three, or can some (e.g., mock interviews) be chat/web-only while others (e.g., quick progress checks) are CLI-first?

---

## 11. Out of Scope (v1)

- **Human-staffed** mock interviews — a real person conducting the mock (may be a future extension). AI-conducted simulated mock interviews are in scope (5.14).
- Salary negotiation or offer-stage coaching.
- Non-technical/behavioral-only role prep (though STAR-story style behavioral prep is in scope as one topic category).
- **Job-portal URL ingestion** (5.15) — pasting a link and having the coach fetch/scrape the posting itself. Deferred pending the same ToS/access-rights resolution required for Tier 2 crawling (5.3b); v1 accepts pasted text or an uploaded file only.
- **Fabricated resume content** (5.15) — inventing a skill, title, employer, responsibility, or date not present in the learner's actual background to better match a posting. Never in scope, at any tier — this is a hard rule, not a deferred feature.

---

## 12. Success Criteria

The product is successful when a learner can, for a chosen target role:

- See an accurate, evidence-based skill profile and gap analysis.
- Follow a concrete daily/weekly/monthly plan built from that gap analysis.
- Have their understanding validated and corrected per topic, not just self-assessed.
- Pass topic-level assessments that reflect real interview-style questioning.
- Get timely warnings when off-plan, and recover via a re-planning flow.
- Look back at a clear history of what was learned, tested, and mastered over time.
- Walk into interviews with real, structured stories grounded in their own experience, correctly framed for the target role/designation.
- Have real interview outcomes actually change the plan going forward, not just get logged.
- Pass an AI-conducted mock interview at the target level before facing a real one.
- Bring a real job posting to the coach and get back a source-tagged gap analysis against it, plus an honestly-labeled read on market trends and a truthfully tailored, ATS-friendly resume draft.
- Trust that a topic marked "mastered" months ago is still solid — because it's been periodically re-checked, not left untouched since the day it passed.
