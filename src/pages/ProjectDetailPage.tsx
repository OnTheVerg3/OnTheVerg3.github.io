import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { PagePlaceholder } from './PagePlaceholder';

export function ProjectDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  return (
    <PagePlaceholder
      eyebrow="Project"
      title="Project detail"
      description={
        <p>
          Per-project deep dive. Architecture highlights, threat model, tech stack, optional
          screenshots, and the disclosure-gated entry name.
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
