declare module "*.mdx" {
  import type { TocEntry } from "remark-mdx-toc"
  import type { DocsContentMetadataExport } from "./lib/docs/content-module"

  // remark-mdx-toc exports an array at runtime; allow both for safety
  export const toc: TocEntry[]
  export const metadata: DocsContentMetadataExport
}
