"use client"

import { GithubIcon, MenuIcon, XIcon } from "lucide-react"
import { Link } from "waku"
import { ToggleColorSchemeButton } from "@/components/toggle-color-scheme-button"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export type ListNode = {
  title: string
  description: string
  link: Parameters<typeof Link>[0]["to"]
}

export type Links = {
  home: ListNode
  docs: ListNode[]
  packages: ListNode[]
}

export const links = {
  home: {
    title: "Home",
    description: "Return to the homepage.",
    link: "/",
  },
  docs: [
    {
      title: "Installation",
      description: "Getting started with Mercury.",
      link: "/docs/getting-started/installation",
    },
  ],
  packages: [
    {
      title: "@r4ai/mercury-ui",
      description: "React components used to build presentation.",
      link: "/docs/packages/mercury-ui",
    },
    {
      title: "@r4ai/remark-mercury",
      description: "Remark plugin for Mercury.",
      link: "/docs/packages/remark-mercury",
    },
    {
      title: "@r4ai/vite-plugin-mercury",
      description: "Vite plugin for Mercury.",
      link: "/docs/packages/vite-plugin-mercury",
    },
  ],
} as const satisfies Links

export const Links = ({ links }: { links: ListNode[] }) => (
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

export const DesktopNavigation = () => (
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
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
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
)

export const MobileNavigation = () => (
  <header className="sm:hidden flex items-center justify-between p-4 sticky top-0 z-40 bg-background border-b">
    <Link to={links.home.link} className="font-bold text-lg font-geist ml-2">
      Mercury
    </Link>
    <div className="flex items-center gap-2">
      <ToggleColorSchemeButton />
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-80 fixed right-0 top-0">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <XIcon className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex flex-col h-full">
            <nav className="flex-1 p-4 space-y-6">
              <div>
                <DrawerClose asChild>
                  <Link
                    to={links.home.link}
                    className="block py-3 text-lg font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </DrawerClose>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
                  DOCS
                </h3>
                <div className="space-y-1">
                  {links.docs.map((link) => (
                    <DrawerClose key={link.link} asChild>
                      <Link
                        to={link.link}
                        className="block py-3 pl-4 pr-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="font-medium text-base mb-1">
                          {link.title}
                        </div>
                        <p className="text-sm text-muted-foreground leading-snug">
                          {link.description}
                        </p>
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
                  PACKAGES
                </h3>
                <div className="space-y-1">
                  {links.packages.map((link) => (
                    <DrawerClose key={link.link} asChild>
                      <Link
                        to={link.link}
                        className="block py-3 pl-4 pr-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div className="font-medium text-base mb-1">
                          {link.title}
                        </div>
                        <p className="text-sm text-muted-foreground leading-snug">
                          {link.description}
                        </p>
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
              </div>
            </nav>

            <div className="p-4 border-t">
              <DrawerClose asChild>
                <a
                  href="https://github.com/r4ai/mercury"
                  className="flex items-center justify-end gap-2 py-2 text-lg font-medium"
                >
                  <GithubIcon className="h-5 w-5" />
                  GitHub
                </a>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </header>
)
