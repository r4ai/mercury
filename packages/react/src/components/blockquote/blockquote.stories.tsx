import type { Meta, StoryObj } from "@storybook/react-vite"

import { Blockquote } from "./blockquote"

const meta = {
  title: "UI/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Blockquote>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Done is better than perfect.",
  },
}
