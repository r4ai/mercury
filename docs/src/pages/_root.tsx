import type { ReactNode } from "react"

const Root = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head />
    <body>
      {/** biome-ignore lint/correctness/useUniqueElementIds: this component is unique */}
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
