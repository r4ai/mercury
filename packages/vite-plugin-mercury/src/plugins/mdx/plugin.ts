import * as fs from "node:fs"
import rollupMdx, { type Options as RollupMdxOptions } from "@mdx-js/rollup"
import remarkMercury, { type RemarkMercuryOptions } from "@r4ai/remark-mercury"
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { transformerTwoslash } from "@shikijs/twoslash"
import { defu } from "defu"
import rehypeKatex, { type Options as rehypeKatexOptions } from "rehype-katex"
import remarkGfm, { type Options as RemarkGfmOptions } from "remark-gfm"
import remarkMath, { type Options as RemarkMathOptions } from "remark-math"
import type { Plugin } from "vite"
import {
  transformerLineNumbers,
  transformerMetaClass,
  transformerMetaDiff,
  transformerTitle,
} from "./rehype-transformers/index.js"
import { remarkInlineCode } from "./remark-plugins/remark-inline-code.js"

export type MercuryMdxOptions = {
  debug?: boolean
  remarkMercury?: RemarkMercuryOptions | false
  remarkGfm?: RemarkGfmOptions | false
  remarkMath?: RemarkMathOptions | false
  rehypeKatex?: rehypeKatexOptions | false
  rehypeShiki?: RehypeShikiOptions | false
}

export const mercuryMdxDefaultOptions = {
  debug: false,
  remarkMercury: {
    slide: (index) => ({
      tagName: "Slide",
      properties: {
        index,
      },
    }),
    presentation: (slidesLength) => ({
      tagName: "Presentation",
      properties: {
        slidesLength,
      },
    }),
  },
  remarkGfm: {},
  remarkMath: {},
  rehypeKatex: {},
  rehypeShiki: {
    themes: {
      light: "one-light",
      dark: "material-theme-darker",
    },
    transformers: [
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerMetaClass(),
      transformerMetaDiff(),
      transformerLineNumbers(),
      transformerTitle(),
      transformerTwoslash({
        explicitTrigger: true,
      }),
    ],
  },
} as const satisfies MercuryMdxOptions

export const mdx = (
  _options?: RollupMdxOptions & MercuryMdxOptions,
): Plugin => {
  const options = defu(_options, mercuryMdxDefaultOptions)

  const remarkPlugins: RollupMdxOptions["remarkPlugins"] = []
  if (options.debug) {
    remarkPlugins.push(() => {
      return (tree) => {
        fs.writeFileSync("mdast_start.json", JSON.stringify(tree, null, 2))
        return tree
      }
    })
  }
  remarkPlugins.push([remarkInlineCode])
  if (options.remarkMercury) {
    remarkPlugins.push([remarkMercury, options.remarkMercury])
  }
  if (options.remarkGfm) {
    remarkPlugins.push([remarkGfm, options.remarkGfm])
  }
  if (options.remarkMath) {
    remarkPlugins.push([remarkMath, options.remarkMath])
  }
  if (options.debug) {
    remarkPlugins.push(() => {
      return (tree) => {
        fs.writeFileSync("mdast_end.json", JSON.stringify(tree, null, 2))
        return tree
      }
    })
  }

  const rehypePlugins: RollupMdxOptions["rehypePlugins"] = []
  if (options.debug) {
    rehypePlugins.push(() => {
      return (tree) => {
        fs.writeFileSync("hast_start.json", JSON.stringify(tree, null, 2))
        return tree
      }
    })
  }
  if (options.rehypeKatex) {
    rehypePlugins.push([rehypeKatex, options.rehypeKatex])
  }
  if (options.rehypeShiki) {
    rehypePlugins.push([rehypeShiki, options.rehypeShiki])
  }
  if (options.debug) {
    rehypePlugins.push(() => {
      return (tree) => {
        fs.writeFileSync("hast_end.json", JSON.stringify(tree, null, 2))
        return tree
      }
    })
  }

  return {
    enforce: "pre",
    ...rollupMdx({
      ...options,
      remarkPlugins: [...remarkPlugins, ...(options.remarkPlugins ?? [])],
      rehypePlugins: [...rehypePlugins, ...(options.rehypePlugins ?? [])],
    }),
  }
}
