import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import type { MDXContent } from "mdx/types"
import type { FC, ReactNode } from "react"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import { type BundledLanguage, codeToHast } from "shiki/bundle/web"
import type { Components } from "../components"

export const highlight = async (code: string, lang: BundledLanguage) => {
  const out = await codeToHast(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  })
}

export const createMDXContent = <TComponents extends Components = Components>(
  renderContent: (components: TComponents) => ReactNode,
): MDXContent => {
  const MockContent: MDXContent = ({ components = {} }) => {
    const PresentationWrapper = components?.Presentation as FC<{
      children?: ReactNode
    }>

    return (
      <PresentationWrapper>
        {renderContent(components as TComponents)}
      </PresentationWrapper>
    )
  }

  return MockContent
}
