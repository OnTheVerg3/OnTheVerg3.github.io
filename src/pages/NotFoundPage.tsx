import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cx } from '../utils/cx';
import styles from './NotFoundPage.module.css';
import shared from './PagePlaceholder.module.css';

export function NotFoundPage(): ReactElement {
  const location = useLocation();
  return (
    <section className={shared.section}>
      <div className={shared.inner}>
        <p className={cx(shared.eyebrow, styles.eyebrow)}>404</p>
        <h1 className={shared.title}>Page not found</h1>
        <div className={shared.description}>
          <p>
            Nothing routes to <code>{location.pathname}</code>. The URL may be from an older version
            of the site, mistyped, or part of a section that has not yet shipped.
          </p>
          <p>
            <Link className={cx(styles.homeLink)} to="/">
              Return to the landing page
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
