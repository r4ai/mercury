"use client"

import { Minus, Plus, Search } from "lucide-react"
import type * as React from "react"
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
} from "@/components/ui/sidebar"

type LinkProps = ComponentProps<typeof Link>

type NavGroup = {
  title: string
  items?: NavItem[]
}

type NavItem = {
  title: string
  url: LinkProps["to"]
}

const data = {
  nav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Installation",
          url: "/docs/getting-started/installation",
        },
        {
          title: "Syntax Guide",
          url: "/docs/getting-started/syntax-guide",
        },
      ],
    },
    {
      title: "Features",
      items: [
        {
          title: "Code Block",
          url: "/docs/features/code-block",
        },
        {
          title: "Mathematics",
          url: "/docs/features/mathematics",
        },
      ],
    },
    {
      title: "Customization",
      items: [
        {
          title: "Custom Components",
          url: "/docs/customization/custom-components",
        },
        {
          title: "Extending Syntax",
          url: "/docs/customization/extending-syntax",
        },
      ],
    },
  ],
} as const satisfies { nav: NavGroup[] }

export const DocsSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { path } = useRouter()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={icon} alt="Mercury" className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-base font-medium">Mercury</span>
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
            {data.nav.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
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
                              <a href={item.url}>{item.title}</a>
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
      <SidebarRail />
    </Sidebar>
  )
}
