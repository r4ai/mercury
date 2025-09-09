import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"

export const Heading1 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h1">) => (
  <h1
    className={cn(
      "scroll-m-20 mt-12 text-4xl font-extrabold tracking-tight text-balance",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
)

export const Heading2 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2">) => (
  <>
    <Separator className="my-8" />
    <h2
      className={cn(
        "scroll-m-20 mt-8 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  </>
)

export const Heading3 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h3">) => (
  <h3
    className={cn(
      "scroll-m-20 mt-12 text-xl font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
)

export const Heading4 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"h4">) => (
  <h4
    className={cn(
      "scroll-m-20 text-lg font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h4>
)
