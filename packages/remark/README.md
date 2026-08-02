# @mercurymd/remark

A [remark](https://github.com/remarkjs/remark) plugin that transforms Markdown into a hierarchical slide structure for [Mercury](https://github.com/r4ai/mercury) presentations.

## Installation

```sh
bun add @mercurymd/remark
```

## Usage

```ts
import remarkMercury from "@mercurymd/remark"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { unified } from "unified"

const processor = unified()
  .use(remarkParse)
  .use(remarkMercury)
  .use(remarkRehype)
  .use(rehypeStringify)

const html = await processor.process(markdown)
```

## Options

```ts
type Options = {
  /**
   * Strategy for splitting the markdown into slides.
   * - `"thematicBreak"` (default): Split on horizontal rules (`---`)
   * - `"heading"`: Split on H1 headings (`#`)
   */
  slideSplitter?: "thematicBreak" | "heading"

  /** Customize the HTML element wrapping each slide. */
  slide?: (index: number) => { tagName: string; properties: object }

  /** Customize the HTML element wrapping the entire presentation. */
  presentation?: (slidesLength: number) => { tagName: string; properties: object }
}
```

## Development

| Command          | Description          |
| ---------------- | -------------------- |
| `bun run build`  | Build the plugin     |
| `bun run test`   | Run tests            |
| `bun run check`  | Lint and format      |
