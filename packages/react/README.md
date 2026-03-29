# @mercurymd/react

React component library for building [Mercury](https://github.com/r4ai/mercury) presentation slides.

## Installation

```sh
bun add @mercurymd/react
```

Import the stylesheet in your entry file:

```ts
import "@mercurymd/react/style.css"
```

## Usage

```tsx
import { PresentationsProvider } from "@mercurymd/react"
import Presentation from "./Presentation.mdx"

export default function App() {
  return (
    <PresentationsProvider>
      <Presentation />
    </PresentationsProvider>
  )
}
```

## Components

| Component             | Description                              |
| --------------------- | ---------------------------------------- |
| `PresentationsProvider` | Context provider for slide navigation  |
| `Presentation`        | Slide deck container                     |
| `Slide`               | Individual slide wrapper                 |
| `Heading`             | Styled heading element                   |
| `Paragraph`           | Styled paragraph element                 |
| `Link`                | Styled anchor element                    |
| `List`                | Ordered / unordered list                 |
| `Blockquote`          | Styled blockquote element                |
| `Code`                | Syntax-highlighted fenced code block     |
| `InlineCode`          | Inline code element                      |
| `QRCode`              | QR code generator                        |
| `TwoColumn`           | Two-column slide layout                  |
| `ControlMenu`         | Slide navigation control menu            |

## Development

| Command               | Description                    |
| --------------------- | ------------------------------ |
| `bun run build`       | Build the library              |
| `bun run dev`         | Build in watch mode            |
| `bun run test`        | Run unit tests                 |
| `bun run storybook`   | Launch Storybook dev server    |
