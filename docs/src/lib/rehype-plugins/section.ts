// Rehype plugin to wrap headings with section elements
// Transforms <h2 id="hoge">hoge</h2> into <section data-heading-id="hoge"><h2 id="hoge">hoge</h2></section>

type HastNode = {
  type?: string
  value?: string
  children?: HastNode[]
  properties?: Record<string, unknown>
  tagName?: string
}

export const rehypeSection = () => (tree: HastNode) => {
  const visit = (node: HastNode) => {
    if (!node || !Array.isArray(node.children)) return

    const newChildren: HastNode[] = []
    let currentSection: HastNode | null = null
    let sectionContent: HastNode[] = []

    for (const child of node.children) {
      if (child.type === "element" && child.tagName?.match(/^h[1-6]$/)) {
        // If we have a current section, close it
        if (currentSection) {
          currentSection.children = sectionContent
          newChildren.push(currentSection)
        }

        // Get the heading's id attribute
        const headingId = child.properties?.id as string | undefined

        // Create new section element
        currentSection = {
          type: "element",
          tagName: "section",
          properties: headingId ? { "data-heading-id": headingId } : {},
          children: [],
        }

        sectionContent = [child]
      } else if (currentSection) {
        // Add content to current section
        sectionContent.push(child)
      } else {
        // No current section, add directly
        newChildren.push(child)
      }

      // Recursively visit child nodes
      if (child.children) {
        visit(child)
      }
    }

    // Close the last section if exists
    if (currentSection) {
      currentSection.children = sectionContent
      newChildren.push(currentSection)
    }

    node.children = newChildren
  }

  visit(tree)
}

// Export both names for compatibility
export const remarkSection = rehypeSection
export default rehypeSection
