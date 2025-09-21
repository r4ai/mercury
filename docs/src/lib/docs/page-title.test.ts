import { describe, expect, it } from "vitest"
import { buildDocsDocumentTitle, getDocsPageTitle } from "./page-title"

describe("getDocsPageTitle", () => {
  it("returns the metadata title when present", () => {
    expect(getDocsPageTitle({ metadata: { title: "Custom Title" } })).toBe(
      "Custom Title",
    )
  })

  it("trims surrounding whitespace from the metadata title", () => {
    expect(getDocsPageTitle({ metadata: { title: "  Hello World  " } })).toBe(
      "Hello World",
    )
  })

  it("returns undefined when metadata is missing", () => {
    expect(getDocsPageTitle(undefined)).toBeUndefined()
    expect(getDocsPageTitle({})).toBeUndefined()
    expect(getDocsPageTitle({ metadata: { title: "   " } })).toBeUndefined()
  })
})

describe("buildDocsDocumentTitle", () => {
  it("returns the docs site title when a page title is not provided", () => {
    expect(buildDocsDocumentTitle(undefined)).toBe("Mercury Docs")
    expect(buildDocsDocumentTitle("")).toBe("Mercury Docs")
  })

  it("appends the docs site title when a page title is provided", () => {
    expect(buildDocsDocumentTitle("Installation")).toBe(
      "Installation | Mercury Docs",
    )
  })
})
