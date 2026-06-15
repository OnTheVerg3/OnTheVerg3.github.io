import type { ReactElement } from 'react';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import grid from '../components/ContentDisplay.module.css';
import { PageBody, PageHeader } from '../components/PageHeader';
import { getAllProjects, getProjectDisplayName } from '../content';
import { projectStatusLabel } from '../content/display';
import { useSeo } from '../utils/seo';

export function ProjectsIndexPage(): ReactElement {
  useSeo({
    path: '/projects',
    title: 'Projects',
    description:
      'Selected non-SnakeWorks work across game internals, security research, frameworks, and tooling. Entries marked undisclosed show abstract framing until cleared for publication.',
  });

  const catalogue = getAllProjects();

  return (
    <>
      <PageHeader
        description={
          <p>
            Selected work across game internals, security research, frameworks, and tooling. Entries
            marked undisclosed show abstract framing only; full names and deep dives appear when the
            operator has cleared them for publication.
          </p>
        }
        eyebrow="Projects"
        title="Featured work"
        wide
      />

      <PageBody wide>
        <div className={grid.grid}>
          {catalogue.map((project) => (
            <Card
              footer={`View ${getProjectDisplayName(project)}`}
              key={project.slug}
              tagline={project.summary}
              title={getProjectDisplayName(project)}
              to={`/projects/${project.slug}`}
            >
              <div className={grid.chipList}>
                {!project.disclosed ? <Badge variant="muted">Undisclosed</Badge> : null}
                <Badge variant="chrome">{String(project.year)}</Badge>
                <Badge variant="muted">{projectStatusLabel(project)}</Badge>
                {project.tags?.map((tag) => (
                  <Badge key={tag} variant="chrome">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </PageBody>
    </>
  );
}
