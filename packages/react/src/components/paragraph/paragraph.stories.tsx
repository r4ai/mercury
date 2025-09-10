import type { Meta, StoryObj } from "@storybook/react-vite"

import { Paragraph } from "./paragraph"

const meta = {
  title: "UI/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Paragraph>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children:
      "This is a paragraph component demonstrating default typography styles.",
  },
}
