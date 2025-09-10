import type { FC } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { cn } from "../../libs/utils"
import { ColorSchemeButton } from "./color-scheme-button"
import { Counter } from "./counter"
import { FullscreenButton } from "./fullscreen-button"
import { useSlides } from "./hooks/use-slides"
import { NextSlideButton } from "./next-slide-button"
import { PrevSlideButton } from "./prev-slide-button"
import { PrintButton } from "./print-button"
import { VerticalDivider } from "./vertical-divider"

export type ControlMenuProps = {
  className?: string
  showPrintButton?: boolean
  showFullscreenButton?: boolean
  slidesLength: number
}

export const ControlMenu: FC<ControlMenuProps> = ({
  className,
  showPrintButton = true,
  showFullscreenButton = true,
  slidesLength,
}) => {
  const { index, next, prev } = useSlides({ length: slidesLength })

  useHotkeys("space", () => next(), { preventDefault: true })
  useHotkeys("shift+space", () => prev(), { preventDefault: true })
  useHotkeys("right", () => next(), { preventDefault: true })
  useHotkeys("left", () => prev(), { preventDefault: true })

  return (
    <div
      className={cn(
        Number.isNaN(index())
          ? "hidden"
          : "flex flex-row gap-2 rounded-xl border bg-background p-2 print:hidden",
        className,
      )}
    >
      <PrevSlideButton slidesLength={slidesLength} />
      <NextSlideButton slidesLength={slidesLength} />
      <Counter slidesLength={slidesLength} />
      <VerticalDivider />
      <ColorSchemeButton />
      {showPrintButton && <PrintButton />}
      {showFullscreenButton && <FullscreenButton slidesLength={slidesLength} />}
    </div>
  )
}
