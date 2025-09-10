import * as fs from "node:fs"
import dedent from "dedent"
import type { TransformOptions } from "esbuild"
import {
  createFilter,
  type Plugin,
  type ResolvedConfig,
  transformWithEsbuild,
} from "vite"

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

      let source = code

      if (options.debug) {
        fs.writeFileSync("jsx_start.jsx", source, "utf-8")
      }

      // don't default export
      source = source.replace(/^export default /m, "")

      // export default Presentation
      source += "\n"
      source += dedent`
        import { Presentation } from "@mercurymd/react";

        export default ({ components }) => {
          return <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />;
        }
      `

      if (options.debug) {
        fs.writeFileSync("jsx_end.jsx", source, "utf-8")
      }

      const js = await transformWithEsbuild(source, id, {
        sourcefile: id,
        ...options.esbuildTransformOptions,
      })

      return {
        code: js.code,
        map: js.map,
      }
    },
  }
}
