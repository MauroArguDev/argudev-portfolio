// Normalizes form input before sending. This is not a security boundary:
// EmailJS can be called directly, so the email template must escape values.
export function sanitize(str: string, maxLength = 1000): string {
  return str
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, maxLength)
}
