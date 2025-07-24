import mercury from "@r4ai/vite-plugin-mercury";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error todo: update vite to fix type errors
  plugins: [mercury(), react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
});
