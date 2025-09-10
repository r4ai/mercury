import type { Meta, StoryObj } from "@storybook/react-vite"
import { withVirtualRouting } from "../../storybook/virtual-routing-decorator"
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
  decorators: [withVirtualRouting({ initialPath: "/0" })],
}

export const WithDifferentStartIndex: Story = {
  args: {
    slidesLength: 10,
  },
  decorators: [withVirtualRouting({ initialPath: "/3" })],
}

export const WithRouteParameters: Story = {
  args: {
    slidesLength: 7,
  },
  parameters: {
    virtualRouting: {
      initialPath: "/2",
    },
  },
  decorators: [withVirtualRouting()],
}
