import mercury from "@mercurymd/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mercury({
      mdx: {
        rehypeShiki: {
          // write your options here...
          themes: {
            light: "github-light",
            dark: "one-dark-pro",
          },
        },
      },
    }),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
  ],
});
