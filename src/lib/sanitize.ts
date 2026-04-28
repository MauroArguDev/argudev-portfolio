export function sanitize(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 1000)
}
