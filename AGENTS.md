# Repository Guidelines

## Project Structure & Module Organization

- `packages/`: publishable workspaces
  - `create-mercury`: (@mercurymd/create-mercury) Project creation tool
  - `react`: (@mercurymd/react) React UI components and styles for presentations
  - `remark`: (@mercurymd/remark) Remark plugin for slide MD processing
  - `vite-plugin`: (@mercurymd/vite-plugin) Vite plugin + MDX pipeline
- `examples/`: runnable demos (Vite apps). Try `examples/lt`, `examples/program`.
- Tooling: pnpm workspaces + Turbo, Biome, Changesets, Lefthook, Vitest, Storybook.

## Build, Test, and Development Commands

- Always use pnpm. never use npm.
  - npm -> pnpm
  - npx -> pnpx

## Code Quality

- Always use pnpm commands
- Implement unit/integration tests for all features
- **Verification**: Always run following commands in root dir:
  - `pnpm run check:write`
  - `pnpm run build`
  - `pnpm run typecheck`
  - `pnpm run test:ci`

## Code Style

- **Functions**: Use arrow functions with implicit returns when possible
  - ✅ `const handleClick = () => "clicked"`
  - ❌ `function handleClick() { return "clicked"; }`
- **Types**: Prefer `type` over `interface`
  - ✅ `type User = { name: string; age: number; }`
  - ❌ `interface User { name: string; age: number; }`
- **File naming**: Use kebab-case for all filenames
  - ✅ `my-component.tsx`, `my-context.tsx`
  - ❌ `MyComponent.tsx`, `my_context.tsx`
- **Null coalescing**: Use `??` instead of `||` for null/undefined checks
  - ✅ `const port = process.env.PORT ?? "3000"`
  - ❌ `const port = process.env.PORT || "3000"`

## Commit & Pull Request Guidelines

- **Commit messages**: Use conventional commits
  - ✅ `feat: add new feature`, `fix: resolve issue`, `chore: update dependencies`
  - ❌ `added new feature`, `fixed issue`, `update dependencies`

NOTES:

- CHECK GIT LOG before any git commands. DO NOT TRUST YOUR MEMORY.
- Use gh to interact with GitHub

See [copilot-commit-message-instructions.md](./.github/copilot-commit-message-instructions.md) for more details.

## GitHub

To access GitHub features like PRs, issues, releases, use `gh` CLI.

## Security & Configuration Tips

- Avoid breaking package `exports` fields; treat them as public API boundaries.
- Keep demo assets small; large files belong outside the repo or in Releases.
