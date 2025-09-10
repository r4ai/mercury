import type { Meta, StoryObj } from "@storybook/react-vite"

import { Link } from "./link"

const meta = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Link>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "#",
    children: "Visit docs",
  },
}
