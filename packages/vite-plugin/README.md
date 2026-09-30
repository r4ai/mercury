# @mercurymd/vite-plugin

Vite plugin for [Mercury](https://github.com/r4ai/mercury) that compiles MDX presentation files into interactive slide decks.

## Installation

```sh
bun add -D @mercurymd/vite-plugin
```

## Usage

```ts
// vite.config.ts
import mercury from "@mercurymd/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    mercury(),
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
})
```

Then import a `.mdx` file as a React component:

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

## Options

```ts
type MercuryOptions = {
  /** Options forwarded to the MDX plugin. */
  mdx?: MercuryMdxOptions

  /** Options forwarded to the presentation transform plugin. */
  presentation?: MercuryPresentationOptions
}
```

## Features

- MDX compilation with remark / rehype pipeline
- Syntax highlighting via [Shiki](https://shiki.style/)
- Math rendering via [KaTeX](https://katex.org/)
- GitHub Flavored Markdown (GFM) support
- Inline code transformations

## Development

| Command          | Description          |
| ---------------- | -------------------- |
| `bun run build`  | Build the plugin     |
| `bun run test`   | Run tests            |
| `bun run check`  | Lint and format      |
