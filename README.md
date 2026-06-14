# SnakeWorks Portfolio

The hybrid SnakeWorks corporate site and OnTheVerg3 personal portfolio. Live at https://ontheverg3.github.io.

> *It sssimply works.*

## What It Is

A single React + Vite + TypeScript site that serves as:

- **The SnakeWorks corporate face:** company introduction, product showcase (currently ClickWright), brand expression.
- **OnTheVerg3 / Aiden's personal portfolio:** non-SnakeWorks projects, schedule, security advisories, contact.

One unified visual language (Coiled Silver palette per `SnakeWorks/BRANDING.md`) governs both identities. They are differentiated by routing and content, not visual styling.

## Tech Stack

- React 19
- Vite 7
- TypeScript 5 (strict)
- React Router 6+
- CSS Modules + Custom Properties (no preprocessor, no CSS-in-JS)
- Lucide React (icons)
- GitHub Actions deployment via `actions/deploy-pages`

## Routes

```
/                        Landing (no traditional hero, navigation cards)
/about                   About Aiden + SnakeWorks
/products                SnakeWorks product gallery
/products/:slug          Per-product detail (e.g., /products/clickwright)
/projects                Featured non-SnakeWorks projects
/projects/:slug          Per-project detail
/advisories              Security advisories index
/advisories/:slug        Individual advisory write-up
/schedule                Google Calendar embed (preserves legacy functionality)
/contact                 Contact methods
*                        404 fallback (also hosts the SPA fallback page)
```

## Status

**Scaffolded for Overhaul.** The architecture, IA, brand application, and deployment plan are documented in `ARCHITECTURE.md`. Implementation is staged in 9 phases (A through I). The overhaul is performed in a fresh AI session bootstrapped via `PROMPT.md`.

The repo currently contains four legacy static HTML files (`index.html`, `home.html`, `schedule.html`, original `README.md`) which remain on `main` until Phase I (Legacy Cleanup). They do not interfere with production once the React build deploys, since the GitHub Actions deploy workflow only ships the `dist/` directory.

## Local Development (Once Overhaul Begins)

```cmd
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Local preview of built output
```

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` which builds the Vite app and deploys via the official `actions/deploy-pages` action. Repo Settings -> Pages source must be set to "GitHub Actions" once.

## Migration History

Originally lived at `d:\Projects\Github\OnTheVerg3.github.io\`. Cloned to `d:\Projects\SnakeWorks\Portfolio\` on 2026-06-14. Old location removed. Git remote, branch (`main`), and commit history (4 commits) preserved.

## License

Personal portfolio and SnakeWorks corporate property. Source code MIT or proprietary depending on section. Final license decision deferred to overhaul conversation.
