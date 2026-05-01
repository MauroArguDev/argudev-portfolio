import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

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

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadLCPImage()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})