import type { ReactElement, ReactNode } from 'react';

import { cx } from '../utils/cx';
import styles from './Section.module.css';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/** Page section wrapper with optional heading and consistent vertical rhythm. */
export function Section({ title, subtitle, children, className }: SectionProps): ReactElement {
  return (
    <section className={cx(styles.section, className)}>
      {title !== undefined ? <h2 className={styles.heading}>{title}</h2> : null}
      {subtitle !== undefined ? <p className={styles.subheading}>{subtitle}</p> : null}
      {children}
    </section>
  );
}
