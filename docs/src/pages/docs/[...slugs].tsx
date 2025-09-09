import { Link } from "waku"
import type { PageProps } from "waku/router"
import { Toc } from "@/components/toc"
import { Article } from "@/components/typography/article"
import { getContent, type StaticPath, staticPaths } from "@/content"
import { components } from "@/lib/mdx"
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

  return (
    <div className="@container flex-1">
      <DocsHeader
        toc={content?.toc}
        slugs={redirected}
        redirected={redirected !== slugs}
      />
      {content ? (
        <div className="flex flex-row @4xl:gap-12 @5xl:gap-16 mx-auto justify-center relative px-5 @3xl:px-8">
          <Article className="min-w-0">
            <content.default components={components} />
          </Article>
          <Toc
            toc={content.toc}
            className="hidden @4xl:block sticky top-24 overflow-auto shrink-0 w-3xs max-h-[calc(100vh-6rem)] self-start"
          />
        </div>
      ) : (
        <div className="grid place-items-center h-full">
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
    staticPaths,
  } as const
}
