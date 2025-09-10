"use client"

import { type ComponentProps, useEffect } from "react"
import { Fragment } from "react/jsx-runtime"
import type { TocEntry } from "remark-mdx-toc"
import { Link, useRouter } from "waku"
import { Toc } from "@/components/toc"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { StaticPath } from "@/content"

type LinkProps = ComponentProps<typeof Link>

const formatTitle = (slug: string) =>
  slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")

const buildLink = (slugs: StaticPath, index: number) =>
  `/docs/${slugs.slice(0, index + 1).join("/")}` as LinkProps["to"]

export const DocsHeader = ({
  toc,
  showBreadcrumb = true,
  slugs,
  redirected,
}: {
  toc?: TocEntry[] | undefined
  showBreadcrumb?: boolean
  slugs: StaticPath
  redirected: boolean
}) => {
  const router = useRouter()

  const titles = slugs.map((part, index) => ({
    part,
    link: buildLink(slugs, index),
    title: formatTitle(part),
  }))

  useEffect(() => {
    if (redirected) {
      const url = (buildLink(slugs, slugs.length - 1) +
        window.location.hash) as LinkProps["to"]
      router.replace(url)
    }
  }, [redirected, slugs, router])

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-40 bg-background/65 backdrop-blur-lg">
      <SidebarTrigger className="-ml-1" />
      {showBreadcrumb && (
        <>
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {titles.map(({ title, link }, index) => (
                <Fragment key={link}>
                  <BreadcrumbItem>
                    {index === titles.length - 1 ? (
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink className="hidden md:block" asChild>
                        <Link to={link}>{title}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < titles.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </>
      )}
      <div className="ml-auto">
        {toc && (
          <Drawer direction="right">
            <DrawerTrigger className="@4xl:hidden" asChild>
              <Button variant="ghost">On this page</Button>
            </DrawerTrigger>
            <DrawerContent className="bg-sidebar border-sidebar-border">
              <div className="mx-5 my-8">
                <Toc toc={toc} mobile />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  )
}
