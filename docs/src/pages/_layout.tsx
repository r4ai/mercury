import "../styles/globals.css"

import type { ReactNode } from "react"
import { Providers } from "@/components/providers"

type RootLayoutProps = { children: ReactNode }

const RootLayout = ({ children }: RootLayoutProps) => {
  return <Providers>{children}</Providers>
}

export default RootLayout

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
