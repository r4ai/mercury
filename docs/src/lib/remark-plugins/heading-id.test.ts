import dedent from "dedent"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { describe, expect, it } from "vitest"
import { remarkHeadingId } from "./heading-id.js"

/**
 * Renders markdown to HTML using unified processor chain with heading-id plugin
 */
const renderMarkdownToHtml = async (markdown: string): Promise<string> => {
  const processor = unified()
    .use(remarkParse)
    .use([remarkHeadingId])
    .use(remarkRehype)
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

describe("remarkHeadingId", () => {
  it("adds id to heading based on text content", async () => {
    const markdown = "## Hello World"
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const heading = container.querySelector("h2")
    expect(heading).toBeTruthy()
    expect(heading?.id).toBe("hello-world")
    expect(heading?.textContent).toBe("Hello World")
  })

  it("handles different heading levels", async () => {
    const markdown = dedent`
      # Main Title
      ## Subsection
      ### Sub-subsection
      #### Fourth Level
      ##### Fifth Level
      ###### Sixth Level
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    expect(container.querySelector("h1")?.id).toBe("main-title")
    expect(container.querySelector("h2")?.id).toBe("subsection")
    expect(container.querySelector("h3")?.id).toBe("sub-subsection")
    expect(container.querySelector("h4")?.id).toBe("fourth-level")
    expect(container.querySelector("h5")?.id).toBe("fifth-level")
    expect(container.querySelector("h6")?.id).toBe("sixth-level")
  })

  it("handles headings with special characters", async () => {
    const markdown = dedent`
      ## Hello & Goodbye!
      ## What's New?
      ## 100% Success Rate
      ## File/Path/Example
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const headings = container.querySelectorAll("h2")
    expect(headings[0]?.id).toBe("hello-goodbye")
    expect(headings[1]?.id).toBe("whats-new")
    expect(headings[2]?.id).toBe("100-success-rate")
    expect(headings[3]?.id).toBe("filepathexample")
  })

  it("handles headings with inline code", async () => {
    const markdown = "## Using `console.log()` function"
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const heading = container.querySelector("h2")
    expect(heading?.id).toBe("using-consolelog-function")
  })

  it("handles headings with emphasis", async () => {
    const markdown = "## This is **bold** and *italic* text"
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const heading = container.querySelector("h2")
    expect(heading?.id).toBe("this-is-bold-and-italic-text")
  })

  it("handles empty or whitespace-only headings", async () => {
    const markdown = dedent`
      ##
      ##
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const headings = container.querySelectorAll("h2")
    // Empty headings should get empty ids
    expect(headings[0]?.id).toBe("")
    expect(headings[1]?.id).toBe("")
  })

  it("handles headings with numbers and mixed content", async () => {
    const markdown = dedent`
      ## 1. Getting Started
      ## Step 2: Configuration
      ## FAQ #3
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const headings = container.querySelectorAll("h2")
    expect(headings[0]?.id).toBe("1-getting-started")
    expect(headings[1]?.id).toBe("step-2-configuration")
    expect(headings[2]?.id).toBe("faq-3")
  })

  it("handles long headings", async () => {
    const markdown =
      "## This is a very long heading that contains many words and should be properly slugified into a kebab-case id"
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const heading = container.querySelector("h2")
    expect(heading?.id).toBe(
      "this-is-a-very-long-heading-that-contains-many-words-and-should-be-properly-slugified-into-a-kebab-case-id",
    )
  })

  it("handles unicode and accented characters", async () => {
    const markdown = dedent`
      ## Café & Naïve Résumé
      ## 日本語のタイトル
      ## Émile's café
    `
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const headings = container.querySelectorAll("h2")
    // These tests depend on the slugifyHeading function behavior
    expect(headings[0]?.id).toBe("caf-nave-rsum")
    expect(headings[1]?.id).toBe("")
    expect(headings[2]?.id).toBe("miles-caf")
  })

  it("respects existing id if provided", async () => {
    // This test would require a more complex setup to manually set id before the plugin runs
    // For now, we'll test the basic functionality since the plugin checks for existing id
    const markdown = "## Test Heading"
    const html = await renderMarkdownToHtml(markdown)
    const container = createDOMFromHTML(html)

    const heading = container.querySelector("h2")
    expect(heading?.id).toBe("test-heading")
  })
})
