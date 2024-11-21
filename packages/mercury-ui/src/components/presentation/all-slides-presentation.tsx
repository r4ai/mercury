import { type FC, type ReactNode, useEffect } from "react"
import { useLocation } from "wouter"
import { useSearchParams } from "../../hooks/use-search-params"

export type AllSlidesPresentationProps = {
  children: ReactNode
}

export const AllSlidesPresentation: FC<AllSlidesPresentationProps> = ({
  children,
}) => {
  const search = useSearchParams()
  const [_, navigate] = useLocation()

  useEffect(() => {
    if (search.get("print") === "true") {
      window.print()
      const from = search.get("from") ?? "/"
      navigate(from)
    }
  }, [search, navigate])

  return <div className="mx-auto flex w-fit flex-col gap-0">{children}</div>
}
