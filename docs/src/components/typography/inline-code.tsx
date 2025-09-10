import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const InlineCode = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code">) => (
  <code
    className={cn(
      "rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      className,
    )}
    {...props}
  >
    {children}
  </code>
)
