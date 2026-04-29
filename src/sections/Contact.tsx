import { useState } from "react"
import { useTranslation } from "react-i18next"
import emailjs from "@emailjs/browser"
import { AnimatedSection } from "@/components/AnimatedSection"
import { emailjsConfig } from "@/lib/emailjs"
import { sanitize } from "@/lib/sanitize"

const CONTACT_LINKS = [
  { label: "argudev@proton.me", href: "mailto:argudev@proton.me" },
  { label: "github.com/MauroArguDev", href: "https://github.com/MauroArguDev" },
  { label: "linkedin.com/in/mauro-argumedo-1942801ab", href: "https://www.linkedin.com/in/mauro-argumedo-1942801ab/" },
] as const

const inputClass = [
  "w-full px-4 py-3 rounded-xl font-body text-[16px] text-platinum",
  "bg-graphite border border-white/10",
  "placeholder:text-ash",
  "focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "transition-colors duration-150",
].join(" ")

export function Contact() {
  const { t } = useTranslation()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const isDisabled = loading || sent

  const buttonLabel = sent
    ? t("contact.sent")
    : loading
    ? t("contact.submitting")
    : t("contact.submit")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: sanitize(name),
          from_email: sanitize(email),
          message: sanitize(message),
          reply_to: sanitize(email),
        },
        emailjsConfig.publicKey,
      )
      setSent(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedSection>
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-violet rounded-full" aria-hidden="true" />
            <span className="font-mono text-[13px] tracking-[1px] uppercase text-silver">
              {t("contact.eyebrow")}
            </span>
          </div>

          {/* Heading + subheading */}
          <h2
            className="font-display font-semibold text-platinum leading-tight mb-3"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.3px" }}
          >
            {t("contact.heading")}
          </h2>
          <p className="font-body text-[16px] text-silver mb-14">
            {t("contact.sub")}
          </p>

          {/* Two-column: form + contact info */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-[12px] tracking-[1px] uppercase text-ash"
                >
                  {t("contact.name_label")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.name_placeholder")}
                  disabled={isDisabled}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[12px] tracking-[1px] uppercase text-ash"
                >
                  {t("contact.email_label")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.email_placeholder")}
                  disabled={isDisabled}
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[12px] tracking-[1px] uppercase text-ash"
                >
                  {t("contact.message_label")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.message_placeholder")}
                  disabled={isDisabled}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error */}
              {error && (
                <p role="alert" className="font-mono text-[12px] text-crimson">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full px-6 py-3 rounded-xl font-body font-medium text-[16px] text-platinum bg-violet hover:bg-violet-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                style={{ boxShadow: isDisabled ? "none" : "0 0 24px rgba(176,38,255,0.4)" }}
              >
                {buttonLabel}
              </button>
            </form>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <p className="font-mono text-[12px] tracking-[1.5px] uppercase text-ash">
                Direct contact
              </p>
              <ul className="flex flex-col gap-3" aria-label="Contact links">
                {CONTACT_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="font-mono text-[14px] text-silver hover:text-platinum transition-colors duration-150 break-all"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
