import type { FC } from "react"

export type CenterProps = {
  title: string
  description?: string
}

export const Center: FC<CenterProps> = ({ title, description }) => {
  return (
    <div className="grid place-items-center h-full w-full">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-4xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
