/**
 * Single source of truth for the primary site navigation.
 *
 * Both `Nav.tsx` (desktop) and `MobileMenu.tsx` (under 768 px) consume
 * this list so the two surfaces cannot drift out of sync. The `to`
 * field is passed unchanged to React Router's `NavLink`; the `end` flag
 * is `true` only for the landing route so that `/` does not light up
 * its active indicator for every other route (NavLink's default
 * prefix-match would otherwise mark `/` active everywhere).
 */
export interface NavItem {
  /** Router path. */
  readonly to: string;
  /** Visible label. */
  readonly label: string;
  /**
   * If true, `NavLink` treats the route as active only on exact match.
   * Used for `/` so the landing-route indicator does not falsely
   * highlight on `/about`, `/products`, etc.
   */
  readonly end?: boolean;
}

export const navItems: readonly NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/projects', label: 'Projects' },
  { to: '/advisories', label: 'Advisories' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
];
