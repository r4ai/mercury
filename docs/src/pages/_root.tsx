import type { ReactNode } from "react"

const Root = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head />
    <body>{children}</body>
  </html>
)

export default Root

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
