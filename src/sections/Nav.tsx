import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
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
  const prefersReduced = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [menuOpen])

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
        <a href="#hero" aria-label={t("nav.home_label")} className="flex items-center select-none">
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
          <nav className="hidden md:flex items-center gap-6" aria-label={t("nav.main_label")}>
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

          {/* Menu toggle — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={t(menuOpen ? "nav.menu_close" : "nav.menu_open")}
            className="md:hidden flex items-center justify-center w-9 h-9 -mr-2 rounded-lg text-silver hover:text-platinum transition-colors duration-150"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label={t("nav.main_label")}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-void border-b-[0.5px] border-white/[0.07]"
          >
            <ul className="flex flex-col px-6 py-2">
              {NAV_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-mono text-[14px] tracking-[1px] uppercase text-silver hover:text-platinum transition-colors duration-150"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
