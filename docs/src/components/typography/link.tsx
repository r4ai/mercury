import type { ComponentPropsWithoutRef } from "react"
import { Link as WakuLink } from "waku"
import { cn } from "@/lib/utils"

export const Link = ({
  className,
  children,
  href,
  ...props
}: ComponentPropsWithoutRef<"a">) => (
  <WakuLink
    className={cn(
      "underline transition-colors hover:text-neutral-300",
      className,
    )}
    // @ts-expect-error
    to={href}
    {...props}
  >
    {children}
  </WakuLink>
)
