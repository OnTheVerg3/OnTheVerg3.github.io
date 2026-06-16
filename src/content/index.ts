/**
 * Barrel exports + lookup helpers for the content layer.
 *
 * Pages should import from this module rather than reaching into the
 * individual data files, so the data-loading surface can be swapped
 * later (e.g. for fetched MDX or a generated index) without touching
 * every page.
 *
 * All lookup helpers are O(N) linear scans. The catalogue is small by
 * design (~10s of entries, never hundreds), so the cost of building
 * Maps for O(1) lookup is not justified. Reconsider if a category ever
 * crosses 500 entries.
 */

import { advisories } from './advisories';
import { products } from './products';
import type { AdvisoryEntry, ProductEntry, Slug } from './types';

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export { advisories, products };
export type * from './types';

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export function getAllProducts(): readonly ProductEntry[] {
  return products;
}

export function getProductBySlug(slug: Slug): ProductEntry | undefined {
  return products.find((entry) => entry.slug === slug);
}

// ---------------------------------------------------------------------------
// Advisories
// ---------------------------------------------------------------------------

export function getAllAdvisories(): readonly AdvisoryEntry[] {
  return advisories;
}

/**
 * Returns only advisories that have reached public disclosure. Use this
 * in the public index view; the unfiltered `getAllAdvisories()` is
 * available for any operator-only surface that wants to surface in-flight
 * advisories.
 */
export function getPublicAdvisories(): readonly AdvisoryEntry[] {
  return advisories.filter((entry) => entry.status === 'public-disclosure');
}

export function getAdvisoryBySlug(slug: Slug): AdvisoryEntry | undefined {
  return advisories.find((entry) => entry.slug === slug);
}
