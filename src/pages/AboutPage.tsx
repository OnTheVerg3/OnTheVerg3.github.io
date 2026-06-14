import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function AboutPage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="About"
      title="Aiden, and SnakeWorks"
      description={
        <p>
          Long-form copy on the operator (Software Developer and Security Advisor) and on the
          SnakeWorks studio origin story lands in Phase E once the page voice is finalized.
        </p>
      }
    />
  );
}
