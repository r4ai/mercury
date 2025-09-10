/// <reference types="vitest/config" />

import path from "node:path"
import { fileURLToPath } from "node:url"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import react from "@vitejs/plugin-react"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { dependencies, peerDependencies } from "./package.json"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    icons({
      compiler: "jsx",
      jsx: "react",
    }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "tsconfig.app.json",
      compilerOptions: {
        declaration: true,
        declarationMap: true,
      },
      exclude: ["*.stories.(tsx|jsx|ts|js)", "*.mdx"],
    }),
  ],
  build: {
    outDir: "dist",
    cssMinify: false,
    lib: {
      entry: "src/index.ts",
      name: "mercury-ui",
      formats: ["es", "umd"],
      cssFileName: "style",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys({ ...dependencies, ...peerDependencies }),
        "react",
        "react/jsx-runtime",
        "react-dom",
      ],
      output: {
        globals: {
          ...Object.fromEntries(
            Object.keys({ ...dependencies, ...peerDependencies }).map((key) => [
              key,
              key,
            ]),
          ),
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    devSourcemap: true,
  },
  test: {
    projects: [
      // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
})
