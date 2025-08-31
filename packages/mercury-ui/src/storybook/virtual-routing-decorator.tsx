import type { Decorator } from "@storybook/react-vite"
import type { FC, ReactNode } from "react"
import { useCallback, useState } from "react"
import { Router } from "wouter"

export type VirtualRoutingOptions = {
  initialPath?: string
  basePath?: string
}

type VirtualRoutingWrapperProps = {
  children: ReactNode
  initialPath: string
  basePath: string
}

/**
 * Router wrapper component that provides virtual routing functionality.
 * Extracted as a separate component to prevent React remounting issues.
 */
const VirtualRoutingWrapper: FC<VirtualRoutingWrapperProps> = ({
  children,
  initialPath,
  basePath,
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath)

  const virtualLocationHook = useCallback(
    (): [string, (path: string) => void] => [
      basePath + currentPath,
      (newPath: string) => {
        const pathWithoutBase = newPath.startsWith(basePath)
          ? newPath.slice(basePath.length)
          : newPath
        setCurrentPath(pathWithoutBase)
      },
    ],
    [basePath, currentPath],
  )

  return <Router hook={virtualLocationHook}>{children}</Router>
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

    return (
      <VirtualRoutingWrapper initialPath={initialPath} basePath={basePath}>
        <Story />
      </VirtualRoutingWrapper>
    )
  }
}
