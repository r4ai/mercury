"use client"

import { ChevronRight, GithubIcon, Search } from "lucide-react"
import type { ComponentProps } from "react"
import { Link, useRouter } from "waku"
import icon from "@/assets/icon.png"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { nav } from "@/content/nav"
import { ToggleColorSchemeButton } from "./toggle-color-scheme-button"

type LinkProps = ComponentProps<typeof Link>

export type NavGroup = {
  title: string
  items?: NavItem[]
}

export type NavItem = {
  title: string
  url: LinkProps["to"]
}

const data = { nav }

export const DocsSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const { path } = useRouter()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={icon} alt="Mercury" className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-base">Mercury</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup className="py-0">
          <SidebarGroupContent className="relative">
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground hover:text-muted-foreground"
              onClick={() => alert("Search is not implemented yet.")} // TODO: Implement search
            >
              <Search className="mr-2" />
              <span>Search...</span>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.nav.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={
                  item.items?.some(({ url }) => url === path) ?? false
                }
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={path === item.url}
                            >
                              <Link to={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="my-2 flex flex-row justify-between">
        <SidebarMenu className="w-fit">
          <SidebarMenuItem>
            <Button size="sm" variant="ghost" asChild>
              <a
                href="https://github.com/r4ai/mercury"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                <span>GitHub</span>
              </a>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="w-fit">
          <SidebarMenuItem>
            <ToggleColorSchemeButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
