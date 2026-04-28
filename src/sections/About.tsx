import { motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AnimatedSection } from "@/components/AnimatedSection"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { stack } from "@/data/stack"
import profilePhoto from "@/assets/profile.jpeg"
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
            <span className="font-mono text-[12px] tracking-[1px] uppercase text-silver">
              {t("about.eyebrow")}
            </span>
          </div>

          {/* Two-column layout: content left, photo right */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

            {/* Left column: heading + bio + stack — second on mobile, first on desktop */}
            <div className="order-2 lg:order-1 flex flex-col gap-10">
              {/* Heading + bio */}
              <div>
                <h2
                  className="font-display font-semibold text-platinum mb-5 leading-tight"
                  style={{ fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.3px" }}
                >
                  {t("about.heading")}
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-silver">
                  {t("about.bio")}
                </p>
              </div>

              {/* Stack grid */}
              <div>
                <p className="font-mono text-[11px] tracking-[1.5px] uppercase text-ash mb-6">
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
                      <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-ash mb-2">
                        {label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((tech) => (
                          <span
                            key={tech}
                            className="glass px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.5px] text-violet"
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

            {/* Right column: profile photo — first on mobile, second on desktop */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="glass p-1 rounded-2xl w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full overflow-hidden">
                <img
                  src={profilePhoto}
                  alt="Mauro Argumedo — iOS Developer"
                  loading="lazy"
                  className="w-full rounded-xl object-cover object-top"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
