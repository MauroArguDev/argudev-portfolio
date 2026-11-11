import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

const NAV_LINKS = [
  { index: "01", key: "nav.work", href: "#work" },
  { index: "02", key: "nav.about", href: "#about" },
  { index: "03", key: "nav.contact", href: "#contact" },
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
    <header className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-void/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <a href="#hero" aria-label={t("nav.home_label")} className="flex items-center select-none">
          <picture>
            <source srcSet="/logo.avif" type="image/avif" />
            <img src="/logo.png" alt="ArguDev" width={896} height={243} className="h-7 md:h-8 w-auto" />
          </picture>
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8" aria-label={t("nav.main_label")}>
            {NAV_LINKS.map(({ index, key, href }) => (
              <a
                key={key}
                href={href}
                className="group flex items-baseline gap-2 font-mono text-[12px] tracking-[0.12em] uppercase text-silver hover:text-platinum transition-colors duration-150"
              >
                <span className="text-ash group-hover:text-violet transition-colors duration-150">{index}</span>
                {t(key)}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={t(menuOpen ? "nav.menu_close" : "nav.menu_open")}
            className="md:hidden flex items-center justify-center w-9 h-9 -mr-2 text-silver hover:text-platinum transition-colors duration-150"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label={t("nav.main_label")}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-void border-b border-white/[0.08]"
          >
            <ul className="flex flex-col px-6 py-3">
              {NAV_LINKS.map(({ index, key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-4 border-b border-white/[0.06] last:border-0 font-display font-bold text-[28px] tracking-tight text-platinum"
                  >
                    <span className="font-mono text-[12px] font-normal text-violet">{index}</span>
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
