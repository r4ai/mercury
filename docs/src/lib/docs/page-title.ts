const DOCS_SITE_TITLE = "Mercury Docs"
type DocsContentModule = {
  metadata?: {
    title?: string | null
  }
}

export const getDocsPageTitle = (content: unknown): string | undefined => {
  const metadataTitle = (content as DocsContentModule | undefined)?.metadata
    ?.title
  if (typeof metadataTitle !== "string") {
    return undefined
  }

  const trimmed = metadataTitle.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export const buildDocsDocumentTitle = (pageTitle: string | undefined) =>
  pageTitle ? `${pageTitle} | ${DOCS_SITE_TITLE}` : DOCS_SITE_TITLE
