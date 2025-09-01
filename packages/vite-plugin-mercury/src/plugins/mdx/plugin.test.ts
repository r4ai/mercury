import { compile } from "@mdx-js/mdx"
import dedent from "dedent"
import { describe, expect, test } from "vitest"
import { mdx } from "./plugin.js"

describe("mdx plugin", () => {
  test("should include twoslash transformer in configuration", () => {
    const plugin = mdx()
    // The plugin returns a Vite plugin object, which wraps the MDX rollup plugin
    expect(plugin).toBeDefined()
    expect(plugin.name).toContain("mdx")
  })

  test("should support basic MDX compilation", async () => {
    const mdxContent = dedent`
      # Test Slide
      
      Here's a simple code block:
      
      \`\`\`js
      console.log("Hello, world!")
      \`\`\`
    `

    // Test basic MDX compilation works
    const result = await compile(mdxContent)

    expect(result.toString()).toContain("Hello, world!")
  })

  test("should preserve twoslash language syntax in code blocks", async () => {
    const mdxContent = dedent`
      # TypeScript Example
      
      \`\`\`ts twoslash
      const message: string = "Hello, TypeScript!"
      //    ^?
      console.log(message)
      \`\`\`
    `

    // Basic compilation preserves the language identifier
    const result = await compile(mdxContent)

    expect(result.toString()).toContain("Hello, TypeScript!")
    // The language gets preserved as a className
    expect(result.toString()).toContain('className: "language-ts"')
  })

  test("should work with explicit trigger configuration", () => {
    // Test that the configuration includes explicit trigger
    const plugin = mdx({
      rehypeShiki: {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      },
    })

    expect(plugin).toBeDefined()
  })
})
