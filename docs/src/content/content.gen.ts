// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
export const staticPaths = [["customization","custom-components"],["customization","extending-syntax"],["features","code-block"],["features","mathematics"],["getting-started","installation"],["getting-started","syntax-guide"]] as const

export type StaticPath = (typeof staticPaths)[number]

export const getContent = (slugs: StaticPath) => {
  const id = slugs.join("/")
  switch (id) {
    case "customization/custom-components":
      return import("./docs/customization/custom-components/index.mdx");
    case "customization/extending-syntax":
      return import("./docs/customization/extending-syntax/index.mdx");
    case "features/code-block":
      return import("./docs/features/code-block/index.mdx");
    case "features/mathematics":
      return import("./docs/features/mathematics/index.mdx");
    case "getting-started/installation":
      return import("./docs/getting-started/installation/index.mdx");
    case "getting-started/syntax-guide":
      return import("./docs/getting-started/syntax-guide/index.mdx");
    default:
      throw new Error(`Unknown content id: ${id}`)
  }
}
