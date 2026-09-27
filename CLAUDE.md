# Ayush Sharma — Portfolio

Personal portfolio for Ayush Sharma (Backend Engineer, Jupiter Money, ex-Zscaler).
Source of truth for content: https://www.linkedin.com/in/ayush-sharma-551133213/ and his posts.

## Stack
- React 19 + Vite. No UI/animation libraries, no router, no CSS framework — keep it that way (speed is a goal).
- `npm run dev` · `npm run build` · `npm run preview`

## Layout
- `src/data.js` — ALL content (profile, metrics, experience, projects, writing, skills). Edit content here only.
- `src/App.jsx` — all sections as small components. `RetryLab` is an interactive retry-storm simulator
  tied to his "Retry Mechanisms" post; it only ticks while on screen.
- `public/ayush.webp` — profile photo (480px, from LinkedIn). Replace the file to change it.
- `public/certs/*.webp` — certificate images (from public credential pages). Certs without an image show a placeholder.
- `src/styles.css` — single stylesheet, dark theme, CSS variables at the top.

## Rules
- Performance first: no new dependencies unless unavoidable; system fonts; animations via CSS/IntersectionObserver.
- Respect `prefers-reduced-motion`.
- Must work at 360px width.
- Numbers on the site must come from LinkedIn — don't invent metrics.
- Test in Chrome (desktop + mobile width) after changes.
