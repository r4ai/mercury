import type { FC } from "react"
import Maximize2Icon from "~icons/lucide/maximize-2"
import Minimize2Icon from "~icons/lucide/minimize-2"
import { Button, type ButtonProps } from "../button"
import { useSlides } from "./hooks/use-slides"

export type FullscreenButtonProps = ButtonProps & { slidesLength: number }

export const FullscreenButton: FC<FullscreenButtonProps> = ({
  slidesLength,
  "aria-label": ariaLabel,
  title,
  ...props
}) => {
  const { isFullscreen, toggleFullscreen } = useSlides({
    length: slidesLength,
  })
  const fullscreenActive = isFullscreen()
  const defaultLabel = fullscreenActive ? "Exit fullscreen" : "Enter fullscreen"

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={toggleFullscreen}
      aria-label={ariaLabel ?? defaultLabel}
      title={title ?? defaultLabel}
      {...props}
    >
      {fullscreenActive ? (
        <Minimize2Icon className="size-6" />
      ) : (
        <Maximize2Icon className="size-6" />
      )}
    </Button>
  )
}
