import { type FC, type ReactNode, useEffect, useId } from "react"
import { Route as WouterRoute, useLocation } from "wouter"
import { cn } from "../../libs/utils"

export type SlideProps = {
  index: number
  route?: boolean
  children?: ReactNode
}

export const Slide: FC<SlideProps> = ({ index, route = true, children }) => {
  const id = useId()
  const [location] = useLocation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: when scale changes, we need to update the transform
  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return

    resize(el)

    window.addEventListener("resize", () => {
      resize(el)
    })
  }, [id, location])

  return (
    <Route route={route} path={`/${index}`}>
      <div
        id={id}
        data-slide
        className={cn(
          "my-auto aspect-[16/9] w-[960px] space-y-4 border p-8",
          route &&
            "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 scale-[var(--slide-scale)]",
          "print:top-0 print:left-0 print:h-[14.29cm] print:w-[25.4cm] print:translate-x-0 print:translate-y-0 print:scale-100",
        )}
      >
        {children}
      </div>
    </Route>
  )
}

type RouteProps = {
  route: boolean
  path: string
  children: ReactNode
}

const Route: FC<RouteProps> = ({ route, path, children }) =>
  route ? <WouterRoute path={path}>{children}</WouterRoute> : children

const resize = (el: HTMLElement) => {
  const elWidth = el?.offsetWidth
  const elHeight = el?.offsetHeight
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const widthScale = viewportWidth / elWidth
  const heightScale = viewportHeight / elHeight
  const scale = Math.min(widthScale, heightScale)

  el?.style.setProperty("--slide-scale", scale.toString())
}
