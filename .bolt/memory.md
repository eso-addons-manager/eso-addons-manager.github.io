# Project memory

## Product intent & audience

- Not yet established from available context.

## Brand personality & voice

- Not yet established from available context.

## Visual design & UX direction

- Project includes CSS (production build outputs ~17 kB CSS, gzip ~4 kB), indicating custom styling rather than a CSS-in-JS or utility-only setup.
- No specific aesthetic, typography, or component patterns inferred yet.

## Decisions, constraints & rationale

- **Stack:** Vite + React + TypeScript.
- **Build command:** `npm run build` — runs TypeScript type-checking and production bundling.
- **Build status:** Compiles cleanly with no type errors.
- **Bundle size (baseline):** ~180 kB JS / ~17 kB CSS; gzip ~55 kB JS / ~4 kB CSS. Useful as a reference for future regressions.

## Open questions & assumptions

- Product intent, target audience, and visual design direction are undefined — await user input.
- Testing framework and deployment target not yet identified.
- Assumption: standard Vite React template structure (e.g., `src/main.tsx`, `index.html`) unless later contradicted.
- No `.bolt/prompt` authoritative instructions exist; memory may be seeded more fully as project details emerge.