import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { PagePlaceholder } from './PagePlaceholder';

export function AdvisoryDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  return (
    <PagePlaceholder
      eyebrow="Advisory"
      title="Advisory detail"
      description={
        <p>
          Per-advisory write-up. Severity, CVE, affected product, technical details, the disclosure
          timeline (reported / acknowledged / patched / publicly disclosed dates), and the fixed-in
          version.
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
