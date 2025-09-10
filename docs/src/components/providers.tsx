"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"

export const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider
    attribute="data-color-scheme"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    scriptProps={{
      // disable cloudflare's rocket loader
      // see: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#using-with-cloudflare-rocket-loader
      "data-cfasync": "false",
    }}
  >
    {children}
  </ThemeProvider>
)
