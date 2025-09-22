import { useTheme } from "next-themes"
import type { FC } from "react"
import MoonStarIcon from "~icons/lucide/moon-star"
import SunIcon from "~icons/lucide/sun"
import { Button, type ButtonProps } from "../button"

export type ColorSchemeButtonProps = ButtonProps

export const ColorSchemeButton: FC<ColorSchemeButtonProps> = ({
  "aria-label": ariaLabel = "Toggle color scheme",
  title = "Toggle color scheme",
  ...props
}) => {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light")
      }}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      <SunIcon className="size-6 dark:hidden" />
      <MoonStarIcon className="hidden size-6 dark:block" />
    </Button>
  )
}
