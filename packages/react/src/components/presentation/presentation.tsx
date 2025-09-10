import type { MDXComponents, MDXContent } from "mdx/types"
import type { FC } from "react"
import { Redirect, Route, Switch } from "wouter"
import { components as defaultComponents } from "../components"
import { ControlMenu } from "../control-menu"
import { Slide } from "../slide"
import { AllSlidesPresentation } from "./all-slides-presentation"

export type PresentationProps = {
  base?: string
  slidesLength: number
  showPrintButton?: boolean
  showFullscreenButton?: boolean
  components?: MDXComponents | undefined
  Content: MDXContent
}

export const Presentation: FC<PresentationProps> = ({
  base = "/",
  slidesLength,
  showPrintButton = true,
  showFullscreenButton = true,
  components,
  Content,
}) => {
  return (
    <Route path={base} nest>
      <div className="h-full">
        <Switch>
          <Route path="/">
            <Redirect to="/0" />
          </Route>
          <Route path="/all">
            <Content
              components={{
                ...(defaultComponents as unknown as MDXComponents),
                Slide: (props) => <Slide {...props} route={false} />,
                Presentation: AllSlidesPresentation,
                ...components,
              }}
            />
          </Route>
          <Content
            components={{
              ...(defaultComponents as unknown as MDXComponents),
              ...components,
            }}
          />
        </Switch>
        <ControlMenu
          data-control-menu
          className="absolute bottom-2 left-4"
          slidesLength={slidesLength}
          showPrintButton={showPrintButton}
          showFullscreenButton={showFullscreenButton}
        />
      </div>
    </Route>
  )
}
