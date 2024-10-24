import "./shiki.css"

import {
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
  forwardRef,
} from "react"
import FileIcon from "~icons/lucide/file"
import { cn } from "../../libs/utils"

export type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  title?: string
  lang: string
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ title, lang, className, ...props }, ref) => {
    return (
      <div className="w-fit rounded-xl border bg-muted bg-zinc-50 dark:bg-zinc-900/75">
        {title && <CodeBlockTitle lang={lang}>{title}</CodeBlockTitle>}
        <pre
          className={cn("m-0 overflow-auto py-4 text-[0.9rem]", className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
CodeBlock.displayName = "CodeBlock"

type CodeBlockTitleProps = {
  lang: string
  children?: ReactNode
}

const CodeBlockTitle: FC<CodeBlockTitleProps> = (props) => {
  return <CodeBlockFileTitle {...props} />
}

const CodeBlockFileTitle: FC<CodeBlockTitleProps> = ({ children }) => {
  return (
    <div className="flex flex-row items-center gap-3 border-b px-4 py-2.5 font-mono">
      <FileIcon className="size-4 brightness-90 contrast-75 filter" />
      <span className="text-[0.9rem]">{children}</span>
    </div>
  )
}
