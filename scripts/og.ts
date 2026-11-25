// Renders the Open Graph image for a blog post with headless Chrome:
//   npm run og -- <slug>   →   public/blog/<slug>/og.png (1200×630)
// The blog plugin picks the image up on the next build. Set CHROME_PATH if Chrome isn't in /Applications.
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { LOGO_SHAPES, LOGO_VIEWBOX } from "../src/components/logoShapes.ts"
import { formatDate, loadPosts } from "../plugins/blog/posts.ts"
import { escapeHtml } from "../plugins/blog/templates.ts"

const root = path.resolve(import.meta.dirname, "..")
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

const slug = process.argv[2]
if (!slug) {
  console.error("Usage: npm run og -- <slug>")
  process.exit(1)
}

const post = loadPosts(root, { includeDrafts: true }).find((p) => p.slug === slug)
if (!post) {
  console.error(`No post with slug "${slug}" in content/blog`)
  process.exit(1)
}

// Fonts are inlined: Chrome won't load font files across file:// URLs
const font = (family: string, weight: number, file: string) => {
  const data = fs.readFileSync(path.join(root, "node_modules/@fontsource", file)).toString("base64")
  return `@font-face { font-family: "${family}"; font-weight: ${weight}; src: url(data:font/woff2;base64,${data}) format("woff2"); }`
}
const fonts = [
  font("Space Grotesk", 700, "space-grotesk/files/space-grotesk-latin-700-normal.woff2"),
  font("JetBrains Mono", 500, "jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2"),
].join("\n  ")

const logo = `<svg viewBox="${LOGO_VIEWBOX}" aria-hidden="true">${LOGO_SHAPES.map((shape) =>
  shape.type === "polygon"
    ? `<polygon points="${shape.points}" fill="currentColor" />`
    : `<path d="${shape.d}" fill="currentColor" />`).join("")}</svg>`

const html = fs
  .readFileSync(path.join(root, "scripts/og/template.html"), "utf8")
  .replace("{{fonts}}", fonts)
  .replace("{{logo}}", logo)
  // Hyphenated words ("local-first") stay on one line
  .replace("{{title}}", escapeHtml(post.title).replace(/\S+-\S+/g, (word) => `<span class="nowrap">${word}</span>`))
  .replace("{{meta}}", `${formatDate(post.date, "short")} · Mauricio Argumedo`)

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "argudev-og-"))
const page = path.join(tmp, "og.html")
fs.writeFileSync(page, html)

const out = path.join(root, "public/blog", slug, "og.png")
fs.mkdirSync(path.dirname(out), { recursive: true })

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  "--virtual-time-budget=2000",
  `--screenshot=${out}`,
  `file://${page}`,
], { stdio: "ignore" })

fs.rmSync(tmp, { recursive: true, force: true })
console.log(`Wrote ${path.relative(root, out)}`)
