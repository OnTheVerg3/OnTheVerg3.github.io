import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Nav } from './Nav';
import { ScrollToTop } from './ScrollToTop';
import { SkipToContent } from './SkipToContent';
import styles from './SiteLayout.module.css';

/**
 * Application chrome shell.
 *
 * Wraps the route tree so every page is rendered under the same Nav and
 * above the same Footer. Pages mount into the `<Outlet />` between the
 * two. The shell sets up:
 *   - A minimum-viewport-height grid (nav / main / footer) so short
 *     pages still push the footer to the bottom of the viewport.
 *   - `SkipToContent` as the very first focusable element for keyboard
 *     and screen-reader users (WCAG 2.4.1 "Bypass Blocks").
 *   - `main#main` as the keyboard-skip target (`tabIndex={-1}` so it
 *     can accept programmatic focus from the skip link).
 *   - `ScrollToTop` mounted at the chrome level so every route change
 *     resets the viewport to (0, 0) unless an in-page hash is present.
 *   - Graphite background at the chrome level so navigation between
 *     pages never flashes to white.
 */
export function SiteLayout(): ReactElement {
  return (
    <div className={styles.shell}>
      <ScrollToTop />
      <SkipToContent />
      <Nav />
      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
