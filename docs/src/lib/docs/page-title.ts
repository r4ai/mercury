import type { getContent } from "@/content"

const DOCS_SITE_TITLE = "Mercury Docs"

type DocsContentModule = NonNullable<Awaited<ReturnType<typeof getContent>>>

type DocsMetadata = DocsContentModule extends { metadata: infer Metadata }
  ? Metadata
  : never

type DocsMetadataSource = {
  metadata?: DocsMetadata
}

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
