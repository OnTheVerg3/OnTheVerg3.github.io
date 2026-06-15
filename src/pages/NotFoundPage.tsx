import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '../components/Button';
import { PageBody, PageHeader } from '../components/PageHeader';
import styles from './NotFoundPage.module.css';

export function NotFoundPage(): ReactElement {
  const location = useLocation();
  return (
    <>
      <PageHeader
        description={
          <p>
            Nothing routes to <code>{location.pathname}</code>. The URL may be from an older version
            of the site, mistyped, or part of a section that has not yet shipped.
          </p>
        }
        eyebrow="404"
        title="Page not found"
      />

      <PageBody>
        <div className={styles.actions}>
          <Button to="/" variant="primary">
            Return to landing
          </Button>
          <Link className={styles.helperLink} to="/products">
            Browse products
          </Link>
          <Link className={styles.helperLink} to="/projects">
            Browse projects
          </Link>
        </div>
      </PageBody>
    </>
  );
}
