import type { Meta, StoryObj } from "@storybook/react-vite"

import { Heading } from "./heading"

const meta = {
  title: "UI/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Heading>
export default meta

type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: {
    level: "h1",
    children: "Heading 1",
  },
}

export const Heading2: Story = {
  args: {
    level: "h2",
    children: "Heading 2",
  },
}

export const Heading3: Story = {
  args: {
    level: "h3",
    children: "Heading 3",
  },
}

export const Heading4: Story = {
  args: {
    level: "h4",
    children: "Heading 4",
  },
}
