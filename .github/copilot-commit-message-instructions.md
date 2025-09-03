# Commit Message Guideline

!!!FOLLOW CONVENTIONAL COMMITS!!!

## Commit Message Format

```
<type>(<scope>?): <subject>
```

Scope is optional.

## Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

## Scope

The scope must be the name of the npm package affected:

- `mercury`
- `mercury-ui`
- `remark-mercury`
- `vite-plugin-mercury`
- `docs`

## Examples

- `feat(mercury-ui): add new button component`
- `fix(remark-mercury): resolve parsing issue with code blocks`
