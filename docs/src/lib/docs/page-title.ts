import type { TocEntry } from "remark-mdx-toc"
import type { StaticPath } from "@/content"
import { nav } from "@/content/nav"
import { toTitleCase } from "@/lib/utils"

const DOCS_ROOT_LABEL = "Docs"
const DOCS_SITE_TITLE = "Mercury Docs"

const stripDocsPrefix = (url: string) => url.replace(/^\/docs\/?/, "")

const slugifyNavGroupTitle = (title: string) =>
  title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const navItemTitleMap = new Map(
  nav.flatMap((group) =>
    (group.items ?? []).map(
      (item) => [stripDocsPrefix(item.url), item.title] as const,
    ),
  ),
)

const navGroupTitleMap = new Map(
  nav.map((group) => [slugifyNavGroupTitle(group.title), group.title] as const),
)

const stripLocalePrefix = (slug: string) => slug.replace(/^_+/, "")

const formatLocaleSuffix = (slug: string) =>
  stripLocalePrefix(slug).toUpperCase()

const formatSlugTitle = (slug: string) => {
  const normalized = stripLocalePrefix(slug)
  if (!normalized) {
    return DOCS_ROOT_LABEL
  }

  return slug.startsWith("_")
    ? normalized.toUpperCase()
    : toTitleCase(normalized)
}

export const deriveDocsNavTitle = (slugs: StaticPath): string => {
  if (slugs.length === 0) {
    return DOCS_ROOT_LABEL
  }

  const slugPath = slugs.join("/")
  const navItemTitle = navItemTitleMap.get(slugPath)
  if (navItemTitle) {
    return navItemTitle
  }

  if (slugs.length === 1) {
    const navGroupTitle = navGroupTitleMap.get(slugs[0] ?? "")
    if (navGroupTitle) {
      return navGroupTitle
    }
  }

  const lastSlug = slugs.at(-1)
  if (!lastSlug) {
    return DOCS_ROOT_LABEL
  }

  if (slugs.length > 1 && lastSlug.startsWith("_")) {
    const parentSlugPath = slugs.slice(0, -1).join("/")
    const parentTitle = navItemTitleMap.get(parentSlugPath)
    if (parentTitle) {
      return `${parentTitle} (${formatLocaleSuffix(lastSlug)})`
    }
  }

  return formatSlugTitle(lastSlug)
}

const flattenTocEntries = (entries: TocEntry[]): TocEntry[] =>
  entries.flatMap((entry) => [
    entry,
    ...flattenTocEntries(entry.children ?? []),
  ])

const pickHeadingFromToc = (toc: TocEntry[] | undefined) => {
  if (!toc?.length) {
    return undefined
  }

  const flattened = flattenTocEntries(toc)
  const topLevelHeading = flattened.find((entry) => entry.depth === 1)
  return topLevelHeading?.value ?? flattened[0]?.value
}

type DocsContentModule = {
  metadata?: {
    title?: string
  }
  toc?: TocEntry[]
}

export const getDocsPageTitle = (
  slugs: StaticPath,
  content: DocsContentModule | undefined,
): string => {
  const metadataTitle = content?.metadata?.title?.trim()
  if (metadataTitle) {
    return metadataTitle
  }

  const tocTitle = pickHeadingFromToc(content?.toc)?.trim()
  if (tocTitle) {
    return tocTitle
  }

  return deriveDocsNavTitle(slugs)
}

export const buildDocsDocumentTitle = (pageTitle: string) =>
  pageTitle === DOCS_ROOT_LABEL
    ? DOCS_SITE_TITLE
    : `${pageTitle} | ${DOCS_SITE_TITLE}`

export const constants = {
  DOCS_ROOT_LABEL,
  DOCS_SITE_TITLE,
}
