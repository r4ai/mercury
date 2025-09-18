import { docsRoutes, getRouteTitle } from "@/lib/docs/routes"
import type { NavGroup } from "@/pages/docs/_components/docs-sidebar"

export const nav = [
  {
    title: "Getting Started",
    items: [
      {
        title: getRouteTitle(docsRoutes.installation),
        url: docsRoutes.installation.url,
      },
      {
        title: getRouteTitle(docsRoutes.syntaxGuide),
        url: docsRoutes.syntaxGuide.url,
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: getRouteTitle(docsRoutes.codeBlocks),
        url: docsRoutes.codeBlocks.url,
      },
      {
        title: getRouteTitle(docsRoutes.mathematics),
        url: docsRoutes.mathematics.url,
      },
    ],
  },
  {
    title: "Customization",
    items: [
      {
        title: getRouteTitle(docsRoutes.customComponents),
        url: docsRoutes.customComponents.url,
      },
      {
        title: getRouteTitle(docsRoutes.extendingSyntax),
        url: docsRoutes.extendingSyntax.url,
      },
    ],
  },
  {
    title: "Packages",
    items: [
      {
        title: getRouteTitle(docsRoutes.vitePlugin),
        url: docsRoutes.vitePlugin.url,
      },
      {
        title: getRouteTitle(docsRoutes.reactPackage),
        url: docsRoutes.reactPackage.url,
      },
      {
        title: getRouteTitle(docsRoutes.remarkPackage),
        url: docsRoutes.remarkPackage.url,
      },
    ],
  },
] as const satisfies NavGroup[]
