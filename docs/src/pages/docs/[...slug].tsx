import type { PageProps } from "waku/router"
import { getContent, type StaticPath, staticPaths } from "@/content"

const DocsPage = async ({
  path,
  slug,
}: PageProps<"/docs/[...slug]"> & { slug: StaticPath }) => {
  const { default: Content } = await getContent(slug)

  return (
    <div className="text-center h-full grid place-items-center">
      Work in Progress...
      <Content />
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
