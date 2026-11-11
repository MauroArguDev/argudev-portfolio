import { useState } from "react"
import { useTranslation } from "react-i18next"
import emailjs from "@emailjs/browser"
import { AnimatedSection } from "@/components/AnimatedSection"
import { SectionHeader } from "@/components/SectionHeader"
import { emailjsConfig, isEmailjsConfigured } from "@/lib/emailjs"
import { sanitize } from "@/lib/sanitize"
import { contact, mailto } from "@/data/contact"

type Field = "name" | "email" | "message"
type SubmitError = "contact.error_generic" | "contact.error_unavailable"

const MAX_LENGTH: Record<Field, number> = { name: 100, email: 254, message: 1000 }
const MIN_MESSAGE_LENGTH = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_ERROR = {
  name: "contact.error_name",
  email: "contact.error_email",
  message: "contact.error_message",
} as const

function firstInvalidField(name: string, email: string, message: string): Field | null {
  if (!name.trim()) return "name"
  if (!EMAIL_PATTERN.test(email.trim())) return "email"
  if (message.trim().length < MIN_MESSAGE_LENGTH) return "message"
  return null
}

const CONTACT_LINKS = [
  { label: contact.email, href: mailto },
  contact.github,
  contact.linkedin,
] as const

const inputClass = [
  "w-full px-4 py-3 rounded-xl font-body text-[16px] text-platinum",
  "bg-graphite border border-white/10",
  "placeholder:text-silver/40",
  "focus:border-violet/50 focus:outline-none focus:ring-1 focus:ring-violet/30",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "transition-colors duration-150",
].join(" ")

export function Contact() {
  const { t } = useTranslation()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  // Honeypot: hidden from people, often filled in by spam bots.
  const [company, setCompany] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [invalidField, setInvalidField] = useState<Field | null>(null)
  const [error, setError] = useState<SubmitError | null>(null)

  const isDisabled = loading || sent

  const buttonLabel = sent
    ? t("contact.sent")
    : loading
    ? t("contact.submitting")
    : t("contact.submit")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const invalid = firstInvalidField(name, email, message)
    setInvalidField(invalid)
    if (invalid) {
      document.getElementById(`contact-${invalid}`)?.focus()
      return
    }

    if (company) {
      setSent(true)
      return
    }

    if (!isEmailjsConfigured) {
      if (import.meta.env.DEV) console.error("EmailJS is not configured: set the VITE_EMAILJS_* variables in .env")
      setError("contact.error_unavailable")
      return
    }

    setLoading(true)
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: sanitize(name, MAX_LENGTH.name),
          from_email: sanitize(email, MAX_LENGTH.email),
          message: sanitize(message, MAX_LENGTH.message),
          reply_to: sanitize(email, MAX_LENGTH.email),
        },
        emailjsConfig.publicKey,
      )
      setSent(true)
    } catch {
      setError("contact.error_generic")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedSection>
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={t("contact.eyebrow")}
            title={t("contact.heading")}
            subtitle={t("contact.sub")}
          />

          {/* Two-column: form + contact info */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-[12px] tracking-[1px] uppercase text-silver"
                >
                  {t("contact.name_label")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={MAX_LENGTH.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.name_placeholder")}
                  disabled={isDisabled}
                  aria-invalid={invalidField === "name"}
                  aria-describedby={invalidField === "name" ? "contact-error" : undefined}
                  className={inputClass}
                />
                {invalidField === "name" && <FieldError message={t(FIELD_ERROR.name)} />}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[12px] tracking-[1px] uppercase text-silver"
                >
                  {t("contact.email_label")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={MAX_LENGTH.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.email_placeholder")}
                  disabled={isDisabled}
                  aria-invalid={invalidField === "email"}
                  aria-describedby={invalidField === "email" ? "contact-error" : undefined}
                  className={inputClass}
                />
                {invalidField === "email" && <FieldError message={t(FIELD_ERROR.email)} />}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[12px] tracking-[1px] uppercase text-silver"
                >
                  {t("contact.message_label")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  maxLength={MAX_LENGTH.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.message_placeholder")}
                  disabled={isDisabled}
                  aria-invalid={invalidField === "message"}
                  aria-describedby={invalidField === "message" ? "contact-error" : undefined}
                  className={`${inputClass} resize-none`}
                />
                {invalidField === "message" && <FieldError message={t(FIELD_ERROR.message)} />}
              </div>

              {/* Honeypot — off-screen and hidden from assistive tech */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              {/* Submit error */}
              {error && (
                <p role="alert" className="font-mono text-[12px] text-crimson">
                  {t(error)}
                </p>
              )}

              {/* Success — the live region stays mounted so the update is announced */}
              <p role="status" className="font-mono text-[12px] text-silver empty:hidden">
                {sent ? t("contact.sent_note") : ""}
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full px-6 py-3 rounded-xl font-body font-medium text-[16px] text-platinum bg-violet hover:bg-violet-2 shadow-glow disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {buttonLabel}
              </button>
            </form>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <p className="font-mono text-[12px] tracking-[1.5px] uppercase text-silver">
                {t("contact.direct")}
              </p>
              <ul className="flex flex-col gap-3" aria-label={t("contact.links_label")}>
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

function FieldError({ message }: { message: string }) {
  return (
    <p id="contact-error" className="font-mono text-[12px] text-crimson">
      {message}
    </p>
  )
}
