import type { ReactNode } from "react"
import { Link } from "waku"
import { Footer } from "@/components/footer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const Header = () => (
  <header className="mx-auto py-4 sticky top-0 z-40">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
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
