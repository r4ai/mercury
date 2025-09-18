import type { DocsMetadataSource } from "./content-module"

const DOCS_SITE_TITLE = "Mercury Docs"

export const getDocsPageTitle = (
  content: DocsMetadataSource | undefined,
): string | undefined => {
  const metadataTitle = content?.metadata?.title
  if (typeof metadataTitle !== "string") {
    return undefined
  }

  const trimmed = metadataTitle.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export const buildDocsDocumentTitle = (pageTitle: string | undefined) =>
  pageTitle ? `${pageTitle} | ${DOCS_SITE_TITLE}` : DOCS_SITE_TITLE
