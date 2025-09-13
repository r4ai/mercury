import { GlobeIcon } from "lucide-react"
import { tv } from "tailwind-variants"

const shouldInvertFavicon = (url: URL): boolean => {
  const site = url.hostname
  switch (site) {
    case "github.com":
      return true
    default:
      return false
  }
}

const checkIsFaviconAvailable = async (favicon?: string) => {
  if (!favicon) return false
  try {
    const response = await fetch(favicon, { method: "HEAD" })
    return response.ok
  } catch {
    return false
  }
}

export type LinkCardProps = {
  title: string
  imageSrc?: string
  imageAlt?: string
  url: string
  description?: string
  favicon?: string
}

const linkCardStyles = tv({
  slots: {
    root: "flex h-36 w-full flex-row items-center rounded-lg border bg-muted/25 not-italic transition-colors hover:bg-muted dark:hover:bg-muted/50",
    container:
      "flex flex-1 flex-col justify-between gap-2 overflow-auto break-all px-3 md:px-5",
    title: "line-clamp-2 font-bold text-base",
    description: "line-clamp-3 text-muted-foreground text-sm",
    siteContainer: "flex flex-row items-center gap-2 text-muted-foreground",
    favicon: "inline-block size-4",
    site: "line-clamp-1 text-sm",
    cover: "@[40rem]:block hidden h-36 rounded-r-lg object-cover",
  },
})

export const LinkCard = async ({
  title,
  imageSrc,
  imageAlt,
  url: urlStr,
  description,
  favicon,
}: LinkCardProps) => {
  const url = new URL(urlStr)
  const site = url.hostname
  const styles = linkCardStyles()

  const isFaviconAvailable = await checkIsFaviconAvailable(favicon)

  return (
    <a
      href={url.href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.root()}
    >
      <span className={styles.container()}>
        <span className={styles.title()}>{title}</span>
        {description && (
          <span className={styles.description()}>{description}</span>
        )}
        <span className={styles.siteContainer()}>
          {isFaviconAvailable ? (
            <img
              className={styles.favicon({
                className: shouldInvertFavicon(url) && "invert",
              })}
              loading="lazy"
              decoding="async"
              src={favicon}
              alt={`${site} favicon`}
            />
          ) : (
            <GlobeIcon className={styles.favicon()} />
          )}
          <span className={styles.site()}>
            <span className="text-foreground">{site}</span>
            <span className="text-muted-foreground">
              {url.pathname === "/" && url.search === "" && url.hash === ""
                ? ""
                : url.pathname + url.search + url.hash}
            </span>
          </span>
        </span>
      </span>
      {imageSrc && (
        <img
          className={styles.cover()}
          loading="lazy"
          decoding="async"
          src={imageSrc}
          alt={imageAlt ?? title}
        />
      )}
    </a>
  )
}
