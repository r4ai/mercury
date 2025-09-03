import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
})
