# Phase 0 — Project Scaffolding: Validation

How to know this phase is actually done and the `phase-0-project-scaffolding` branch can be merged to `master`. Every item must be checked, not sampled — this is scaffolding everything else builds on, so a shortcut here compounds.

---

## Checks

- [ ] `npm install` succeeds from a clean repo root with zero errors or unresolved peer-dependency warnings.
- [ ] `npm run build` succeeds across every workspace (`packages/core`, `packages/ai-adapter`, `apps/cli`) with zero TypeScript errors under `strict: true`.
- [ ] `npm run lint` passes with zero errors across the whole repo (warnings acceptable only if explicitly justified, not silently ignored).
- [ ] `npm run test` passes — including the one Vitest smoke test in `packages/core`.
- [ ] Husky pre-commit hook is actually wired, not just installed: manually stage a deliberately unformatted/unlinted file, attempt a commit, confirm it's blocked or auto-fixed by `lint-staged` before the commit completes.
- [ ] GitHub Actions CI workflow runs green on a push to this branch (or a test PR) — lint, build, and test steps all pass in CI, not just locally.
- [ ] Repo structure matches `tech_stack.md`: `packages/core`, `packages/ai-adapter`, `apps/cli` exist; `apps/web` and `apps/chat` do **not** exist yet.
- [ ] No coaching logic anywhere — `packages/core/src` and `packages/ai-adapter/src` contain only placeholder code, nothing implementing any of `docs/REQUIREMENTS.md` §5.1–§5.14.
- [ ] `.nvmrc` present and `package.json` `engines` field matches it.
- [ ] Existing root files (`README.md`, `docs/`, `specs/`, `personalizedPlanner.md`, `personalizedPlanner.template.md`, `old_README.md`) are untouched except for the additive `.gitignore` update.

## Merge criteria

All checks above pass, **and** a manual read confirms the resulting structure matches `roadmap.md`'s Phase 0 description and the decisions recorded in this phase's `requirements.md` — then merge `phase-0-project-scaffolding` into `master`.

## Explicitly not required for this phase

- No coaching-capability tests (nothing exists yet to test).
- No performance/load validation (irrelevant to a CLI scaffold with no logic).
- No multi-Node-version matrix in CI — single pinned LTS version is sufficient per this phase's decisions.
