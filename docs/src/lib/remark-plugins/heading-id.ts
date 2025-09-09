// Remark plugin to add `id` attributes to Markdown headings
// Uses the same slugify logic as docs/src/components/toc.tsx

import { slugifyHeading } from "../utils"

type Node = {
  type?: string
  value?: string
  children?: Node[]
  data?: { hProperties?: Record<string, unknown> } & Record<string, unknown>
}

const toText = (node: Node): string => {
  if (!node) return ""
  if (typeof node.value === "string") return node.value
  if (Array.isArray(node.children)) return node.children.map(toText).join("")
  return ""
}

export const remarkHeadingId = () => (tree: Node) => {
  const visit = (node: Node) => {
    if (!node) return
    if (node.type === "heading") {
      // Respect existing id if provided (e.g. via other plugins)
      const existingId = node.data?.hProperties?.id
      const text = toText(node)
      const id = existingId ?? slugifyHeading(text)

      node.data = node.data ?? {}
      node.data.hProperties = { ...node.data.hProperties, id }
    }
    if (Array.isArray(node.children)) node.children.forEach(visit)
  }
  visit(tree)
}

export default remarkHeadingId
