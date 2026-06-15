import type { ReactElement } from 'react';

import { cx } from '../utils/cx';
import styles from './FeatureGrid.module.css';

export interface FeatureGridItem {
  readonly title: string;
  readonly description?: string;
}

interface FeatureGridProps {
  items: readonly FeatureGridItem[];
  compact?: boolean;
  className?: string;
}

/**
 * Auto-fitting grid of feature cards. Used by product detail pages for
 * the features list and by any future page surface that displays a
 * short title + optional one-paragraph description across multiple
 * cards.
 */
export function FeatureGrid({ items, compact = false, className }: FeatureGridProps): ReactElement {
  return (
    <ul className={cx(styles.list, className)}>
      {items.map((item) => (
        <li className={cx(styles.item, compact && styles.compact)} key={item.title}>
          <h3 className={styles.title}>{item.title}</h3>
          {item.description !== undefined ? (
            <p className={styles.description}>{item.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
