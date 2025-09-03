import type { Meta, StoryObj } from "@storybook/react-vite"
import type { MDXContent } from "mdx/types"
import { withPresentations } from "../../storybook/presentations-decorator"
import type { Components } from "../components"
import { Presentation } from "./presentation"

// Mock MDX content for story demonstration
const MockContent: MDXContent = ({ components: _components }) => {
  const components = _components as Components
  const Slide = components?.Slide
  const PresentationWrapper = components?.Presentation
  const H1 = components?.h1 ?? "h1"
  const P = components?.p ?? "p"

  return (
    <PresentationWrapper>
      <Slide index={0}>
        <H1>Welcome to Mercury</H1>
        <P>This is the first slide of our presentation.</P>
      </Slide>
      <Slide index={1}>
        <H1>Features</H1>
        <P>Mercury provides a powerful presentation framework.</P>
      </Slide>
      <Slide index={2}>
        <H1>Thank You</H1>
        <P>Questions?</P>
      </Slide>
    </PresentationWrapper>
  )
}

const meta = {
  title: "UI/Presentation",
  component: Presentation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Presentation>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slidesLength: 3,
    Content: MockContent,
    base: "/",
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  decorators: [
    ...withPresentations({
      routing: { initialPath: "/0", basePath: "" },
    }),
  ],
}

export const WithCustomBase: Story = {
  args: {
    slidesLength: 3,
    Content: MockContent,
    base: "/presentation",
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  decorators: [
    ...withPresentations({
      routing: { initialPath: "/presentation/0", basePath: "" },
    }),
  ],
}

export const StartingFromMiddle: Story = {
  args: {
    slidesLength: 3,
    Content: MockContent,
    base: "/",
  },
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  decorators: [
    ...withPresentations({
      routing: { initialPath: "/1", basePath: "" },
    }),
  ],
}

export const AllSlidesView: Story = {
  args: {
    slidesLength: 3,
    Content: MockContent,
    base: "/",
  },
  decorators: [
    ...withPresentations({
      routing: { initialPath: "/all", basePath: "" },
    }),
  ],
}
