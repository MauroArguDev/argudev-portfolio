# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for Mauricio Argumedo (ArguDev, argudev.com). React 19 + TypeScript + Vite, styled with Tailwind CSS v4, animated with Framer Motion, localized with i18next (EN/ES/FR), deployed on Vercel.

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

- **Entry**: `src/main.tsx` imports `src/lib/i18n.ts` for its side effect (i18next init) before rendering, then wraps `App` in `BrowserRouter`.
- **Layout**: `src/App.tsx` renders one route (`/`). `Hero` and `Nav` load eagerly; `About`, `Projects`, `Contact` and `Footer` are `React.lazy` imports of named exports (`.then(m => ({ default: m.X }))`). Page sections live in `src/sections/`, reusable pieces in `src/components/`.
- **Language-change fade**: `LanguageSwitcher` dispatches `lang-fade-out` / `lang-fade-in` window events around `i18n.changeLanguage`; `App` listens and fades the content wrapper. `Nav` is deliberately kept outside that `motion.div` because `position: fixed` breaks inside transformed parents.
- **i18n**: translations in `src/locales/{en,es,fr}/translation.json`. Keys are type-checked against the English file via `src/types/i18n.d.ts`, so a new key must be added to `en` first (and to `es`/`fr` to stay complete). Language is persisted in localStorage under `i18n_lang`; `I18nHtmlSync` keeps `<html lang>` in sync.
- **Content data**: projects and tech stack are plain data in `src/data/`. Project descriptions are i18n keys, and the allowed keys are listed in the `ProjectDescriptionKey` union in `src/types/index.ts`. Adding a project means updating the data file, that union, and all three locale files.
- **Motion**: shared Framer Motion variants live in `src/lib/motion.ts` (the `§6.x` comments refer to sections of the brand spec).
- **Styling**: Tailwind v4 via `@tailwindcss/vite`, with no `tailwind.config`. Design tokens (colors such as `void`, `violet`, `platinum`, `silver`, and the `display`/`body`/`mono` font families) are defined in the `@theme` block of `src/styles/globals.css`, which also holds custom classes like `glass-label`. `argudev-brand-glass.html` at the repo root is the standalone brand identity / glass design reference.
- **Path alias**: `@/` → `src/`, configured in both `vite.config.ts` and `tsconfig.app.json`.
- **Build plugin**: `vite.config.ts` has a custom `preloadLCPImage` plugin that injects a `<link rel="preload">` for the bundled asset whose name contains `profile`. Renaming `src/assets/profile.jpg` silently disables it.

## Deployment

Vercel (`vercel.json`): an SPA rewrite to `/index.html`, plus security headers including a strict Content-Security-Policy. Adding any new external script, font, image host or API endpoint (beyond EmailJS, Google Fonts and Vercel Analytics/Speed Insights) requires updating the CSP there, or it will be blocked in production. SEO metadata lives in `index.html`, `public/sitemap.xml` and `public/robots.txt`.
