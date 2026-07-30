# AI Interview Preparation Coach

An AI-driven coach that takes you from your current skill level to interview-ready for a target role — builds a personalized plan, validates you actually understand each topic (not just that you studied it), tests you, keeps you honest against the plan, and runs mock interviews before the real ones.

Full product spec: [`specs/product.md`](specs/product.md). Not sure which doc answers what? Start at [`specs/README.md`](specs/README.md).

---

## Quick Start

1. **Clone this repo.**
2. **Copy the template**: `personalizedPlanner.template.md` → `personalizedPlanner.md`. This new file is yours alone — it's gitignored, so it never gets committed or pushed.
3. **Fill it in**: your current role/background, target role, time budget, and target companies (see the template's comments for guidance).
4. **Start working with your AI coach** (chat, CLI, or web app — see [`specs/product.md` §10](specs/product.md)), pointing it at your `personalizedPlanner.md`. It will run the gap analysis and generate your first daily/weekly plan from there.

## Development Setup

The codebase itself is a TypeScript monorepo (npm workspaces: `packages/core`, `packages/ai-adapter`, `apps/cli`). Only Phase 0 scaffolding exists so far — no coaching logic yet (see `specs/roadmap.md`).

1. **Use the pinned Node version**: `nvm use` (reads `.nvmrc`).
2. **Install dependencies**: `npm install`.
3. **Build**: `npm run build` — compiles every workspace.
4. **Lint / format / test**: `npm run lint`, `npm run format`, `npm run test`.
5. **Run the CLI**: `node apps/cli/dist/index.js` (after building) — currently prints a placeholder message; real coaching commands arrive in later phases.

## What Makes This Different

- **Nothing is trusted just because it's written down.** Every topic — including anything you say you already know — goes through a Learn → Apply → Evaluate → Diagnose → Prescribe → Re-validate → Track loop before it counts as done.
- **Plans drift; this notices.** You get warned before you fall behind, not after, and the coach diagnoses _why_ progress is slow (wrong resource, unrealistic time budget, fatigue, a real knowledge gap) rather than just rescheduling.
- **It calibrates you honestly.** If you feel confident but the assessment says otherwise, you'll hear about the gap directly — encouragement never comes at the cost of a reality check.
- **It goes past "interview-ready."** Real interview feedback and AI-conducted mock interviews (at multiple levels) feed back into the plan — the loop doesn't stop once you start interviewing.

## Repo Layout

| File                                                          | Purpose                                                                                                                                       |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                                                   | This file — how to use the project.                                                                                                           |
| `specs/README.md`                                             | Index of the docs below — start here if you're not sure which one answers your question.                                                     |
| `specs/mission.md`, `specs/roadmap.md`, `specs/tech_stack.md` | This project's constitution — the durable "why," build sequencing, and technical decisions for the `career_ai_coach` software product itself. |
| `specs/product.md`                                            | The full, generic product specification. No personal data lives here.                                                                         |
| `specs/feature-name-YYYY-MM-DD/`                              | One dated implementation phase — `requirements.md` (scope), `plan.md` (tasks), `validation.md` (done/merge criteria).                          |
| `personalizedPlanner.template.md`                             | Committed, empty template for a new learner's plan.                                                                                           |
| `personalizedPlanner.md`                                      | **Your private plan** — gitignored, created from the template.                                                                                |
| `reference/manual-process.md`                                 | Historical reference: the original manual (non-AI) version of this process.                                                                   |

## A Note on Privacy

Your `personalizedPlanner.md` holds personal data (background, employer, target companies, progress). It is `.gitignore`'d deliberately — see `specs/product.md` §6 and §8 for why this separation is a hard requirement of the design, not an afterthought.

If you're also using an AI coach to track broader AI-project work beyond this repo, keep that at a system/user level (outside any single project folder) rather than folding it into this one — see `specs/product.md` §8 for the reasoning.
