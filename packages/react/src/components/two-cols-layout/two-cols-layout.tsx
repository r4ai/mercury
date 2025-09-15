import { isValidElement, type ReactNode } from "react"

export type TwoColsLayoutProps = {
  children?: ReactNode
}

export const TwoColsLayout = ({ children }: TwoColsLayoutProps) => {
  const [left, right] = splitChildren(children)

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">{left}</div>
      <div className="space-y-6">{right}</div>
    </div>
  )
}

const isIterable = <T,>(obj: unknown): obj is Iterable<T> =>
  obj != null &&
  typeof obj === "object" &&
  Symbol.iterator in obj &&
  typeof obj[Symbol.iterator] === "function"

const splitChildren = (children: ReactNode) => {
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
