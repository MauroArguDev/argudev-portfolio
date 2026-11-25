// Static HTML for the blog. These pages ship no JavaScript of their own: the markup mirrors
// Nav and Footer from src/sections and uses the site's stylesheet (Tailwind scans this file).
import { contact, mailto } from "../../src/data/contact.ts"
import { LOGO_SHAPES, LOGO_VIEWBOX } from "../../src/components/logoShapes.ts"
import { formatDate, type Post } from "./posts.ts"

export const SITE = "https://argudev.com"
const AUTHOR = "Mauricio Argumedo"
const BLOG_TITLE = "Blog · Mauricio Argumedo | ArguDev"
const BLOG_DESCRIPTION = "Write-ups by Mauricio Argumedo, iOS developer, on how his apps are built and the decisions behind them."

/** UI strings, taken from src/locales/en/translation.json */
export interface Labels {
  nav: { work: string; about: string; contact: string; blog: string; menu_open: string; main_label: string; home_label: string }
  footer: { tagline: string; built_with: string; credits: string; back_to_top: string }
  a11y: { skip_to_content: string }
}

export interface PageContext {
  labels: Labels
  /** Tags that load the stylesheet (and, in dev, the Vite client) */
  styles: string
  /** Tags at the end of <body>: Vercel Analytics and Speed Insights in production */
  scripts: string
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const e = escapeHtml

// ── Pages ──────────────────────────────────────────────────────────────────

export function renderIndex(posts: Post[], ctx: PageContext) {
  const list = posts.length
    ? `<ul class="flex flex-col gap-6">${posts.map(postCard).join("")}</ul>`
    : `<p class="text-silver">No posts yet.</p>`

  return page(ctx, {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    path: "/blog",
    image: "/og.jpg",
    imageAlt: "Mauricio Argumedo, iOS developer, framed by the ArguDev mark",
    type: "website",
    body: `
    <main id="main" tabindex="-1" class="relative px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-32 outline-none">
      <div class="max-w-3xl mx-auto">
        <header class="mb-14 md:mb-20">
          <p class="flex items-center gap-3 font-mono text-[12px] tracking-[0.12em] uppercase text-ash mb-6">
            <span class="text-violet">04</span>
            <span class="w-8 h-px bg-white/20" aria-hidden="true"></span>
            ${e(ctx.labels.nav.blog)}
          </p>
          <h1 class="font-display font-bold text-section text-platinum max-w-[16ch]">Building and shipping iOS apps.</h1>
          <p class="mt-6 max-w-[52ch] font-body text-[17px] leading-relaxed text-silver">How my apps are built and the decisions behind them.</p>
        </header>
        ${list}
      </div>
    </main>`,
  })
}

export function renderPost(post: Post, ctx: PageContext) {
  const url = `${SITE}/blog/${post.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
    mainEntityOfPage: url,
    image: `${SITE}${post.image}`,
    inLanguage: "en",
    author: { "@type": "Person", "@id": `${SITE}/#person`, name: AUTHOR, url: SITE },
  }

