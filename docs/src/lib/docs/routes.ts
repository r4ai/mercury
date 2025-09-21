import {
  type DocsRoute,
  type DocsRouteId,
  docsRouteIds,
  docsRoutes as docsRoutesMap,
  getDocsRoute,
} from "@/content"
import { getDocsPageTitle } from "./page-title"

const toStartCase = (value: string) =>
  value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ")

const fallbackTitle = (route: DocsRoute) => {
  const lastSegment = route.slugs.at(-1) ?? route.id.split("/").at(-1) ?? "docs"
  const sanitized = lastSegment.replace(/^_+/, "")
  const formatted = toStartCase(sanitized)
  return formatted.length > 0 ? formatted : "Docs"
}

export const docsRoutes = docsRoutesMap
export { docsRouteIds, getDocsRoute }
export type { DocsRoute, DocsRouteId }

export const getRouteTitle = (route: DocsRoute) =>
  getDocsPageTitle({ metadata: route.metadata }) ?? fallbackTitle(route)

export const getRouteDescription = (route: DocsRoute) => {
  const description = route.metadata?.description?.trim()
  return description && description.length > 0
    ? description
    : getRouteTitle(route)
}
