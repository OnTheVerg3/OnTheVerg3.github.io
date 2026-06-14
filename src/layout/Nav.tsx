import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

import { Logo } from '../branding/Logo';
import { breakpoints, useMediaQuery } from '../hooks/useMediaQuery';
import { cx } from '../utils/cx';
import { MobileMenu } from './MobileMenu';
import { navItems } from './navItems';
import styles from './Nav.module.css';

/**
 * Persistent top-of-page navigation. Sticky at the top, graphite background,
 * thin chrome-tinted bottom border to separate from page content.
 *
 * Layout:
 *   [Logo (32 px, links to /)] ...... [nav links]            (desktop)
 *   [Logo (32 px, links to /)] ...... [hamburger]            (mobile)
 *
 * Active route is indicated by a 2 px emerald underline that scales in
 * from `scaleX(0)` to `scaleX(1)` via a 200 ms ease-out transition, per
 * the brand spec's "Web-Specific Brand Elements" section.
 *
 * The hamburger button opens the full-screen `MobileMenu` overlay. The
 * overlay self-closes when the user follows any link, when the Escape
 * key is pressed, or when the close button is activated; the parent
 * also force-closes the overlay any time the route changes (defence
 * in depth) or the viewport crosses back above the mobile cutover.
 */
export function Nav(): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const location = useLocation();

  // Close the mobile overlay whenever the route changes so back/forward
  // navigation never leaves the overlay stranded over a new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close the overlay if the viewport widens past the mobile cutover
  // while the overlay is open. Avoids the overlay being visually orphan
  // on desktop where the desktop nav links are already showing.
  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <NavLink to="/" className={cx(styles.brand)} aria-label="SnakeWorks home">
            <Logo size={32} ariaLabel="" />
            <span className={styles.brandWord}>SnakeWorks</span>
          </NavLink>

          {isDesktop ? (
            <nav className={styles.nav} aria-label="Primary">
              <ul className={styles.list}>
                {navItems.map((item) => (
                  <li key={item.to} className={styles.item}>
                    <NavLink
                      to={item.to}
                      end={item.end ?? false}
                      className={({ isActive }) =>
                        [styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => {
                setMenuOpen(true);
              }}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      <MobileMenu
        open={menuOpen && !isDesktop}
        onClose={() => {
          setMenuOpen(false);
        }}
        items={navItems}
      />
    </>
  );
}
