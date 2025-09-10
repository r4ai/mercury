import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { cn } from "../../libs/utils"

export type InlineCodeProps = ComponentPropsWithoutRef<"code">

export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        className={cn(
          "rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
InlineCode.displayName = "InlineCode"
