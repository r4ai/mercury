import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const Article = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"article">) => (
  <article
    className={cn("space-y-6 w-full max-w-3xl mb-16 scroll-smooth", className)}
    {...props}
  >
    {children}
  </article>
)
