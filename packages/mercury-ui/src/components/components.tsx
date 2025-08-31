import type { MDXComponents } from "mdx/types"
import { Blockquote } from "./blockquote"
import { CodeBlock } from "./code-block"
import { Heading1, Heading2, Heading3, Heading4 } from "./heading"
import { InlineCode } from "./inline-code"
import { Keyboard } from "./keyboard"
import { Link } from "./link"
import { List, ListItem, OrderedList } from "./list"
import { Paragraph } from "./paragraph"
import { Slide } from "./slide"

// todo: Provide proper types for components instead of MDXComponents
export const components: MDXComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  blockquote: Blockquote,
  // @ts-expect-error
  a: Link,
  ul: List,
  ol: OrderedList,
  li: ListItem,
  p: Paragraph,
  "inline-code": InlineCode,
  // @ts-expect-error
  pre: CodeBlock,
  kbd: Keyboard,
  Slide,
  Presentation: ({ children }) => children,
}
