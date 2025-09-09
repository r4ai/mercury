import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const Section = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) => (
  <section className={cn("space-y-6", className)} {...props}>
    {children}
  </section>
)
