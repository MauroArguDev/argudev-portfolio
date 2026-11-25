import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { blog } from "./plugins/blog/index.ts"

function preloadLCPImage(): Plugin {
  return {
    name: "preload-lcp-image",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const chunk = Object.keys(ctx.bundle).find(
          (key) => key.includes("profile") && /\.(jpe?g|webp|avif|png)$/.test(key)
        )
        if (!chunk) return html
        return html.replace(
          "</head>",
          `  <link rel="preload" as="image" href="/${chunk}" />\n</head>`
        )
      },
    },
  }
}

// The page transition into the portfolio (see PAGE TRANSITIONS in globals.css) snapshots the
// first frame, which is empty until React renders. Making the entry script render-blocking
// (plus the synchronous first render in main.tsx) puts Nav and Hero in that frame.
// Vite rewrites the entry <script> and drops the attribute, so it's added back here.
function renderBlockingEntry(): Plugin {
  return {
    name: "render-blocking-entry",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // The app entry: a module script with a src that isn't one of Vite's own (/@vite/client)
        return html.replace(/<script type="module"(?![^>]*blocking)(?=[^>]*\ssrc="(?!\/@))/g, '<script type="module" blocking="render"')
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadLCPImage(), renderBlockingEntry(), blog()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})