import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { PagePlaceholder } from './PagePlaceholder';

export function ProductDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  return (
    <PagePlaceholder
      eyebrow="Product"
      title="Product detail"
      description={
        <p>
          Per-product detail page. Will render long-form description, feature bullets, screenshots,
          download link, repo link, and release timeline from the
          <code> ProductEntry </code>
          matched on this slug.
        </p>
      }
      meta={
        <>
          <span>route param</span>
          <strong>slug = {slug ?? '(none)'}</strong>
        </>
      }
    />
  );
}
