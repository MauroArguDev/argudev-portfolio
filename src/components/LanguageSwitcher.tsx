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
  const index = Math.max(0, LANGUAGES.findIndex((lang) => lang.code === current))

  async function handleChange(code: string) {
    if (code === current) return
    window.dispatchEvent(new CustomEvent("lang-fade-out"))
    await new Promise(r => setTimeout(r, FADE_MS))
    await i18n.changeLanguage(code)
    window.dispatchEvent(new CustomEvent("lang-fade-in"))
  }

  return (
    <div
      className="relative grid grid-cols-3 p-1 border border-white/10 bg-void/60"
      role="group"
      aria-label={t("lang.switcher_label")}
    >
      {/* Slides to the active language with a slight overshoot */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 w-[calc((100%-0.5rem)/3)] bg-violet/10 border border-violet/40 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          aria-pressed={current === lang.code}
          aria-label={lang.ariaLabel}
          className="relative font-mono text-[12px] tracking-widest px-2 py-1"
        >
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
