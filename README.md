# Pass The Cake Shop

**Live site: [jcpcab.github.io/PTC_Shop](https://jcpcab.github.io/PTC_Shop/)**

Website for my small batch cheesecake business, home of the ube cheesecake. Started in 2017.

<!--
Screenshot: not yet generated (the site build environment has no browser).
After deploying, run this from the repo root, then commit docs/screenshot.png
and replace this comment with:  ![Pass The Cake Shop homepage](./docs/screenshot.png)

  npx -y playwright screenshot --viewport-size "1280,800" https://jcpcab.github.io/PTC_Shop/ docs/screenshot.png

(First run may ask to install a browser: npx playwright install chromium)
-->

Built with React + Vite and CSS Modules. No CSS frameworks, all styles are hand written.

## Features

- Interactive order form with flavor/size dropdowns pulled from the menu and sizes data,
  date validation, and a clipboard + Instagram DM handoff (with a Formspree backup submission)
- Social sharing meta tags (Open Graph, Twitter Card) and JSON-LD structured data for search/link
  previews
- Accessible navigation: keyboard-operable hamburger menu, focus-visible styles, skip-to-content
  link, scroll-spy highlighting of the current section
- Gallery lightbox with keyboard navigation and a focus trap
- WebP images with JPEG fallback, sized favicons, and explicit image dimensions for fewer layout
  shifts

## Running it locally

```bash
npm install
npm run dev
```

## Linting, formatting & tests

```bash
npm run lint
npm run format
npm test
```

Order-form validation is covered by Vitest + React Testing Library
(`src/components/Order.test.jsx`). Lint, tests, and build also run in CI
(`.github/workflows/ci.yml`) on every PR and feature-branch push.

## Building

```bash
npm run build
```

## Deploying

Deploys to GitHub Pages automatically through the workflow in `.github/workflows/deploy.yml`. Every push to `main` rebuilds and redeploys the site.

If the repo name ever changes, update `base` in `vite.config.js` to match.
