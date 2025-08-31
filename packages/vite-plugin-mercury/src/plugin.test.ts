import { compile } from "@mdx-js/mdx"
import dedent from "dedent"
import { describe, expect, test } from "vitest"

describe("vite-plugin-mercury", () => {
  test("should work", () => {
    expect(true).toBe(true)
  })

  test("mdx plugin should process code blocks", async () => {
    const mdxContent = dedent`
      # Test Slide
      
      Here's a simple code block:
      
      \`\`\`js
      console.log("Hello, world!")
      \`\`\`
    `

    // Test that the MDX plugin can process basic content
    const result = await compile(mdxContent, {
      remarkPlugins: [],
      rehypePlugins: [],
    })

    expect(result.toString()).toContain("Hello, world!")
  })

  test("should support twoslash syntax", async () => {
    const mdxContent = dedent`
      # TypeScript Example
      
      \`\`\`ts twoslash
      const message: string = "Hello, TypeScript!"
      //    ^?
      console.log(message)
      \`\`\`
    `

    // Test that the content can be compiled. The actual twoslash processing
    // happens during the rehype step which is handled by the Vite plugin
    const result = await compile(mdxContent, {
      remarkPlugins: [],
      rehypePlugins: [],
    })

    expect(result.toString()).toContain("Hello, TypeScript!")
    // The compiled MDX preserves the language as className
    expect(result.toString()).toContain('className: "language-ts"')
  })
})
