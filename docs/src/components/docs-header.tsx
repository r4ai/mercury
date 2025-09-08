"use client"

import { useRouter } from "waku"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb"

const formatTitle = (part: string) =>
  part
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")

export const DocsHeader = () => {
  const { path } = useRouter()
  const parts = path
    .split("/")
    .filter(Boolean)
    .filter((part) => part !== "docs")
  const titles = parts.map(formatTitle)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {titles.length > 1 && (
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                {titles.slice(0, -1).join(" / ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
