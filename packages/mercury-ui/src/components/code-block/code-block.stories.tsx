import type { Meta, StoryObj } from "@storybook/react-vite"
import { createMDXContent, highlight } from "../../storybook/mdx-helpers"
import { withPresentations } from "../../storybook/presentations-decorator"
import { Presentation } from "../presentation/presentation"
import { CodeBlock } from "./code-block"

const meta = {
  title: "UI/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CodeBlock>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "example.ts",
    lang: "ts",
    children: await highlight(
      "const answer: number = 42\nconsole.log(answer)",
      "typescript",
    ),
  },
}

export const WithoutTitle: Story = {
  args: {
    lang: "tsx",
    children: await highlight(
      "export const Hello = () => <span>Hello</span>",
      "tsx",
    ),
  },
}

export const LongContent: Story = {
  args: {
    title: "long-lines.js",
    lang: "js",
    children: await highlight(
      "const longLine = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';\n" +
        "function repeat(n){ return Array.from({length:n}).fill(longLine).join(' ')}\n" +
        "console.log(repeat(3))",
      "javascript",
    ),
  },
}

const createCodeBlockInPresentationContent = async () => {
  const shortCodeHighlighted = await highlight(
    "const greeting = 'Hello, World!'\nconsole.log(greeting)",
    "typescript",
  )
  const longCodeHighlighted = await highlight(
    `// This is a very long code example to test scrolling functionality
const longFunction = (param1: string, param2: number, param3: boolean) => {
  console.log("This is a very long line that should demonstrate horizontal scrolling behavior")

  const result = Array.from({ length: 50 }).map((_, index) => {
    return {
      id: index,
      name: \`Item \${index}\`,
      description: "A very long description that goes on and on and explains many details",
      active: index % 2 === 0,
      metadata: {
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
        permissions: {
          read: true,
          write: index % 3 === 0,
          delete: index % 5 === 0,
        }
      }
    }
  })

  // Process the results with complex logic
  return result.filter(item => item.active)
               .map(item => ({
                 ...item,
                 processed: true,
                 score: Math.random() * 100
               }))
               .sort((a, b) => b.score - a.score)
               .slice(0, 10)
}

// More code to make it longer
const anotherLongFunction = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => num * 2)
  return data.reduce((acc, curr) => acc + curr, 0)
}

// Even more code
class ExampleClass {
  private _value: number = 0

  constructor(initialValue: number) {
    this._value = initialValue
  }

  get value(): number {
    return this._value
  }

  set value(newValue: number) {
    if (newValue < 0) {
      throw new Error("Value cannot be negative")
    }
    this._value = newValue
  }

  multiply(factor: number): this {
    this._value *= factor
    return this
  }

  add(amount: number): this {
    this._value += amount
    return this
  }
}

export { longFunction, anotherLongFunction, ExampleClass }`,
    "typescript",
  )
  const utilsCodeHighlighted = await highlight(
    "// A simple utility function\nconst add = (a: number, b: number) => a + b\n\nexport default add",
    "typescript",
  )

  const slides = [
    {
      title: "Short Code Example",
      highlightedCode: shortCodeHighlighted,
      code: { title: "greeting.ts", lang: "typescript" as const },
    },
    {
      title: "Long Code Example",
      highlightedCode: longCodeHighlighted,
      code: { title: "complex-example.ts", lang: "typescript" as const },
    },
    {
      title: "Mixed Content",
      content: <p>This slide has both text content and code.</p>,
      highlightedCode: utilsCodeHighlighted,
      code: { title: "utils.ts", lang: "typescript" as const },
    },
  ]

  return createMDXContent((components) => {
    const Slide = components?.Slide
    const H1 = components?.h1
    const CodeBlock = components?.pre

    return slides.map((slide, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: this index is unique
      <Slide key={index} index={index}>
        <H1>{slide.title}</H1>
        {slide.content && slide.content}
        {slide.code && slide.highlightedCode && CodeBlock && (
          <CodeBlock title={slide.code.title} lang={slide.code.lang}>
            {slide.highlightedCode}
          </CodeBlock>
        )}
      </Slide>
    ))
  })
}

const CodeBlockInPresentationContent =
  await createCodeBlockInPresentationContent()

export const InPresentation: Story = {
  args: { lang: "tsx" },
  parameters: {
    layout: "fullscreen",
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  render: () => {
    return (
      <Presentation
        slidesLength={3}
        Content={CodeBlockInPresentationContent}
        base="/"
      />
    )
  },
  decorators: [
    ...withPresentations({
      routing: { initialPath: "/0", basePath: "" },
    }),
  ],
}
