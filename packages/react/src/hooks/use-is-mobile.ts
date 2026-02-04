import { useEffect, useState } from "react"

const MOBILE_QUERY = "(hover: none), (pointer: coarse)"

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQueryList = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mediaQueryList.matches)

    update()
    mediaQueryList.addEventListener("change", update)
    return () => mediaQueryList.removeEventListener("change", update)
  }, [])

  return isMobile
}
