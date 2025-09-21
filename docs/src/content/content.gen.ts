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
    "features",
    "qrcode"
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
    "react"
  ],
  [
    "packages",
    "remark"
  ],
  [
    "packages",
    "vite-plugin"
  ],
  [
    "features",
    "code-block",
    "_ja"
  ],
  [
    "features",
    "mathematics",
    "_ja"
  ],
  [
    "features",
    "qrcode",
    "_ja"
  ],
  [
    "getting-started",
    "syntax-guide",
    "_ja"
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
    case "features/code-block/_ja":
      return import("./docs/features/code-block/_ja.mdx");
    case "features/mathematics":
      return import("./docs/features/mathematics/index.mdx");
    case "features/mathematics/_ja":
      return import("./docs/features/mathematics/_ja.mdx");
    case "features/qrcode":
      return import("./docs/features/qrcode/index.mdx");
    case "features/qrcode/_ja":
      return import("./docs/features/qrcode/_ja.mdx");
    case "getting-started/installation":
      return import("./docs/getting-started/installation/index.mdx");
    case "getting-started/syntax-guide":
      return import("./docs/getting-started/syntax-guide/index.mdx");
    case "getting-started/syntax-guide/_ja":
      return import("./docs/getting-started/syntax-guide/_ja.mdx");
    case "packages/react":
      return import("./docs/packages/react/index.mdx");
    case "packages/remark":
      return import("./docs/packages/remark/index.mdx");
    case "packages/vite-plugin":
      return import("./docs/packages/vite-plugin/index.mdx");
    default:
      return undefined
  }
}
