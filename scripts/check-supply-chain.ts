import { readdir, readFile } from "node:fs/promises"
import { join, relative } from "node:path"

export type SupplyChainViolation = {
  rule: string
  path: string
  message: string
}

const violation = (
  rule: string,
  path: string,
  message: string,
): SupplyChainViolation => ({
  rule,
  path,
  message,
})

const externalActionPattern = /^[^./][^@\s]*\/[^@\s]+@[0-9a-fA-F]{40}$/

export const validateWorkflow = (
  path: string,
  source: string,
): SupplyChainViolation[] => {
  const violations: SupplyChainViolation[] = []
  const uses = [...source.matchAll(/^\s*(?:-\s*)?uses:\s*([^\s#]+)/gm)]

  for (const match of uses) {
    const action = match[1]

    if (action?.startsWith("./")) {
      continue
    }

    if (action === undefined || !externalActionPattern.test(action)) {
      violations.push(
        violation(
          "action-full-sha",
          path,
          `External action must use a full commit SHA: ${action ?? "<missing>"}`,
        ),
      )
    }
  }

  if (!/^permissions:\s*$/m.test(source)) {
    violations.push(
      violation(
        "explicit-permissions",
        path,
        "Workflow must declare top-level permissions.",
      ),
    )
  }

  if (
    path.endsWith("ci.yml") &&
    !/run:\s*bun run security:audit/.test(source)
  ) {
    violations.push(
      violation(
        "dependency-audit",
        path,
        "CI must reject dependencies with high or critical advisories.",
      ),
    )
  }

  const lines = source.split("\n")

  for (const [index, line] of lines.entries()) {
    if (!/uses:\s*actions\/checkout@[0-9a-fA-F]{40}/.test(line)) {
      continue
    }

    const stepIndent = line.search(/\S/)
    const stepTail = lines.slice(index + 1).findIndex((candidate) => {
      const indent = candidate.search(/\S/)
      return /^\s*-\s+name:/.test(candidate) && indent <= stepIndent
    })
    const end = stepTail === -1 ? lines.length : index + 1 + stepTail
    const checkoutStep = lines.slice(index, end).join("\n")

    if (!/persist-credentials:\s*false/.test(checkoutStep)) {
      violations.push(
        violation(
          "checkout-credentials",
          path,
          "Checkout steps must set persist-credentials: false.",
        ),
      )
    }
  }

  if (/\.npmrc|_authToken/.test(source)) {
    violations.push(
      violation(
        "credential-free-install",
        path,
        "Workflow must not persist npm credentials in the runner home.",
      ),
    )
  }

  if (
    path.endsWith("release.yml") &&
    /^\s*packages:\s*write\s*$/m.test(source)
  ) {
    violations.push(
      violation(
        "release-least-privilege",
        path,
        "The npm release workflow must not request GitHub Packages write access.",
      ),
    )
  }

  if (path.endsWith("release.yml")) {
    const buildIndex = source.indexOf("run: bun run build")
    const tokenIndex = source.indexOf("NPM_CONFIG_TOKEN:")

    if (buildIndex === -1 || tokenIndex === -1 || buildIndex > tokenIndex) {
      violations.push(
        violation(
          "credential-free-build",
          path,
          "The release build must complete before the npm publishing token is introduced.",
        ),
      )
    }
  }

  return violations
}

export const validateMcpConfig = (
  path: string,
  source: string,
): SupplyChainViolation[] => {
  const config = JSON.parse(source) as {
    mcpServers?: {
      shadcn?: {
        command?: string
        args?: string[]
      }
    }
  }
  const shadcn = config.mcpServers?.shadcn

  return shadcn?.command === "bun" &&
    JSON.stringify(shadcn.args) === JSON.stringify(["run", "shadcn", "mcp"])
    ? []
    : [
        violation(
          "lockfile-backed-mcp",
          path,
          "shadcn MCP must run the exact local dependency with bun run.",
        ),
      ]
}

export const validatePackageConfig = (
  packagePath: string,
  packageSource: string,
  toolVersionsPath: string,
  toolVersionsSource: string,
): SupplyChainViolation[] => {
  const violations: SupplyChainViolation[] = []
  const packageJson = JSON.parse(packageSource) as {
    packageManager?: string
    scripts?: Record<string, string>
  }
  const publish = packageJson.scripts?.publish ?? ""
  const release = packageJson.scripts?.release ?? ""
  const bunVersion = toolVersionsSource.match(/^bun\s+(\S+)$/m)?.[1]

  if (
    publish.includes("|| true") ||
    !publish.includes("--ignore-scripts") ||
    !publish.includes("--tolerate-republish") ||
    !publish.includes("|| exit")
  ) {
    violations.push(
      violation(
        "fail-closed-publish",
        packagePath,
        "Publish must use prebuilt outputs, tolerate only republishing, and stop on unexpected failures.",
      ),
    )
  }

  if (release !== "bun run publish") {
    violations.push(
      violation(
        "publish-only-release",
        packagePath,
        "The credential-bearing release command must publish prebuilt packages only.",
      ),
    )
  }

  if (
    bunVersion === undefined ||
    packageJson.packageManager !== `bun@${bunVersion}`
  ) {
    violations.push(
      violation(
        "bun-version-agreement",
        toolVersionsPath,
        "packageManager and .tool-versions must select the same Bun version.",
      ),
    )
  }

  return violations
}

export const findSupplyChainViolations = async (
  root: string,
): Promise<SupplyChainViolation[]> => {
  const workflowDirectory = join(root, ".github", "workflows")
  const workflowNames = (await readdir(workflowDirectory))
    .filter((name) => name.endsWith(".yml") || name.endsWith(".yaml"))
    .sort()
  const workflowViolations = await Promise.all(
    workflowNames.map(async (name) => {
      const path = join(workflowDirectory, name)
      return validateWorkflow(
        relative(root, path),
        await readFile(path, "utf8"),
      )
    }),
  )
  const mcpPath = join(root, ".mcp.json")
  const packagePath = join(root, "package.json")
  const toolVersionsPath = join(root, ".tool-versions")

  return [
    ...workflowViolations.flat(),
    ...validateMcpConfig(
      relative(root, mcpPath),
      await readFile(mcpPath, "utf8"),
    ),
    ...validatePackageConfig(
      relative(root, packagePath),
      await readFile(packagePath, "utf8"),
      relative(root, toolVersionsPath),
      await readFile(toolVersionsPath, "utf8"),
    ),
  ]
}

if (import.meta.main) {
  const violations = await findSupplyChainViolations(process.cwd())

  for (const item of violations) {
    console.error(`${item.path}: [${item.rule}] ${item.message}`)
  }

  if (violations.length > 0) {
    process.exitCode = 1
  } else {
    console.log("Supply-chain policy checks passed.")
  }
}
