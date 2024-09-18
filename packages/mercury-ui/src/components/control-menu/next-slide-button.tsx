import type { FC } from "react"
import ChevronRightIcon from "~icons/lucide/chevron-right"
import { Button, type ButtonProps } from "../button"
import { useSlides } from "./hooks/use-slides"

export type NextSlideButtonProps = ButtonProps & {
  slidesLength: number
}

export const NextSlideButton: FC<NextSlideButtonProps> = ({
  slidesLength,
  ...props
}) => {
  const { next } = useSlides({ length: slidesLength })

  return (
    <Button variant="ghost" size="icon" onClick={next} {...props}>
      <ChevronRightIcon className="size-6" />
    </Button>
  )
}
