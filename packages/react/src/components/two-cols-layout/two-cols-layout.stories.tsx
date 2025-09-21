import type { Meta, StoryObj } from "@storybook/react-vite"
import { createMDXContent } from "../../storybook/mdx-helpers"
import { withPresentations } from "../../storybook/presentations-decorator"
import { Heading3 } from "../heading"
import { List, ListItem } from "../list"
import { Paragraph } from "../paragraph"
import { Presentation } from "../presentation/presentation"
import { TwoColsLayout } from "./two-cols-layout"

const meta = {
  title: "UI/TwoColsLayout",
  component: TwoColsLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TwoColsLayout>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: [
      <Heading3 key="1">Left side</Heading3>,
      <List key="2">
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </List>,
      <hr key="3" />,
      <Heading3 key="4">Right side</Heading3>,
      <Paragraph key="5">This is some text on the right side.</Paragraph>,
      <Paragraph key="6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>,
    ],
  },
}

export const InPresentation: Story = {
  parameters: {
    layout: "fullscreen",
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  render: () => (
    <Presentation
      slidesLength={1}
      Content={createMDXContent((components) => (
        <components.Slide index={0}>
          <components.h1>Two Columns Layout</components.h1>
          <components.TwoColsLayout>
            <components.h3>Left Side</components.h3>
            <components.p>This is some text on the left side.</components.p>
            <components.p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </components.p>
            <hr />
            <components.h3>Right Side</components.h3>
            <components.p>This is some text on the right side.</components.p>
            <components.p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </components.p>
          </components.TwoColsLayout>
        </components.Slide>
      ))}
    />
  ),
  decorators: [...withPresentations({ routing: { initialPath: "/0" } })],
}
