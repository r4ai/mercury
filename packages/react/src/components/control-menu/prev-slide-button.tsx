import type { FC } from "react"
import ChevronLeftIcon from "~icons/lucide/chevron-left"
import { Button, type ButtonProps } from "../button"
import { useSlides } from "./hooks/use-slides"

export type PrevSlideButtonProps = ButtonProps & {
  slidesLength: number
}

export const PrevSlideButton: FC<PrevSlideButtonProps> = ({
  slidesLength,
  "aria-label": ariaLabel = "Previous slide",
  title = "Previous slide",
  ...props
}) => {
  const { prev } = useSlides({ length: slidesLength })

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={prev}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      <ChevronLeftIcon className="size-6" />
    </Button>
  )
}
