import type { FC, ReactNode } from "react"
import { Router, type RouterProps } from "wouter"
import { ThemeProvider } from "../theme-provider"

type WithoutChildren<T> = Omit<T, "children">

type ThemeProviderProps = Parameters<typeof ThemeProvider>[0]

export type PresentationsProviderProps = {
  children?: ReactNode

  /**
   * Props for the router component
   *
   * @see https://github.com/molefrog/wouter?tab=readme-ov-file#router-hookhook-parserfn-basebasepath-hrefsfn-
   */
  router?: WithoutChildren<RouterProps>

  /**
   * Props for the theme provider component
   *
   * @see https://github.com/pacocoursey/next-themes?tab=readme-ov-file#themeprovider
   */
  theme?: WithoutChildren<ThemeProviderProps>
}

export const PresentationsProvider: FC<PresentationsProviderProps> = ({
  router,
  theme,
  children,
}) => {
  return (
    <Router {...router}>
      <ThemeProvider {...theme}>{children}</ThemeProvider>
    </Router>
  )
}
