import type { Meta, StoryObj } from "@storybook/react-vite"

import { List, ListItem, OrderedList, type OrderedListProps } from "./list"

const meta = {
  title: "UI/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof List>
export default meta

type Story = StoryObj<typeof meta>

export const Unordered: Story = {
  args: {
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
}

export const Ordered: Story = {
  args: {
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
  render: (args: OrderedListProps) => <OrderedList {...args} />,
}
