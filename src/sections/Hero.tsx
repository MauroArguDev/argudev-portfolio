import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { LogoMark } from "@/components/LogoMark"
import profilePhoto from "@/assets/profile.webp"

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const proof = t("hero.proof", { returnObjects: true })

  // Each name line slides up from behind its own mask
  const line = (delay: number) =>
    reduced
      ? {}
      : { initial: { y: "105%" }, animate: { y: 0 }, transition: { duration: 0.8, delay, ease: EASE } }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center px-6 md:px-10 pt-28 pb-20 md:pt-32 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">

        {/* Text */}
        <div className="lg:col-span-7 relative z-10">
          <p className="flex items-center gap-3 mb-10 font-mono text-[12px] tracking-[0.08em] text-silver">
            <span className="pulse w-2 h-2 bg-violet" aria-hidden="true" />
            <span className="uppercase text-ash">{t("hero.status_label")}</span>
            <span className="w-4 h-px bg-white/20" aria-hidden="true" />
            {t("hero.status")}
          </p>

          <p className="mb-5 font-mono text-[13px] tracking-[0.12em] uppercase text-violet">
            {t("hero.role")}
          </p>

          <h1 className="font-display font-bold text-display text-platinum">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...line(0.05)}>Mauricio</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...line(0.15)}>
                Argumedo<span className="text-crimson">.</span>
              </motion.span>
            </span>
          </h1>

          <p className="mt-8 max-w-[30ch] font-body text-[clamp(20px,2.1vw,26px)] leading-snug text-silver">
            {t("hero.statement")}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-[0.04em] text-ash">
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2 text-silver">
                <span className="w-1 h-1 bg-violet" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="cut cut-sm group inline-flex items-center gap-3 px-7 py-4 bg-violet hover:bg-violet-2 font-body font-medium text-[16px] text-platinum transition-colors duration-200"
            >
              {t("hero.cta_work")}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
            </a>
            <a href="#contact" className="cut cut-sm cut-line inline-flex hover:bg-white/30 transition-colors duration-200">
              <span className="cut cut-sm inline-flex items-center px-7 py-4 bg-void font-body font-medium text-[16px] text-platinum">
                {t("hero.cta_contact")}
              </span>
            </a>
          </div>
        </div>

        {/* Portrait, framed by the mark's outline */}
        <div className="lg:col-span-5 relative mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:max-w-none">
          <div className="hero-light -left-1/3 -top-1/4 w-[140%] h-[120%]" aria-hidden="true" />
          <LogoMark
            draw
            className="absolute -inset-x-[14%] -top-[10%] w-[128%] text-violet/35 pointer-events-none"
          />
          <figure className="relative">
            <div className="jaw">
                <img
                  src={profilePhoto}
                  alt={t("hero.photo_alt")}
                  loading="eager"
                  fetchPriority="high"
                  width={960}
                  height={1478}
                  className="block w-full aspect-[4/5] object-cover object-[50%_20%]"
                />
            </div>
            <figcaption className="mt-5 flex justify-between font-mono text-[11px] tracking-[0.1em] uppercase text-ash">
              <span>{t("hero.caption")}</span>
              <span className="text-silver">argudev.com</span>
            </figcaption>
          </figure>
        </div>

      </div>
    </section>
  )
}
