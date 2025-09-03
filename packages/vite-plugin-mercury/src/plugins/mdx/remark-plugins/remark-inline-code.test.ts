import { describe, expect, it } from "vitest"
import { createDOMFromHTML, renderHtml } from "../../../test-utils.js"
import { createMdxPlugins, mercuryMdxDefaultOptions } from "../plugin.js"
import { remarkInlineCode } from "./remark-inline-code.js"

describe("remark-inline-code", () => {
  it("transforms inline code to <inline-code> when used alone", async () => {
    const mdx = "Hello `world`!"
    const html = await renderHtml(mdx, [[remarkInlineCode]], [])
    const container = createDOMFromHTML(html)

    const inlineCodeElement = container.querySelector("inline-code")
    expect(inlineCodeElement).toBeTruthy()
    expect(inlineCodeElement?.textContent).toBe("world")

    const codeElement = container.querySelector("code")
    expect(codeElement).toBeFalsy()
  })

  it("works with default mercury MDX plugins", async () => {
    const input = "Hello `world`!" // simple doc; remark-mercury will wrap as a single slide
    const { remarkPlugins, rehypePlugins } = createMdxPlugins(
      mercuryMdxDefaultOptions,
    )
    const html = await renderHtml(input, remarkPlugins, rehypePlugins)
    const container = createDOMFromHTML(html)

    const inlineCodeElement = container.querySelector("inline-code")
    expect(inlineCodeElement).toBeTruthy()
    expect(inlineCodeElement?.textContent).toBe("world")
  })
})
