# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for Mauricio Argumedo (ArguDev, argudev.com). React 19 + TypeScript + Vite, styled with Tailwind CSS v4, animated with plain CSS (no animation library), localized with i18next (EN/ES/FR), deployed on Vercel.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b (type check) then vite build → dist/
npm run lint      # ESLint over the whole repo
npm run preview   # serve the production build locally
```

There is no test suite. `npm run build` is the type check: `tsconfig.app.json` enables `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` (use `import type` for type-only imports) and `erasableSyntaxOnly` (no `enum`, `namespace` or parameter properties).

The contact form needs `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` in `.env` (see `.env.example`).

## Architecture

- **Entry**: `src/main.tsx` imports `src/lib/i18n.ts` for its side effect (i18next init) before rendering `App`.
- **Layout**: `src/App.tsx` renders a single page, with no router. `Hero` and `Nav` load eagerly; `Work`, `About`, `Contact` and `Footer` are `React.lazy` imports of named exports (`.then(m => ({ default: m.X }))`). Page sections live in `src/sections/`, reusable pieces in `src/components/`.
- **Language-change fade**: `LanguageSwitcher` dispatches `lang-fade-out` / `lang-fade-in` window events around `i18n.changeLanguage`; `App` listens and fades the content wrapper. `Nav` is deliberately kept outside that `motion.div` because `position: fixed` breaks inside transformed parents.
- **i18n**: translations in `src/locales/{en,es,fr}/translation.json`. Keys are type-checked against the English file via `src/types/i18n.d.ts`, so a new key must be added to `en` first (and to `es`/`fr` to stay complete). Language is persisted in localStorage under `i18n_lang`; `I18nHtmlSync` keeps `<html lang>` in sync.
- **Content data**: case-study metadata (name, year, stack, links) is in `src/data/projects.ts`; the case-study copy lives in the locale files under `work.<id>`, including arrays read with `t(key, { returnObjects: true })`. The stack in `src/data/stack.ts` is grouped by where it was used. Contact links come from `src/data/contact.ts`.
- **Visual language**: shapes come from the ArguDev mark. In `globals.css`, `.cut` gives diagonal cut corners (`.cut-line` adds a 1px outline with an inner `.cut`), `.mask-face` cuts the portrait to the mark's silhouette (with `MaskOutline` drawing the mark's open outline around it), and `.brackets` draws the mark's open top corners. `LogoMark` renders the mark as SVG and can draw its outline on mount (`.draw`). Motion is CSS only: `.rise` and `.draw` keyframes in `globals.css`, transitions for the mobile menu, the language indicator and the language-change fade. Motion is limited to the hero name reveal, the mark drawing, hover states and page transitions; content is not hidden behind scroll reveals.
- **Page transitions**: navigating between the portfolio and the blog uses cross-document view transitions (`@view-transition` and the PAGE TRANSITIONS rules in `globals.css`, off under reduced motion; unsupported browsers just navigate). The header keeps its place (`view-transition-name: site-header` on both `Nav` and the blog header) and a post's title travels from its card into the headline (`post-title-<slug>` names in the blog templates). The transition snapshots the new page's first frame, so the SPA renders before first paint: the entry script is made `blocking="render"` by the `renderBlockingEntry` plugin in `vite.config.ts` (Vite drops the attribute otherwise) and `main.tsx` renders inside `flushSync`. `ScrollToHash` scrolls to `/#section` links from the blog once the lazy sections exist.
- **Styling**: Tailwind v4 via `@tailwindcss/vite`, with no `tailwind.config`. Design tokens (colors such as `void`, `violet`, `platinum`, `silver`, `gold` for Guldr, the `display`/`body`/`mono` font families and the `text-display`/`text-section` sizes) are defined in the `@theme` block of `src/styles/globals.css`. `argudev-brand-glass.html` at the repo root is the standalone brand identity / glass design reference.
- **Path alias**: `@/` → `src/`, configured in both `vite.config.ts` and `tsconfig.app.json`.
- **Build plugin**: `vite.config.ts` has a custom `preloadLCPImage` plugin that injects a `<link rel="preload">` for the bundled asset whose name contains `profile`. Renaming `src/assets/profile.jpg` silently disables it.

## Deployment

Vercel (`vercel.json`): an SPA rewrite to `/index.html` that skips `/blog`, `cleanUrls` (so `blog/<slug>.html` is served at `/blog/<slug>`), plus security headers including a strict Content-Security-Policy. Adding any new external script, font, image host or API endpoint (beyond EmailJS, Google Fonts and Vercel Analytics/Speed Insights) requires updating the CSP there, or it will be blocked in production. SEO metadata lives in `index.html`, the blog templates and `public/robots.txt`; `sitemap.xml` is generated at build time by the blog plugin.

## Blog

- **Posts** are Markdown files in `content/blog/<slug>.md` with frontmatter `title`, `date` (YYYY-MM-DD), `description` and `slug` (must match the file name); optional `draft: true` (shown in dev, left out of the build) and `image`. Post bodies are English only. Adding a post is adding one file.
- **Rendering**: `plugins/blog/` is a Vite plugin. At build it emits static HTML with no JavaScript (`dist/blog.html`, `dist/blog/<slug>.html`, `dist/blog/rss.xml`, `dist/sitemap.xml`, `dist/404.html`), each page with its own title, description, canonical, Open Graph/Twitter tags and JSON-LD, linking the app's built stylesheet. In `npm run dev` the same pages are rendered on request (`/blog`, `/blog/<slug>`). The frontmatter parser is hand-written (`key: value` lines); Markdown goes through `marked`.
- **Templates** (`plugins/blog/templates.ts`) mirror `Nav` and `Footer` as static markup, with labels read from the English locale file. Keep them in step when the nav or footer changes. Post body styles are the `.post` rules in `globals.css`.
- **Open Graph image**: `npm run og -- <slug>` renders `scripts/og/template.html` with headless Chrome to `public/blog/<slug>/og.png` (1200×630), which the plugin picks up automatically; without one, posts fall back to `/og.jpg`. Set `CHROME_PATH` if Chrome isn't in `/Applications`.
