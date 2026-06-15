# SnakeWorks Portfolio

The hybrid SnakeWorks corporate site and OnTheVerg3 personal portfolio. Live at https://ontheverg3.github.io.

> *It sssimply works.*

## What It Is

A single React 19 + Vite 7 + TypeScript SPA that serves as:

- **The SnakeWorks corporate face:** company introduction, product showcase (currently ClickWright), brand expression in the Coiled Silver palette.
- **OnTheVerg3 / Aiden's personal portfolio:** non-SnakeWorks projects, schedule, security advisories, contact.

One unified visual language governs both identities. They are differentiated by routing and content, not visual styling.

## Tech Stack

- React 19
- Vite 7
- TypeScript 5 (strict mode plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`)
- React Router 6
- CSS Modules + CSS custom properties (no preprocessor, no CSS-in-JS)
- Lucide React (icons)
- ESLint 9 (flat config, typescript-eslint strict + stylistic + type-checked, react-hooks, react-refresh)
- Prettier
- GitHub Actions deployment via `actions/deploy-pages@v4`

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | `LandingPage` | Logo mark, tagline, studio statement, navigation cards |
| `/about` | `AboutPage` | Operator + SnakeWorks origin story; Person JSON-LD |
| `/products` | `ProductsIndexPage` | SnakeWorks product gallery |
| `/products/:slug` | `ProductDetailPage` | Per-product detail with features, tech, release metadata, SHA-256, SoftwareApplication JSON-LD |
| `/projects` | `ProjectsIndexPage` | Disclosure-aware non-SnakeWorks gallery |
| `/projects/:slug` | `ProjectDetailPage` | Public-safe summary always; description / links gated by disclosure flag |
| `/advisories` | `AdvisoriesIndexPage` | Public-disclosure advisories only |
| `/advisories/:slug` | `AdvisoryDetailPage` | Severity, CVE, target, timeline, references |
| `/schedule` | `SchedulePage` | Google Calendar embed preserved from pre-overhaul site |
| `/contact` | `ContactPage` | GitHub + email |
| `*` | `NotFoundPage` | 404 with helper links; also the SPA fallback page |

## Local Development

```cmd
npm install
npm run dev          # http://localhost:5173
npm run typecheck    # tsc -b --noEmit
npm run lint         # eslint .
npm run format:check # prettier --check .
npm run build        # tsc + vite build + 404 mirror + sitemap.xml
npm run preview      # local preview of dist/
```

## Project Layout

```
SnakeWorks/Portfolio/
  index.html                 # Vite entry; ships full default head metadata
  package.json
  vite.config.ts             # base: '/', manual chunks for react / router
  tsconfig.json + .app + .node
  eslint.config.js           # ESLint 9 flat config
  .prettierrc.json
  scripts/
    copy-404.mjs             # mirrors dist/index.html -> dist/404.html for SPA on GH Pages
    generate-sitemap.mjs     # emits dist/sitemap.xml; filters undisclosed projects + non-public advisories
  public/
    favicon.svg              # vector logo
    favicon.ico              # fallback
    robots.txt               # allow-all + sitemap reference
  src/
    main.tsx                 # ReactDOM.createRoot + BrowserRouter
    App.tsx                  # Route tree (SiteLayout + 11 pages)
    index.css                # imports brand tokens; CSS reset; base typography
    branding/
      tokens.ts              # TypeScript brand tokens (palette, surfaces, type, spacing, motion)
      tokens.css             # mirrors tokens.ts as :root CSS custom properties
      Logo.tsx               # inline SVG logo (chrome silhouette + metallic-gradient W)
    layout/
      SiteLayout.tsx         # ScrollToTop + SkipToContent + Nav + <main> + Footer
      Nav.tsx / .module.css  # sticky top nav with active-route underline
      MobileMenu.tsx         # full-screen overlay under 768px
      Footer.tsx             # tagline + copyright + GitHub
      ScrollToTop.tsx        # resets viewport on route change
      SkipToContent.tsx      # WCAG 2.4.1 bypass-blocks link
      navItems.ts            # single source of truth for nav links
    components/
      PageHeader.tsx         # eyebrow + title + description + meta + PageBody
      Section.tsx            # h2 + subtitle wrapper
      Card.tsx               # surface-tier gallery card (acts as Link when `to` set)
      Badge.tsx              # 5 variants (emerald, chrome, muted, warning, critical)
      Button.tsx             # 3 variants (primary, ghost, outline) as button / Link / anchor
      ExternalLink.tsx       # outbound link with Lucide indicator + rel safety
      FeatureGrid.tsx        # auto-fitting grid of feature cards
      Stat.tsx               # tabular key/value metadata, with mono variant
      DetailNotFound.tsx     # inline not-found surface for unknown detail slugs
    content/
      types.ts               # ProductEntry, ProjectEntry, AdvisoryEntry + supporting types
      products.ts            # ClickWright 0.1.0 entry
      projects.ts            # 5 stub entries (disclosed: false by default)
      advisories.ts          # empty seed; append-pattern template in file header
      display.ts             # enum-to-display-token adapters
      index.ts               # barrel + lookup helpers + getProjectDisplayName disclosure gate
    hooks/
      useMediaQuery.ts       # reactive matchMedia wrapper
      useScrollLock.ts       # body scroll lock for mobile menu
    utils/
      cx.ts                  # safe className composition with CSS Modules
      format.ts              # formatBytes + formatISODate
      seo.ts                 # useSeo() hook; updates title, meta, OG, Twitter, canonical, JSON-LD
  .github/
    workflows/
      deploy.yml             # CI gate + actions/deploy-pages@v4
      ci.yml                 # verification for PRs and non-main pushes
```

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` which:

1. Runs the full CI gate: `typecheck` + `lint` + `format:check` + `build`.
2. Builds `dist/` via Vite, mirrors `index.html` to `404.html` for SPA routing, and emits `sitemap.xml`.
3. Uploads `dist/` as a Pages artifact and deploys via `actions/deploy-pages@v4`.

Concurrency is `group: pages, cancel-in-progress: false`; an interrupted deploy leaves Pages in an inconsistent state, so the workflow always completes one deploy before starting the next.

**One-time repo setting:** under `Settings > Pages > Build and deployment > Source`, select **"GitHub Actions"**. The default is "Deploy from a branch" which bypasses the workflow.

A separate `ci.yml` workflow runs the same script set on pull requests and non-main pushes without publishing, providing pre-merge verification.

## SEO

- Per-route `<title>`, meta description, OpenGraph block, Twitter Card block, and canonical link via the `useSeo()` hook in `src/utils/seo.ts`.
- JSON-LD structured data on `/about` (Person) and `/products/:slug` (SoftwareApplication).
- `index.html` ships a complete SSR-equivalent default head for crawlers that do not execute JS.
- `public/robots.txt` allows all crawlers and references `sitemap.xml`.
- `scripts/generate-sitemap.mjs` emits `dist/sitemap.xml` at build time; filters undisclosed projects (`disclosed: true` only) and non-public advisories (`status: 'public-disclosure'` only) so undisclosed slugs are not actively advertised to crawlers.

## Brand

- Palette: graphite `#1C1F26`, chrome `#C5CAD1`, emerald `#1FAD66`, soft white `#F2F4F7`.
- Logo: chrome layered silhouette (tail / body / head / mouth / eye / tongue) plus a metallic-gradient W (top `#9CA1A8`, bottom `#585E66`, sheared 8 degrees), rendered as inline SVG.
- Typography: Segoe UI Variable Display (display), Segoe UI (body), Cascadia Mono (mono).
- Tagline (mandatory at every brand touchpoint): *It sssimply works.*

Full brand specification lives in `SnakeWorks/BRANDING.md`.

## Accessibility

- `SkipToContent` link as the first focusable element (WCAG 2.4.1 Bypass Blocks).
- Programmatic `focus()` target on `<main tabIndex={-1}>` for the skip link.
- `aria-label` on the logo when used as a brand mark; decorative usage sets `aria-label=""` and `aria-hidden`.
- `:focus-visible` outlines using the emerald + chrome-offset focus ring tokens.
- `prefers-reduced-motion: reduce` zeroes all duration tokens, disables nav underline transitions, and switches `ScrollToTop` from instant to auto scrolling.
- Color contrast targets WCAG AA at minimum across all surface elevations.

## License

Personal portfolio and SnakeWorks corporate property. Source code license decision deferred. The license field in `package.json` is currently `UNLICENSED`; this is a placeholder until the operator confirms a final license.
