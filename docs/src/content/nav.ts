import type { DocsRoute } from "@/lib/docs/routes"
import { docsRouteIds, docsRoutes, getRouteTitle } from "@/lib/docs/routes"
import type { NavGroup } from "@/pages/docs/_components/docs-sidebar"
import type { StaticPath } from "."

type NavGroupSlug = StaticPath[0] & string

const isDefaultLocaleRoute = (route: DocsRoute) =>
  route.slugs.every((slug) => !slug.startsWith("_"))

const toNavItems = (route: DocsRoute) => ({
  title: getRouteTitle(route),
  url: route.url,
})

const getRoutes = (group: NavGroupSlug) =>
  docsRouteIds
    .map((id) => docsRoutes[id])
    .filter((route) => route.slugs[0] === group && isDefaultLocaleRoute(route))
    .map(toNavItems)

export const nav: readonly NavGroup[] = [
  {
    title: "Getting Started",
    items: getRoutes("getting-started"),
  },
  { title: "Features", items: getRoutes("features") },
  { title: "Customization", items: getRoutes("customization") },
  { title: "Packages", items: getRoutes("packages") },
]
