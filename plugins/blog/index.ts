// Turns content/blog/*.md into static pages at build time:
//   /blog                 → dist/blog.html
//   /blog/<slug>          → dist/blog/<slug>.html
//   /blog/rss.xml, /sitemap.xml and a /404.html for unknown blog URLs
// The pages are flat .html files so they're served at clean URLs both by `vite preview` and by
// Vercel (cleanUrls in vercel.json); the SPA rewrite there skips /blog.
// In dev the same pages are rendered on request, so a post can be previewed while it's written.
import fs from "node:fs"
import path from "node:path"
import type { Plugin, ResolvedConfig } from "vite"
import { CONTENT_DIR, loadPosts } from "./posts.ts"
import {
  escapeHtml,
  renderIndex,
  renderNotFound,
  renderPost,
  renderRss,
  renderSitemap,
  type Labels,
  type PageContext,
} from "./templates.ts"

const ANALYTICS = [
  `<script defer src="/_vercel/insights/script.js"></script>`,
  `<script defer src="/_vercel/speed-insights/script.js"></script>`,
].join("\n  ")

export function blog(): Plugin {
  let config: ResolvedConfig

  const labels = (): Labels =>
    JSON.parse(fs.readFileSync(path.join(config.root, "src/locales/en/translation.json"), "utf8"))

  return {
    name: "argudev-blog",

    configResolved(resolved) {
      config = resolved
    },

    configureServer(server) {
      const contentDir = path.join(config.root, CONTENT_DIR)
      server.watcher.add(contentDir)
      server.watcher.on("all", (_event, file) => {
        if (file.startsWith(contentDir)) server.ws.send({ type: "full-reload" })
      })

      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? "").split("?")[0]
        const match = /^\/blog(?:\/([a-z0-9-]+))?\/?$/.exec(url)
        const isRss = url === "/blog/rss.xml"
        if (!match && !isRss) return next()

        try {
          const posts = loadPosts(config.root, { includeDrafts: true })
          if (isRss) {
            res.setHeader("Content-Type", "application/rss+xml; charset=utf-8")
            res.end(renderRss(posts))
            return
          }

          const ctx: PageContext = {
            labels: labels(),
            // Render-blocking: Vite injects dev CSS from JS, and without it the first frame
            // (the one the page transition captures) would be unstyled
            styles: `<script type="module" blocking="render" src="/src/styles/blog-dev.ts"></script>`,
            scripts: "",
          }
          const slug = match?.[1]
          const post = slug ? posts.find((p) => p.slug === slug) : undefined
          const html = !slug ? renderIndex(posts, ctx) : post ? renderPost(post, ctx) : renderNotFound(ctx)

          res.statusCode = slug && !post ? 404 : 200
          res.setHeader("Content-Type", "text/html; charset=utf-8")
          res.end(await server.transformIndexHtml(url, html))
        } catch (error) {
          // Frontmatter mistakes show up in the browser instead of a blank page
          res.statusCode = 500
          res.setHeader("Content-Type", "text/html; charset=utf-8")
          res.end(`<pre style="padding:2rem;white-space:pre-wrap">${escapeHtml(String(error))}</pre>`)
        }
      })
    },

    generateBundle(_options, bundle) {
      if (config.command !== "build") return

      // The app's entry stylesheet carries the Tailwind build, the tokens and the fonts
      const css = Object.values(bundle).flatMap((file) =>
        file.type === "chunk" && file.isEntry ? [...(file.viteMetadata?.importedCss ?? [])] : [])
      if (css.length === 0) throw new Error("argudev-blog: could not find the app's stylesheet in the bundle")

      const ctx: PageContext = {
        labels: labels(),
        styles: css.map((file) => `<link rel="stylesheet" href="${config.base}${file}" />`).join("\n  "),
        scripts: ANALYTICS,
      }
      const posts = loadPosts(config.root)

      const emit = (fileName: string, source: string) => this.emitFile({ type: "asset", fileName, source })
      emit("blog.html", renderIndex(posts, ctx))
      for (const post of posts) emit(`blog/${post.slug}.html`, renderPost(post, ctx))
      emit("blog/rss.xml", renderRss(posts))
      emit("sitemap.xml", renderSitemap(posts))
      emit("404.html", renderNotFound(ctx))
    },
  }
}
