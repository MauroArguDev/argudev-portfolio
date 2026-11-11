import { useTranslation } from "react-i18next"
import { SectionHeader } from "@/components/SectionHeader"
import { DeviceFrame } from "@/components/DeviceFrame"
import { guldr, miFondo } from "@/data/projects"
import type { CaseStudy } from "@/types"
import guldrDemo from "@/assets/guldr-demo.webp"
import miFondoImg from "@/assets/mi-fondo.webp"

export function Work() {
  const { t } = useTranslation()

  return (
    <section id="work" className="relative px-6 md:px-10 py-20 md:py-40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index={t("work.index")}
          eyebrow={t("work.eyebrow")}
          title={t("work.heading")}
          subtitle={t("work.sub")}
        />
        <div className="flex flex-col gap-24 md:gap-32">
          <GuldrCase />
          <MiFondoCase />
        </div>
      </div>
    </section>
  )
}

function GuldrCase() {
  const { t } = useTranslation()
  const decisions = t("work.guldr.decisions", { returnObjects: true })

  return (
    <article className="cut cut-lg cut-line">
      <div className="cut cut-lg bg-obsidian grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 p-6 sm:p-10 lg:p-16">

        {/* Device on Guldr's own gold light; it stays in view while the copy scrolls */}
        <div className="lg:col-span-5 relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 -m-6 sm:-m-10 lg:-m-16 lg:mr-0"
            style={{ background: "radial-gradient(closest-side at 50% 30%, rgb(200 169 106 / 0.22), transparent)" }}
          />
          <div className="relative lg:sticky lg:top-28 flex justify-center">
            <div className="brackets w-full max-w-[300px]" style={{ "--bracket": "var(--color-gold)" } as React.CSSProperties}>
              <DeviceFrame src={guldrDemo} alt={t("work.guldr.demo_alt")} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <CaseMeta kind={t("work.own")} study={guldr} badge={t("work.guldr.status")} />
          <h3 className="mt-6 font-display font-bold text-[clamp(44px,6vw,80px)] leading-none tracking-[-0.04em] text-platinum">
            {guldr.name}
          </h3>
          <p className="mt-4 font-body text-[19px] leading-snug text-gold">
            {t("work.guldr.tagline")}
          </p>

          <dl className="mt-12 flex flex-col gap-10">
            <CaseBlock label={t("work.problem")}>
              <p>{t("work.guldr.problem")}</p>
            </CaseBlock>
            <CaseBlock label={t("work.decisions")}>
              <ol className="flex flex-col gap-3">
                {decisions.map((decision, i) => (
                  <li key={decision} className="grid grid-cols-[2rem_1fr]">
                    <span className="font-mono text-[12px] pt-1 text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ol>
            </CaseBlock>
            <CaseBlock label={t("work.outcome")}>
              <p>{t("work.guldr.outcome")}</p>
            </CaseBlock>
          </dl>

          <CaseFooter study={guldr} />
        </div>
      </div>
    </article>
  )
}

function MiFondoCase() {
  const { t } = useTranslation()
  const highlights = t("work.mifondo.highlights", { returnObjects: true })

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div className="lg:col-span-5 lg:order-2">
        <div className="cut cut-lg cut-line">
          <img
            src={miFondoImg}
            alt={t("work.mifondo.image_alt")}
            loading="lazy"
            decoding="async"
            width={1200}
            height={700}
            className="cut cut-lg block w-full h-auto"
          />
        </div>
      </div>

      <div className="lg:col-span-7 lg:order-1 flex flex-col">
        <CaseMeta kind={`${t("work.client")} · ${miFondo.client}`} study={miFondo} />
        <h3 className="mt-6 font-display font-bold text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.04em] text-platinum">
          {miFondo.name}
        </h3>
        <p className="mt-4 font-body text-[19px] leading-snug text-platinum/90">
          {t("work.mifondo.tagline")}
        </p>
        <p className="mt-6 max-w-[56ch] font-body text-[16px] leading-relaxed text-silver">
          {t("work.mifondo.summary")}
        </p>

        <dl className="mt-10">
          <CaseBlock label={t("work.highlights")}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[9px] w-1.5 h-1.5 shrink-0 bg-violet" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>
        </dl>

        <CaseFooter study={miFondo} />
      </div>
    </article>
  )
}

function CaseMeta({ kind, study, badge }: { kind: string; study: CaseStudy; badge?: string }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] tracking-[0.08em] uppercase text-ash">
      <span className="text-silver">{kind}</span>
      <span aria-hidden="true">/</span>
      <span>{study.year}</span>
      {badge && (
        <>
          <span aria-hidden="true">/</span>
          <span className="px-2 py-0.5 border border-gold/40 text-gold normal-case tracking-normal">{badge}</span>
        </>
      )}
    </p>
  )
}

function CaseBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 pt-6 border-t border-white/[0.08]">
      <dt className="font-mono text-[12px] tracking-[0.1em] uppercase text-ash pt-1">{label}</dt>
      <dd className="font-body text-[16px] leading-relaxed text-silver">{children}</dd>
    </div>
  )
}

function CaseFooter({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()

  return (
    <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <ul className="flex flex-wrap gap-2" aria-label={t("work.built_with")}>
        {study.stack.map((tech) => (
          <li key={tech} className="px-2.5 py-1 border border-white/10 font-mono text-[11px] text-silver">
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-6 gap-y-2 shrink-0">
        {study.links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[13px] text-platinum hover:text-violet transition-colors duration-150"
          >
            {t(label)}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
