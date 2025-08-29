import type { Meta, StoryObj } from "@storybook/react-vite"
import { Router } from "wouter"

import { ControlMenu } from "./control-menu"

const meta = {
  title: "UI/ControlMenu",
  component: ControlMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ControlMenu>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slidesLength: 5,
  },
  decorators: [
    (Story) => (
      <Router hook={() => ["/0", () => {}]}>
        <Story />
      </Router>
    ),
  ],
}
