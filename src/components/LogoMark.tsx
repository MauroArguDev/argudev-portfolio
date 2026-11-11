// The ArguDev mark, traced from public/favicon.svg
const SHAPES = [
  { type: "polygon", points: "425.1,987.1 314.1,987.1 219.3,795.3 43.8,735.6 158.3,620.7 17.6,92.7 425.1,92.7 425.1,159 103.8,159 232.1,640.5 165.8,707.1 266.5,741.3 355.3,920.8 425.1,920.8" },
  { type: "polygon", points: "765.9,987.1 654.9,987.1 654.9,920.8 724.7,920.8 813.4,741.3 914.4,707.2 847.3,640.6 976.1,159 654.9,159 654.9,92.7 1062.4,92.7 921.2,620.6 1037.3,735.6 860.7,795.3" },
  { type: "path", d: "M470.5,538.5v-66l-227.6-71.6c0,0,35.8,207.4,89.9,229.7C371.1,646.4,470.5,538.5,470.5,538.5z" },
  { type: "path", d: "M608,538.5v-66l229-71.6c0,0-37.2,207.4-91.4,229.7C707.4,646.4,608,538.5,608,538.5z" },
  { type: "polygon", points: "540,584.7 426.1,813.6 493.2,813.6 539.4,768.4 584,813.6 653.9,813.6" },
  { type: "path", d: "M562.8,920.6h45.9v66.7h-45.9z" },
  { type: "path", d: "M470.7,920.6h45.9v66.7h-45.9z" },
] as const

interface Props {
  className?: string
  /** Draws the outline on mount (the .draw animation in globals.css) instead of showing it filled */
  draw?: boolean
}

export function LogoMark({ className, draw = false }: Props) {
  return (
    <svg viewBox="10 85 1060 910" className={className} aria-hidden="true">
      {SHAPES.map((shape, i) => {
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
