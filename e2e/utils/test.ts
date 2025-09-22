// e2e/fixtures/server.ts

import path from "node:path"
import { test as base } from "@playwright/test"
import type { InlineConfig } from "vite"
import { build, createServer, preview } from "vite"

export { expect } from "@playwright/test"

type Mode = "dev" | "prod"

export type Options = {
  exampleName: string
  mode: Mode
}

async function startVite(appDir: string, mode: Mode) {
  const cfg: InlineConfig = { root: appDir }

  if (mode === "dev") {
    const server = await createServer({
      ...cfg,
      server: { port: 0, strictPort: false },
      logLevel: "error",
    })
    await server.listen()
    const addr = server.httpServer?.address()
    const port = typeof addr === "object" && addr ? addr.port : 5173
    const url = `http://localhost:${port}`
    return { url, close: () => server.close() }
  } else {
    await build(cfg)
    const prev = await preview({
      ...cfg,
      preview: { port: 0, strictPort: false },
      logLevel: "error",
    })
    const addr = prev.httpServer.address()
    const port = typeof addr === "object" && addr ? addr.port : 4173
    const url = `http://localhost:${port}`
    return { url, close: () => prev.close() }
  }
}

export const test = base.extend<object, Options & { serverURL: string }>({
  exampleName: ["", { option: true, scope: "worker" }] as const,
  mode: ["dev", { option: true, scope: "worker" }] as const,

  serverURL: [
    async ({ exampleName, mode }, use) => {
      if (!exampleName) {
        throw new Error(
          'exampleName is empty. Set use: { exampleName: "<dir>" } in project.',
        )
      }
      const appDir = path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "examples",
        exampleName,
      )
      const { url, close } = await startVite(appDir, mode)
      try {
        await use(url)
      } finally {
        await close()
      }
    },
    { scope: "worker" },
  ],

  baseURL: async ({ serverURL }, use) => {
    await use(serverURL)
  },
})
