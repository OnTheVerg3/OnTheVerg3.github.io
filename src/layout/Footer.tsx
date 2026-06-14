import type { ReactElement } from 'react';

import styles from './Footer.module.css';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Persistent site footer. Brand-coherent, deliberately low-contrast so it
 * recedes beneath page content. Single source for the italicized tagline
 * (the brand bible designates the tagline a mandatory presence at the
 * bottom of every page) and the operator's primary off-site touchpoints.
 *
 * Content is intentionally minimal: tagline + copyright + GitHub link.
 * Additional social or contact surfaces belong on the dedicated /contact
 * page, not in chrome.
 */
export function Footer(): ReactElement {
  return (
    <footer className={styles.footer} aria-labelledby="site-footer-tagline">
      <div className={styles.inner}>
        <p id="site-footer-tagline" className={styles.tagline}>
          <em>It sssimply works.</em>
        </p>

        <div className={styles.meta}>
          <span className={styles.copyright}>
            &copy; {CURRENT_YEAR} SnakeWorks &middot; Aiden (OnTheVerg3)
          </span>
          <a
            className={styles.link}
            href="https://github.com/OnTheVerg3"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
