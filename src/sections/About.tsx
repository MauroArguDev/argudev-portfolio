import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AnimatedSection } from "@/components/AnimatedSection"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { stack } from "@/data/stack"
import iPhoneImg from "@/assets/iPhone.png"
import type { Variants } from "framer-motion"

const STACK_GROUPS = [
  { label: "iOS", items: stack.ios },
  { label: "Frontend", items: stack.frontend },
  { label: "Tools", items: stack.tools },
] as const

const reducedItem: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

export function About() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const { ref: stackRef, inView: stackInView } = useScrollReveal()

  return (
    <AnimatedSection>
      <section id="about" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-12">
            <span className="w-6 h-[2px] bg-violet rounded-full" aria-hidden="true" />
            <span className="font-mono text-[13px] tracking-[1px] uppercase text-silver">
              {t("about.eyebrow")}
            </span>
          </div>

          {/* Two-column: heading + bio + stack left, iPhone right */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

            {/* Left: heading + bio + stack */}
            <div className="flex flex-col gap-10">
              <div>
                <h2
                  className="font-display font-semibold text-platinum mb-6 leading-tight"
                  style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.3px" }}
                >
                  {t("about.heading")}
                </h2>
                <p className="font-body text-[17px] leading-relaxed text-silver">
                  {t("about.bio")}
                </p>
              </div>

              <div>
                <p className="font-mono text-[12px] tracking-[1.5px] uppercase text-silver mb-6">
                  {t("about.stack_heading")}
                </p>
                <motion.div
                  ref={stackRef}
                  variants={staggerContainer}
                  initial="hidden"
                  animate={stackInView ? "show" : "hidden"}
                  className="flex flex-col gap-5"
                >
                  {STACK_GROUPS.map(({ label, items }) => (
                    <motion.div
                      key={label}
                      variants={prefersReduced ? reducedItem : staggerItem}
                    >
                      <p className="font-mono text-[12px] tracking-[1.5px] uppercase text-silver mb-3">
                        {label}
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        {items.map((tech) => (
                          <span
                            key={tech}
                            className="glass px-4 py-2 rounded-full font-mono text-[13px] tracking-[0.3px] text-violet"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Right: iPhone mockup — centered against full left column */}
            <div className="hidden lg:flex justify-center items-center">
              <motion.img
                src={iPhoneImg}
                alt="iOS app showcase"
                loading="lazy"
                animate={prefersReduced ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-[240px] xl:max-w-[270px]"
                style={{
                  filter: "hue-rotate(40deg) saturate(2) brightness(0.85) drop-shadow(0 24px 56px rgba(176,38,255,0.35))",
                }}
              />
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
