"use client"

import { evaluate } from "@mdx-js/mdx"
import * as provider from "@mdx-js/react"
import { MDXProvider } from "@mdx-js/react"
import MonacoEditor from "@monaco-editor/react"
import { components, Presentation } from "@r4ai/mercury-ui"
import style from "@r4ai/mercury-ui/style.css?raw"
import { createMdxPlugins } from "@r4ai/vite-plugin-mercury/plugins/mdx/unified"
import type { MDXComponents, MDXModule } from "mdx/types"
import { useTheme } from "next-themes"
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react"
import * as jsx from "react/jsx-runtime"
import type { PluggableList } from "unified"
import { Router } from "wouter"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { Skeleton } from "./ui/skeleton"

type PlaygroundContextType = {
  code: string
  setCode: (code: string) => void
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined,
)

const usePlayground = () => {
  const context = use(PlaygroundContext)
  if (!context) {
    throw new Error("usePlayground must be used within a PlaygroundProvider")
  }
  return context
}

export const PlaygroundProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState(`# Welcome to Mercury Playground!

Try editing this MDX content and see the presentation update in real-time.

Math:

$$
\\int_0^\\infty e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}
$$

Code Block:

\`\`\`javascript
const greeting = "Hello, Mercury!"
console.log(greeting)
\`\`\`

---

# What is Mercury?

Mercury is a tool for creating **beautiful presentations** from MDX files.

- 🎨 **Write in familiar MDX = Markdown + JSX**

- 🚀 **Powered by Vite**

  - Since Mercury is a Vite plugin, you can leverage the existing powerful Vite ecosystem.

- 🧩 **Extensible with custom components and plugins**

  - Mercury works by converting MDX to JSX and rendering it with React.

    This means you can freely customize the design and functionality by replacing the components used in JSX with your own (custom components).

  - Furthermore, by writing remark plugins, you can add your own custom syntax to MDX.

  - Currently, only React is supported, but we are considering adding support for SolidJS and Svelte in the future.

---

# Thank you!

Happy presenting! 🎉`)

  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
      <style type="text/tailwindcss">{style}</style>
      <PlaygroundContext.Provider value={{ code, setCode }}>
        {children}
      </PlaygroundContext.Provider>
    </>
  )
}

type MonacoEditorProps = ComponentProps<typeof MonacoEditor>

export const Editor = ({ className, height, ...props }: MonacoEditorProps) => {
  const hasMounted = useHasMounted()
  const { code, setCode } = usePlayground()
  const { resolvedTheme } = useTheme()

  if (!hasMounted) return <Skeleton style={{ height }} className={className} />

  return (
    <MonacoEditor
      value={code}
      onChange={(value) => value && setCode(value)}
      language="mdx"
      theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
      options={{
        minimap: { enabled: false },
      }}
      height={height ?? ""}
      className={className ?? ""}
      {...props}
    />
  )
}

export const Preview = ({ ...props }: ComponentProps<"div">) => {
  const hasMounted = useHasMounted()
  const { code } = usePlayground()
  const deferredCode = useDeferredValue(code)

  if (!hasMounted) return null

  return (
    <div {...props}>
      <RuntimeMDX mdx={deferredCode} />
    </div>
  )
}

const { remarkPlugins, rehypePlugins } = createMdxPlugins()

const RuntimeMDX = ({
  mdx,
}: {
  mdx: string
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
  loadingFallback?: React.ReactNode
}) => {
  const [mod, setMod] = useState<MDXModule | null>(null)

  const evaluating = useMemo(() => {
    const mod = evaluate(mdx, {
      ...jsx,
      ...provider,
      remarkPlugins,
      rehypePlugins,
    })
    return mod
  }, [mdx])
  useEffect(() => {
    const evaluate = async () => {
      const result = await evaluating
      setMod(result)
    }
    evaluate()
  }, [evaluating])

  const basePath = ""
  const [currentPath, setCurrentPath] = useState("/")

  const virtualLocationHook = useCallback(
    (): [string, (path: string) => void] => [
      basePath + currentPath,
      (newPath: string) => {
        const pathWithoutBase = newPath.startsWith(basePath)
          ? newPath.slice(basePath.length)
          : newPath
        setCurrentPath(pathWithoutBase)
      },
    ],
    [currentPath],
  )

  // MDX コンポーネントは `components` prop を受けます
  return (
    <Router hook={virtualLocationHook}>
      <MDXProvider>
        {mod && (
          <div className="size-full relative" data-presentation-root>
            <Presentation
              Content={mod.default}
              slidesLength={mod.MERCURY_SLIDES_LENGTH as number}
              showPrintButton={false}
              showFullscreenButton={false}
              components={components as MDXComponents}
            />
          </div>
        )}
      </MDXProvider>
    </Router>
  )
}
