import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { navEntrance } from "@/lib/motion"

const NAV_LINKS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
] as const

export function Nav() {
  const { t } = useTranslation()

  return (
    <motion.header
      variants={navEntrance}
      initial="hidden"
      animate="show"
      style={{
        background: "rgba(7,7,12,0.7)",
        backdropFilter: "blur(28px) saturate(200%)",
        WebkitBackdropFilter: "blur(28px) saturate(200%)",
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
      }}
      className="fixed top-0 left-0 right-0 z-50 h-[52px] md:h-[56px]"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" aria-label="ArguDev home" className="flex items-center select-none">
          <picture>
            <source srcSet="/logo.avif" type="image/avif" />
            <img
              src="/logo.png"
              alt="ArguDev"
              width={896}
              height={243}
              style={{ height: 34, width: "auto" }}
            />
          </picture>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Nav links — desktop only */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-mono text-[13px] tracking-[1px] uppercase text-silver hover:text-platinum transition-colors duration-150"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  )
}
