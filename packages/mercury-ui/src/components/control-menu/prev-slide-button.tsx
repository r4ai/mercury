import type { FC } from "react"
import ChevronLeftIcon from "~icons/lucide/chevron-left"
import { Button, type ButtonProps } from "../button"
import { useSlides } from "./hooks/use-slides"

export type PrevSlideButtonProps = ButtonProps & {
  slidesLength: number
}

export const PrevSlideButton: FC<PrevSlideButtonProps> = ({
  slidesLength,
  ...props
}) => {
  const { prev } = useSlides({ length: slidesLength })

  return (
    <Button variant="ghost" size="icon" onClick={prev} {...props}>
      <ChevronLeftIcon className="size-6" />
    </Button>
  )
}
