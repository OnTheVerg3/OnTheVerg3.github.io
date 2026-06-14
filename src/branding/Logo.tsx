import { useId } from 'react';
import type { CSSProperties, ReactElement } from 'react';

import { brand } from './tokens';

/**
 * SnakeWorks logo as inline SVG.
 *
 * Implements the layered silhouette anatomy and metallic-gradient W from
 * `SnakeWorks/BRANDING.md` (rev 2). Geometry is verbatim from
 * `SnakeWorks/_shared/Branding/Logo.xaml`; only the transform stack on
 * the W layer is translated from WPF's `SkewTransform CenterX/Y` /
 * `TranslateTransform` pair to the equivalent SVG composition.
 *
 * Visual constraint inherited from the brand spec: the graphite eye
 * ellipse and the graphite mouth wedge are NEGATIVE-SPACE CUTOUTS that
 * read against a Graphite page background. Placing the Logo on any
 * other background reveals these cutouts as discrete graphite shapes
 * and breaks the silhouette. The brand bible explicitly disallows
 * non-graphite placement; this component does not implement masking
 * because doing so would diverge from the canonical native logo and
 * encourage off-brand placement.
 *
 * Aspect ratio: 105 / 56 = 1.875 (fixed). The `size` prop sets the
 * rendered height in pixels; the rendered width is derived from the
 * canonical aspect ratio so the logo can never be non-uniformly
 * stretched by an honest consumer.
 *
 * Gradient ID is generated per-instance via React's `useId()` so multiple
 * Logo instances on the same page do not collide on the `<linearGradient>`
 * element ID.
 */

interface LogoProps {
  /**
   * Target rendered height in px. Width is derived from the canonical
   * 1.875:1 aspect ratio. Defaults to 96 (matches the About dialog scale
   * from `BRANDING.md` sizing rules).
   */
  size?: number;

  /**
   * Accessible label. Defaults to `"SnakeWorks"`. Pass an empty string to
   * mark the logo as purely decorative (the component will set
   * `aria-hidden="true"` and omit the label). Pass any non-empty string
   * to provide a more specific label (e.g. `"SnakeWorks home"` when the
   * Logo is wrapped in a link to `/`).
   */
  ariaLabel?: string;

  /**
   * Optional CSS class for layout / positioning. The SVG itself is
   * styled exclusively by the `size` prop and the brand-canonical
   * geometry; the className is the consumer's escape hatch for
   * margin, alignment, etc.
   */
  className?: string;

  /**
   * Optional inline style escape hatch. Use sparingly; prefer className.
   */
  style?: CSSProperties;

  /**
   * Optional native SVG `<title>` element body. When provided, browsers
   * surface this as a tooltip on hover. Distinct from `ariaLabel`,
   * which is used by assistive technology.
   */
  title?: string;
}

const VIEWBOX_X = brand.logo.viewBoxX;
const VIEWBOX_Y = brand.logo.viewBoxY;
const VIEWBOX_W = brand.logo.viewBoxWidth;
const VIEWBOX_H = brand.logo.viewBoxHeight;

const CHROME = brand.palette.chrome;
const GRAPHITE = brand.palette.graphite;
const W_TOP = brand.wGradient.top;
const W_BOTTOM = brand.wGradient.bottom;

