import path from "node:path"
import mdx from "@mdx-js/rollup"
import { createMdxPlugins } from "@r4ai/vite-plugin-mercury/plugins/mdx/unified"
import tailwindcss from "@tailwindcss/vite"
import { remarkMdxToc } from "remark-mdx-toc"
import type { Pluggable } from "unified"
import inspect from "vite-plugin-inspect"
import { defineConfig } from "waku/config"
import rehypeSection from "./src/lib/rehype-plugins/section"
import remarkHeadingId from "./src/lib/remark-plugins/heading-id"
import { contentTypegenPlugin } from "./src/lib/vite-plugins/content-typegen"

const mercury = createMdxPlugins({ remarkMercury: false })

export default defineConfig({
  vite: {
    plugins: [
      inspect(),
      tailwindcss(),
      mdx({
        remarkPlugins: [
          ...mercury.remarkPlugins,
          remarkHeadingId,
          remarkMdxToc as Pluggable,
        ],
        rehypePlugins: [...mercury.rehypePlugins, rehypeSection],
      }),
      contentTypegenPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  },
})
