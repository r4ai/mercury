import * as fs from "node:fs";
import mercury from "@mercurymd/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mercury({
      mdx: { debug: { enabled: true, fs } },
      presentation: { debug: true },
    }),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
  ],
});
