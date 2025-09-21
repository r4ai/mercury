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
    "layout"
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
    "layout",
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
    case "features/layout":
      return import("./docs/features/layout/index.mdx");
    case "features/layout/_ja":
      return import("./docs/features/layout/_ja.mdx");
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

export const docsRoutes = {
  "customization/custom-components": {
    id: "customization/custom-components",
    slugs: ["customization","custom-components"],
    url: "/docs/customization/custom-components",
    metadata: {
      "title": "Custom Components",
      "description": "Build custom React components that integrate with Mercury slides."
    },
  },
  "customization/extending-syntax": {
    id: "customization/extending-syntax",
    slugs: ["customization","extending-syntax"],
    url: "/docs/customization/extending-syntax",
    metadata: {
      "title": "Extending Syntax",
      "description": "Extend Mercury's Markdown syntax with custom Remark plugins."
    },
  },
  "features/code-block": {
    id: "features/code-block",
    slugs: ["features","code-block"],
    url: "/docs/features/code-block",
    metadata: {
      "title": "Code Blocks",
      "description": "Showcase syntax highlighting and annotations for Mercury code blocks."
    },
  },
  "features/code-block/_ja": {
    id: "features/code-block/_ja",
    slugs: ["features","code-block","_ja"],
    url: "/docs/features/code-block/_ja",
    metadata: {
      "title": "Code Blocks (JA)",
      "description": "Mercury のコードブロックのハイライトや注釈の使い方を紹介します。"
    },
  },
  "features/layout": {
    id: "features/layout",
    slugs: ["features","layout"],
    url: "/docs/features/layout",
    metadata: {
      "title": "Layout",
      "description": "Explains the layout features provided by Mercury."
    },
  },
  "features/layout/_ja": {
    id: "features/layout/_ja",
    slugs: ["features","layout","_ja"],
    url: "/docs/features/layout/_ja",
    metadata: {
      "title": "Layout (JA)",
      "description": "Mercury の提供するレイアウト機能について説明します。"
    },
  },
  "features/mathematics": {
    id: "features/mathematics",
    slugs: ["features","mathematics"],
    url: "/docs/features/mathematics",
    metadata: {
      "title": "Mathematics",
      "description": "Render LaTeX-style mathematics inside Mercury presentations."
    },
  },
  "features/mathematics/_ja": {
    id: "features/mathematics/_ja",
    slugs: ["features","mathematics","_ja"],
    url: "/docs/features/mathematics/_ja",
    metadata: {
      "title": "Mathematics (JA)",
      "description": "Mercury のプレゼンテーションで LaTeX 形式の数式を表示する方法を説明します。"
    },
  },
  "features/qrcode": {
    id: "features/qrcode",
    slugs: ["features","qrcode"],
    url: "/docs/features/qrcode",
    metadata: {
      "title": "QR Code",
      "description": "Generate QR codes within your Mercury presentations using the built-in QRCode component."
    },
  },
  "features/qrcode/_ja": {
    id: "features/qrcode/_ja",
    slugs: ["features","qrcode","_ja"],
    url: "/docs/features/qrcode/_ja",
    metadata: {
      "title": "QR Code",
      "description": "Mercury プレゼンテーション内で組み込みの QRCode コンポーネントを使用して QR コードを生成します。"
    },
  },
  "getting-started/installation": {
    id: "getting-started/installation",
    slugs: ["getting-started","installation"],
    url: "/docs/getting-started/installation",
    metadata: {
      "title": "Installation",
      "description": "Install Mercury and configure your project with the required tooling."
    },
  },
  "getting-started/syntax-guide": {
    id: "getting-started/syntax-guide",
    slugs: ["getting-started","syntax-guide"],
    url: "/docs/getting-started/syntax-guide",
    metadata: {
      "title": "Syntax Guide",
      "description": "Learn the Markdown features and shortcodes available in Mercury."
    },
  },
  "getting-started/syntax-guide/_ja": {
    id: "getting-started/syntax-guide/_ja",
    slugs: ["getting-started","syntax-guide","_ja"],
    url: "/docs/getting-started/syntax-guide/_ja",
    metadata: {
      "title": "Syntax Guide (JA)",
      "description": "Mercury で利用できる Markdown 機能とショートコードを解説します。"
    },
  },
  "packages/react": {
    id: "packages/react",
    slugs: ["packages","react"],
    url: "/docs/packages/react",
    metadata: {
      "title": "@mercurymd/react",
      "description": "React components used to render interactive Mercury presentations."
    },
  },
  "packages/remark": {
    id: "packages/remark",
    slugs: ["packages","remark"],
    url: "/docs/packages/remark",
    metadata: {
      "title": "@mercurymd/remark",
      "description": "Remark plugin that parses Mercury-flavored Markdown."
    },
  },
  "packages/vite-plugin": {
    id: "packages/vite-plugin",
    slugs: ["packages","vite-plugin"],
    url: "/docs/packages/vite-plugin",
    metadata: {
      "title": "@mercurymd/vite-plugin",
      "description": "Vite plugin that compiles Mercury presentations efficiently."
    },
  },
} as const

export type DocsRouteId = keyof typeof docsRoutes
export type DocsRoute = (typeof docsRoutes)[DocsRouteId]

export const docsRouteIds = [
  "customization/custom-components",
  "customization/extending-syntax",
  "features/code-block",
  "features/code-block/_ja",
  "features/layout",
  "features/layout/_ja",
  "features/mathematics",
  "features/mathematics/_ja",
  "features/qrcode",
  "features/qrcode/_ja",
  "getting-started/installation",
  "getting-started/syntax-guide",
  "getting-started/syntax-guide/_ja",
  "packages/react",
  "packages/remark",
  "packages/vite-plugin",
] as const

export const getDocsRoute = (slugs: StaticPath) => {
  const id = slugs.join("/")
  return id.length === 0 ? undefined : docsRoutes[id as DocsRouteId]
}
