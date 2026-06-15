import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './Button';
import { PageBody, PageHeader } from './PageHeader';
import styles from './DetailNotFound.module.css';

interface DetailNotFoundProps {
  eyebrow: string;
  resourceLabel: string;
  slug: string;
  backTo: string;
  backLabel: string;
}

/** Inline not-found surface for detail routes with an unknown slug. */
export function DetailNotFound({
  eyebrow,
  resourceLabel,
  slug,
  backTo,
  backLabel,
}: DetailNotFoundProps): ReactElement {
  return (
    <>
      <PageHeader
        description={
          <p>
            No {resourceLabel} matches <code>{slug}</code>. The entry may not exist yet, may use a
            different slug, or may not be publicly disclosed.
          </p>
        }
        eyebrow={eyebrow}
        title={`${resourceLabel} not found`}
      />
      <PageBody>
        <div className={styles.actions}>
          <Button to={backTo} variant="outline">
            {backLabel}
          </Button>
          <Link className={styles.homeLink} to="/">
            Return home
          </Link>
        </div>
      </PageBody>
    </>
  );
}
