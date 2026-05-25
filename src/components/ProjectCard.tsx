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
      className="glass rounded-2xl flex flex-col h-full overflow-hidden"
    >
      {/* Project image header */}
      {project.image && (
        <div className="w-full aspect-video overflow-hidden bg-obsidian shrink-0">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Type badge + year */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[1px] uppercase text-violet bg-violet/10 border border-violet/20">
            {project.type}
          </span>
          <span className="font-mono text-[12px] text-ash">{project.year}</span>
        </div>

        {/* Client label — shown when present */}
        {project.client && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-[1.5px] uppercase text-platinum select-none">
              {t("projects.client_label")}
            </span>
            <span className="font-display font-bold text-[14px] text-platinum tracking-tight">
              {project.client}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="font-display font-bold text-platinum leading-snug"
          style={{ fontSize: 20 }}
        >
          {project.name}
        </h3>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] tracking-[0.5px] text-violet/90 px-2 py-0.5 rounded-md border border-violet/20"
              style={{ background: "rgba(176,38,255,0.06)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-body text-[15px] text-silver leading-relaxed flex-1">
          {description}
        </p>

        {/* Links */}
        {hasLinks && (
          <div className="flex flex-wrap gap-3 pt-3 border-t border-white/[0.07]">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-violet hover:text-platinum transition-colors duration-150"
              >
                {t("projects.view_github")}
              </a>
            )}
            {project.links.testflight && (
              <a
                href={project.links.testflight}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-violet hover:text-platinum transition-colors duration-150"
              >
                {t("projects.view_testflight")}
              </a>
            )}
            {project.links.appstore && (
              <a
                href={project.links.appstore}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-violet hover:text-platinum transition-colors duration-150"
              >
                {t("projects.view_appstore")}
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-violet hover:text-platinum transition-colors duration-150"
              >
                {t("projects.view_live")}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
