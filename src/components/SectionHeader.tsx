import type { ReactNode } from "react"

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: ReactNode
  subtitle?: string
}

export function SectionHeader({ index, eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="mb-16 md:mb-20">
      <p className="flex items-center gap-3 font-mono text-[12px] tracking-[0.12em] uppercase text-ash mb-6">
        <span className="text-violet">{index}</span>
        <span className="w-8 h-px bg-white/20" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-display font-bold text-section text-platinum max-w-[16ch]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 max-w-[52ch] font-body text-[17px] leading-relaxed text-silver">
          {subtitle}
        </p>
      )}
    </header>
  )
}
