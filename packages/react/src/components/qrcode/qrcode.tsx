import {
  create,
  type QRCodeErrorCorrectionLevel,
  type QRCodeMaskPattern,
  type QRCodeSegment,
  type QRCodeToSJISFunc,
} from "qrcode"
import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react"
import { cn } from "../../libs/utils"

export type QRCodeProps = Omit<ComponentPropsWithoutRef<"svg">, "children"> & {
  value: string | QRCodeSegment[]
  size?: number
  margin?: number
  color?: string
  backgroundColor?: string
  level?: QRCodeErrorCorrectionLevel
  maskPattern?: QRCodeMaskPattern
  version?: number
  toSJISFunc?: QRCodeToSJISFunc
}

export const QRCode = forwardRef<SVGSVGElement, QRCodeProps>((props, ref) => {
  const ariaLabel = (props as { "aria-label"?: string })["aria-label"]
  const {
    value,
    size = 160,
    margin = 4,
    color = "currentColor",
    backgroundColor = "transparent",
    level = "M",
    maskPattern,
    version,
    toSJISFunc,
    className,
    width,
    height,
    role,
    ...rest
  } = props

  const marginValue = Number.isFinite(margin) ? margin : 0
  const quietZone = Math.max(0, Math.floor(marginValue))

  const { path, viewBoxSize } = useMemo(() => {
    try {
      const qr = create(value, {
        errorCorrectionLevel: level,
        maskPattern,
        toSJISFunc,
        version,
      })

      if (!qr.modules) {
        return { path: "", viewBoxSize: 0 }
      }

      const moduleCount = qr.modules.size
      const viewBoxSize = moduleCount + quietZone * 2
      const segments: string[] = []

      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
          if (qr.modules.get(row, col)) {
            segments.push(`M${col + quietZone} ${row + quietZone}h1v1h-1z`)
          }
        }
      }

      return { path: segments.join(""), viewBoxSize }
    } catch (error) {
      console.error("[@mercurymd/react] Failed to generate QR code.", error)
      return { path: "", viewBoxSize: 0 }
    }
  }, [level, maskPattern, quietZone, toSJISFunc, value, version])

  if (viewBoxSize === 0) {
    return null
  }

  const label =
    ariaLabel ??
    (typeof value === "string" && value.length > 0
      ? `QR code for ${value}`
      : "QR code")

  return (
    <svg
      ref={ref}
      {...rest}
      aria-label={label}
      role={role ?? "img"}
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className={cn("block", className)}
    >
      <rect
        x={0}
        y={0}
        width={viewBoxSize}
        height={viewBoxSize}
        fill={backgroundColor}
      />
      <path d={path} fill={color} shapeRendering="crispEdges" />
    </svg>
  )
})

QRCode.displayName = "QRCode"
