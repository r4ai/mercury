# Security Policy

## Reporting a Vulnerability

Please report suspected vulnerabilities through GitHub's private vulnerability
reporting feature for this repository. Do not include secrets, access tokens, or
private exploit data in a public issue.

## Supply-Chain Security Invariants

Mercury treats CI workflows, dependency installation, package publication, and
repository-provided developer tools as executable trust boundaries.

- External GitHub Actions must use a reviewed full 40-character commit SHA.
  Human-readable versions may be retained as comments.
- Checkout steps must set `persist-credentials: false` unless a reviewed workflow
  proves that later Git operations require the stored credential.
- Workflows must declare explicit least-privilege `permissions`.
- `bun install --frozen-lockfile` and all package builds must complete without npm
  publishing credentials in the runner environment or home directory.
- Publishing credentials may be introduced only at the final publish boundary.
- Repository MCP servers must execute exact local dependencies installed from
  `package.json` and `bun.lock`; mutable selectors such as `@latest` are forbidden.
- Publication must fail closed. Existing package versions may be tolerated
  explicitly, but any other workspace publish failure must prevent Git tagging.
- Changes to `trustedDependencies`, lockfiles, workflow permissions, or publishing
  commands require security-sensitive review.

Run `bun run security:audit` to reject known high- or critical-severity
advisories in the locked dependency graph; CI enforces this audit as well.

## Operator Controls

Repository configuration should complement the source-enforced controls:

- protect the release environment and require approval where appropriate;
- keep npm credentials package-scoped and as short-lived as the publishing toolchain
  permits;
- restrict GitHub Actions to selected, SHA-pinned actions;
- enable branch and tag protection for release state; and
- review Renovate Action-digest and lockfile updates before merging.

The project should migrate to short-lived npm trusted publishing after compatibility
with Bun and the Changesets release path has been proven in a disposable package
scope.
