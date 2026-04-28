import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { staggerContainer, staggerItem, charVariant } from "@/lib/motion"

const WORDMARK = [
  { char: "A", color: "text-platinum" },
  { char: "r", color: "text-platinum" },
  { char: "g", color: "text-platinum" },
  { char: "u", color: "text-platinum" },
  { char: "D", color: "text-violet" },
  { char: "e", color: "text-violet" },
  { char: "v", color: "text-violet" },
  { char: ".", color: "text-crimson" },
]

export function Hero() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

  const tagPills = ["Swift", "SwiftUI", "UIKit", "ARKit", "React", "Machine Learning"]

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-[56px]"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-4xl"
      >
        {/* Eyebrow kicker */}
        <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
          <span className="w-6 h-[2px] bg-violet rounded-full" aria-hidden="true" />
          <span className="font-mono text-[12px] tracking-[1px] text-silver">
            {t("hero.kicker")}
          </span>
        </motion.div>

        {/* Wordmark — char-by-char entrance */}
        <h1
          className="flex items-baseline mb-6"
          aria-label="ArguDev."
        >
          {WORDMARK.map(({ char, color }, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="show"
              variants={prefersReduced ? staggerItem : charVariant(i)}
              className={`font-display font-bold ${color}`}
              style={{ fontSize: "clamp(64px, 12vw, 110px)", letterSpacing: "-2px", lineHeight: 1 }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Role line */}
        <motion.div variants={staggerItem} className="mb-10">
          <p
            className="font-display font-bold text-platinum leading-tight"
            style={{ fontSize: "clamp(22px, 4vw, 40px)", letterSpacing: "-0.5px" }}
          >
            {t("hero.role")}
          </p>
          <p
            className="font-display font-bold text-silver leading-tight"
            style={{ fontSize: "clamp(22px, 4vw, 40px)", letterSpacing: "-0.5px" }}
          >
            {t("hero.tagline")}
          </p>
        </motion.div>

        {/* Tag pills */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-10">
          {tagPills.map((tag) => (
            <span
              key={tag}
              className="glass px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.5px] text-violet"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl font-body font-medium text-[15px] text-platinum bg-violet hover:bg-violet-2 transition-colors duration-200"
            style={{ boxShadow: "0 0 24px rgba(176,38,255,0.4)" }}
          >
            {t("hero.cta_projects")}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-body font-medium text-[15px] text-violet border border-violet/40 hover:border-violet/70 hover:bg-violet/10 transition-all duration-200"
          >
            {t("hero.cta_contact")}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[2px] uppercase text-ash">
          {t("hero.scroll")}
        </span>
        <motion.div
          aria-hidden="true"
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-violet"
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path
              d="M1 1l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <span className="w-[1px] h-8 bg-violet/40 rounded-full" aria-hidden="true" />
      </div>
    </section>
  )
}
