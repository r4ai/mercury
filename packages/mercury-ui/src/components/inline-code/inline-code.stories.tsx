import type { Meta, StoryObj } from "@storybook/react-vite"

import { InlineCode } from "./inline-code"

const meta = {
  title: "UI/InlineCode",
  component: InlineCode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InlineCode>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "const answer = 42",
  },
}
