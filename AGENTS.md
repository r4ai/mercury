# Repository Guidelines

## Project Structure & Module Organization

- `packages/`: publishable workspaces
  - `mercury`: core TypeScript library
  - `remark-mercury`: Remark plugin for slide MD processing
  - `vite-plugin-mercury`: Vite plugin + MDX pipeline
  - `mercury-ui`: React UI components and styles
- `examples/`: runnable demos (Vite apps). Try `examples/lt`, `examples/program`.
- Tooling: Bun workspaces + Turbo, Biome, Changesets, Lefthook, Vitest, Storybook.

## Build, Test, and Development Commands

- Always use bun. never use npm, npx.
  - npm -> bun
  - npx -> bun x

## Code Quality

- Always use Bun commands, never npm/npx (use `bun x` instead of `npx`)
- Implement unit/integration tests for all features
- **Verification**: Always run following commands in root dir:
  - `bun run check:write`
  - `bun run build`
  - `bun run typecheck`
  - `bun run test:ci`

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

## GitHub

To access GitHub features like PRs, issues, releases, use `gh` CLI.

## Security & Configuration Tips

- Avoid breaking package `exports` fields; treat them as public API boundaries.
- Keep demo assets small; large files belong outside the repo or in Releases.
