import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Nav } from './Nav';
import styles from './SiteLayout.module.css';

/**
 * Application chrome shell.
 *
 * Wraps the route tree so every page is rendered under the same Nav and
 * above the same Footer. Pages mount into the `<Outlet />` between the
 * two. The shell sets up:
 *   - A minimum-viewport-height grid (nav / main / footer) so short
 *     pages still push the footer to the bottom of the viewport.
 *   - `main#main` as the keyboard-skip target (Phase G will add a
 *     "Skip to main content" link in Nav).
 *   - Graphite background at the chrome level so navigation between
 *     pages never flashes to white.
 */
export function SiteLayout(): ReactElement {
  return (
    <div className={styles.shell}>
      <Nav />
      <main id="main" className={styles.main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
