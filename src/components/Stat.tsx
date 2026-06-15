import type { ReactElement, ReactNode } from 'react';

import { cx } from '../utils/cx';
import styles from './Stat.module.css';

interface StatRowProps {
  label: string;
  value: ReactNode;
  /** When true, the value is rendered in monospace (for hashes, IDs, paths). */
  mono?: boolean;
  className?: string;
}

/**
 * Single key-value row for tabular metadata (release dates, sizes,
 * SHA-256, affected versions, etc.). Multiple rows stack vertically
 * with a subtle separator and collapse to a single column under 600 px.
 */
export function Stat({ label, value, mono = false, className }: StatRowProps): ReactElement {
  return (
    <div className={cx(styles.row, className)}>
      <span className={styles.label}>{label}</span>
      <span className={mono ? styles.valueMono : styles.value}>{value}</span>
    </div>
  );
}

interface StatListProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container for Stat rows. Provides a consistent surface treatment
 * (subtle background, border, padding) so a list of stats reads as one
 * cohesive metadata block.
 */
export function StatList({ children, className }: StatListProps): ReactElement {
  return <div className={cx(styles.list, className)}>{children}</div>;
}
