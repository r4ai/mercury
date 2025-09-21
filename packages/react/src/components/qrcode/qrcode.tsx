import {
  create,
  type QRCodeErrorCorrectionLevel,
  type QRCodeMaskPattern,
  type QRCodeSegment,
  type QRCodeToSJISFunc,
} from "qrcode"
import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react"
import { renderToSvg } from "../../libs/qrcode"
import { cn } from "../../libs/utils"

export type QRCodeProps = Omit<ComponentPropsWithoutRef<"svg">, "children"> & {
  value: string | QRCodeSegment[]
  size?: number
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
    const { path, viewBox } = useMemo(() => {
      try {
        const qr = create(value, {
          errorCorrectionLevel,
          maskPattern,
          toSJISFunc,
          version,
        })
        return renderToSvg(qr)
      } catch (error) {
        console.error(
          "[@mercurymd/react] Failed to generate QR code for value:",
          value,
          error,
        )
        return { path: "", viewBox: "0 0 0 0" }
      }
    }, [errorCorrectionLevel, maskPattern, toSJISFunc, value, version])

    const label =
      ariaLabel ??
      (typeof value === "string" && value.length > 0
        ? `QR code for ${value}`
        : "QR code")

    if (viewBox === "0 0 0 0") {
      return null
    }

    return (
      <svg
        ref={ref}
        aria-label={label}
        role={role ?? "img"}
        className={cn("block bg-white text-black", className)}
        style={style}
        width={width ?? size}
        height={height ?? size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        {...rest}
      >
        <path d={path} stroke="currentColor" />
      </svg>
    )
  },
)

QRCode.displayName = "QRCode"
