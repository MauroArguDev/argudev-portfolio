// The mark's outer contour around the 20:23 portrait. Like the mark, it is two open
// halves: a gap at the top between its brackets and one at the chin.
// Points are percentages of the portrait, the same ones as .mask-face in globals.css.
const HALVES = [
  [[39, 0], [0, 0], [13.5, 59], [2.5, 71.9], [19.3, 78.6], [28.4, 100], [39, 100]],
  [[61, 0], [100, 0], [86.5, 59], [97.6, 71.9], [80.7, 78.6], [71.6, 100], [61, 100]],
]

// The portrait is 100 x 115 user units (aspect 20:23); the outline is its silhouette scaled up from the center
const HEIGHT = 115
const SCALE = 1.08

function toPoints(half: number[][]) {
  return half
    .map(([x, y]) => {
      const ux = 50 + (x - 50) * SCALE
      const uy = HEIGHT / 2 + ((y / 100) * HEIGHT - HEIGHT / 2) * SCALE
      return `${ux.toFixed(2)},${uy.toFixed(2)}`
    })
    .join(" ")
}

// The SVG box is the portrait grown by 7% each side horizontally and 5% vertically
const VIEW_BOX = `-7 ${-HEIGHT * 0.05} 114 ${HEIGHT * 1.1}`

/** Place it over the portrait with `-left-[7%] -top-[5%] w-[114%] h-[110%]`, matching VIEW_BOX */
export function MaskOutline({ className }: { className?: string }) {
  return (
    <svg viewBox={VIEW_BOX} className={className} aria-hidden="true">
      {HALVES.map((half, i) => (
        <polyline
          key={i}
          points={toPoints(half)}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.6}
          strokeLinejoin="miter"
          pathLength={1}
          className="draw"
          style={{ animationDelay: `${0.15 + i * 0.12}s` }}
        />
      ))}
    </svg>
  )
}
