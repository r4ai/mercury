import { Link } from "waku"
import type { PageProps } from "waku/router"
import { PageMetadataTags } from "@/components/page-metadata"
import { Toc } from "@/components/toc"
import { Article } from "@/components/typography/article"
import {
  getContent,
  getDocsRoute,
  type StaticPath,
  staticPaths,
} from "@/content"
import { buildDocsDocumentTitle, getDocsPageTitle } from "@/lib/docs/page-title"
import { getRouteDescription } from "@/lib/docs/routes"
import { components } from "@/lib/mdx"
import { buildPageMetadata } from "@/lib/seo/page-metadata"
import { DocsHeader } from "./_components/docs-header"

const redirect = (slugs: StaticPath): StaticPath => {
  const id = JSON.stringify(slugs)
  switch (id) {
    case "[]":
      return ["getting-started", "installation"]
    default:
      return slugs
  }
}

const DocsPage = async ({
  slugs,
}: PageProps<"/docs/[...slugs]"> & { slugs: StaticPath }) => {
  const redirected = redirect(slugs)
  const content = await getContent(redirected)
  const route = getDocsRoute(redirected)
  const pageTitle = getDocsPageTitle(content ?? route)
  const fullTitle = buildDocsDocumentTitle(pageTitle)
  const routeDescription = route ? getRouteDescription(route) : undefined
  const metadataDescription = content?.metadata?.description ?? routeDescription
  const metadata = buildPageMetadata({
    title: fullTitle,
    ...(metadataDescription ? { description: metadataDescription } : {}),
    path: redirected.length > 0 ? `/docs/${redirected.join("/")}` : "/docs",
    ogType: "article",
  })

  return (
    <div className="@container flex-1">
      <PageMetadataTags metadata={metadata} />
      <DocsHeader
        toc={content?.toc}
        slugs={redirected}
        redirected={redirected !== slugs}
        title={pageTitle}
      />
      {content ? (
        <div className="relative mx-auto flex flex-row justify-center @4xl:gap-12 @5xl:gap-16 @3xl:px-8 px-5">
          <Article className="min-w-0">
            <content.default components={components} />
          </Article>
          <Toc
            toc={content.toc}
            className="sticky top-24 @4xl:block hidden max-h-[calc(100vh-6rem)] w-3xs shrink-0 self-start overflow-auto"
          />
        </div>
      ) : (
        <div className="grid h-full place-items-center">
          <div className="space-y-6 text-center">
            <h1 className="font-black text-4xl">WIP</h1>
            <p className="text-muted-foreground">
              This page is a work in progress.
            </p>
            <p>
              Go back to{" "}
              <Link to="/docs" className="underline">
                /docs
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocsPage

export const getConfig = async () => {
  return {
    render: "static",
    staticPaths: staticPaths.filter((path) =>
      import.meta.env.DEV ? true : !path.some((part) => part.startsWith("_")),
    ),
  } as const
}
