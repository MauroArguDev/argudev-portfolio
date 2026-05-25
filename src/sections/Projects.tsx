import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AnimatedSection } from "@/components/AnimatedSection"
import { ProjectCard } from "@/components/ProjectCard"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { projects } from "@/data/projects"

export function Projects() {
  const { t } = useTranslation()
  const { ref, inView } = useScrollReveal()

  return (
    <AnimatedSection>
      <section id="projects" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-violet rounded-full" aria-hidden="true" />
            <span className="font-mono text-[13px] tracking-[1px] uppercase text-silver">
              {t("projects.eyebrow")}
            </span>
          </div>

          {/* Heading + subheading */}
          <h2
            className="font-display font-semibold text-platinum leading-tight mb-3"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.3px" }}
          >
            {t("projects.heading")}
          </h2>
          <p className="font-body text-[16px] text-silver mb-14">
            {t("projects.sub")}
          </p>

          {/* Cards grid */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  )
}
