"use client"

import { GithubIcon, MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "waku"
import { links } from "@/components/navigation"
import { ToggleColorSchemeButton } from "@/components/toggle-color-scheme-button"
import { Button } from "@/components/ui/button"

export const MobileNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="sm:hidden flex items-center justify-between p-4 sticky top-0 z-40 bg-background border-b">
        <Link to={links.home.link} className="font-bold text-lg">
          Mercury
        </Link>
        <div className="flex items-center gap-2">
          <ToggleColorSchemeButton />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDrawerOpen(true)}
            className="rounded-full"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="sm:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsDrawerOpen(false)}
            onKeyUp={(e) => {
              if (e.key === "Escape") {
                setIsDrawerOpen(false)
              }
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close navigation drawer"
          />

          {/* Drawer */}
          <div className="sm:hidden fixed right-0 top-0 h-full w-80 bg-background border-l z-50 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-full"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            <nav className="space-y-4">
              <div>
                <Link
                  to={links.home.link}
                  className="block py-2 text-lg font-medium"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Home
                </Link>
              </div>

              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  DOCS
                </h3>
                <div className="space-y-1">
                  {links.docs.map((link) => (
                    <Link
                      key={link.link}
                      to={link.link}
                      className="block py-2 pl-4"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <div className="font-medium">{link.title}</div>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">
                  PACKAGES
                </h3>
                <div className="space-y-1">
                  {links.packages.map((link) => (
                    <Link
                      key={link.link}
                      to={link.link}
                      className="block py-2 pl-4"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <div className="font-medium">{link.title}</div>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <a
                  href="https://github.com/r4ai/mercury"
                  className="flex items-center gap-2 py-2 text-lg font-medium"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <GithubIcon className="h-5 w-5" />
                  GitHub
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