export function Logo({
  size = 96,
  ariaLabel = 'SnakeWorks',
  className,
  style,
  title,
}: LogoProps): ReactElement {
  const reactId = useId();
  const gradientId = `snakeworks-w-gradient-${reactId}`;
  const titleId = `snakeworks-logo-title-${reactId}`;

  const isDecorative = ariaLabel === '';
  const renderedWidth = size * brand.logo.aspectRatio;
  const viewBox = [VIEWBOX_X, VIEWBOX_Y, VIEWBOX_W, VIEWBOX_H].join(' ');

  // WPF SkewTransform with CenterX/CenterY does the equivalent of
  //   translate(cx, cy) * skewX(angle) * translate(-cx, -cy)
  // and then the TranslateTransform is applied after. In SVG, transforms
  // are applied right-to-left semantically, so we write them in the
  // outermost-first order to mirror WPF's execution order.
  const W_TRANSFORM = 'translate(22 -22) translate(24 28) skewX(8) translate(-24 -28)';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={renderedWidth}
      height={size}
      className={className}
      style={style}
      role={isDecorative ? 'presentation' : 'img'}
      aria-hidden={isDecorative ? true : undefined}
      aria-labelledby={isDecorative ? undefined : titleId}
      focusable={false}
    >
      {!isDecorative ? <title id={titleId}>{title ?? ariaLabel}</title> : null}

      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={W_TOP} />
          <stop offset="1" stopColor={W_BOTTOM} />
        </linearGradient>
      </defs>

      {/* 1. Tail point (chrome filled triangle). Apex (-2, 7); base
          vertices (6.4, 3.334) and (6.4, 10.666) are tangent to the
          body's round cap circle for C1-continuous merging. */}
      <path d="M -2 7 L 6.4 3.334 L 6.4 10.666 Z" fill={CHROME} />

      {/* 2. Body stroke (chrome, 8U thick, rounded caps and joins).
          One full sine-wave period from (8, 7) to (84, 7) with cardinal
          points peak (27, 0), midpoint (46, 7), trough (65, 14), head
          junction (84, 7). Bezier control points are verbatim from the
          canonical WPF Logo.xaml. */}
      <path
        d="M 8 7 C 14.68 3.13 20.32 0 27 0 C 33.68 0 39.32 3.13 46 7 C 52.68 10.87 58.32 14 65 14 C 71.68 14 77.32 10.87 84 7"
        fill="none"
        stroke={CHROME}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Head (chrome filled, asymmetric tear-shaped path). Cardinal
          points: back (78, 7), top (84, 1), snout tip (94, 7), bottom
          (84, 13). Snout extends 10U from center, rear extends 6U;
          control magnitudes 4U back, 5U front produce the asymmetric
          curvature where the front taper is longer and gentler than
          the rounded rear. */}
      <path
        d="M 78 7 C 78 4 80 1 84 1 C 89 1 94 3 94 7 C 94 11 89 13 84 13 C 80 13 78 10 78 7 Z"
        fill={CHROME}
      />

      {/* 4. Mouth wedge (graphite filled). Apex (88, 7), lips (94, 5)
          and (94, 9). Graphite color matches page background and
          functions as a negative-space cutout where it intersects the
          chrome head silhouette. */}
      <path d="M 88 7 L 94 5 L 94 9 Z" fill={GRAPHITE} />

      {/* 5. Eye (graphite filled ellipse). Center (88, 4), rx 1.2,
          ry 1.0. Also a negative-space cutout dependent on the page
          being graphite. */}
      <ellipse cx="88" cy="4" rx="1.2" ry="1" fill={GRAPHITE} />

      {/* 6. Tongue (chrome stroke, 1.5U thick, "-<" shape). Connector
          (89, 7) -> (99, 7); upper tine to (103, 5); lower tine to
          (103, 9). The leftmost ~2U of the connector pass through the
          chrome head fill (chrome-on-chrome, invisible) for structural
          continuity, and the next ~3U pass through the graphite mouth
          interior producing the visible emerging-tongue stripe. */}
      <path
        d="M 89 7 L 99 7 M 99 7 L 103 5 M 99 7 L 103 9"
        fill="none"
        stroke={CHROME}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 7. W (metallic-gradient stroke, 8U thick, rounded caps and
          joins). Three parallel diagonal strokes (no shared vertices),
          each dx=12U / dy=56U. Vertical linear gradient (top #9CA1A8,
          bottom #585E66). Transform mirrors WPF's
          SkewTransform(AngleX=8, CenterX=24, CenterY=28) followed by
          TranslateTransform(22, -22). */}
      <g transform={W_TRANSFORM}>
        <path
          d="M 0 0 L 12 56 M 18 0 L 30 56 M 36 0 L 48 56"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
