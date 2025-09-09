declare module "*.mdx" {
  import type { TocEntry } from "remark-mdx-toc"

  // remark-mdx-toc exports an array at runtime; allow both for safety
  export const toc: TocEntry[]
}
