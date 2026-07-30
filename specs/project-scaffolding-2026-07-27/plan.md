# Phase 0 — Project Scaffolding: Plan

Numbered task groups. Each group should be completable and checkable before moving to the next — see `validation.md` for the checks that gate merge.

---

## 1. Repo/workspace init
- Root `package.json` with `"workspaces": ["packages/*", "apps/*"]`, `"private": true`.
- `.nvmrc` pinned to latest Node LTS.
- `engines` field in root `package.json` matching the `.nvmrc` version.
- Update `.gitignore` for `node_modules/`, `dist/`, build output, `.env` — additive to the existing `personalizedPlanner.md` entry, not replacing it.

## 2. TypeScript config
- Root `tsconfig.base.json`: `strict: true`, modern target/module settings appropriate for Node.
- `packages/core/tsconfig.json`, `packages/ai-adapter/tsconfig.json`, `apps/cli/tsconfig.json` — each extends the base, scoped to its own `src/`.

## 3. Package skeletons
- `packages/core`: minimal `package.json`, `src/index.ts` with a placeholder export (no coaching logic — e.g. a version string or no-op).
- `packages/ai-adapter`: minimal `package.json`, `src/index.ts` defining an empty `CoachAI` interface shell only (no implementation — Phase 2's job).
- `apps/cli`: minimal `package.json`, `src/index.ts` with a placeholder entrypoint (e.g. prints a "not yet implemented" message).

## 4. Linting & formatting
- ESLint flat config at root (`eslint.config.js`) using `typescript-eslint` recommended rules.
- Prettier config (`.prettierrc`) + `eslint-config-prettier` so ESLint and Prettier don't fight over formatting rules.
- Root `lint` and `format` scripts that run across all workspaces.

## 5. Pre-commit hooks
- Install and initialize Husky.
- `lint-staged` config: run ESLint `--fix` and Prettier on staged files only.
- Wire into Husky's `pre-commit` hook.

## 6. Testing
- Install Vitest at the root, configured to discover tests across workspaces.
- One smoke test in `packages/core` (e.g. asserts the placeholder export exists) — proves the runner works, nothing more.

## 7. CI
- `.github/workflows/ci.yml`: on push/PR to `master` — install deps, run lint, run build (`tsc --noEmit` or equivalent per workspace), run test.
- Should fail loudly on any of the three steps failing; no silent skips.

## 8. Root scripts
- `package.json` scripts: `build`, `lint`, `format`, `test`, each fanning out across workspaces (`npm run <script> --workspaces --if-present`).

## 9. End-to-end verification
- Simulate a fresh clone: fresh `npm install`, then `build`, `lint`, `test` all green from a clean state.
- Confirm no coaching logic leaked in anywhere (grep `packages/core/src` and `packages/ai-adapter/src` for anything beyond the placeholder).
- Confirm `apps/web` and `apps/chat` do **not** exist yet (correctly deferred, not accidentally scaffolded early).

---

Execute in order — later groups (CI, hooks) assume earlier groups (workspace init, tsconfig, package skeletons) already exist and are lint/build-clean.
