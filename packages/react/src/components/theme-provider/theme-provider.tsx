import {
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps,
} from "next-themes"
import type { FC } from "react"

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  attribute,
  ...props
}) => (
  <NextThemeProvider attribute={attribute ?? "data-color-scheme"} {...props}>
    {children}
  </NextThemeProvider>
)
