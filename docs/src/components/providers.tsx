"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"

export const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
)
