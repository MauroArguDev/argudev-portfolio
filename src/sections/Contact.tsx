import { useState } from "react"
import { useTranslation } from "react-i18next"
import emailjs from "@emailjs/browser"
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
  "cut cut-sm block w-full px-4 py-3.5 bg-obsidian font-body text-[16px] text-platinum",
  "placeholder:text-silver/60",
  "focus:outline-none focus-visible:outline-none",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ")

// The cut-corner outline: violet while focused, crimson when the field is invalid
const fieldFrame = [
  "cut cut-sm p-px bg-white/15",
  "focus-within:bg-violet has-[[aria-invalid=true]]:bg-crimson",
  "transition-colors duration-150",
].join(" ")

const labelClass = "font-mono text-[11px] tracking-[0.12em] uppercase text-ash"

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
    <section id="contact" className="relative px-6 md:px-10 py-20 md:py-40 border-t border-white/[0.06] overflow-hidden">
      <div className="hero-light -right-1/4 top-0 w-[70%] h-full opacity-60" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          index={t("contact.index")}
          eyebrow={t("contact.eyebrow")}
          title={t("contact.heading")}
          subtitle={t("contact.sub")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className={labelClass}>
                  {t("contact.name_label")}
                </label>
                <div className={fieldFrame}>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={MAX_LENGTH.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("contact.name_placeholder")}
                    disabled={isDisabled}
                    aria-invalid={invalidField === "name"}
                    aria-describedby={invalidField === "name" ? "contact-error" : undefined}
                    className={inputClass}
                  />
                </div>
                {invalidField === "name" && <FieldError message={t(FIELD_ERROR.name)} />}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className={labelClass}>
                  {t("contact.email_label")}
                </label>
                <div className={fieldFrame}>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={MAX_LENGTH.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.email_placeholder")}
                    disabled={isDisabled}
                    aria-invalid={invalidField === "email"}
                    aria-describedby={invalidField === "email" ? "contact-error" : undefined}
                    className={inputClass}
                  />
                </div>
                {invalidField === "email" && <FieldError message={t(FIELD_ERROR.email)} />}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={labelClass}>
                {t("contact.message_label")}
              </label>
              <div className={fieldFrame}>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  maxLength={MAX_LENGTH.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.message_placeholder")}
                  disabled={isDisabled}
                  aria-invalid={invalidField === "message"}
                  aria-describedby={invalidField === "message" ? "contact-error" : undefined}
                  className={`${inputClass} resize-none`}
                />
              </div>
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

            {error && (
              <p role="alert" className="font-mono text-[12px] text-crimson">
                {t(error)}
              </p>
            )}

            {/* Success — the live region stays mounted so the update is announced */}
            <p role="status" className="font-mono text-[12px] text-silver empty:hidden">
              {sent ? t("contact.sent_note") : ""}
            </p>

            <button
              type="submit"
              disabled={isDisabled}
              className="cut cut-sm self-start inline-flex items-center gap-3 px-8 py-4 bg-violet hover:bg-violet-2 font-body font-medium text-[16px] text-platinum disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {buttonLabel}
              {!isDisabled && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="lg:col-span-5 lg:pl-10 lg:border-l border-white/[0.08]">
            <p className={labelClass}>{t("contact.direct")}</p>
            <ul className="mt-6 flex flex-col" aria-label={t("contact.links_label")}>
              {CONTACT_LINKS.map(({ label, href }) => (
                <li key={href} className="border-b border-white/[0.08]">
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group flex items-center justify-between gap-4 py-5 font-mono text-[14px] text-silver hover:text-platinum transition-colors duration-150 break-all"
                  >
                    {label}
                    <span aria-hidden="true" className="shrink-0 text-ash group-hover:text-violet transition-colors duration-150">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p id="contact-error" className="mt-2 font-mono text-[12px] text-crimson">
      {message}
    </p>
  )
}
