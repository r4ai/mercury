import path from "node:path"
import mdx from "@mdx-js/rollup"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "waku/config"
import { contentTypegenPlugin } from "./src/lib/vite-plugins/content-typegen"

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), mdx(), contentTypegenPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  },
})
