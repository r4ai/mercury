import { describe, expect, it } from "vitest"
import { buildPageMetadata, getSiteDefaults } from "./page-metadata"

describe("buildPageMetadata", () => {
  it("returns site defaults when no overrides are provided", () => {
    const metadata = buildPageMetadata()
    const defaults = getSiteDefaults()

    expect(metadata.title).toBe(defaults.siteName)
    expect(metadata.description).toBe(defaults.siteDescription)
    expect(metadata.url).toBe(`${defaults.siteOrigin}/`)
    expect(metadata.ogImage).toBeUndefined()
    expect(metadata.ogType).toBe("website")
    expect(metadata.siteName).toBe(defaults.siteName)
  })

  it("sanitizes string inputs and builds absolute URLs", () => {
    const metadata = buildPageMetadata({
      title: "  Docs  ",
      description: "  Learn Mercury  ",
      path: "docs/getting-started",
      ogType: "article",
    })

    expect(metadata.title).toBe("Docs")
    expect(metadata.description).toBe("Learn Mercury")
    expect(metadata.url).toBe("https://mercury.r4ai.dev/docs/getting-started")
    expect(metadata.ogType).toBe("article")
  })

  it("normalizes provided og images", () => {
    const metadata = buildPageMetadata({ ogImage: "images/social-card.png" })

    expect(metadata.ogImage).toBe(
      "https://mercury.r4ai.dev/images/social-card.png",
    )
  })

  it("omits og images when value is blank", () => {
    const metadata = buildPageMetadata({ ogImage: "   " })

    expect(metadata.ogImage).toBeUndefined()
  })

  it("preserves absolute URLs when provided", () => {
    const metadata = buildPageMetadata({ path: "https://example.com/page" })

    expect(metadata.url).toBe("https://example.com/page")
  })

  it("falls back to defaults when description is empty", () => {
    const metadata = buildPageMetadata({ description: "   " })
    const defaults = getSiteDefaults()

    expect(metadata.description).toBe(defaults.siteDescription)
  })
})
