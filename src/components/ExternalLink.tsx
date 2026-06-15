import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import type { ReactElement, ReactNode } from 'react';

import { cx } from '../utils/cx';
import styles from './ExternalLink.module.css';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Outbound link with external indicator and safe rel attributes. */
export function ExternalLink({ href, children, className }: ExternalLinkProps): ReactElement {
  return (
    <a className={cx(styles.link, className)} href={href} rel="noopener noreferrer" target="_blank">
      {children}
      <ExternalLinkIcon aria-hidden className={styles.icon} size={14} strokeWidth={2} />
      <span className={styles.srOnly}>(opens in new tab)</span>
    </a>
  );
}
