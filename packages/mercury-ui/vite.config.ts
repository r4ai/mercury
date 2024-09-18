import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { dependencies, peerDependencies } from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    icons({
      compiler: "jsx",
      jsx: "react",
    }),
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
        ...Object.keys({ ...dependencies, ...peerDependencies }),
        "react",
        "react/jsx-runtime",
        "react-dom",
      ],
      output: {
        globals: {
          ...Object.fromEntries(
            Object.keys({ ...dependencies, ...peerDependencies }).map((key) => [
              key,
              key,
            ]),
          ),
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
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
})
