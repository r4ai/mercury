import type { FC } from "react"
import { Link, useLocation } from "wouter"
import PrinterIcon from "~icons/lucide/printer"
import { Button, type ButtonProps } from "../button"

export type PrintButtonProps = ButtonProps

export const PrintButton: FC<PrintButtonProps> = ({
  variant = "ghost",
  size = "icon",
  asChild = true,
  "aria-label": ariaLabel = "Open print view",
  title = "Open print view",
  ...props
}) => {
  const [location] = useLocation()

  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      aria-label={ariaLabel}
      title={title}
      {...props}
    >
      <Link
        href={`/all?${new URLSearchParams({
          print: "true",
          from: location,
        }).toString()}`}
      >
        <PrinterIcon className="size-6" />
      </Link>
    </Button>
  )
}
