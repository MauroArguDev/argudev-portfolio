import { useTranslation } from "react-i18next"
import { LogoMark } from "@/components/LogoMark"
import { contact, mailto } from "@/data/contact"

const NAV_LINKS = [
  { key: "nav.work", href: "#work" },
  { key: "nav.about", href: "#about" },
  { key: "nav.contact", href: "#contact" },
] as const

const CONNECT_LINKS = [
  { label: "GitHub", href: contact.github.href },
  { label: "LinkedIn", href: contact.linkedin.href },
  { label: contact.email, href: mailto },
] as const

const linkClass = "w-fit font-mono text-[13px] text-silver hover:text-platinum transition-colors duration-150"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative px-6 md:px-10 pt-24 pb-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-6 flex items-center gap-6">
            <LogoMark className="w-16 md:w-20 shrink-0 text-platinum" />
            <div>
              <p className="font-display font-bold text-[32px] leading-none tracking-[-0.03em]">
                <span className="text-platinum">Argu</span>
                <span className="text-violet">Dev</span>
                <span className="text-crimson">.</span>
              </p>
              <p className="mt-3 font-mono text-[12px] text-ash">{t("footer.tagline")}</p>
            </div>
          </div>

          <nav className="md:col-span-3 flex flex-col gap-3" aria-label={t("nav.main_label")}>
            {NAV_LINKS.map(({ key, href }) => (
              <a key={key} href={href} className={linkClass}>{t(key)}</a>
            ))}
          </nav>

          <div className="md:col-span-3 flex flex-col gap-3">
            {CONNECT_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className={linkClass}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-white/[0.06] font-mono text-[12px] text-ash">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Mauricio Argumedo · ArguDev</p>
            <p>
              {t("footer.credits")}{" "}
              <a
                href="https://www.instagram.com/danivan_design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver underline decoration-white/30 hover:text-platinum hover:decoration-platinum transition-colors duration-150"
              >
                Danivan Peña
              </a>
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <p>{t("footer.built_with")}</p>
            <a href="#hero" className="w-fit md:self-end text-silver hover:text-platinum transition-colors duration-150">
              ↑ {t("footer.back_to_top")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
