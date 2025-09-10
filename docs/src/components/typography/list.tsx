import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export const UnorderedList = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ul">) => (
  <ul className={cn("ml-6 list-disc space-y-6", className)} {...props}>
    {children}
  </ul>
)

export const OrderedList = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"ol">) => (
  <ol className={cn("ml-6 list-decimal space-y-6", className)} {...props}>
    {children}
  </ol>
)

export const ListItem = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"li">) => (
  <li className={cn("mt-2 space-y-4", className)} {...props}>
    {children}
  </li>
)
