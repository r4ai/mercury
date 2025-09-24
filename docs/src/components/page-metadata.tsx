import type { PageMetadata } from "@/lib/seo/page-metadata"

type PageMetadataTagsProps = {
  metadata: PageMetadata
}

export const PageMetadataTags = ({ metadata }: PageMetadataTagsProps) => (
  <>
    <title>{metadata.title}</title>
    <link rel="canonical" href={metadata.url} />
    <meta name="description" content={metadata.description} />
    <meta property="og:site_name" content={metadata.siteName} />
    <meta property="og:type" content={metadata.ogType} />
    <meta property="og:title" content={metadata.title} />
    <meta property="og:description" content={metadata.description} />
    <meta property="og:url" content={metadata.url} />
    {metadata.ogImage ? (
      <meta property="og:image" content={metadata.ogImage} />
    ) : null}
    <meta
      name="twitter:card"
      content={metadata.ogImage ? "summary_large_image" : "summary"}
    />
    <meta name="twitter:title" content={metadata.title} />
    <meta name="twitter:description" content={metadata.description} />
    {metadata.ogImage ? (
      <meta name="twitter:image" content={metadata.ogImage} />
    ) : null}
  </>
)
