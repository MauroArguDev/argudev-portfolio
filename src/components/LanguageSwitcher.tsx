import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const LANGUAGES = [
  { code: "en", label: "EN", ariaLabel: "Switch to English" },
  { code: "es", label: "ES", ariaLabel: "Switch to Spanish" },
  { code: "fr", label: "FR", ariaLabel: "Switch to French" },
]

const FADE_MS = 160

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current = i18n.language.slice(0, 2)

  async function handleChange(code: string) {
    if (code === current) return
    window.dispatchEvent(new CustomEvent("lang-fade-out"))
    await new Promise(r => setTimeout(r, FADE_MS))
    await i18n.changeLanguage(code)
    window.dispatchEvent(new CustomEvent("lang-fade-in"))
  }

  return (
    <div
      className="glass-label flex items-center !p-1"
      role="group"
      aria-label={t("lang.switcher_label")}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          aria-pressed={current === lang.code}
          aria-label={lang.ariaLabel}
          className="relative font-mono text-[12px] tracking-widest px-2 py-1 rounded"
        >
          {current === lang.code && (
            <motion.div
              layoutId="lang-indicator"
              className="absolute inset-0 rounded bg-violet/10 border border-violet/40"
              transition={{ type: "spring", stiffness: 500, damping: 38 }}
            />
          )}
          <span
            className={[
              "relative z-10 transition-colors duration-200",
              current === lang.code ? "text-violet" : "text-silver hover:text-platinum",
            ].join(" ")}
          >
            {lang.label}
          </span>
        </button>
      ))}
    </div>
  )
}
