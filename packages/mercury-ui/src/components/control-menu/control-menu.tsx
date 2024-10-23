import type { FC } from "react"
import { cn } from "../../libs/utils"
import { ColorSchemeButton } from "./color-scheme-button"
import { Counter } from "./counter"
import { FullscreenButton } from "./fullscreen-button"
import { NextSlideButton } from "./next-slide-button"
import { PrevSlideButton } from "./prev-slide-button"
import { VerticalDivider } from "./vertical-divider"

export type ControlMenuProps = {
  className?: string
  slidesLength: number
}

export const ControlMenu: FC<ControlMenuProps> = ({
  className,
  slidesLength,
}) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 rounded-xl border bg-background p-2 print:hidden",
        className,
      )}
    >
      <PrevSlideButton slidesLength={slidesLength} />
      <NextSlideButton slidesLength={slidesLength} />
      <Counter slidesLength={slidesLength} />
      <VerticalDivider />
      <ColorSchemeButton />
      <FullscreenButton slidesLength={slidesLength} />
    </div>
  )
}
