import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AnimatedSection } from "@/components/AnimatedSection"
import { SectionHeader } from "@/components/SectionHeader"
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
          <SectionHeader
            eyebrow={t("projects.eyebrow")}
            title={t("projects.heading")}
            subtitle={t("projects.sub")}
          />

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
