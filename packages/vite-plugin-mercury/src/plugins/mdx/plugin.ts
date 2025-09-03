import rollupMdx, { type Options as RollupMdxOptions } from "@mdx-js/rollup"
import { defu } from "defu"
import type { Plugin } from "vite"
import {
  createMdxPlugins,
  type MercuryMdxOptions,
  mercuryMdxDefaultOptions,
} from "./unified.js"

export const mdx = (
  _options?: RollupMdxOptions & MercuryMdxOptions,
): Plugin => {
  const baseOptions = defu(_options, mercuryMdxDefaultOptions)
  const { remarkPlugins, rehypePlugins } = createMdxPlugins(baseOptions)
  return {
    enforce: "pre",
    ...rollupMdx({
      ...baseOptions,
      remarkPlugins: [...remarkPlugins, ...(baseOptions.remarkPlugins ?? [])],
      rehypePlugins: [...rehypePlugins, ...(baseOptions.rehypePlugins ?? [])],
    }),
  }
}
