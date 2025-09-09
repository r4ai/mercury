// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
export const staticPaths = [
  [],
  [
    "customization"
  ],
  [
    "features"
  ],
  [
    "getting-started"
  ],
  [
    "packages"
  ],
  [
    "customization",
    "custom-components"
  ],
  [
    "customization",
    "extending-syntax"
  ],
  [
    "features",
    "code-block"
  ],
  [
    "features",
    "mathematics"
  ],
  [
    "getting-started",
    "installation"
  ],
  [
    "getting-started",
    "syntax-guide"
  ],
  [
    "packages",
    "mercury-ui"
  ],
  [
    "packages",
    "remark-mercury"
  ],
  [
    "packages",
    "vite-plugin-mercury"
  ]
] as const

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
    case "packages/mercury-ui":
      return import("./docs/packages/mercury-ui/index.mdx");
    case "packages/remark-mercury":
      return import("./docs/packages/remark-mercury/index.mdx");
    case "packages/vite-plugin-mercury":
      return import("./docs/packages/vite-plugin-mercury/index.mdx");
    default:
      return undefined
  }
}
