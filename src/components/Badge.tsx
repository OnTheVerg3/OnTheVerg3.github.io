import type { ReactElement, ReactNode } from 'react';

import { cx } from '../utils/cx';
import styles from './Badge.module.css';

export type BadgeVariant = 'emerald' | 'chrome' | 'muted' | 'warning' | 'critical';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/** Tag / status chip aligned to the Coiled Silver palette. */
export function Badge({ children, variant = 'chrome', className }: BadgeProps): ReactElement {
  return <span className={cx(styles.badge, styles[variant], className)}>{children}</span>;
}
