import type { ReactNode } from "react"

interface EyebrowProps {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className = "mb-6" }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-6 h-[2px] bg-violet rounded-full" aria-hidden="true" />
      <span className="font-mono text-[13px] tracking-[1px] uppercase text-silver">
        {children}
      </span>
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display font-semibold text-section text-platinum leading-tight mb-3">
        {title}
      </h2>
      <p className="font-body text-[16px] text-silver mb-14">
        {subtitle}
      </p>
    </>
  )
}
