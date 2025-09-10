import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const Article = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"article">) => (
  <article
    className={cn("mb-16 w-full max-w-3xl space-y-6 scroll-smooth", className)}
    {...props}
  >
    {children}
  </article>
)
