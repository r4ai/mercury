# mercury

A bun + typescript npm package template.

## Tech Stack

- Runtime: Bun, Node.js
- Language: TypeScript
- Testing: Vitest
- Formatting and Linting: Biome
- Versioning: Changesets
- Git Hooks: Lefthook
- CI/CD: GitHub Actions
- Dependency Updates: Renovate

## Development

### Commands

| Command             | Description               |
| ------------------- | ------------------------- |
| `bun install`       | Install dependencies      |
| `bun run build`     | Build the project         |
| `bun run test`      | Run tests with watch mode |
| `bun run check`     | Lint and format           |
| `bun run changeset` | Create a new changeset    |

### Changesets

[Changesets](https://github.com/changesets/changesets) are used to version and publish your code. To create a new changeset, run the following command:

```
bun run changeset
```
