import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { type UserConfigExport, defineConfig } from "vite";

const app = async (): Promise<UserConfigExport> =>
  defineConfig({
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  });
export default app;
