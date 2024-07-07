import mdx from "@mdx-js/rollup";
import remarkMercury, { type RemarkMercuryOptions } from "@r4ai/remark-mercury";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          [
            remarkMercury,
            {
              slide: (index) => ({
                tagName: "slide",
                properties: {
                  index,
                },
              }),
            } satisfies RemarkMercuryOptions,
          ],
          remarkGfm,
        ],
      }),
    },
    react(),
  ],
});
