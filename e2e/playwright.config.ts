import fs from "node:fs"
import path from "node:path"
import { defineConfig, devices } from "@playwright/test"
import type { Options } from "./utils/test"

const examplesRootDir = path.resolve(import.meta.dirname, "../examples")
const exampleNames = fs
  .readdirSync(examplesRootDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const browserVariants = [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
]

const modeVariants = exampleNames.flatMap((name) => [
  {
    name: `${name}-dev`,
    testMatch: `${name}.spec.ts`,
    use: { exampleName: name, mode: "dev" } as const satisfies Options,
  },
  {
    name: `${name}-prod`,
    testMatch: `${name}.spec.ts`,
    use: { exampleName: name, mode: "prod" } as const satisfies Options,
  },
])

const projects = modeVariants.flatMap((mode) =>
  browserVariants.map((browser) => ({
    name: `${mode.name}-${browser.name}`,
    testMatch: mode.testMatch,
    use: { ...browser.use, ...mode.use },
  })),
)

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<Options>({
  testDir: path.resolve(import.meta.dirname, "./tests"),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  projects,
})
