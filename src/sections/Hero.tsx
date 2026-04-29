import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { staggerContainer, staggerItem } from "@/lib/motion"
import profilePhoto from "@/assets/profile.jpeg"

export function Hero() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

  const tagPills = ["Swift", "SwiftUI", "UIKit", "ARKit", "React", "Machine Learning"]

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-[56px]"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-center">

        {/* Left: content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {/* Eyebrow kicker */}
          <motion.div variants={staggerItem} className="flex items-center gap-3 mb-8">
            <span className="w-6 h-[2px] bg-violet rounded-full" aria-hidden="true" />
            <span className="font-mono text-[13px] tracking-[1px] text-silver">
              {t("hero.kicker")}
            </span>
          </motion.div>

          {/* Logo as h1 */}
          <motion.h1 variants={staggerItem} className="mb-6">
            <img
              src="/logo.png"
              alt="ArguDev."
              loading="eager"
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </motion.h1>

          {/* Role + tagline */}
          <motion.div variants={staggerItem} className="mb-10">
            <p
              className="font-display font-bold text-platinum leading-tight"
              style={{ fontSize: "clamp(24px, 4.5vw, 48px)", letterSpacing: "-0.5px" }}
            >
              {t("hero.role")}
            </p>
            <p
              className="font-display font-bold text-silver leading-tight"
              style={{ fontSize: "clamp(24px, 4.5vw, 48px)", letterSpacing: "-0.5px" }}
            >
              {t("hero.tagline")}
            </p>
          </motion.div>

          {/* Tag pills */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2.5 mb-10">
            {tagPills.map((tag) => (
              <span
                key={tag}
                className="glass px-4 py-2 rounded-full font-mono text-[13px] tracking-[0.3px] text-violet"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-body font-medium text-[16px] text-platinum bg-violet hover:bg-violet-2 transition-colors duration-200"
              style={{ boxShadow: "0 0 24px rgba(176,38,255,0.4)" }}
            >
              {t("hero.cta_projects")}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-body font-medium text-[16px] text-violet border border-violet/40 hover:border-violet/70 hover:bg-violet/10 transition-all duration-200"
            >
              {t("hero.cta_contact")}
            </a>
          </motion.div>
        </motion.div>

        {/* Right: profile photo */}
        <motion.div
          initial={{ opacity: 0, x: prefersReduced ? 0 : 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex justify-center items-center"
        >
          <div
            className="glass p-1.5 rounded-2xl overflow-hidden w-full max-w-[300px] xl:max-w-[340px]"
            style={{ boxShadow: "0 24px 64px rgba(176,38,255,0.2), 0 8px 32px rgba(0,0,0,0.5)" }}
          >
            <img
              src={profilePhoto}
              alt="Mauricio Argumedo — iOS Developer"
              loading="eager"
              className="w-full rounded-xl object-cover object-top"
              style={{ aspectRatio: "3/4" }}
            />
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] tracking-[2px] uppercase text-ash">
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
