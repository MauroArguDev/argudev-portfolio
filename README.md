# ArguDev — Portfolio

Personal portfolio of **Mauricio Argumedo**, iOS developer. Live at [argudev.com](https://argudev.com).

[![CI](https://github.com/MauroArguDev/argudev-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/MauroArguDev/argudev-portfolio/actions/workflows/ci.yml)

A single-page site in English, Spanish and French, with a "liquid glass" visual identity, animated sections and a contact form.

## Stack

| Area | Choice |
|---|---|
| UI | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, design tokens in `src/styles/globals.css` |
| Motion | Framer Motion, respecting `prefers-reduced-motion` |
| i18n | i18next, keys type-checked against the English file |
| Contact | EmailJS |
| Hosting | Vercel, with security headers and a strict CSP in `vercel.json` |

## Getting started

```bash
npm install
cp .env.example .env   # add your EmailJS IDs to enable the contact form
npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type check, then production build to `dist/` |
| `npm run lint` | ESLint |
| `npm run preview` | Serve the production build |

CI runs lint and build on every pull request.

## Project layout

- `src/sections/`: page sections (Hero, About, Projects, Contact, Footer, Nav)
- `src/components/`: shared pieces (project card, language switcher, background effects)
- `src/data/`: content: projects and tech stack
- `src/locales/`: translations (`en`, `es`, `fr`)
- `argudev-brand-glass.html`: brand identity reference

To add a project, add it to `src/data/projects.ts`, add its description key to `ProjectDescriptionKey` in `src/types/index.ts` and add the text to the three locale files.

## Credits

Brand identity, photography and design by [Danivan Peña](https://www.instagram.com/danivan_design).

## License

[MIT](LICENSE)
