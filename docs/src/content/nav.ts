import type { NavGroup } from "@/pages/docs/_components/docs-sidebar"

export const nav = [
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
  {
    title: "Packages",
    items: [
      {
        title: "@r4ai/vite-plugin-mercury",
        url: "/docs/packages/vite-plugin-mercury",
      },
      {
        title: "@r4ai/mercury-ui",
        url: "/docs/packages/mercury-ui",
      },
      {
        title: "@r4ai/remark-mercury",
        url: "/docs/packages/remark-mercury",
      },
    ],
  },
] as const satisfies NavGroup[]
