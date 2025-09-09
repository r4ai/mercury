import type { MDXComponents } from "mdx/types"
import { Blockquote } from "@/components/typography/blockquote"
import { CodeBlock } from "@/components/typography/code-block"
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "@/components/typography/heading"
import { InlineCode } from "@/components/typography/inline-code"
import {
  ListItem,
  OrderedList,
  UnorderedList,
} from "@/components/typography/list"
import { Paragraph } from "@/components/typography/paragraph"
import { Section } from "@/components/typography/section"

export const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  blockquote: Blockquote,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  "inline-code": InlineCode,
  pre: CodeBlock,
  section: Section,
} as const satisfies MDXComponents
