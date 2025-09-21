import type { QRCode } from "qrcode"

/**
 * A helper function to create SVG path commands.
 *
 * @see https://github.com/soldair/node-qrcode/blob/v1.5.4/lib/renderer/svg-tag.js#L12
 */
const svgCmd = (cmd: string, x: number, y?: number | undefined) => {
  let str = cmd + x
  if (typeof y !== "undefined") str += ` ${y}`

  return str
}

/**
 * Converts QR code data to an SVG path string.
 *
 * @see https://github.com/soldair/node-qrcode/blob/v1.5.4/lib/renderer/svg-tag.js#L19
 */
const qrToPath = (data: QRCode["modules"]["data"], size: number) => {
  let path = ""
  let moveBy = 0
  let newRow = false
  let lineLength = 0

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const row = Math.floor(i / size)

    if (!col && !newRow) newRow = true

    if (data[i]) {
      lineLength++

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd("M", col, 0.5 + row) : svgCmd("m", moveBy, 0)

        moveBy = 0
        newRow = false
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd("h", lineLength)
        lineLength = 0
      }
    } else {
      moveBy++
    }
  }

  return path
}

/**
 * Renders the QR code data to an SVG format.
 *
 * @see https://github.com/soldair/node-qrcode/blob/v1.5.4/lib/renderer/svg-tag.js#L55
 *
 * @param qrData - The QR code data to render.
 * @returns An object containing the SVG path and viewBox.
 *
 * @example
 * ```tsx
 * export const QRCode = ({ value }) => {
 *   const qr = create(value)
 *   const { path, viewBox } = renderToSvg(qr)
 *
 *   return (
 *     <svg
 *       xmlns="http://www.w3.org/2000/svg"
 *       viewBox={viewBox}
 *       shapeRendering="crispEdges"
 *     >
 *       <path d={path} stroke="currentColor" />
 *     </svg>
 *   )
 * }
 * ```
 */
export const renderToSvg = (qrData: QRCode) => {
  const size = qrData.modules.size
  const data = qrData.modules.data

  const viewBox = `0 0 ${size} ${size}`
  const path = qrToPath(data, size)

  return { path, viewBox }
}
