import type { TocEntry } from "remark-mdx-toc"
import { describe, expect, it } from "vitest"
import type { StaticPath } from "@/content"
import {
  buildDocsDocumentTitle,
  constants,
  getDocsPageTitle,
} from "../src/lib/docs/page-title"

const createTocEntry = (
  value: string,
  depth: number,
  children: TocEntry[] = [],
): TocEntry =>
  ({
    value,
    depth,
    children,
    attributes: {},
  }) as TocEntry

describe("getDocsPageTitle", () => {
  it("returns the docs root label when no slugs are provided", () => {
    expect(getDocsPageTitle([], undefined)).toBe(constants.DOCS_ROOT_LABEL)
  })

  it("prefers a metadata title when present", () => {
    const path: StaticPath = ["features", "code-block"]
    expect(
      getDocsPageTitle(path, { metadata: { title: "Custom Title" } }),
    ).toBe("Custom Title")
  })

  it("uses the top-level heading from the table of contents", () => {
    const path: StaticPath = ["packages", "react"]
    const toc: TocEntry[] = [createTocEntry("React Package", 1)]
    expect(getDocsPageTitle(path, { toc })).toBe("React Package")
  })

  it("falls back to the nav title for known doc pages", () => {
    const path: StaticPath = ["getting-started", "installation"]
    expect(getDocsPageTitle(path, undefined)).toBe("Installation")
  })

  it("adds a locale suffix for localized doc pages", () => {
    const path: StaticPath = ["features", "code-block", "_ja"]
    expect(getDocsPageTitle(path, undefined)).toBe("Code Block (JA)")
  })

  it("returns the group title for section landing pages", () => {
    const path: StaticPath = ["features"]
    expect(getDocsPageTitle(path, undefined)).toBe("Features")
  })
})

describe("buildDocsDocumentTitle", () => {
  it("returns the docs site title for the home page", () => {
    expect(buildDocsDocumentTitle(constants.DOCS_ROOT_LABEL)).toBe(
      constants.DOCS_SITE_TITLE,
    )
  })

  it("appends the docs site title for child pages", () => {
    expect(buildDocsDocumentTitle("Installation")).toBe(
      "Installation | Mercury Docs",
    )
  })
})
