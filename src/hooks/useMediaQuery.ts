import { useEffect, useState } from 'react';

/**
 * Reactive media-query hook.
 *
 * Returns `true` when the supplied CSS media query currently matches and
 * subscribes to changes via `MediaQueryList`'s `change` event so consumer
 * components re-render at the moment the viewport crosses the breakpoint.
 *
 * Use this for responsive logic that cannot be expressed in pure CSS,
 * such as swapping the desktop navigation for a hamburger menu under
 * 768 px or conditionally rendering different markup based on
 * `(prefers-reduced-motion: reduce)`.
 *
 * SSR-safe: the initial state defers to `false` when `window` is not
 * defined (the build is client-only today, but keeping this guard
 * preserves portability if Phase H later adopts a hybrid pre-render).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mql = window.matchMedia(query);

    // Snap to the current value at subscription time. Avoids a brief
    // mismatch when the viewport changed between the lazy initial state
    // and the effect run (e.g. between SSR hydration and first paint).
    setMatches(mql.matches);

    const handler = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Convenience breakpoint constants matching the documented brand
 * breakpoint policy (mobile cutover at 768 px per ARCHITECTURE.md).
 *
 * Consumers should prefer these named constants over ad-hoc string
 * literals so the breakpoint can be tuned in one place.
 */
export const breakpoints = {
  /** True when viewport is wider than the mobile cutover. */
  desktop: '(min-width: 768px)',
  /** True when viewport is at or below the mobile cutover. */
  mobile: '(max-width: 767.98px)',
  /** True when the user has requested reduced motion at the OS level. */
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;