  return page(ctx, {
    title: `${post.title} | ArguDev`,
    socialTitle: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.title,
    type: "article",
    head: `
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:author" content="${AUTHOR}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
    body: `
    <main id="main" tabindex="-1" class="relative px-6 md:px-10 pt-28 md:pt-40 pb-24 md:pb-32 outline-none">
      <article class="max-w-2xl mx-auto">
        <a href="/blog" class="inline-flex font-mono text-[12px] tracking-[0.12em] uppercase text-silver hover:text-platinum transition-colors duration-150">← All posts</a>
        <header class="mt-10 md:mt-14 mb-12 md:mb-16">
          <p class="font-mono text-[12px] tracking-[0.12em] uppercase text-ash">${postMeta(post)}</p>
          <h1 style="${titleTransition(post)}" class="mt-5 font-display font-bold text-[clamp(36px,5.6vw,60px)] leading-[1.02] tracking-[-0.035em] text-platinum text-balance">${e(post.title)}</h1>
          <p class="mt-6 font-body text-[19px] leading-snug text-silver">${e(post.description)}</p>
          <p class="mt-8 flex items-center gap-3 font-mono text-[12px] tracking-[0.08em] uppercase text-silver">
            <span class="w-8 h-px bg-violet" aria-hidden="true"></span>
            ${AUTHOR}
          </p>
        </header>
        <div class="post">
${post.html}
        </div>
        ${authorCard()}
      </article>
    </main>`,
  })
}

export function renderNotFound(ctx: PageContext) {
  return page(ctx, {
    title: "Page not found | ArguDev",
    description: BLOG_DESCRIPTION,
    path: "/404",
    image: "/og.jpg",
    imageAlt: "Mauricio Argumedo, iOS developer, framed by the ArguDev mark",
    type: "website",
    noindex: true,
    body: `
    <main id="main" tabindex="-1" class="relative px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-32 outline-none">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[12px] tracking-[0.12em] uppercase text-violet mb-6">404</p>
        <h1 class="font-display font-bold text-section text-platinum">Page not found.</h1>
        <p class="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[13px] uppercase tracking-[0.12em]">
          <a href="/blog" class="text-silver hover:text-platinum transition-colors duration-150">← All posts</a>
          <a href="/" class="text-silver hover:text-platinum transition-colors duration-150">argudev.com</a>
        </p>
      </div>
    </main>`,
  })
}

// ── Feeds ──────────────────────────────────────────────────────────────────

export function renderRss(posts: Post[]) {
  const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString()
  const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`
  const items = posts
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`
      return `
    <item>
      <title>${e(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${e(post.description)}</description>
      <content:encoded>${cdata(post.html)}</content:encoded>
    </item>`
    })
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>ArguDev Blog</title>
    <link>${SITE}/blog</link>
    <description>${e(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />${posts[0] ? `
    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>` : ""}${items}
  </channel>
</rss>
`
}

export function renderSitemap(posts: Post[]) {
  const urls = [
    { loc: `${SITE}/` },
    { loc: `${SITE}/blog`, lastmod: posts[0]?.date },
    ...posts.map((post) => ({ loc: `${SITE}/blog/${post.slug}`, lastmod: post.date })),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>
`
}

// ── Pieces ─────────────────────────────────────────────────────────────────

interface PageOptions {
  title: string
  /** og:title and twitter:title, when they should differ from <title> */
  socialTitle?: string
  description: string
  path: string
  image: string
  imageAlt: string
  type: "website" | "article"
  noindex?: boolean
  head?: string
  body: string
}

function page(ctx: PageContext, o: PageOptions) {
  const url = `${SITE}${o.path}`
  const image = `${SITE}${o.image}`
  const socialTitle = e(o.socialTitle ?? o.title)

  return `<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0A0A0F" />
  <title>${e(o.title)}</title>
  <meta name="description" content="${e(o.description)}" />
  <meta name="author" content="${AUTHOR}" />
  <meta name="robots" content="${o.noindex ? "noindex" : "index, follow"}" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate" type="application/rss+xml" title="ArguDev Blog" href="${SITE}/blog/rss.xml" />

  <!-- Open Graph -->
  <meta property="og:type" content="${o.type}" />
  <meta property="og:site_name" content="ArguDev" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${socialTitle}" />
  <meta property="og:description" content="${e(o.description)}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${e(o.imageAlt)}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ArguDev" />
  <meta name="twitter:creator" content="@ArguDev" />
  <meta name="twitter:title" content="${socialTitle}" />
  <meta name="twitter:description" content="${e(o.description)}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:image:alt" content="${e(o.imageAlt)}" />
${o.head ?? ""}
  ${ctx.styles}
</head>

<body>
  ${skipLink(ctx.labels)}
  <div class="backdrop" aria-hidden="true"></div>
  ${header(ctx.labels)}
  ${o.body}
  ${footer(ctx.labels)}
  ${ctx.scripts}
</body>

</html>
`
}

function navLinks(labels: Labels) {
  return [
    { index: "01", label: labels.nav.work, href: "/#work" },
    { index: "02", label: labels.nav.about, href: "/#about" },
    { index: "03", label: labels.nav.contact, href: "/#contact" },
    { index: "04", label: labels.nav.blog, href: "/blog", current: true },
  ]
}

function skipLink(labels: Labels) {
  return `<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet focus:text-platinum focus:font-mono focus:text-[14px] focus:shadow-lg">${e(labels.a11y.skip_to_content)}</a>`
}

function header(labels: Labels) {
  const links = navLinks(labels)
  const desktop = links
    .map(({ index, label, href, current }) => `
          <a href="${href}"${current ? ` aria-current="page"` : ""} class="group flex items-baseline gap-2 font-mono text-[12px] tracking-[0.12em] uppercase ${current ? "text-platinum" : "text-silver"} hover:text-platinum transition-colors duration-150">
            <span class="${current ? "text-violet" : "text-ash"} group-hover:text-violet transition-colors duration-150">${index}</span>
            ${e(label)}
          </a>`)
    .join("")
  const mobile = links
    .map(({ index, label, href, current }) => `
            <li>
              <a href="${href}"${current ? ` aria-current="page"` : ""} class="flex items-baseline gap-4 py-4 border-b border-white/[0.06] font-display font-bold text-[28px] tracking-tight text-platinum">
                <span class="font-mono text-[12px] font-normal text-violet">${index}</span>
                ${e(label)}
              </a>
            </li>`)
    .join("")

  // The mobile menu is a <details> element so it works without JavaScript
  return `<header class="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-void/80 backdrop-blur-xl border-b border-white/[0.06] [view-transition-name:site-header]">
    <div class="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
      <a href="/" aria-label="${e(labels.nav.home_label)}" class="flex items-center select-none">
        <picture>
          <source srcset="/logo.avif" type="image/avif" />
          <img src="/logo.png" alt="ArguDev" width="896" height="243" class="h-7 md:h-8 w-auto" />
        </picture>
      </a>
      <nav class="hidden md:flex items-center gap-8" aria-label="${e(labels.nav.main_label)}">${desktop}
      </nav>
      <details class="md:hidden group/menu">
        <summary aria-label="${e(labels.nav.menu_open)}" class="list-none [&::-webkit-details-marker]:hidden flex items-center justify-center w-9 h-9 -mr-2 cursor-pointer text-silver hover:text-platinum transition-colors duration-150">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path class="group-open/menu:hidden" d="M3 6h14M3 10h14M3 14h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" />
            <path class="hidden group-open/menu:block" d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" />
          </svg>
        </summary>
        <nav aria-label="${e(labels.nav.main_label)}" class="absolute top-full left-0 right-0 bg-void border-b border-white/[0.08]">
          <ul class="flex flex-col px-6 py-3 [&>li:last-child>a]:border-0">${mobile}
          </ul>
        </nav>
      </details>
    </div>
  </header>`
}

function footer(labels: Labels) {
  const linkClass = "w-fit font-mono text-[13px] text-silver hover:text-platinum transition-colors duration-150"
  const nav = navLinks(labels)
    .map(({ label, href }) => `<a href="${href}" class="${linkClass}">${e(label)}</a>`)
    .join("\n          ")
  const connect = [
    { label: "GitHub", href: contact.github.href },
    { label: "LinkedIn", href: contact.linkedin.href },
    { label: "X", href: contact.x.href },
    { label: "Instagram", href: contact.instagram.href },
    { label: "RSS", href: "/blog/rss.xml", internal: true },
  ]
    .map(({ label, href, internal }) =>
      `<a href="${href}"${internal ? "" : ` target="_blank" rel="noopener noreferrer"`} class="${linkClass}">${label}</a>`)
    .concat(`<a href="${mailto}" class="${linkClass}">${contact.email}</a>`)
    .join("\n          ")

  return `<footer class="relative px-6 md:px-10 pt-24 pb-10 border-t border-white/[0.06]">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        <div class="md:col-span-6 flex items-center gap-6">
          ${logoMark("w-16 md:w-20 shrink-0 text-platinum")}
          <div>
            <p class="font-display font-bold text-[32px] leading-none tracking-[-0.03em]">
              <span class="text-platinum">Argu</span><span class="text-violet">Dev</span><span class="text-crimson">.</span>
            </p>
            <p class="mt-3 font-mono text-[12px] text-ash">${e(labels.footer.tagline)}</p>
          </div>
        </div>
        <nav class="md:col-span-3 flex flex-col gap-3" aria-label="${e(labels.nav.main_label)}">
          ${nav}
        </nav>
        <div class="md:col-span-3 flex flex-col gap-3">
          ${connect}
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-white/[0.06] font-mono text-[12px] text-ash">
        <div class="flex flex-col gap-1">
          <p>© ${new Date().getFullYear()} ${AUTHOR} · ArguDev</p>
          <p>
            ${e(labels.footer.credits)}
            <a href="https://www.instagram.com/danivan_design" target="_blank" rel="noopener noreferrer" class="text-silver underline decoration-white/30 hover:text-platinum hover:decoration-platinum transition-colors duration-150">Danivan Peña</a>
          </p>
        </div>
        <div class="flex flex-col md:items-end gap-1">
          <p>${e(labels.footer.built_with)}</p>
          <a href="#main" class="w-fit md:self-end text-silver hover:text-platinum transition-colors duration-150">↑ ${e(labels.footer.back_to_top)}</a>
        </div>
      </div>
    </div>
  </footer>`
}

/** Pairs a post's card title on /blog with its headline, so the title travels between them */
function titleTransition(post: Post) {
  return `view-transition-name: post-title-${post.slug}; view-transition-class: post-title`
}

function postMeta(post: Post) {
  return `<time datetime="${post.date}">${formatDate(post.date)}</time> · ${post.readingMinutes} min read`
}

function postCard(post: Post) {
  return `
          <li>
            <a href="/blog/${post.slug}" class="group block cut cut-line">
              <div class="cut bg-obsidian group-hover:bg-graphite transition-colors duration-150 p-6 sm:p-8">
                <p class="font-mono text-[12px] tracking-[0.12em] uppercase text-ash">${postMeta(post)}</p>
                <h2 style="${titleTransition(post)}" class="mt-3 font-display font-bold text-[clamp(24px,3vw,32px)] leading-[1.1] tracking-[-0.02em] text-platinum text-balance">${e(post.title)}</h2>
                <p class="mt-3 font-body text-[16px] leading-relaxed text-silver">${e(post.description)}</p>
                <p class="mt-6 font-mono text-[12px] tracking-[0.12em] uppercase text-violet">
                  Read <span class="inline-block transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
                </p>
              </div>
            </a>
          </li>`
}

function authorCard() {
  return `<aside class="mt-20 md:mt-24 cut cut-lg cut-line">
          <div class="cut cut-lg bg-obsidian p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:items-center">
            ${logoMark("w-14 shrink-0 text-violet")}
            <div>
              <p class="font-body text-[16px] leading-relaxed text-silver">
                <span class="text-platinum">${AUTHOR}</span> is an iOS developer with 5+ years taking apps from the first commit to the App Store. Available for remote roles and relocation.
              </p>
              <p class="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-[0.12em] uppercase">
                <a href="/#contact" class="text-violet hover:text-platinum transition-colors duration-150">Get in touch →</a>
                <a href="/#work" class="text-silver hover:text-platinum transition-colors duration-150">See my work →</a>
              </p>
            </div>
          </div>
        </aside>`
}

function logoMark(className: string) {
  const shapes = LOGO_SHAPES.map((shape) =>
    shape.type === "polygon"
      ? `<polygon points="${shape.points}" fill="currentColor" />`
      : `<path d="${shape.d}" fill="currentColor" />`)
    .join("")
  return `<svg viewBox="${LOGO_VIEWBOX}" class="${className}" aria-hidden="true">${shapes}</svg>`
}
