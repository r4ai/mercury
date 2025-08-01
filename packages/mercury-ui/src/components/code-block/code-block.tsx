import "./shiki.css"

import {
  type ComponentPropsWithoutRef,
  type FC,
  forwardRef,
  type ReactNode,
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
      <div className="my-2 w-fit rounded-xl border bg-muted dark:bg-zinc-900/75">
        {title && <CodeBlockTitle lang={lang}>{title}</CodeBlockTitle>}
        <pre
          className={cn("m-0 overflow-auto py-2 text-xs", className)}
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
      <span className="text-[0.8rem]">{children}</span>
    </div>
  )
}
