# ESO Addons Manager — Website

An independent presentation website for **ESO Addons Manager**, a desktop
add-on manager for _The Elder Scrolls Online_.

> This is an independent, community-created website. It is not affiliated with,
> endorsed by, or sponsored by ZeniMax Media Inc. or Bethesda Softworks. The
> application source code and releases are maintained by
> [`powerbq`](https://github.com/powerbq) on GitHub.

## Tech stack

- React + TypeScript (strict)
- Vite
- Tailwind CSS
- Lucide React icons
- npm

The website is fully static and suitable for free GitHub Pages hosting.

## Project structure

```
src/
  assets/          Reserved for future images and illustrations
  components/      Reusable UI building blocks (Header, Footer, Logo, ...)
  features/
    releases/      Reserved for the future GitHub Releases API integration
  i18n/
    locales/       Per-language content (English implemented; uk/fr/de/es reserved)
    types.ts       Shared localization types
  sections/        Top-level page sections (Hero, Features, Download, ...)
  styles/          Global styles and Tailwind layers
  constants.ts     Shared constants (repository URLs, section IDs)
```

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Preview the production build locally:

```bash
npm run build
npm run preview
```

Run the TypeScript type check:

```bash
npm run typecheck
```

## Deployment path

The project is configured to build for the GitHub Pages subpath
`/eso-addons-manager/`. The production build is emitted to `dist/`.

## Current stage

This is **Stage 4 — Project Foundation**. Live GitHub Releases integration,
multilingual translations, the final logo, thematic illustrations and GitHub
Pages publishing are intentionally not included yet and will be added in later
stages.

## License

MIT. See [LICENSE](./LICENSE).
