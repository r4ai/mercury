import type { FC, ReactNode } from "react"
import { Blockquote } from "./blockquote"
import { CodeBlock } from "./code-block"
import { Heading1, Heading2, Heading3, Heading4 } from "./heading"
import { InlineCode } from "./inline-code"
import { Keyboard } from "./keyboard"
import { Link } from "./link"
import { List, ListItem, OrderedList } from "./list"
import { Paragraph } from "./paragraph"
import { QRCode } from "./qrcode"
import { Slide } from "./slide"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table/table"
import { TwoColsLayout } from "./two-cols-layout"

export type Components = {
  h1: typeof Heading1
  h2: typeof Heading2
  h3: typeof Heading3
  h4: typeof Heading4
  blockquote: typeof Blockquote
  a: typeof Link
  ul: typeof List
  ol: typeof OrderedList
  li: typeof ListItem
  p: typeof Paragraph
  "inline-code": typeof InlineCode
  pre: typeof CodeBlock
  kbd: typeof Keyboard
  table: typeof Table
  thead: typeof TableHeader
  tbody: typeof TableBody
  tfoot: typeof TableFooter
  tr: typeof TableRow
  th: typeof TableHead
  td: typeof TableCell
  caption: typeof TableCaption
  QRCode: typeof QRCode
  Slide: typeof Slide
  Presentation: FC<{ children?: ReactNode }>
  TwoColsLayout: typeof TwoColsLayout
}

export const components: Components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  blockquote: Blockquote,
  a: Link,
  ul: List,
  ol: OrderedList,
  li: ListItem,
  p: Paragraph,
  "inline-code": InlineCode,
  pre: CodeBlock,
  kbd: Keyboard,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tfoot: TableFooter,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  caption: TableCaption,
  QRCode,
  Slide,
  Presentation: ({ children }) => children,
  TwoColsLayout,
}
