import type { FC } from "react"
import ChevronRightIcon from "~icons/lucide/chevron-right"
import { Button, type ButtonProps } from "../button"
import { useSlides } from "./hooks/use-slides"

export type NextSlideButtonProps = ButtonProps & {
  slidesLength: number
}

export const NextSlideButton: FC<NextSlideButtonProps> = ({
  slidesLength,
  "aria-label": ariaLabel = "Next slide",
  title = "Next slide",
  ...props
}) => {
  const { next } = useSlides({ length: slidesLength })

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={next}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      <ChevronRightIcon className="size-6" />
    </Button>
  )
}
