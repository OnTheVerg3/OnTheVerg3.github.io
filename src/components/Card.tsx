import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { cx } from '../utils/cx';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  tagline?: string;
  footer?: ReactNode;
  to?: string;
  className?: string;
  children?: ReactNode;
  mutedFooter?: boolean;
}

/**
 * Surface-tier card for gallery grids. When `to` is set the entire card
 * becomes a React Router link with hover elevation.
 */
export function Card({
  title,
  tagline,
  footer,
  to,
  className,
  children,
  mutedFooter = false,
}: CardProps): ReactElement {
  const cardClass = cx(styles.card, to !== undefined && styles.interactive, className);

  const content = (
    <>
      <h3 className={styles.title}>{title}</h3>
      {tagline !== undefined ? <p className={styles.tagline}>{tagline}</p> : null}
      {children}
      {footer !== undefined ? (
        <div className={cx(styles.footer, mutedFooter && styles.footerMuted)}>{footer}</div>
      ) : null}
    </>
  );

  if (to !== undefined) {
    return (
      <Link className={cardClass} to={to}>
        {content}
      </Link>
    );
  }

  return <article className={cardClass}>{content}</article>;
}
