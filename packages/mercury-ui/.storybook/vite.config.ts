import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import icons from "unplugin-icons/vite";
import { type UserConfigExport, defineConfig } from "vite";

const app = async (): Promise<UserConfigExport> =>
  defineConfig({
    plugins: [
      react(),
      icons({
        compiler: "jsx",
        jsx: "react",
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  });
export default app;
