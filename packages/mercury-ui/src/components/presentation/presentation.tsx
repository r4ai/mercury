import type { MDXContent } from "mdx/types"
import type { FC } from "react"
import { Redirect, Route, Switch } from "wouter"
import { components } from "../components"
import { ControlMenu } from "../control-menu"
import { Slide } from "../slide"

export type PresentationProps = {
  base?: string
  slidesLength: number
  Content: MDXContent
}

export const Presentation: FC<PresentationProps> = ({
  base = "/",
  slidesLength,
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
                ...components,
                Slide: (props) => <Slide {...props} route={false} />,
                Presentation: ({ children }) => (
                  <div className="mx-auto flex w-fit flex-col gap-0">
                    {children}
                  </div>
                ),
              }}
            />
          </Route>
          <Content components={components} />
        </Switch>
        <ControlMenu
          data-control-menu
          className="absolute bottom-2 left-4"
          slidesLength={slidesLength}
        />
      </div>
    </Route>
  )
}
