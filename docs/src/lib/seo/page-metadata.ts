const SITE_NAME = "Mercury" as const
const SITE_DESCRIPTION =
  "Write MDX, render it as a presentation. If you can write MDX and JSX, you can use Mercury." as const
const SITE_ORIGIN = "https://mercury.r4ai.dev" as const

const sanitizeText = (value: string | undefined, fallback: string) => {
  if (typeof value !== "string") {
    return fallback
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

const toAbsoluteUrl = (pathOrUrl: string) => {
  try {
    const url = new URL(pathOrUrl)
    return url.toString()
  } catch {
    const normalizedPath = pathOrUrl.startsWith("/")
      ? pathOrUrl
      : `/${pathOrUrl}`
    return new URL(normalizedPath, SITE_ORIGIN).toString()
  }
}

const toOptionalAbsoluteUrl = (pathOrUrl: string | undefined) => {
  if (typeof pathOrUrl !== "string") {
    return undefined
  }

  const trimmed = pathOrUrl.trim()
  return trimmed.length > 0 ? toAbsoluteUrl(trimmed) : undefined
}

export type PageMetadataInput = {
  title?: string
  description?: string
  path?: string
  ogType?: "article" | "website"
  ogImage?: string
}

export type PageMetadata = {
  title: string
  description: string
  url: string
  ogType: "article" | "website"
  siteName: string
  ogImage?: string
}

export const buildPageMetadata = ({
  title,
  description,
  path = "/",
  ogType = "website",
  ogImage,
}: PageMetadataInput = {}): PageMetadata => {
  const resolvedTitle = sanitizeText(title, SITE_NAME)
  const resolvedDescription = sanitizeText(description, SITE_DESCRIPTION)
  const url = toAbsoluteUrl(path)
  const ogImageUrl = toOptionalAbsoluteUrl(ogImage)

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    url,
    ogType,
    siteName: SITE_NAME,
    ...(ogImageUrl ? { ogImage: ogImageUrl } : {}),
  }
}

export const getSiteDefaults = () => ({
  siteName: SITE_NAME,
  siteDescription: SITE_DESCRIPTION,
  siteOrigin: SITE_ORIGIN,
})
