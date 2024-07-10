import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "tsconfig.app.json",
      compilerOptions: {
        declaration: true,
        declarationMap: true,
      },
      exclude: ["*.stories.(tsx|jsx|ts|js)", "*.mdx"],
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "mercury-ui",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "tailwindcss",
        ...Object.keys({
          ...packageJson.peerDependencies,
          ...packageJson.dependencies,
        }),
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
