import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const Paragraph = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) => (
  <p className={cn("leading-7", className)} {...props}>
    {children}
  </p>
)
