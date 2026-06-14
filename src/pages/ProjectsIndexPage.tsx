import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function ProjectsIndexPage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="Projects"
      title="Featured work"
      description={
        <p>
          Non-SnakeWorks projects across game internals, security research, frameworks, and tooling.
          The <code>ProjectEntry</code> schema includes a<code> disclosed </code>
          boolean that gates whether each entry shows full names or abstract framing; per-project
          decisions are made during Phase D content authoring.
        </p>
      }
    />
  );
}
