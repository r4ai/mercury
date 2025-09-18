import { metadata as customComponentsMetadata } from "@/content/docs/customization/custom-components/index.mdx"
import { metadata as extendingSyntaxMetadata } from "@/content/docs/customization/extending-syntax/index.mdx"
import { metadata as codeBlocksMetadata } from "@/content/docs/features/code-block/index.mdx"
import { metadata as mathematicsMetadata } from "@/content/docs/features/mathematics/index.mdx"
import { metadata as installationMetadata } from "@/content/docs/getting-started/installation/index.mdx"
import { metadata as syntaxGuideMetadata } from "@/content/docs/getting-started/syntax-guide/index.mdx"
import { metadata as reactPackageMetadata } from "@/content/docs/packages/react/index.mdx"
import { metadata as remarkPackageMetadata } from "@/content/docs/packages/remark/index.mdx"
import { metadata as vitePluginMetadata } from "@/content/docs/packages/vite-plugin/index.mdx"
import type { DocsContentMetadata } from "./content-module"
import { getDocsPageTitle } from "./page-title"

type DocsRouteEntry<Url extends string> = {
  url: Url
  metadata: DocsContentMetadata
}

export const docsRoutes = {
  installation: {
    url: "/docs/getting-started/installation",
    metadata: installationMetadata,
  },
  syntaxGuide: {
    url: "/docs/getting-started/syntax-guide",
    metadata: syntaxGuideMetadata,
  },
  codeBlocks: {
    url: "/docs/features/code-block",
    metadata: codeBlocksMetadata,
  },
  mathematics: {
    url: "/docs/features/mathematics",
    metadata: mathematicsMetadata,
  },
  customComponents: {
    url: "/docs/customization/custom-components",
    metadata: customComponentsMetadata,
  },
  extendingSyntax: {
    url: "/docs/customization/extending-syntax",
    metadata: extendingSyntaxMetadata,
  },
  vitePlugin: {
    url: "/docs/packages/vite-plugin",
    metadata: vitePluginMetadata,
  },
  reactPackage: {
    url: "/docs/packages/react",
    metadata: reactPackageMetadata,
  },
  remarkPackage: {
    url: "/docs/packages/remark",
    metadata: remarkPackageMetadata,
  },
} as const satisfies Record<string, DocsRouteEntry<string>>

export type DocsRoute = (typeof docsRoutes)[keyof typeof docsRoutes]

export const getRouteTitle = (route: DocsRoute) =>
  getDocsPageTitle({ metadata: route.metadata }) ?? route.metadata.title

export const getRouteDescription = (route: DocsRoute) =>
  route.metadata.description?.trim() ?? route.metadata.title
