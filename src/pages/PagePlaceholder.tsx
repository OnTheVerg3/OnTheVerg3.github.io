import type { ReactElement, ReactNode } from 'react';

import styles from './PagePlaceholder.module.css';

interface PagePlaceholderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  futurePhase?: string;
}

/**
 * Phase C scaffold component used by every placeholder page. Renders a
 * consistent, brand-coherent shell so the routing skeleton looks
 * intentional in dev preview rather than displaying eleven different
 * "lorem ipsum" pages.
 *
 * Replaced wholesale in Phase E when each page receives its real
 * implementation; until then, every page component composes this with
 * a slightly different `eyebrow` / `title` / `description` and an
 * optional `meta` block (used by detail pages to display the resolved
 * `:slug` URL parameter so routing can be sanity-checked).
 */
export function PagePlaceholder({
  eyebrow,
  title,
  description,
  meta,
  futurePhase = 'Phase E',
}: PagePlaceholderProps): ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {eyebrow !== undefined && eyebrow.length > 0 ? (
          <p className={styles.eyebrow}>{eyebrow}</p>
        ) : null}

        <h1 className={styles.title}>{title}</h1>

        {description !== undefined ? <div className={styles.description}>{description}</div> : null}

        {meta !== undefined ? <div className={styles.meta}>{meta}</div> : null}

        <p className={styles.phaseTag}>
          Placeholder route. Real content lands in <strong>{futurePhase}</strong>.
        </p>
      </div>
    </section>
  );
}
