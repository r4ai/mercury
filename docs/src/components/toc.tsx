"use client"

import { useEffect, useState } from "react"
import type { TocEntry } from "remark-mdx-toc"
import { Separator } from "@/components/ui/separator"
import { cn, slugifyHeading } from "@/lib/utils"

type TocProps = {
  toc: TocEntry[]
  className?: string
  title?: string
  mobile?: boolean
}

const getId = (item: TocEntry) =>
  item.attributes?.id ?? slugifyHeading(item.value)

const initIntersectionObserver = (setActiveId: (id: string | null) => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.reduce((acc, cur) =>
        cur.intersectionRatio > acc.intersectionRatio ? cur : acc,
      )
      if (entry.intersectionRatio <= 0) return

      const id = entry.target.getAttribute("data-heading-id")
      setActiveId(id)
    },
    { rootMargin: "-10% 0px -50% 0px" },
  )

  document.querySelectorAll("section[data-heading-id]").forEach((element) => {
    observer.observe(element)
  })

  return () => observer.disconnect()
}

const flatten = (items: TocEntry[]): { id: string; depth: number }[] =>
  items.flatMap((it) => [
    { id: getId(it), depth: it.depth },
    ...flatten(it.children),
  ])

export const Toc = ({
  toc,
  className,
  title = "On this page",
  mobile = false,
}: TocProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => initIntersectionObserver(setActiveId), [])

  return (
    <nav
      aria-label="Table of contents"
      className={cn(mobile ? "space-y-4" : "space-y-3", className)}
    >
      <div
        className={cn(
          "font-medium",
          mobile
            ? "text-lg text-foreground font-bold"
            : "text-[0.9rem] text-foreground/90",
        )}
      >
        {title}
      </div>
      <Separator />
      <div className="relative">
        <TocList items={toc} activeId={activeId} mobile={mobile} />
      </div>
    </nav>
  )
}

const TocList = ({
  items,
  activeId,
  mobile,
}: {
  items: TocEntry[]
  activeId: string | null
  mobile: boolean
}) => (
  <ul className={mobile ? "space-y-2" : "space-y-1"}>
    {items.map((item) => (
      <li key={getId(item)}>
        <TocLink
          item={item}
          active={activeId === getId(item)}
          mobile={mobile}
        />
        {item.children.length ? (
          <div
            className={cn(
              "ml-2 pl-3 border-l border-border/60",
              mobile ? "mt-2" : "mt-1",
            )}
          >
            <TocList
              items={item.children}
              activeId={activeId}
              mobile={mobile}
            />
          </div>
        ) : null}
      </li>
    ))}
  </ul>
)

const TocLink = ({
  item,
  active,
  mobile,
}: {
  item: TocEntry
  active: boolean
  mobile: boolean
}) => {
  const id = getId(item)
  return (
    <a
      href={`#${id}`}
      className={cn(
        "block truncate transition-colors text-sm",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        mobile && "font-medium",
      )}
      data-active={active}
    >
      {item.value}
    </a>
  )
}
