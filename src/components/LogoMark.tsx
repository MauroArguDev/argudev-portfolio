import { LOGO_SHAPES, LOGO_VIEWBOX } from "@/components/logoShapes"

interface Props {
  className?: string
  /** Draws the outline on mount (the .draw animation in globals.css) instead of showing it filled */
  draw?: boolean
}

export function LogoMark({ className, draw = false }: Props) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true">
      {LOGO_SHAPES.map((shape, i) => {
        const common = draw
          ? {
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 3,
              vectorEffect: "non-scaling-stroke" as const,
              pathLength: 1,
              className: "draw",
              style: { animationDelay: `${0.15 + i * 0.12}s` },
            }
          : { fill: "currentColor" }
        return shape.type === "polygon"
          ? <polygon key={i} points={shape.points} {...common} />
          : <path key={i} d={shape.d} {...common} />
      })}
    </svg>
  )
}
