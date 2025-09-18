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
import {
  docsRoutes,
  getRouteDescription,
  getRouteTitle,
} from "@/lib/docs/routes"

const installationRoute = docsRoutes["getting-started/installation"]
const reactPackageRoute = docsRoutes["packages/react"]
const remarkPackageRoute = docsRoutes["packages/remark"]
const vitePluginRoute = docsRoutes["packages/vite-plugin"]

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
      title: getRouteTitle(installationRoute),
      description: getRouteDescription(installationRoute),
      link: installationRoute.url,
    },
  ],
  packages: [
    {
      title: getRouteTitle(reactPackageRoute),
      description: getRouteDescription(reactPackageRoute),
      link: reactPackageRoute.url,
    },
    {
      title: getRouteTitle(remarkPackageRoute),
      description: getRouteDescription(remarkPackageRoute),
      link: remarkPackageRoute.url,
    },
    {
      title: getRouteTitle(vitePluginRoute),
      description: getRouteDescription(vitePluginRoute),
      link: vitePluginRoute.url,
    },
  ],
} as const satisfies Links

export const Links = ({ links }: { links: ListNode[] }) => (
  <ul className="grid w-[400px] gap-2">
    {links.map((link) => (
      <li key={link.link}>
        <NavigationMenuLink asChild>
          <Link to={link.link}>
            <div className="font-medium text-sm leading-none">{link.title}</div>
            <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
              {link.description}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    ))}
  </ul>
)

export const DesktopNavigation = () => (
  <header className="sticky top-4 z-40 mx-auto hidden rounded-full border bg-background p-1 sm:block">
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
  <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background p-4 sm:hidden">
    <Link to={links.home.link} className="ml-2 font-bold font-geist text-lg">
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
        <DrawerContent className="fixed top-0 right-0 h-full w-80">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <XIcon className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex h-full flex-col">
            <nav className="flex-1 space-y-6 p-4">
              <div>
                <DrawerClose asChild>
                  <Link
                    to={links.home.link}
                    className="block py-3 font-medium text-lg transition-colors hover:text-primary"
                  >
                    Home
                  </Link>
                </DrawerClose>
              </div>

              <div>
                <h3 className="mb-3 px-2 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  DOCS
                </h3>
                <div className="space-y-1">
                  {links.docs.map((link) => (
                    <DrawerClose key={link.link} asChild>
                      <Link
                        to={link.link}
                        className="block rounded-md py-3 pr-2 pl-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="mb-1 font-medium text-base">
                          {link.title}
                        </div>
                        <p className="text-muted-foreground text-sm leading-snug">
                          {link.description}
                        </p>
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 px-2 font-bold text-muted-foreground text-xs uppercase tracking-wider">
                  PACKAGES
                </h3>
                <div className="space-y-1">
                  {links.packages.map((link) => (
                    <DrawerClose key={link.link} asChild>
                      <Link
                        to={link.link}
                        className="block rounded-md py-3 pr-2 pl-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="mb-1 font-medium text-base">
                          {link.title}
                        </div>
                        <p className="text-muted-foreground text-sm leading-snug">
                          {link.description}
                        </p>
                      </Link>
                    </DrawerClose>
                  ))}
                </div>
              </div>
            </nav>

            <div className="border-t p-4">
              <DrawerClose asChild>
                <a
                  href="https://github.com/r4ai/mercury"
                  className="flex items-center justify-end gap-2 py-2 font-medium text-lg"
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
