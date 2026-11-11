import { useTranslation } from "react-i18next"
import { SectionHeader } from "@/components/SectionHeader"
import { stack } from "@/data/stack"

export function About() {
  const { t } = useTranslation()
  const principles = t("about.principles", { returnObjects: true })

  return (
    <section id="about" className="relative px-6 md:px-10 py-20 md:py-40 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index={t("about.index")}
          eyebrow={t("about.eyebrow")}
          title={t("about.heading")}
          subtitle={t("about.bio")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16">
          {/* Principles */}
          <div className="lg:col-span-6">
            <h3 className="mb-8 font-mono text-[12px] tracking-[0.12em] uppercase text-ash">
              {t("about.principles_heading")}
            </h3>
            <ol className="flex flex-col">
              {principles.map(({ title, body }, i) => (
                <li key={title} className="grid grid-cols-[3.5rem_1fr] py-7 border-t border-white/[0.08] last:border-b">
                  <span className="font-mono text-[13px] text-violet pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display font-bold text-[24px] leading-tight tracking-[-0.02em] text-platinum">{title}</p>
                    <p className="mt-2 font-body text-[16px] leading-relaxed text-silver">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Stack, anchored to where it was used */}
          <div className="lg:col-span-6">
            <h3 className="mb-8 font-mono text-[12px] tracking-[0.12em] uppercase text-ash">
              {t("about.stack_heading")}
            </h3>
            <div className="cut cut-line">
              <ul className="cut bg-void">
                {stack.map(({ items, usedIn }) => (
                  <li
                    key={usedIn}
                    className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 xl:gap-6 px-6 py-5 border-b border-white/[0.08] last:border-0"
                  >
                    <span className="font-mono text-[13px] text-platinum">{items.join(" · ")}</span>
                    <span className="shrink-0 font-mono text-[12px] tracking-[0.06em] text-ash">
                      → <span className="text-violet">{t(usedIn)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
