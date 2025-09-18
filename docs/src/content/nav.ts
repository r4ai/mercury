import { docsRoutes, getRouteTitle } from "@/lib/docs/routes"
import type { NavGroup } from "@/pages/docs/_components/docs-sidebar"

const docsNavRoutes = {
  installation: docsRoutes["getting-started/installation"],
  syntaxGuide: docsRoutes["getting-started/syntax-guide"],
  codeBlocks: docsRoutes["features/code-block"],
  mathematics: docsRoutes["features/mathematics"],
  customComponents: docsRoutes["customization/custom-components"],
  extendingSyntax: docsRoutes["customization/extending-syntax"],
  vitePlugin: docsRoutes["packages/vite-plugin"],
  reactPackage: docsRoutes["packages/react"],
  remarkPackage: docsRoutes["packages/remark"],
} as const

export const nav = [
  {
    title: "Getting Started",
    items: [
      {
        title: getRouteTitle(docsNavRoutes.installation),
        url: docsNavRoutes.installation.url,
      },
      {
        title: getRouteTitle(docsNavRoutes.syntaxGuide),
        url: docsNavRoutes.syntaxGuide.url,
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: getRouteTitle(docsNavRoutes.codeBlocks),
        url: docsNavRoutes.codeBlocks.url,
      },
      {
        title: getRouteTitle(docsNavRoutes.mathematics),
        url: docsNavRoutes.mathematics.url,
      },
    ],
  },
  {
    title: "Customization",
    items: [
      {
        title: getRouteTitle(docsNavRoutes.customComponents),
        url: docsNavRoutes.customComponents.url,
      },
      {
        title: getRouteTitle(docsNavRoutes.extendingSyntax),
        url: docsNavRoutes.extendingSyntax.url,
      },
    ],
  },
  {
    title: "Packages",
    items: [
      {
        title: getRouteTitle(docsNavRoutes.vitePlugin),
        url: docsNavRoutes.vitePlugin.url,
      },
      {
        title: getRouteTitle(docsNavRoutes.reactPackage),
        url: docsNavRoutes.reactPackage.url,
      },
      {
        title: getRouteTitle(docsNavRoutes.remarkPackage),
        url: docsNavRoutes.remarkPackage.url,
      },
    ],
  },
] as const satisfies NavGroup[]
