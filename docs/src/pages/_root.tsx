import type { ReactNode } from "react"

const Root = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head />
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
)

export default Root

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
