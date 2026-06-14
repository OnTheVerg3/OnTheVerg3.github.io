/**
 * SnakeWorks brand tokens (web).
 *
 * Single source of truth in TypeScript for the Coiled Silver palette, surface
 * elevation tints, typography stacks, motion curves, W metallic-gradient
 * stops, spacing scale, and radius scale.
 *
 * Mirrors `tokens.css` (same values exposed as CSS custom properties for
 * use inside CSS Modules and global stylesheets). When a consumer needs to
 * read a brand value from TypeScript (e.g. computing an inline style, a
 * canvas paint, or a derived color), import from this module; when a
 * consumer styles via CSS, prefer the `var(--brand-*)` form so the value
 * stays themable from one place at runtime.
 *
 * Brand spec authority: `SnakeWorks/BRANDING.md` (rev 2, 2026-06-13).
 * Web spec authority: `SnakeWorks/Portfolio/ARCHITECTURE.md` section
 * "Brand Application: Coiled Silver to Web".
 */

export const brand = {
  /**
   * Coiled Silver palette. Every named role from the brand bible is present.
   * Emerald is reserved for primary actions, focus rings, the active route
   * indicator, and the toggle/armed state; it never appears in the logo
   * mark itself.
   */
  palette: {
    graphite: '#1C1F26',
    chrome: '#C5CAD1',
    emerald: '#1FAD66',
    softWhite: '#F2F4F7',
  },

  /**
   * Surface elevation tints. Composed as semi-transparent white overlays
   * over the Graphite base rather than pre-mixed hex values, matching the
   * native WPF approach. Apply on top of `palette.graphite` for layered
   * panels, dropdowns, modals.
   */
  surface: {
    s0: '#1C1F26',
    s1: 'rgba(255, 255, 255, 0.04)',
    s2: 'rgba(255, 255, 255, 0.08)',
    s3: 'rgba(255, 255, 255, 0.12)',
  },

  /**
   * Typography stacks. Display and body resolve to the Segoe UI families
   * in-box on Windows and gracefully fall through to the OS system stack
   * on macOS / Linux. Monospace prefers Cascadia Mono (in-box on Win11,
   * shipped with Windows Terminal on Win10) and falls back to Consolas.
   */
  typography: {
    display:
      '"Segoe UI Variable Display", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    body: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    mono: '"Cascadia Mono", "Consolas", "Courier New", monospace',
  },

  /**
   * Type scale (px). Matches the BRANDING.md typography table:
   *   Display 28 to 48 px - splash app name, page headers
   *   Headline 18 to 22 px - section headers
   *   Body 14 px - all body text
   *   Tagline - logo-relative, see component impl
   */
  fontSize: {
    body: 14,
    bodyLg: 16,
    headlineSm: 18,
    headlineLg: 22,
    displaySm: 28,
    displayMd: 36,
    displayLg: 48,
  },

  fontWeight: {
    regular: 400,
    semibold: 600,
    bold: 700,
  },

  /**
   * Spacing scale (px). 4 px base unit; named in 1U increments where the
   * unit is also 4 px, so `space[1]` is 4 px, `space[2]` is 8 px, etc.
   */
  space: {
    s1: 4,
    s2: 8,
    s3: 12,
    s4: 16,
    s6: 24,
    s8: 32,
    s12: 48,
    s16: 64,
    s24: 96,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 16,
  },

  /**
   * Motion. Standard ease curve matches the WPF CubicEase, and durations
   * map cleanly to fast / normal / slow tiers for micro, macro, and page
   * transitions respectively.
   */
  motion: {
    easeStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeEntrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeExit: 'cubic-bezier(0.4, 0.0, 1, 1)',
    durationFast: 120,
    durationNormal: 240,
    durationSlow: 400,
  },

  /**
   * W metallic-gradient stops (per BRANDING.md rev 2). Vertical gradient,
   * top-to-bottom, no hue shift; both stops share hue 216 and saturation
   * ~7% so the gradient reads as polished brushed graphite rather than
   * two unrelated colors. The 27 percentage-point lightness range is the
   * brand-canonical metallic falloff.
   */
  wGradient: {
    top: '#9CA1A8',
    bottom: '#585E66',
  },

  /**
   * Logo geometry constants. The canonical logo bounding box is
   * [-2U, 103U] x [-22U, 34U] = 105U x 56U at aspect 1.875:1.
   * Consumers computing logo container sizes should use these values
   * to honor the brand-canonical aspect ratio.
   */
  logo: {
    viewBoxX: -2,
    viewBoxY: -22,
    viewBoxWidth: 105,
    viewBoxHeight: 56,
    aspectRatio: 105 / 56,
  },
} as const;

export type Brand = typeof brand;
