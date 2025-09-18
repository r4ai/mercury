import type { getContent } from "@/content"

export type DocsContentModule = NonNullable<
  Awaited<ReturnType<typeof getContent>>
>

export type DocsContentMetadataExport = DocsContentModule extends {
  metadata: infer Metadata
}
  ? Metadata
  : never

export type DocsContentMetadata = Exclude<DocsContentMetadataExport, undefined>

export type DocsMetadataSource = {
  metadata?: DocsContentMetadataExport
}

export const defineDocsMetadata = <Metadata extends DocsContentMetadata>(
  metadata: Metadata,
): Metadata => metadata
