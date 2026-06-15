/**
 * SEO + per-route metadata management for the SPA.
 *
 * React Router does not own the document head; without explicit
 * intervention, every route ships with whatever `<title>` and meta
 * tags were baked into `index.html`. This module exposes a single
 * `useSeo()` hook that pages call on mount to update:
 *
 *   - `<title>` text
 *   - `<meta name="description">` content
 *   - `<link rel="canonical">` href
 *   - OpenGraph tags (`og:title`, `og:description`, `og:url`,
 *     `og:type`, `og:image`)
 *   - Twitter Card tags (`twitter:card`, `twitter:title`,
 *     `twitter:description`, `twitter:image`)
 *   - Optional JSON-LD structured data block
 *
 * The hook overwrites existing meta tags on every navigation. No
 * cleanup is performed because the next page's `useSeo()` call always
 * supersedes the previous one; if a user lands on a page that does NOT
 * call `useSeo()`, the previously-set values remain. Every page in
 * `src/pages/` calls it, so this is not an issue in practice.
 *
 * For social-graph crawlers that rely on server-rendered meta (most do
 * not execute JavaScript), the static `index.html` defaults remain the
 * fallback. Site-wide values like `og:site_name` and the default
 * `og:image` are baked into `index.html` and intentionally not
 * overridden here.
 */

import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Site-wide constants
// ---------------------------------------------------------------------------

export const SITE_NAME = 'SnakeWorks Portfolio';
export const SITE_BASE_URL = 'https://ontheverg3.github.io';
export const SITE_DEFAULT_DESCRIPTION =
  'The corporate face of SnakeWorks and the personal portfolio of Aiden (OnTheVerg3), Software Developer and Security Advisor.';
export const SITE_DEFAULT_OG_IMAGE = `${SITE_BASE_URL}/favicon.svg`;
export const SITE_TWITTER_CARD = 'summary';
export const SITE_OG_TYPE_DEFAULT = 'website';

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface SeoOptions {
  /** Page title; combined with site name as `${title} · ${SITE_NAME}`. Omit for the landing page. */
  readonly title?: string;
  /** Meta description, OG description, Twitter description. Falls back to SITE_DEFAULT_DESCRIPTION. */
  readonly description?: string;
  /** Path component of the canonical URL, e.g. `/products/clickwright`. Combined with SITE_BASE_URL. */
  readonly path: string;
  /** OpenGraph type (`website`, `article`, `product`, etc.). Defaults to `website`. */
  readonly ogType?: string;
  /** Absolute URL of an image (1200x630 preferred). Falls back to SITE_DEFAULT_OG_IMAGE. */
  readonly imageUrl?: string;
  /**
   * Optional JSON-LD structured data block. Use for products, advisories,
   * about page (Person), etc. The hook injects/updates a single
   * `<script type="application/ld+json" data-seo-jsonld>` element.
   */
  readonly jsonLd?: Record<string, unknown>;
}

export function useSeo(options: SeoOptions): void {
  const {
    title,
    description = SITE_DEFAULT_DESCRIPTION,
    path,
    ogType = SITE_OG_TYPE_DEFAULT,
    imageUrl = SITE_DEFAULT_OG_IMAGE,
    jsonLd,
  } = options;

  const composedTitle =
    title !== undefined && title.length > 0 ? `${title} · ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${SITE_BASE_URL}${path}`;

  useEffect(() => {
    document.title = composedTitle;

    setMetaTag('name', 'description', description);

    setMetaTag('property', 'og:title', title !== undefined && title.length > 0 ? title : SITE_NAME);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:site_name', SITE_NAME);

    setMetaTag('name', 'twitter:card', SITE_TWITTER_CARD);
    setMetaTag(
      'name',
      'twitter:title',
      title !== undefined && title.length > 0 ? title : SITE_NAME,
    );
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    setCanonicalLink(canonicalUrl);

    if (jsonLd !== undefined) {
      setJsonLd(jsonLd);
    } else {
      clearJsonLd();
    }
  }, [composedTitle, description, canonicalUrl, ogType, imageUrl, title, jsonLd]);
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

function setMetaTag(attribute: 'name' | 'property', key: string, value: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (tag === null) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

function setCanonicalLink(url: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (link === null) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

const JSON_LD_ATTRIBUTE = 'data-seo-jsonld';

function setJsonLd(data: Record<string, unknown>): void {
  let script = document.head.querySelector<HTMLScriptElement>(`script[${JSON_LD_ATTRIBUTE}]`);
  if (script === null) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute(JSON_LD_ATTRIBUTE, '');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function clearJsonLd(): void {
  const script = document.head.querySelector<HTMLScriptElement>(`script[${JSON_LD_ATTRIBUTE}]`);
  if (script !== null) {
    script.remove();
  }
}
