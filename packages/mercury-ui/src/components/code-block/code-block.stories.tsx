import type { Meta, StoryObj } from "@storybook/react-vite"

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

import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"
import { type BundledLanguage, codeToHast } from "shiki/bundle/web"

const highlight = async (code: string, lang: BundledLanguage) => {
  const out = await codeToHast(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  })

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element
}

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
