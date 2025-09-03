import { type FC, type ReactNode, useEffect, useRef } from "react"
import { useLocation, Route as WouterRoute } from "wouter"
import { cn } from "../../libs/utils"

export type SlideProps = {
  index: number
  route?: boolean
  children?: ReactNode
}

export const Slide: FC<SlideProps> = ({ index, route = true, children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [location] = useLocation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: when scale changes, we need to update the transform
  useEffect(() => {
    const root =
      document.querySelector<HTMLElement>("[data-presentation-root]") ?? window

    const onResize = () => {
      if (!ref.current) return
      resize(ref.current, root)
    }

    onResize()

    const observer = new ResizeObserver(onResize)
    if (root instanceof HTMLElement) {
      observer.observe(root)
    } else {
      root.addEventListener("resize", onResize)
    }

    return () => {
      if (root instanceof HTMLElement) {
        observer.disconnect()
      } else {
        root.removeEventListener("resize", onResize)
      }
    }
  }, [location])

  return (
    <Route route={route} path={`/${index}`}>
      <div
        ref={ref}
        data-slide
        className={cn(
          "relative my-auto flex aspect-[16/9] h-[540px] max-h-[540px] w-[960px] max-w-[960px] flex-col space-y-4 overflow-hidden border p-8",
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

const resize = (el: HTMLElement, root: HTMLElement | typeof window) => {
  const elWidth = el?.offsetWidth
  const elHeight = el?.offsetHeight
  const viewportWidth =
    root instanceof HTMLElement ? root.offsetWidth : root.innerWidth
  const viewportHeight =
    root instanceof HTMLElement ? root.offsetHeight : root.innerHeight

  const widthScale = viewportWidth / elWidth
  const heightScale = viewportHeight / elHeight
  const scale = Math.min(widthScale, heightScale)

  el?.style.setProperty("--slide-scale", scale.toString())
}
