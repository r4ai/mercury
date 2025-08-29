import type { Decorator } from "@storybook/react-vite"
import { useState } from "react"
import { Router } from "wouter"

export type VirtualRoutingOptions = {
  initialPath?: string
  basePath?: string
}

/**
 * Virtual routing decorator for Storybook that provides Wouter routing context
 * without depending on the actual browser URL.
 * Uses a custom location hook to provide virtual routing functionality.
 */
export const withVirtualRouting = (
  options: VirtualRoutingOptions = {},
): Decorator => {
  return (Story, context) => {
    const { initialPath = "/", basePath = "" } = {
      ...options,
      ...context.parameters?.virtualRouting,
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPath, setCurrentPath] = useState(initialPath)

    const virtualLocationHook = (): [string, (path: string) => void] => [
      basePath + currentPath,
      (newPath: string) => {
        const pathWithoutBase = newPath.startsWith(basePath)
          ? newPath.slice(basePath.length)
          : newPath
        setCurrentPath(pathWithoutBase)
      },
    ]

    return (
      <Router hook={virtualLocationHook}>
        <Story />
      </Router>
    )
  }
}
