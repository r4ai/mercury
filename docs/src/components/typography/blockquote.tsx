import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const Blockquote = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) => (
  <blockquote className={cn("border-l-2 pl-6", className)} {...props}>
    {children}
  </blockquote>
)
