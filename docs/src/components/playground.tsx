"use client"

import { evaluateSync } from "@mdx-js/mdx"
import * as provider from "@mdx-js/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import MonacoEditor from "@monaco-editor/react"
import { Presentation } from "@r4ai/mercury-ui"
import {} from "@r4ai/vite-plugin-mercury"
import type { MDXComponents } from "mdx/types"
import { useTheme } from "next-themes"
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  use,
  useDeferredValue,
  useMemo,
  useState,
} from "react"
import * as jsx from "react/jsx-runtime"
import type { PluggableList } from "unified"
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
  const [code, setCode] = useState("")

  return (
    <PlaygroundContext.Provider value={{ code, setCode }}>
      {children}
    </PlaygroundContext.Provider>
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

const EMPTY_REMARK_PLUGINS: PluggableList = []
const EMPTY_REHYPE_PLUGINS: PluggableList = []

const RuntimeMDX = ({
  mdx,
  components = {},
  remarkPlugins = EMPTY_REMARK_PLUGINS,
  rehypePlugins = EMPTY_REHYPE_PLUGINS,
}: {
  mdx: string
  components?: MDXComponents | ((c: MDXComponents) => MDXComponents)
  remarkPlugins?: PluggableList
  rehypePlugins?: PluggableList
  loadingFallback?: React.ReactNode
}) => {
  const allComponents = useMDXComponents(components)

  const mod = useMemo(() => {
    console.log("Evaluating MDX...:", {
      mdx,
      remarkPlugins,
      rehypePlugins,
    })
    const mod = evaluateSync(mdx, {
      ...jsx,
      ...provider,
      remarkPlugins,
      rehypePlugins,
    })
    console.log(mod)
    console.log("MDX evaluated successfully")
    return mod
  }, [mdx, remarkPlugins, rehypePlugins])

  // MDX コンポーネントは `components` prop を受けます
  return (
    <MDXProvider components={allComponents}>
      <Presentation
        Content={mod.default}
        slidesLength={mod.MERCURY_SLIDES_LENGTH as number}
        components={allComponents}
      />
    </MDXProvider>
  )
}
