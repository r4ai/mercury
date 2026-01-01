import type { ShikiTransformer } from "@shikijs/types"
import type { Element, ElementContent, Text } from "hast"

import { parseMeta } from "./utils.js"

const isElement = (node: ElementContent): node is Element =>
  node.type === "element" && node.children.length > 0

const isText = (node: ElementContent): node is Text => node.type === "text"

type Line = Element & {
  children: [
    Element & {
      children: Text[]
    },
  ]
}

const isLine = (line: ElementContent): line is Line =>
  isElement(line) &&
  isElement(line.children[0]) &&
  isText(line.children[0].children[0])

const getDiffIndentSize = (hast: Element) => {
  let diffIndentSize = 0
  for (const child of hast.children) {
    if (!isLine(child)) continue

    const firstLineText = child.children
      .flatMap((child) => (child.type === "element" ? child.children : []))
      .reduce((pre, cur) => (cur.type === "text" ? pre + cur.value : pre), "")

    if (firstLineText.startsWith("+") || firstLineText.startsWith("-")) {
      const valueWithoutPrefix = firstLineText.slice(1)
      diffIndentSize =
        valueWithoutPrefix.length - valueWithoutPrefix.trimStart().length + 1
    } else {
      diffIndentSize = firstLineText.length - firstLineText.trimStart().length
    }
    break
  }
  return diffIndentSize
}

/**
 * @example
 * ````md
 * ```rust diff
 *   fn main() {
 * -     println!("Hello, World!")
 * +     println!("Hello, Shikiji!")
 *   }
 * ```
 * ````
 */
export const transformerMetaDiff = (): ShikiTransformer => ({
  code(hast) {
    const meta = parseMeta(this.options.meta?.__raw)
    if (!meta.diff) return

    this.addClassToHast(this.pre, "has-diff")

    // calculate diff indent size
    // e.g. "+ fn main() {"
    //       ^^
    //       diffIndentSize = 2
    const diffIndentSize = getDiffIndentSize(hast)

    for (const line of hast.children) {
      if (!isLine(line)) continue

      const firstSpanValue = line.children[0].children[0].value
      const firstChar = firstSpanValue.trim()[0]

      // add "diff" and "add" or "remove" class to line
      switch (firstChar) {
        case "+":
          this.addClassToHast(line, ["diff", "add"])
          break
        case "-":
          this.addClassToHast(line, ["diff", "remove"])
          break
      }

      let toDeleteDiffIndentSize = diffIndentSize

      // remove "+" or "-"
      // e.g. "+  fn main() {"
      //       ^
      //       remove this "+" char
      if (firstChar === "-" || firstChar === "+") {
        const removedFirstSpanValue = firstSpanValue.trimStart().slice(1)
        if (removedFirstSpanValue === "") {
          line.children.splice(0, 1)
        } else {
          line.children[0].children[0].value = removedFirstSpanValue
        }
        toDeleteDiffIndentSize -= 1
      }

      // remove unnecessary spaces
      // e.g. "+  fn main() {"
      //        ^^
      //        this is unnecessary spaces
      for (const span of line.children) {
        const value = span.children[0].value
        const toRemoveChars = value.slice(0, toDeleteDiffIndentSize)
        for (const toRemoveChar of toRemoveChars) {
          if (toRemoveChar !== " ") return
          toDeleteDiffIndentSize -= 1
          span.children[0].value = span.children[0].value.slice(1)
        }
      }
    }
  },
})
