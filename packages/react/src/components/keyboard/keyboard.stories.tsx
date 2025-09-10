import type { Meta, StoryObj } from "@storybook/react-vite"

import { Keyboard } from "./keyboard"

const meta = {
  title: "UI/Keyboard",
  component: Keyboard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Keyboard>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "⌘K",
  },
}
