import type { ReactNode } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/pages/docs/_components/docs-sidebar"
import "@/styles/docs.css"
import { Footer } from "@/components/footer"

type DocsLayoutProps = { children: ReactNode }

const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <div>
      <SidebarProvider>
        <DocsSidebar />
        <SidebarInset>
          {children}
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DocsLayout

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
