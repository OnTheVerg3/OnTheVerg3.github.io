import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

import { useScrollLock } from '../hooks/useScrollLock';
import { cx } from '../utils/cx';
import type { NavItem } from './navItems';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

/**
 * Full-screen mobile navigation overlay.
 *
 * Renders when `open` is `true`. Locks body scroll while open via the
 * `useScrollLock` hook, listens for the Escape key to call `onClose`,
 * and auto-closes when the user follows any nav link (handled inline
 * by passing `onClick={onClose}` to each NavLink).
 *
 * The overlay covers the full viewport. The chrome (close button) sits
 * at the top-right; the link list is vertically centered and uses the
 * display typeface for presence. Active route is indicated by the
 * shared emerald underline pattern via the `:where()` selector on
 * `.aria-current="page"` so it stays consistent with the desktop nav.
 *
 * The component returns `null` when closed so it does not participate
 * in the DOM or tab order while hidden.
 */
export function MobileMenu({ open, onClose, items }: MobileMenuProps): ReactElement | null {
  useScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Site navigation">
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <X size={28} aria-hidden="true" />
      </button>

      <nav className={styles.nav} aria-label="Mobile primary">
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.to} className={styles.item}>
              <NavLink
                to={item.to}
                end={item.end ?? false}
                onClick={onClose}
                className={({ isActive }) => cx(styles.link, isActive && styles.linkActive)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
