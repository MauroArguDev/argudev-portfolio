import { useTranslation } from "react-i18next"

const NAV_LINKS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
] as const

const CONNECT_LINKS = [
  { label: "GitHub", href: "https://github.com/MauroArguDev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mauro-argumedo-1942801ab/" },
  { label: "argudev@proton.me", href: "mailto:argudev@proton.me" },
] as const

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className="px-6 md:px-12 lg:px-24 pt-14 pb-10"
      style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline select-none">
              <span className="font-display font-bold text-platinum" style={{ fontSize: 24, letterSpacing: "-1px", lineHeight: 1 }}>Argu</span>
              <span className="font-display font-bold text-violet"   style={{ fontSize: 24, letterSpacing: "-1px", lineHeight: 1 }}>Dev</span>
              <span className="font-display font-bold text-crimson"  style={{ fontSize: 24, letterSpacing: "-1px", lineHeight: 1 }}>.</span>
            </div>
            <p className="font-mono text-[12px] text-silver">
              {t("footer.tagline")}
            </p>
            <p className="font-mono text-[11px] text-ash">
              {t("footer.available")}
            </p>
          </div>

          {/* Navigate column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-ash">
              {t("footer.nav_heading")}
            </p>
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-mono text-[12px] text-silver hover:text-platinum transition-colors duration-150 w-fit"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Connect column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-ash">
              {t("footer.connect_heading")}
            </p>
            {CONNECT_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="font-mono text-[12px] text-silver hover:text-platinum transition-colors duration-150 w-fit"
              >
                {label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-mono text-[10px] text-ash">
            © 2026 Mauro Argumedo · ArguDev
          </p>
          <p className="font-mono text-[10px] text-ash">
            {t("footer.built_with")}
          </p>
        </div>

      </div>
    </footer>
  )
}
