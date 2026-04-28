import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { cardHover } from "@/lib/motion"
import type { Project } from "@/types"

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const { t } = useTranslation()
  const description = t(project.descriptionKey)
  const hasLinks = Object.values(project.links).some(Boolean)

  return (
    <motion.article
      {...cardHover}
      className="glass rounded-2xl p-6 flex flex-col gap-4 h-full"
    >
      {/* Top row: type badge + year */}
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[1px] uppercase text-violet bg-violet/10 border border-violet/25">
          {project.type}
        </span>
        <span className="font-mono text-[11px] text-ash">{project.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-platinum" style={{ fontSize: 16 }}>
        {project.name}
      </h3>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {project.stack.map((tech) => (
          <span key={tech} className="font-mono text-[10px] tracking-[0.5px] text-violet">
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="font-body text-[14px] text-silver leading-relaxed flex-1">
        {description}
      </p>

      {/* Links */}
      {hasLinks && (
        <div className="flex flex-wrap gap-4 pt-2 border-t border-white/[0.06]">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-silver hover:text-platinum transition-colors duration-150"
            >
              {t("projects.view_github")}
            </a>
          )}
          {project.links.testflight && (
            <a
              href={project.links.testflight}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-silver hover:text-platinum transition-colors duration-150"
            >
              {t("projects.view_testflight")}
            </a>
          )}
          {project.links.appstore && (
            <a
              href={project.links.appstore}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-silver hover:text-platinum transition-colors duration-150"
            >
              {t("projects.view_appstore")}
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-silver hover:text-platinum transition-colors duration-150"
            >
              {t("projects.view_live")}
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
