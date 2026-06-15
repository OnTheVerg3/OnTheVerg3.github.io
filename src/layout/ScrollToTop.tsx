import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not restore scroll position on `pushState`-style
 * navigations the way a browser does between page loads. Without this
 * hook, clicking a card on `/products` to land on `/products/clickwright`
 * keeps the viewport at the same Y as the card the user clicked, which
 * is visually disorienting for SPA users coming from server-rendered
 * mental models.
 *
 * This component mounts once at the top of `SiteLayout`, watches the
 * pathname, and resets the viewport to the top on every navigation
 * EXCEPT when an in-page hash is present (clicking an anchor link to a
 * heading should not be overridden). Respects `prefers-reduced-motion`
 * by using instant rather than smooth scrolling.
 */
export function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash.length > 0) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'instant',
    });
  }, [pathname, hash]);

  return null;
}
