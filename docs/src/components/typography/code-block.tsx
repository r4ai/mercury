import { FileIcon } from "lucide-react"
import {
  type ComponentPropsWithoutRef,
  type FC,
  forwardRef,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

export type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  title?: string
  lang: string
  containerClassName?: string
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ title, lang, containerClassName, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex max-h-full min-h-0 flex-col overflow-hidden rounded-lg border bg-muted dark:bg-zinc-900/75",
          containerClassName,
        )}
      >
        {title && <CodeBlockTitle lang={lang}>{title}</CodeBlockTitle>}
        <pre
          className={cn(
            "min-h-0 flex-1 overflow-auto text-sm py-3.5",
            title && "pt-3",
            className,
          )}
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
    <div className="flex flex-row items-center gap-2 border-b px-4 font-mono text-muted-foreground py-3">
      <FileIcon className="size-4 brightness-90 contrast-75 filter" />
      <span className="text-sm">{children}</span>
    </div>
  )
}
