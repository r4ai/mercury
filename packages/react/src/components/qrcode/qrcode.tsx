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
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
  maskPattern?: QRCodeMaskPattern
  version?: number
  toSJISFunc?: QRCodeToSJISFunc
}

export const QRCode = forwardRef<SVGSVGElement, QRCodeProps>(
  (
    {
      value,
      size = 160,
      margin = 4,
      color: colorProp,
      backgroundColor: backgroundColorProp,
      errorCorrectionLevel = "M",
      maskPattern,
      version,
      toSJISFunc,
      className,
      width,
      height,
      role,
      "aria-label": ariaLabel,
      style,
      ...rest
    },
    ref,
  ) => {
    const marginValue = Number.isFinite(margin) ? margin : 0
    const quietZone = Math.max(0, Math.floor(marginValue))

    const { path, viewBoxSize } = useMemo(() => {
      try {
        const qr = create(value, {
          errorCorrectionLevel,
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

        // The qrcode.create API also exposes encoding `segments`, but the drawable matrix lives
        // on the BitMatrix returned through `modules`, so we iterate over it just like the
        // upstream SVG renderer does.
        // https://github.com/soldair/node-qrcode/blob/v1.5.4/lib/renderer/svg-tag.js#L17-L56
        for (let row = 0; row < moduleCount; row += 1) {
          for (let col = 0; col < moduleCount; col += 1) {
            if (qr.modules.get(row, col)) {
              segments.push(`M${col + quietZone} ${row + quietZone}h1v1h-1z`)
            }
          }
        }

        return { path: segments.join(""), viewBoxSize }
      } catch (error) {
        console.error(
          "[@mercurymd/react] Failed to generate QR code for value:",
          value,
          error,
        )
        return { path: "", viewBoxSize: 0 }
      }
    }, [
      errorCorrectionLevel,
      maskPattern,
      quietZone,
      toSJISFunc,
      value,
      version,
    ])

    if (viewBoxSize === 0) {
      return null
    }

    const label =
      ariaLabel ??
      (typeof value === "string" && value.length > 0
        ? `QR code for ${value}`
        : "QR code")

    const mergedStyle =
      colorProp || backgroundColorProp
        ? {
            ...style,
            ...(colorProp ? { color: colorProp } : {}),
            ...(backgroundColorProp
              ? { backgroundColor: backgroundColorProp }
              : {}),
          }
        : style

    const fill = colorProp ?? "currentColor"

    return (
      <svg
        ref={ref}
        aria-label={label}
        role={role ?? "img"}
        width={width ?? size}
        height={height ?? size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className={cn("block", className)}
        style={mergedStyle}
        {...rest}
      >
        <path d={path} fill={fill} shapeRendering="crispEdges" />
      </svg>
    )
  },
)

QRCode.displayName = "QRCode"
