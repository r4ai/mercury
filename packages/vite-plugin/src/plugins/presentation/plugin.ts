import * as fs from "node:fs"
import type { TransformOptions } from "esbuild"
import {
  createFilter,
  type Plugin,
  type ResolvedConfig,
  transformWithEsbuild,
} from "vite"
import { transformPresentationCode } from "./transform.js"

export type MercuryPresentationOptions = {
  debug?: boolean
  include?: string[]
  exclude?: string[]
  esbuildTransformOptions?: TransformOptions
}

export const mercuryPresentationDefaultOptions = {
  debug: false,
  include: ["**/*.mdx"],
  exclude: [],
  esbuildTransformOptions: {
    loader: "tsx",
    target: "esnext",
    jsx: "automatic",
  },
} as const satisfies Required<MercuryPresentationOptions>

export const presentation = (_options?: MercuryPresentationOptions): Plugin => {
  const options = { ...mercuryPresentationDefaultOptions, ..._options }
  const filter = createFilter(options.include, options.exclude)

  // @ts-expect-error
  let _config: ResolvedConfig
  // @ts-expect-error
  let _isDev: boolean

  return {
    name: "mercury-presentation",
    config(_, { command }) {
      _isDev = command === "serve"
    },
    configResolved(resolvedConfig) {
      _config = resolvedConfig
    },
    async transform(code, id) {
      if (!filter(id)) return

      if (options.debug) {
        fs.writeFileSync("jsx_start.jsx", code, "utf-8")
      }

      const transformed = transformPresentationCode(code)

      if (options.debug) {
        fs.writeFileSync("jsx_end.jsx", transformed.code, "utf-8")
      }

      const js = await transformWithEsbuild(
        transformed.code,
        id,
        {
          sourcefile: id,
          ...options.esbuildTransformOptions,
        },
        transformed.map,
      )

      return {
        code: js.code,
        map: js.map,
      }
    },
  }
}
