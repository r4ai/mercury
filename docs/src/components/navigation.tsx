import type { Link } from "waku"

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
