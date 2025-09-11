import * as fs from "node:fs"
import type { TransformOptions } from "esbuild"
import { generateCode, parseModule } from "magicast"
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

  let _config: ResolvedConfig
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

      // Parse the module
      const mod = parseModule(code)

      // Remove default export
      delete mod.exports.default

      // Add import for Presentation
      mod.imports.$prepend({
        from: "@mercurymd/react",
        imported: "Presentation",
      })

      // Add new default export function
      mod.exports.default =
        "({ components }) => <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />"

      // Generate the transformed code
      const { code: source } = generateCode(mod)

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
