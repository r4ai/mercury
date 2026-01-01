import type { ShikiTransformer } from "@shikijs/types"

import { parseMeta } from "./utils.js"

export const transformerLineNumbers = (): ShikiTransformer => ({
  code() {
    const meta = parseMeta(this.options.meta?.__raw)
    if (!meta.showLineNumbers) return

    this.addClassToHast(this.pre, "has-line-numbers")
  },
  line(hast, line) {
    const meta = parseMeta(this.options.meta?.__raw)
    if (!meta.showLineNumbers) return

    const startLine = Number(meta.startLine ?? "1")
    hast.properties["data-line"] = Math.max(startLine - 1, 0) + line
  },
})
