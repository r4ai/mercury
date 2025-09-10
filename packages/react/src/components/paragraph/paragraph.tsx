import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { cn } from "../../libs/utils"

export type ParagraphProps = ComponentPropsWithoutRef<"p">

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => {
    return <p className={cn("leading-7", className)} ref={ref} {...props} />
  },
)
Paragraph.displayName = "Paragraph"
