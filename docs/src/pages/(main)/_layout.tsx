import type { ReactNode } from "react"
import { Footer } from "@/components/footer"
import { DesktopNavigation, MobileNavigation } from "@/components/navigation"

const Header = () => (
  <>
    <DesktopNavigation />
    <MobileNavigation />
  </>
)

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-full flex-col">
    <Header />
    <main className="flex-1 flex flex-col">{children}</main>
    <Footer />
  </div>
)

export default MainLayout

export const getConfig = async () => {
  return {
    render: "static",
  } as const
}
