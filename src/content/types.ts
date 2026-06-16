/**
 * Content schemas for the SnakeWorks Portfolio.
 *
 * Two primary entry types power two section pairs in the IA:
 *
 *   ProductEntry   /products            and /products/:slug
 *   AdvisoryEntry  /advisories          and /advisories/:slug
 *
 * Data files in this folder export `readonly` arrays of these entry types
 * so the rest of the app can consume them with full type safety and so
 * `tsc` flags missing fields the moment a schema evolves. The barrel
 * exports + lookup helpers live in `index.ts`.
 *
 * The `/engineering` route (formerly `/projects`) is not content-driven:
 * its language entries live inline in `src/pages/EngineeringPage.tsx`
 * and use the existing `FeatureGridItem` shape from the components
 * layer. The `ProjectEntry` schema and its helpers were removed in the
 * IA pivot that replaced the personal-projects index with a craft page.
 *
 * Authority: `SnakeWorks/Portfolio-Internal/ARCHITECTURE.md` rev 1
 * (operator-internal, not in this repo). Schema fields are deliberately
 * conservative; add new optional fields as content needs them rather than
 * pre-baking every possible attribute.
 */

// ---------------------------------------------------------------------------
// Primitive aliases
// ---------------------------------------------------------------------------

/** URL-safe identifier used in routes. Lowercase, hyphen-separated. */
export type Slug = string;

/** ISO 8601 calendar date (`YYYY-MM-DD`), with no time component. */
export type ISODate = string;

/** A labelled outbound link. */
export interface LinkRef {
  readonly label: string;
  readonly url: string;
}

/** A screenshot or hero image. `alt` is mandatory for accessibility. */
export interface Screenshot {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width?: number;
  readonly height?: number;
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

/**
 * Lifecycle stage for a SnakeWorks-branded product.
 *
 *   released   Public, version-tagged, downloadable.
 *   beta       Public-but-preview; downloadable with stability caveats.
 *   alpha      Early access; downloadable with strong stability caveats.
 *   planned    Announced, no public artefact yet.
 *   archived   No longer maintained; preserved for reference.
 */
export type ProductStatus = 'released' | 'beta' | 'alpha' | 'planned' | 'archived';

/** Target deployment surface(s). */
export type ProductPlatform =
  | 'windows'
  | 'macos'
  | 'linux'
  | 'web'
  | 'ios'
  | 'android'
  | 'cross-platform';

/** A single product feature bullet. */
export interface ProductFeature {
  readonly title: string;
  readonly description?: string;
}

/** A point-in-time release of a product. */
export interface ProductRelease {
  readonly version: string;
  readonly date: ISODate;
  readonly highlights?: readonly string[];
  readonly downloadUrl?: string;
  readonly sha256?: string;
  readonly sizeBytes?: number;
}

/** A SnakeWorks-branded software product. */
export interface ProductEntry {
  readonly slug: Slug;
  readonly name: string;
  /** Short one-line pitch surfaced in cards and meta tags. */
  readonly tagline: string;
  /** Longer plain-prose description (1 to 3 sentences). */
  readonly summary: string;
  readonly status: ProductStatus;
  readonly platforms: readonly ProductPlatform[];
  readonly tech: readonly string[];
  readonly features: readonly ProductFeature[];
  readonly releaseHistory?: readonly ProductRelease[];
  /** Mirrors `releaseHistory[0].version` when populated. */
  readonly latestVersion?: string;
  /** Current canonical download URL. May differ from `releaseHistory[0].downloadUrl` during embargo. */
  readonly currentDownloadUrl?: string;
  /** Source-code repository URL. Omit when the product is closed-source. */
  readonly repoUrl?: string;
  /** Dedicated product website, if any (separate from the portfolio page). */
  readonly websiteUrl?: string;
  /** Square product icon URL, served from `public/`. */
  readonly iconUrl?: string;
  readonly screenshots?: readonly Screenshot[];
}

// ---------------------------------------------------------------------------
// Advisory
// ---------------------------------------------------------------------------

export type AdvisorySeverity = 'critical' | 'high' | 'medium' | 'low' | 'informational';

/**
 * Disclosure status for a security advisory.
 *
 *   reported              Sent to the vendor; no public mention yet.
 *   acknowledged          Vendor has acknowledged receipt.
 *   patched               Vendor has shipped a fix; operator-public may be coordinated.
 *   public-disclosure     Fully public; CVE may or may not be assigned.
 */
export type AdvisoryStatus = 'reported' | 'acknowledged' | 'patched' | 'public-disclosure';

/** A single dated event in an advisory's disclosure timeline. */
export interface AdvisoryTimelineEvent {
  readonly date: ISODate;
  readonly event: string;
}

/**
 * A security advisory published (or about to be published) by the operator.
 *
 * The renderer is responsible for honoring `status`: entries with status
 * other than `public-disclosure` should be hidden from the index entirely
 * unless the operator has explicitly opted into early publication.
 */
export interface AdvisoryEntry {
  readonly slug: Slug;
  readonly title: string;
  /** Format: `CVE-YYYY-NNNNN`, e.g. `'CVE-2026-12345'`. Optional pre-assignment. */
  readonly cveId?: string;
  readonly severity: AdvisorySeverity;
  readonly vendor: string;
  readonly product: string;
  /** Free-form. May be a single version, range, or `<` prefix. */
  readonly affectedVersions?: string;
  readonly fixedInVersion?: string;
  /** Short one-line summary, safe to show in index views. */
  readonly summary: string;
  /** Long-form technical description (markdown-like plain text). */
  readonly description?: string;
  readonly status: AdvisoryStatus;
  readonly timeline?: readonly AdvisoryTimelineEvent[];
  readonly references?: readonly LinkRef[];
}
