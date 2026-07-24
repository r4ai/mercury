import { describe, expect, test } from "bun:test"
import {
  findSupplyChainViolations,
  validateMcpConfig,
  validatePackageConfig,
  validateWorkflow,
} from "./check-supply-chain"

describe("workflow supply-chain policy", () => {
  test.each([
    {
      name: "accepts local actions",
      source:
        "permissions:\n  contents: read\nsteps:\n  - uses: ./.github/actions/setup\n",
      rules: [],
    },
    {
      name: "accepts immutable checkout without credential persistence",
      source:
        "permissions:\n  contents: read\nsteps:\n  - uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8\n    with:\n      persist-credentials: false\n",
      rules: [],
    },
    {
      name: "rejects a mutable action tag",
      source:
        "permissions:\n  contents: read\nsteps:\n  - uses: changesets/action@v1\n",
      rules: ["action-full-sha"],
    },
    {
      name: "rejects persisted checkout credentials",
      source:
        "permissions:\n  contents: read\nsteps:\n  - uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8\n",
      rules: ["checkout-credentials"],
    },
    {
      name: "rejects implicit permissions",
      source: "steps:\n  - uses: ./.github/actions/setup\n",
      rules: ["explicit-permissions"],
    },
    {
      name: "rejects npm credentials persisted by a workflow",
      source:
        "permissions:\n  contents: read\nsteps:\n  - run: echo token > $HOME/.npmrc\n",
      rules: ["credential-free-install"],
    },
    {
      name: "requires the dependency audit in CI",
      path: "ci.yml",
      source:
        "permissions:\n  contents: read\nsteps:\n  - run: bun run check\n",
      rules: ["dependency-audit"],
    },
    {
      name: "accepts a release build before the publish token",
      path: "release.yml",
      source: `permissions:
  contents: write
steps:
  - run: bun run build
  - uses: changesets/action@a45c4d594aa4e2c509dc14a9f2b3b67ba3780d0d
    env:
      NPM_CONFIG_TOKEN: \${{ secrets.NPM_TOKEN }}
`,
      rules: [],
    },
    {
      name: "rejects a release build inside the credential boundary",
      path: "release.yml",
      source: `permissions:
  contents: write
steps:
  - uses: changesets/action@a45c4d594aa4e2c509dc14a9f2b3b67ba3780d0d
    env:
      NPM_CONFIG_TOKEN: \${{ secrets.NPM_TOKEN }}
  - run: bun run build
`,
      rules: ["credential-free-build"],
    },
  ])("$name", ({ path = "workflow.yml", source, rules }) => {
    expect(validateWorkflow(path, source).map(({ rule }) => rule)).toEqual(
      rules,
    )
  })
})

describe("MCP supply-chain policy", () => {
  test("accepts the lockfile-backed local shadcn binary", () => {
    expect(
      validateMcpConfig(
        ".mcp.json",
        JSON.stringify({
          mcpServers: {
            shadcn: {
              command: "bun",
              args: ["run", "shadcn", "mcp"],
            },
          },
        }),
      ),
    ).toEqual([])
  })

  test("rejects a mutable registry selector", () => {
    expect(
      validateMcpConfig(
        ".mcp.json",
        JSON.stringify({
          mcpServers: {
            shadcn: {
              command: "bunx",
              args: ["shadcn@latest", "mcp"],
            },
          },
        }),
      ).map(({ rule }) => rule),
    ).toEqual(["lockfile-backed-mcp"])
  })
})

describe("release script supply-chain policy", () => {
  test.each([
    {
      name: "accepts fail-closed publication and matching Bun versions",
      publish:
        'for dir in packages/*; do (cd "$dir" && bun publish --ignore-scripts --tolerate-republish) || exit $?; done && changeset tag',
      release: "bun run publish",
      packageManager: "bun@1.3.2",
      rules: [],
    },
    {
      name: "rejects swallowed publication failures",
      publish:
        'for dir in packages/*; do (cd "$dir" && bun publish || true); done && changeset tag',
      release: "bun run publish",
      packageManager: "bun@1.3.2",
      rules: ["fail-closed-publish"],
    },
    {
      name: "rejects Bun version drift",
      publish:
        'for dir in packages/*; do (cd "$dir" && bun publish --ignore-scripts --tolerate-republish) || exit $?; done && changeset tag',
      release: "bun run publish",
      packageManager: "bun@1.1.32",
      rules: ["bun-version-agreement"],
    },
    {
      name: "rejects a build inside the credential-bearing release command",
      publish:
        'for dir in packages/*; do (cd "$dir" && bun publish --ignore-scripts --tolerate-republish) || exit $?; done && changeset tag',
      release: "bun run build && bun run publish",
      packageManager: "bun@1.3.2",
      rules: ["publish-only-release"],
    },
  ])("$name", ({ publish, release, packageManager, rules }) => {
    expect(
      validatePackageConfig(
        "package.json",
        JSON.stringify({
          packageManager,
          scripts: { publish, release },
        }),
        ".tool-versions",
        "bun  1.3.2\n",
      ).map(({ rule }) => rule),
    ).toEqual(rules)
  })
})

test("the repository satisfies every supply-chain invariant", async () => {
  expect(await findSupplyChainViolations(`${import.meta.dir}/..`)).toEqual([])
})
