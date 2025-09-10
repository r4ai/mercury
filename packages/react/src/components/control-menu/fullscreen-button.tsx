import type { FC } from "react"
import Maximize2Icon from "~icons/lucide/maximize-2"
import Minimize2Icon from "~icons/lucide/minimize-2"
import { Button, type ButtonProps } from "../button"
import { useSlides } from "./hooks/use-slides"

export type FullscreenButtonProps = ButtonProps & { slidesLength: number }

export const FullscreenButton: FC<FullscreenButtonProps> = ({
  slidesLength,
  ...props
}) => {
  const { isFullscreen, toggleFullscreen } = useSlides({
    length: slidesLength,
  })

  return (
    <Button variant="ghost" size="icon" onClick={toggleFullscreen} {...props}>
      {isFullscreen() ? (
        <Minimize2Icon className="size-6" />
      ) : (
        <Maximize2Icon className="size-6" />
      )}
    </Button>
  )
}
