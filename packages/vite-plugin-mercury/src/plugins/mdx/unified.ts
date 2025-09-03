import type * as fs from "node:fs"
import type { Options as RollupMdxOptions } from "@mdx-js/rollup"
import type { RemarkMercuryOptions } from "@r4ai/remark-mercury"
import remarkMercury from "@r4ai/remark-mercury"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import rehypeShiki from "@shikijs/rehype"
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers"
import { defu } from "defu"
import type { Options as rehypeKatexOptions } from "rehype-katex"
import rehypeKatex from "rehype-katex"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import remarkGfm from "remark-gfm"
import type { Options as RemarkMathOptions } from "remark-math"
import remarkMath from "remark-math"
import {
  transformerLineNumbers,
  transformerMetaClass,
  transformerMetaDiff,
  transformerTitle,
} from "./rehype-transformers/index.js"
import { remarkInlineCode } from "./remark-plugins/index.js"

export type MercuryMdxOptions = {
  debug?: { enabled: true; fs: typeof fs } | { enabled: false }
  remarkMercury?: RemarkMercuryOptions | false
  remarkGfm?: RemarkGfmOptions | false
  remarkMath?: RemarkMathOptions | false
  rehypeKatex?: rehypeKatexOptions | false
  rehypeShiki?: RehypeShikiOptions | false
}

export const mercuryMdxDefaultOptions = {
  debug: { enabled: false },
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
    ],
  },
} as const satisfies MercuryMdxOptions

type CreatedMdxPlugins = {
  remarkPlugins: NonNullable<RollupMdxOptions["remarkPlugins"]>
  rehypePlugins: NonNullable<RollupMdxOptions["rehypePlugins"]>
}

export const createMdxPlugins = <T extends MercuryMdxOptions>(
  _options?: T,
): CreatedMdxPlugins => {
  const options = defu(_options, mercuryMdxDefaultOptions)

  const remarkPlugins: RollupMdxOptions["remarkPlugins"] = []
  if (options.debug.enabled) {
    const fs = options.debug.fs
    remarkPlugins.push(() => (tree) => {
      fs.writeFileSync("mdast_start.json", JSON.stringify(tree, null, 2))
      return tree
    })
  }
  remarkPlugins.push([remarkInlineCode])
  if (options.remarkMercury)
    remarkPlugins.push([remarkMercury, options.remarkMercury])
  if (options.remarkGfm) remarkPlugins.push([remarkGfm, options.remarkGfm])
  if (options.remarkMath) remarkPlugins.push([remarkMath, options.remarkMath])
  if (options.debug.enabled) {
    const fs = options.debug.fs
    remarkPlugins.push(() => (tree) => {
      fs.writeFileSync("mdast_end.json", JSON.stringify(tree, null, 2))
      return tree
    })
  }

  const rehypePlugins: RollupMdxOptions["rehypePlugins"] = []
  if (options.debug.enabled) {
    const fs = options.debug.fs
    rehypePlugins.push(() => (tree) => {
      fs.writeFileSync("hast_start.json", JSON.stringify(tree, null, 2))
      return tree
    })
  }
  if (options.rehypeKatex)
    rehypePlugins.push([rehypeKatex, options.rehypeKatex])
  if (options.rehypeShiki)
    rehypePlugins.push([rehypeShiki, options.rehypeShiki])
  if (options.debug.enabled) {
    const fs = options.debug.fs
    rehypePlugins.push(() => (tree) => {
      fs.writeFileSync("hast_end.json", JSON.stringify(tree, null, 2))
      return tree
    })
  }

  return { remarkPlugins, rehypePlugins }
}
