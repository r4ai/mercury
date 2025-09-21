import dedent from "dedent"
import type * as hast from "hast"
import { JSDOM } from "jsdom"
import type * as mdast from "mdast"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { beforeAll, describe, expect, test } from "vitest"
import { type Options, remarkMercury } from "./plugin.js"

const process = async (md: string, options?: Options) => {
  let hast: hast.Root
  let mdast: mdast.Root

  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkMercury, options)
      .use(() => (tree: mdast.Root) => {
        mdast = tree
      })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(() => (tree: hast.Root) => {
        hast = tree
      })
      .use(rehypeStringify)
      .process(md)
  ).toString()

  // @ts-expect-error: hast and mdast are assigned
  return { html, hast, mdast }
}

describe(remarkMercury.name, () => {
  let jsdom: JSDOM
  let parser: DOMParser

  beforeAll(() => {
    jsdom = new JSDOM()
    parser = new jsdom.window.DOMParser()
  })

  test("only one slide", async () => {
    const md = dedent`
      # Hello, world!

      - This is a list item
      - This is another list item
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")

    const presentation = doc.querySelector("section.presentation")
    expect(presentation).not.toBe(null)

    const slide1 = presentation?.querySelector("section.slide")
    expect(slide1).not.toBe(null)
    expect(slide1?.querySelector("h1")?.textContent).toBe("Hello, world!")
    expect(slide1?.querySelectorAll("li").length).toBe(2)
    expect(slide1?.querySelectorAll("li")[0].textContent).toBe(
      "This is a list item",
    )
    expect(slide1?.querySelectorAll("li")[1].textContent).toBe(
      "This is another list item",
    )
  })

  test("multiple slides", async () => {
    const md = dedent`
      # Slide 1

      Slide 1 content

      ---

      # Slide 2

      Slide 2 content

      ---

      # Slide 3

      Slide 3 content

      ---

      # Slide 4

      Slide 4 content

      ---

      # Slide 5

      Slide 5 content
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")

    const presentation = doc.querySelector("section.presentation")
    expect(presentation).not.toBe(null)

    const slide1 = presentation?.querySelector("section.slide:nth-child(1)")
    expect(slide1).not.toBe(null)
    expect(slide1?.querySelector("h1")?.textContent).toBe("Slide 1")
    expect(slide1?.querySelector("p")?.textContent).toBe("Slide 1 content")

    const slide2 = presentation?.querySelector("section.slide:nth-child(2)")
    expect(slide2).not.toBe(null)
    expect(slide2?.querySelector("h1")?.textContent).toBe("Slide 2")
    expect(slide2?.querySelector("p")?.textContent).toBe("Slide 2 content")

    const slide3 = presentation?.querySelector("section.slide:nth-child(3)")
    expect(slide3).not.toBe(null)
    expect(slide3?.querySelector("h1")?.textContent).toBe("Slide 3")
    expect(slide3?.querySelector("p")?.textContent).toBe("Slide 3 content")

    const slide4 = presentation?.querySelector("section.slide:nth-child(4)")
    expect(slide4).not.toBe(null)
    expect(slide4?.querySelector("h1")?.textContent).toBe("Slide 4")

    const slide5 = presentation?.querySelector("section.slide:nth-child(5)")
    expect(slide5).not.toBe(null)
    expect(slide5?.querySelector("h1")?.textContent).toBe("Slide 5")
  })

  test("non top-level splitter should be ignored", async () => {
    const md = dedent`
      # Slide 1

      <div>
        ---
      </div>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")


    const presentation = doc.querySelector("section.presentation")
    expect(presentation).not.toBe(null)

    const slide1 = presentation?.querySelector("section.slide:nth-child(1)")
    expect(slide1).not.toBe(null)
    expect(slide1?.querySelector("h1")?.textContent).toBe("Slide 1")
    expect(slide1?.textContent).toContain("---")

    const slide2 = presentation?.querySelector("section.slide:nth-child(2)")
    expect(slide2).toBe(null)
  })

  test("options.slideSplitter: thematicBreak", async () => {
    const md = dedent`
      # Slide 1

      Slide 1 content

      ---

      # Slide 2

      Slide 2 content

      ---

      # Slide 3

      Slide 3 content
    `

    const { html } = await process(md, { slideSplitter: "thematicBreak" })
    const doc = parser.parseFromString(html, "text/html")

    const presentation = doc.querySelector("section.presentation")
    expect(presentation).not.toBe(null)

    const slide1 = presentation?.querySelector("section.slide:nth-child(1)")
    expect(slide1).not.toBe(null)
    expect(slide1?.querySelector("h1")?.textContent).toBe("Slide 1")

    const slide2 = presentation?.querySelector("section.slide:nth-child(2)")
    expect(slide2).not.toBe(null)
    expect(slide2?.querySelector("h1")?.textContent).toBe("Slide 2")

    const slide3 = presentation?.querySelector("section.slide:nth-child(3)")
    expect(slide3).not.toBe(null)
    expect(slide3?.querySelector("h1")?.textContent).toBe("Slide 3")
  })

  test("options.slideSplitter: heading", async () => {
    const md = dedent`
      # Slide 1

      Slide 1 content

      # Slide 2

      Slide 2 content

      # Slide 3

      Slide 3 content
    `

    const { html } = await process(md, { slideSplitter: "heading" })
    const doc = parser.parseFromString(html, "text/html")

    const presentation = doc.querySelector("section.presentation")
    expect(presentation).not.toBe(null)

    const slide1 = presentation?.querySelector("section.slide:nth-child(1)")
    expect(slide1).not.toBe(null)
    expect(slide1?.querySelector("h1")?.textContent).toBe("Slide 1")
    expect(slide1?.querySelector("p")?.textContent).toBe("Slide 1 content")

    const slide2 = presentation?.querySelector("section.slide:nth-child(2)")
    expect(slide2).not.toBe(null)
    expect(slide2?.querySelector("h1")?.textContent).toBe("Slide 2")
    expect(slide2?.querySelector("p")?.textContent).toBe("Slide 2 content")

    const slide3 = presentation?.querySelector("section.slide:nth-child(3)")
    expect(slide3).not.toBe(null)
    expect(slide3?.querySelector("h1")?.textContent).toBe("Slide 3")
    expect(slide3?.querySelector("p")?.textContent).toBe("Slide 3 content")
  })
})
