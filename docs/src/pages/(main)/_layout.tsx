import { GithubIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "waku"
import { Footer } from "@/components/footer"
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

type ListNode = {
  title: string
  description: string
  link: Parameters<typeof Link>[0]["to"]
}

type Links = {
  home: ListNode
  docs: ListNode[]
  packages: ListNode[]
}

const links = {
  home: {
    title: "Home",
    description: "Return to the homepage.",
    link: "/",
  },
  docs: [
    {
      title: "Documentation",
      description: "Learn how to use Mercury.",
      link: "/docs",
    },
  ],
  packages: [
    {
      title: "@r4ai/mercury-ui",
      description: "React components used to build presentation.",
      link: "/packages/mercury-ui",
    },
    {
      title: "@r4ai/remark-mercury",
      description: "Remark plugin for Mercury.",
      link: "/packages/remark-mercury",
    },
    {
      title: "@r4ai/vite-plugin-mercury",
      description: "Vite plugin for Mercury.",
      link: "/packages/vite-plugin-mercury",
    },
  ],
} as const satisfies Links

const Header = () => (
  <header className="mx-auto top-4 sticky z-40 border rounded-full bg-background p-1 max-w-[calc(100vw-2rem)] sm:max-w-none">
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap sm:flex-nowrap gap-1">
        <NavigationMenuItem className="ml-1">
          <NavigationMenuLink className="rounded-full px-3 sm:px-4" asChild>
            <Link
              to={links.home.link}
              className="font-bold text-sm sm:text-base"
            >
              {links.home.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full text-sm sm:text-base px-2 sm:px-3">
            Docs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <Links links={links.docs} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full text-sm sm:text-base px-2 sm:px-3">
            Packages
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <Links links={links.packages} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-2 sm:ml-12">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
            asChild
          >
            <a href="https://github.com/r4ai/mercury">
              <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem className="mr-2">
          <ToggleColorSchemeButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
)

const Links = ({ links }: { links: ListNode[] }) => (
  <ul className="grid w-[280px] sm:w-[400px] gap-2">
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
