import mercury from "@r4ai/vite-plugin-mercury";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mercury(),
    tailwindcss(),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
});
