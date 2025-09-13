import path from "node:path"
import mdx from "@mdx-js/rollup"
import { createMdxPlugins } from "@mercurymd/vite-plugin/plugins/mdx/unified"
import {
  type Options as RemarkCalloutOptions,
  remarkCallout,
} from "@r4ai/remark-callout"
import { type RemarkEmbedOptions, remarkEmbed } from "@r4ai/remark-embed"
import { transformerLinkCard } from "@r4ai/remark-embed/transformers"
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
          [
            remarkCallout,
            {
              root: (callout) => ({
                tagName: "callout-root",
                properties: {
                  type: callout.type,
                  isFoldable: callout.isFoldable.toString(),
                  defaultFolded: callout.defaultFolded?.toString(),
                },
              }),
              title: (callout) => ({
                tagName: "callout-title",
                properties: {
                  type: callout.type,
                  isFoldable: callout.isFoldable.toString(),
                },
              }),
              body: (callout) => ({
                tagName: "callout-body",
                properties: {
                  type: callout.type,
                },
              }),
            } satisfies RemarkCalloutOptions,
          ],
          [
            remarkEmbed,
            {
              transformers: [
                transformerLinkCard({
                  tagName: () => "link-card",
                  properties: ({
                    title,
                    image,
                    url,
                    description,
                    favicon,
                  }) => ({
                    title,
                    imageSrc: image.src,
                    imageAlt: image.alt,
                    url,
                    description,
                    favicon,
                  }),
                }),
              ],
            } as const satisfies RemarkEmbedOptions,
          ],
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
