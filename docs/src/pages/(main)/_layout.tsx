import { GithubIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "waku"
import { Footer } from "@/components/footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { type ListNode, links } from "@/components/navigation"
import { ToggleColorSchemeButton } from "@/components/toggle-color-scheme-button"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Header = () => (
  <>
    {/* Desktop Header */}
    <header className="hidden sm:block mx-auto top-4 sticky z-40 border rounded-full bg-background p-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="ml-1">
            <NavigationMenuLink className="rounded-full px-4" asChild>
              <Link to={links.home.link} className="font-bold">
                {links.home.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full">
              Docs
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Links links={links.docs} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full">
              Packages
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Links links={links.packages} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="ml-12">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="https://github.com/r4ai/mercury">
                <GithubIcon />
              </a>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-2">
            <ToggleColorSchemeButton />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>

    {/* Mobile Navigation */}
    <MobileNavigation />
  </>
)

const Links = ({ links }: { links: ListNode[] }) => (
  <ul className="grid w-[400px] gap-2">
    {links.map((link) => (
      <li key={link.link}>
        <NavigationMenuLink asChild>
          <Link to={link.link}>
            <div className="text-sm leading-none font-medium">{link.title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {link.description}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    ))}
  </ul>
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
