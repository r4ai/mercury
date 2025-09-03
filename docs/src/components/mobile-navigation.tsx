"use client"

import { GithubIcon, MenuIcon, XIcon } from "lucide-react"
import { Link } from "waku"
import { links } from "@/components/navigation"
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

export const MobileNavigation = () => {
  return (
    <>
      {/* Mobile Header */}
      <header className="sm:hidden flex items-center justify-between p-4 sticky top-0 z-40 bg-background border-b">
        <Link
          to={links.home.link}
          className="font-bold text-lg font-geist ml-2"
        >
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
    </>
  )
}
