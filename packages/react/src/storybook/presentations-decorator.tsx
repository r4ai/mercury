import type { Decorator } from "@storybook/react-vite"
import { type ThemeOptions, withTheme } from "./theme-decorator"
import {
  type VirtualRoutingOptions,
  withVirtualRouting,
} from "./virtual-routing-decorator"

export type PresentationsOptions = {
  routing?: VirtualRoutingOptions
  theme?: ThemeOptions
}

export const withPresentations = (
  options: PresentationsOptions = {},
): Decorator[] => [
  withVirtualRouting(options.routing),
  withTheme(options.theme),
]
