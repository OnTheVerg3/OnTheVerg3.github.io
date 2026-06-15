import type { ReactElement, ReactNode } from 'react';

import { cx } from '../utils/cx';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  wide?: boolean;
}

/**
 * Consistent page masthead used across all Phase E implementations.
 * Replaces the Phase C PagePlaceholder masthead without the scaffold tag.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  wide = false,
}: PageHeaderProps): ReactElement {
  return (
    <header className={styles.section}>
      <div className={cx(styles.inner, wide && styles.wide)}>
        {eyebrow !== undefined && eyebrow.length > 0 ? (
          <p className={styles.eyebrow}>{eyebrow}</p>
        ) : null}

        <h1 className={styles.title}>{title}</h1>

        {description !== undefined ? <div className={styles.description}>{description}</div> : null}

        {meta !== undefined && meta !== null ? <div className={styles.meta}>{meta}</div> : null}
      </div>
    </header>
  );
}

interface PageBodyProps {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}

/** Content region below PageHeader with consistent horizontal padding. */
export function PageBody({ children, wide = false, className }: PageBodyProps): ReactElement {
  return <div className={cx(styles.body, wide && styles.bodyWide, className)}>{children}</div>;
}
