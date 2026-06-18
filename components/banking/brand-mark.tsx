import { cn } from "@/lib/utils"

// Pixel-art "B" mark for BLOK, built from a 7x7 grid of square pixels.
// Uses currentColor so it adapts to any background (cards, sidebar, etc).
const PIXELS: Array<[number, number]> = [
  // left spine
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  // top bar
  [1, 0], [2, 0], [3, 0], [4, 0],
  // top bowl edge
  [5, 1], [5, 2],
  // middle bar
  [1, 3], [2, 3], [3, 3], [4, 3],
  // bottom bowl edge
  [5, 4], [5, 5],
  // bottom bar
  [1, 6], [2, 6], [3, 6], [4, 6],
]

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 7 7"
      className={cn("h-7 w-7", className)}
      role="img"
      aria-label="BLOK logo"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      {PIXELS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  )
}
