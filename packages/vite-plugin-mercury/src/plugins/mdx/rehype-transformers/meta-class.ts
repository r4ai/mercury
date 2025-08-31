import type { ShikiTransformer } from "shiki"

import { parseMeta } from "./utils.js"

/**
 * Transform meta class attribute to hast class attribute
 * @example
 * ````md
 * ```ts class="my-0"
 * const hello = "hello"
 * ```
 * ````
 */
export const transformerMetaClass = (): ShikiTransformer => ({
  code() {
    const meta = parseMeta(this.options.meta?.__raw)
    if (!meta.class || typeof meta.class !== "string") return

    // Add class to pre element
    this.pre.properties.containerClassName = meta.class
  },
})
