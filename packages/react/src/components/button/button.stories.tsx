import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Click me",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Click me",
  },
}

export const Destroy: Story = {
  args: {
    variant: "destructive",
    children: "Click me",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Click me",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Click me",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Click me",
  },
}

export const Icon: Story = {
  args: {
    size: "icon",
    children: "🚀",
  },
}
