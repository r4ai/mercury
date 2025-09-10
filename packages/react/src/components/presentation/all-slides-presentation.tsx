import { type FC, type ReactNode, useEffect, useRef } from "react"
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

  const containerRef = useRef<HTMLDivElement>(null)
  const hasPrinted = useRef(false)

  useEffect(() => {
    if (search.get("print") !== "true" || !containerRef.current) return

    const print = () => {
      if (hasPrinted.current) return
      window.print()
      hasPrinted.current = true
      const from = search.get("from") ?? "/"
      navigate(from)
    }

    const images = containerRef.current.querySelectorAll("img")
    const totalImages = images.length

    if (totalImages === 0) {
      print()
      return
    }

    let loadedImages = 0
    const handleImageLoad = () => {
      loadedImages += 1
      if (loadedImages === totalImages) {
        print()
      }
    }

    for (const image of images) {
      if (image.complete) {
        handleImageLoad()
      } else {
        image.addEventListener("load", handleImageLoad)
        image.addEventListener("error", handleImageLoad)
      }
    }

    return () => {
      for (const image of images) {
        image.removeEventListener("load", print)
        image.removeEventListener("error", print)
      }
    }
  }, [search, navigate])

  return (
    <div className="mx-auto flex w-fit flex-col gap-0" ref={containerRef}>
      {children}
    </div>
  )
}
