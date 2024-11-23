import { type ComponentPropsWithRef, forwardRef } from "react"
import { cn } from "../../libs/utils"

export type BlockquoteProps = ComponentPropsWithRef<"blockquote">

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        className={cn(
          "mx-auto max-w-screen-md space-y-4 border-zinc-300 border-l-[3px] pl-4 text-muted-foreground dark:border-zinc-700",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Blockquote.displayName = "Blockquote"
