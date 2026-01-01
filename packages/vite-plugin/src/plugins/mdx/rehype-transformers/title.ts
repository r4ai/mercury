import type { ShikiTransformer } from "@shikijs/types"

import { parseMeta } from "./utils.js"

export const transformerTitle = (): ShikiTransformer => ({
  code() {
    const meta = parseMeta(this.options.meta?.__raw)

    const title = meta.title
    if (!title || typeof title !== "string") return

    const lang = this.options.lang

    this.addClassToHast(this.pre, "has-title")
    // biome-ignore lint/complexity/useLiteralKeys: This is a dynamic key
    this.pre.properties["title"] = title
    // biome-ignore lint/complexity/useLiteralKeys: This is a dynamic key
    this.pre.properties["lang"] = lang
  },
})
