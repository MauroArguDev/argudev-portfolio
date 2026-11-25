import fs from "node:fs"
import path from "node:path"
import { Marked } from "marked"

export interface Post {
  slug: string
  title: string
  description: string
  /** YYYY-MM-DD */
  date: string
  /** Drafts render in dev and are left out of the build */
  draft: boolean
  /** Site-relative path of the Open Graph image */
  image: string
  html: string
  readingMinutes: number
}

export const CONTENT_DIR = "content/blog"
const DEFAULT_IMAGE = "/og.jpg"
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

const marked = new Marked({
  gfm: true,
  renderer: {
    // Section headings get an id so they can be linked to
    heading({ tokens, depth, text }) {
      const id = text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`
    },
  },
})

/** Reads every post in content/blog, newest first. */
export function loadPosts(root: string, { includeDrafts = false } = {}): Post[] {
  const dir = path.join(root, CONTENT_DIR)
  if (!fs.existsSync(dir)) return []

  const posts = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(root, file, fs.readFileSync(path.join(dir, file), "utf8")))
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))

  return posts
}

function parsePost(root: string, file: string, source: string): Post {
  const where = `${CONTENT_DIR}/${file}`
  const { data, body } = parseFrontmatter(source, where)

  for (const key of ["title", "date", "description", "slug"]) {
    if (!data[key]) throw new Error(`${where}: frontmatter is missing "${key}"`)
  }
  if (!SLUG.test(data.slug)) throw new Error(`${where}: slug "${data.slug}" must be lowercase words joined by hyphens`)
  if (`${data.slug}.md` !== file) throw new Error(`${where}: the file name must match the slug ("${data.slug}.md")`)
  if (!DATE.test(data.date) || Number.isNaN(Date.parse(data.date))) {
    throw new Error(`${where}: date "${data.date}" must be a valid YYYY-MM-DD date`)
  }

  // An image at public/blog/<slug>/og.png (made with `npm run og -- <slug>`) is picked up automatically
  const ownImage = `/blog/${data.slug}/og.png`
  const image = data.image ?? (fs.existsSync(path.join(root, "public", ownImage)) ? ownImage : DEFAULT_IMAGE)

  const words = body.split(/\s+/).filter(Boolean).length

  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    date: data.date,
    draft: data.draft === "true",
    image,
    html: marked.parse(body, { async: false }),
    readingMinutes: Math.max(1, Math.round(words / 230)),
  }
}

/** A deliberately small frontmatter reader: one `key: value` per line, values optionally quoted. */
export function parseFrontmatter(source: string, where: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source)
  if (!match) throw new Error(`${where}: the file must start with a --- frontmatter block`)

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue
    const colon = line.indexOf(":")
    if (colon === -1) throw new Error(`${where}: frontmatter line "${line}" is not "key: value"`)
    let value = line.slice(colon + 1).trim()
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1)
    data[line.slice(0, colon).trim()] = value
  }

  return { data, body: match[2] }
}

/** "November 30, 2026" */
export function formatDate(date: string, month: "long" | "short" = "long") {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month,
    day: "numeric",
  })
}
