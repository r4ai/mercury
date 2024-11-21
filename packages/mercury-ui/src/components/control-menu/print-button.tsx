import type { FC } from "react"
import { Link } from "wouter"
import PrinterIcon from "~icons/lucide/printer"
import { Button, type ButtonProps } from "../button"

export type PrintButtonProps = ButtonProps

export const PrintButton: FC<PrintButtonProps> = ({
  variant = "ghost",
  size = "icon",
  asChild = true,
  ...props
}) => {
  return (
    <Button variant={variant} size={size} asChild={asChild} {...props}>
      <Link href="/all?print=true">
        <PrinterIcon className="size-6" />
      </Link>
    </Button>
  )
}
