import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    // Keep React singleton across workspace tests to avoid invalid hook calls.
    alias: {
      react: path.resolve(dirname, "../../node_modules/react"),
      "react-dom": path.resolve(dirname, "../../node_modules/react-dom"),
    },
  },
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
  },
})
