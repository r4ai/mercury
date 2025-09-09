import dedent from "dedent"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { describe, expect, it } from "vitest"
import { remarkHeadingId } from "../remark-plugins/heading-id.js"
import { rehypeSection } from "./section.js"

/**
 * Renders markdown to HTML using unified processor chain with our plugins
 */
const renderMarkdownToHtml = async (markdown: string): Promise<string> => {
  const processor = unified()
    .use(remarkParse)
    .use([remarkHeadingId])
    .use(remarkRehype)
    .use(rehypeSection)
    .use(rehypeStringify)

  const file = await processor.process(markdown)
  return String(file)
}

/**
 * Creates a DOM container element from HTML string for testing
 */
const createDOMFromHTML = (html: string): HTMLElement => {
  const container = document.createElement("div")
  container.innerHTML = html
  return container
}

describe("rehypeSection", () => {
  it("wraps heading with section element", async () => {
    const markdown = dedent`
      ## Hello World

      Some content here.
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const section = container.querySelector("section")
    expect(section).toBeTruthy()
    expect(section?.getAttribute("data-heading-id")).toBe("hello-world")

    const heading = section?.querySelector("h2")
    expect(heading).toBeTruthy()
    expect(heading?.id).toBe("hello-world")
    expect(heading?.textContent).toBe("Hello World")
  })

  it("includes content after heading in the section", async () => {
    const markdown = dedent`
      ## Test Heading

      Paragraph content.

      Another paragraph.
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const section = container.querySelector("section")
    expect(section).toBeTruthy()

    const paragraphs = section?.querySelectorAll("p")
    expect(paragraphs?.length).toBe(2)
    expect(paragraphs?.[0]?.textContent).toBe("Paragraph content.")
    expect(paragraphs?.[1]?.textContent).toBe("Another paragraph.")
  })

  it("creates separate sections for multiple headings", async () => {
    const markdown = dedent`
      ## First Heading

      First content.

      ## Second Heading

      Second content.
    `

    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const sections = container.querySelectorAll("section")
    expect(sections.length).toBe(2)

    expect(sections[0]?.getAttribute("data-heading-id")).toBe("first-heading")
    expect(sections[0]?.querySelector("h2")?.textContent).toBe("First Heading")
    expect(sections[0]?.querySelector("p")?.textContent).toBe("First content.")

    expect(sections[1]?.getAttribute("data-heading-id")).toBe("second-heading")
    expect(sections[1]?.querySelector("h2")?.textContent).toBe("Second Heading")
    expect(sections[1]?.querySelector("p")?.textContent).toBe("Second content.")
  })

  it("handles mixed heading levels", async () => {
    const markdown = dedent`
      # Main Title

      Introduction content.

      ## Subsection

      Subsection content.

      ### Sub-subsection

      Sub-subsection content.
    `

    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const sections = container.querySelectorAll("section")
    expect(sections.length).toBe(3)

    expect(sections[0]?.getAttribute("data-heading-id")).toBe("main-title")
    expect(sections[0]?.querySelector("h1")).toBeTruthy()

    expect(sections[1]?.getAttribute("data-heading-id")).toBe("subsection")
    expect(sections[1]?.querySelector("h2")).toBeTruthy()

    expect(sections[2]?.getAttribute("data-heading-id")).toBe("sub-subsection")
    expect(sections[2]?.querySelector("h3")).toBeTruthy()
  })

  it("handles content before first heading", async () => {
    const markdown = dedent`
      Some intro text without heading.

      ## First Heading

      Content after heading.
    `

    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    // Content before first heading should not be wrapped in section
    const firstP = container.querySelector("p")
    expect(firstP?.textContent).toBe("Some intro text without heading.")
    expect(firstP?.parentElement?.tagName).toBe("DIV") // Our test container

    const section = container.querySelector("section")
    expect(section?.getAttribute("data-heading-id")).toBe("first-heading")
    expect(section?.querySelector("h2")?.textContent).toBe("First Heading")
  })

  it("handles heading without id gracefully", async () => {
    // Test with a manual heading that doesn't get processed by heading-id plugin
    const markdown = "## Test"
    const processor = unified()
      .use(remarkParse)
      // Skip remarkHeadingId plugin
      .use(remarkRehype)
      .use(rehypeSection)
      .use(rehypeStringify)

    const file = await processor.process(markdown)
    const html = String(file)
    const container = createDOMFromHTML(html)

    const section = container.querySelector("section")
    expect(section).toBeTruthy()
    // Should not have data-heading-id if heading has no id
    expect(section?.hasAttribute("data-heading-id")).toBe(false)
  })
})
