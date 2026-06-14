import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function AdvisoriesIndexPage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="Advisories"
      title="Security advisories"
      description={
        <p>
          A chronologically ordered list of published advisories. Each entry surfaces severity, CVE
          ID (when assigned), target vendor and product, and a short summary. The
          <code> AdvisoryEntry </code>
          schema with the disclosure timeline is defined in
          <code> src/content/advisories.ts </code>
          in Phase D.
        </p>
      }
    />
  );
}
