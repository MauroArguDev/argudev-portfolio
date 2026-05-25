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
            <a href="#hero" aria-label="ArguDev home" className="select-none w-fit">
              <picture>
                <source srcSet="/logo.avif" type="image/avif" />
                <img
                  src="/logo.png"
                  alt="ArguDev"
                  width={896}
                  height={243}
                  style={{ height: 28, width: "auto" }}
                />
              </picture>
            </a>
            <p className="font-mono text-[13px] text-silver">
              {t("footer.tagline")}
            </p>
            <p className="font-mono text-[12px] text-silver">
              {t("footer.available")}
            </p>
          </div>

          {/* Navigate column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[13px] tracking-[1.5px] uppercase text-silver">
              {t("footer.nav_heading")}
            </p>
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="font-mono text-[13px] text-silver hover:text-platinum transition-colors duration-150 w-fit"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Connect column */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[13px] tracking-[1.5px] uppercase text-silver">
              {t("footer.connect_heading")}
            </p>
            {CONNECT_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="font-mono text-[13px] text-silver hover:text-platinum transition-colors duration-150 w-fit"
              >
                {label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-mono text-[13px] text-silver">
            © 2026 Mauro Argumedo · ArguDev
          </p>
          <div className="flex flex-col sm:items-end gap-1">
            <p className="font-mono text-[13px] text-silver">
              {t("footer.built_with")}
            </p>
            <p className="font-mono text-[13px] text-silver">
              Brand identity, photography &amp; design by{" "}
              <a
                href="https://www.instagram.com/danivan_design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-platinum underline decoration-platinum/40 hover:decoration-platinum transition-colors duration-150"
              >
                Danivan Peña
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
