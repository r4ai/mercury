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

export const TailwindStyling: Story = {
  args: {
    className: "text-blue-600",
  },
  render: (args) => (
    <div className="rounded-lg bg-blue-50 p-4">
      <QRCode {...args} />
    </div>
  ),
}

export const Large: Story = {
  args: {
    size: 240,
  },
}
