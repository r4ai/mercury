import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "waku/config"

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  },
})
