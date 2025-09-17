import type { Meta, StoryObj } from "@storybook/react-vite"

import { QRCode } from "./qrcode"

const meta = {
  title: "UI/QRCode",
  component: QRCode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    value: "https://mercury-md.dev",
  },
} satisfies Meta<typeof QRCode>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomColors: Story = {
  args: {
    color: "#2563eb",
    backgroundColor: "#eff6ff",
  },
}

export const WithoutMargin: Story = {
  args: {
    margin: 0,
  },
}

export const Large: Story = {
  args: {
    size: 240,
  },
}
