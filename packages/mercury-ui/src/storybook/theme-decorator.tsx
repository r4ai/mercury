import type { Decorator } from "@storybook/react-vite"
import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider } from "../components/theme-provider"

export type ThemeOptions = ThemeProviderProps

export const withTheme = (options: ThemeOptions = {}): Decorator => {
  return (Story, context) => {
    const props = { ...options, ...context.parameters?.themeOptions }

    return (
      <ThemeProvider {...props}>
        <Story />
      </ThemeProvider>
    )
  }
}
