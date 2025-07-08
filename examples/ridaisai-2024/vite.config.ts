import mercury from "@r4ai/vite-plugin-mercury";
import react from "@vitejs/plugin-react";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mercury(),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
});
