import { useTranslation } from "react-i18next"

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language.slice(0, 2)

  return (
    <div className="flex items-center gap-1" role="group" aria-label={i18n.t("lang.switcher_label")}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-pressed={current === lang.code}
          className={[
            "font-mono text-[12px] tracking-widest px-2 py-1 rounded transition-all duration-150",
            current === lang.code
              ? "text-violet border border-violet/40 bg-violet/10"
              : "text-ash border border-transparent hover:text-platinum",
          ].join(" ")}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
