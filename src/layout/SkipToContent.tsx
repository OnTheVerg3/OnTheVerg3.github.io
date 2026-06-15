import type { ReactElement } from 'react';

import styles from './SkipToContent.module.css';

/**
 * "Skip to main content" link mounted ahead of the Nav so it is the
 * first interactive element on the page. Visually hidden by an off-screen
 * transform until focused; the focus state slides it into the top-left
 * corner. Targets `#main` (the `<main>` element in SiteLayout, which is
 * `tabIndex={-1}` to accept programmatic focus).
 *
 * Standard WCAG 2.4.1 "Bypass Blocks" pattern.
 */
export function SkipToContent(): ReactElement {
  return (
    <a className={styles.skipLink} href="#main">
      Skip to main content
    </a>
  );
}
