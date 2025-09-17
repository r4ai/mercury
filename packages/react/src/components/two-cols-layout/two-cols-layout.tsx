import {
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactNode,
} from "react"
import { cn } from "../../libs/utils"

export type TwoColsLayoutProps = ComponentPropsWithoutRef<"div">

export const TwoColsLayout = ({
  className,
  children,
  ...props
}: TwoColsLayoutProps) => {
  const [left, right] = splitChildren(children)

  return (
    <div className={cn("grid grid-cols-2 gap-6", className)} {...props}>
      <div className="space-y-4">{left}</div>
      <div className="space-y-4">{right}</div>
    </div>
  )
}

const isIterable = <T,>(obj: unknown): obj is Iterable<T> =>
  obj != null &&
  typeof obj === "object" &&
  Symbol.iterator in obj &&
  typeof obj[Symbol.iterator] === "function"

const splitChildren = (children: ReactNode): [ReactNode, ReactNode] => {
  if (!isIterable<ReactNode>(children)) {
    return [children, null]
  }

  const childrenArray = Array.from(children)
  const splitter = childrenArray.findIndex(
    (child) => isValidElement(child) && child.type === "hr",
  )
  if (splitter === -1) {
    return [children, null]
  }

  const left = childrenArray.slice(0, splitter)
  const right = childrenArray.slice(splitter + 1)

  return [left, right.length > 0 ? right : null]
}
