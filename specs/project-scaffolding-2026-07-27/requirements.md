# Phase 0 — Project Scaffolding: Requirements

Implements `specs/roadmap.md` Phase 0. Scope, decisions, and context for this phase only — durable product decisions live in `specs/mission.md` and `specs/tech_stack.md`; this file does not re-decide those, only applies them.

---

## Scope

Set up the monorepo skeleton and base tooling. **No coaching logic** — that starts at Phase 1 (data model) per the roadmap's phase boundaries.

In scope:
- npm workspaces monorepo with `packages/core`, `packages/ai-adapter`, `apps/cli` (per `tech_stack.md` — Repo Structure).
- TypeScript configuration, shared across packages.
- Linting and formatting.
- Pre-commit enforcement.
- Basic CI.
- Minimal placeholder code only (e.g. an empty exported function) — enough to prove the build/lint/test pipeline works end to end, nothing that implements any capability from `specs/product.md` §5.

Out of scope (deferred to later phases per `roadmap.md`):
- `apps/web`, `apps/chat` — not created yet (Phase 14, Phase 19).
- Any AI provider adapter implementation (Phase 2).
- The Profile/Memory/Library data model (Phase 1).
- Any coaching capability (Phase 3 onward).

## Context (from prior decisions)

Carried forward from `specs/tech_stack.md` — not re-decided here:
- **Language/runtime**: TypeScript on Node.js, one language across every surface.
- **Repo structure**: single monorepo, npm workspaces (not Nx/Turborepo — no stated reason yet to need a build-orchestration tool beyond what npm workspaces gives).
- **Testing default**: Vitest, unless a reason emerges to deviate.
- **AI provider layer**: `packages/ai-adapter` defines the interface; `packages/core` never imports a vendor SDK directly. Not implemented in Phase 0 — just the empty package shell, so the boundary exists from day one.

## Decisions made for this phase

Resolved via stakeholder Q&A on 2026-07-27:

| Decision | Choice | Why |
|---|---|---|
| Linting/formatting | **ESLint + Prettier** | Most mature option, widest editor/plugin support for a TS monorepo — over Biome (less mature ecosystem) or no tooling (too easy to drift once code exists) |
| Pre-commit enforcement | **Husky + lint-staged** | Cheap to wire in while the repo is still empty; blocks bad commits before they happen rather than relying on CI to catch them after |
| CI | **GitHub Actions (lint + build + test on push), included in Phase 0** | Scaffolding is the natural point to wire this once — before any real coaching logic exists to make CI noisy or slow to iterate on |
| Node.js version | **Pinned to latest LTS via `.nvmrc` + `package.json` `engines` field** | Avoids version-drift issues across contributors/clones later; cheap to set now |

## Defaults applied (not explicitly asked, flagged here for visibility — adjust if wrong)

- TypeScript: `strict: true` at the root `tsconfig.base.json`, each package/app extends it. No reason to start non-strict on a fresh repo.
- ESLint config: flat config (`eslint.config.js`) with `typescript-eslint` recommended rules + `eslint-config-prettier` to disable stylistic rules that conflict with Prettier (Prettier owns formatting, ESLint owns correctness).
- Package manager: `npm` (matches "npm workspaces" in `tech_stack.md` explicitly — not pnpm/yarn).

## Success criteria pointer

See `validation.md` in this same folder for the concrete, checkable definition of "this phase is done."
