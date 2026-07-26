# Tech Stack

Decisions made so far, and why. Treat this alongside `mission.md` and `roadmap.md` as this project's constitution — durable, changed deliberately, not per-feature.

---

## Language & Runtime

**TypeScript, on Node.js**, end to end (backend, CLI, and frontend logic share one language).

**Why**: matches the stakeholder's own strongest skills (per the source `personalizedPlanner.md` instance) — building this project doubles as real practice in the same stack being prepared for interviews. Also keeps one language across every surface (core engine, CLI, web, future chat adapter), avoiding a split-stack tax this early.

## Repo Structure

A single monorepo (npm workspaces), so the coaching logic is written once and reused across every surface:

```
career_ai_coach/
  specs/                  # this constitution: mission.md, tech_stack.md, roadmap.md
  packages/
    core/                 # coaching engine — profiling, gap analysis, plan, validation loop,
                           # assessments, progress tracking. Pure logic, no UI, no direct AI-vendor code.
    ai-adapter/            # AI provider interface + implementations (see below)
  apps/
    cli/                   # first surface to be built (see roadmap.md)
    web/                   # React app, built later
    chat/                  # chat-surface integration, built later
```

**Why**: `packages/core` must not know which AI provider or which surface (CLI/web/chat) is calling it — that's what keeps the provider-agnostic requirement (below) and the multi-platform requirement (web + CLI + chat, all three, per the source spec) architecturally real instead of aspirational.

## AI Provider Layer

**Provider-agnostic by interface, Claude-only by implementation (for now).**

- `packages/ai-adapter` defines a single interface (e.g. `CoachAI.ask()`, `CoachAI.assess()`) that `packages/core` calls against — core code never imports a vendor SDK directly.
- The only implementation built initially is the **Anthropic Claude** adapter (`@anthropic-ai/sdk`), since that's what's available now and what's building this project.
- Other providers (OpenAI, Gemini, etc.) are a defined extension point — add a new class implementing the same interface — not built until a real need appears (see `roadmap.md`).

**Why**: this project is distributed as a git template repo that anyone can clone (per the source spec's resolved multi-user model) — a learner without a Claude subscription must still be able to use it by supplying their own adapter. Hard-coding to one vendor would silently break that.

## Data Storage

**Local, file-based, per-clone** — no hosted database, no multi-tenant server in the MVP.

- Each learner's Profile / Memory / Library data (per the source spec's Learner Data Architecture) is stored as structured local files (JSON, or YAML front-matter in markdown — decide during Phase 1 of `roadmap.md`), gitignored, exactly like the source project's `personalizedPlanner.md` pattern.
- No database server, no accounts, no login in the MVP — this matches the git-clone distribution model, not a hosted SaaS.
- Revisit if/when a hosted or multi-device-sync version is ever justified — not assumed now.

## Frontend (web app, built later — see roadmap.md)

**React**, with a lightweight build tool (Vite) rather than a heavier framework, until there's a concrete reason (SSR, routing complexity) to need more.

## CLI

A plain Node.js CLI (e.g. `commander` or minimal argv parsing) — the CLI is the **first surface built** (see `roadmap.md`), since it's the fastest way to get the core engine working end-to-end without frontend work.

## Job-Market Agentic Workflow

Deferred — not part of the MVP. When built, must respect each platform's (LinkedIn, Naukri, Indeed, etc.) ToS/API constraints per the source spec; likely its own component/worker rather than living inside `packages/core` directly, since it has different reliability/rate-limit concerns than the rest of the coaching logic. Architecture for this is **not decided yet** — revisit when `roadmap.md` reaches that phase.

## Testing

Not yet decided in detail; default assumption is **Vitest** (fast, native TS support, works across Node and Vite) unless a reason emerges to deviate. Revisit if this stops being sufficient.

## Open / Deliberately Deferred

- Second AI provider adapter (OpenAI or similar) — deferred until the Claude-only adapter proves the interface actually holds.
- Chat-surface adapter architecture — deferred until CLI + web exist.
- Any hosted/multi-device data layer — deferred until there's a concrete reason to move off local files.
