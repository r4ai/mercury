import type { ComponentProps } from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const heading = tv({
  base: "scroll-m-20 tracking-tight w-full",
  variants: {
    level: {
      h1: "border-b pb-2 text-4xl font-extrabold",
      h2: "text-3xl font-semibold group-data-[heading-level]:mt-10",
      h3: "text-2xl font-semibold group-data-[heading-level]:mt-8",
      h4: "text-xl font-semibold group-data-[heading-level]:mt-8",
    },
  },
})

export type HeadingLevel = NonNullable<VariantProps<typeof heading>["level"]>

export type HeadingProps<Level extends HeadingLevel> = ComponentProps<Level> & {
  level: Level
}

export const Heading = <Level extends HeadingLevel>({
  className,
  level,
  ...props
}: HeadingProps<Level>) => {
  const Comp = level as string

  return <Comp className={heading({ level, className })} {...props} />
}

export const Heading1 = (props: Omit<HeadingProps<"h1">, "level">) => (
  <Heading level="h1" {...props} />
)
export const Heading2 = (props: Omit<HeadingProps<"h2">, "level">) => (
  <Heading level="h2" {...props} />
)
export const Heading3 = (props: Omit<HeadingProps<"h3">, "level">) => (
  <Heading level="h3" {...props} />
)
export const Heading4 = (props: Omit<HeadingProps<"h4">, "level">) => (
  <Heading level="h4" {...props} />
)
