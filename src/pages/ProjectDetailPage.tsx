import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { Badge } from '../components/Badge';
import grid from '../components/ContentDisplay.module.css';
import { DetailNotFound } from '../components/DetailNotFound';
import { ExternalLink } from '../components/ExternalLink';
import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Stat, StatList } from '../components/Stat';
import { getProjectBySlug, getProjectDisplayName } from '../content';
import { projectStatusLabel } from '../content/display';
import styles from './ProjectDetailPage.module.css';

export function ProjectDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const resolvedSlug = slug ?? '';
  const project = getProjectBySlug(resolvedSlug);

  if (project === undefined) {
    return (
      <DetailNotFound
        backLabel="All projects"
        backTo="/projects"
        eyebrow="Project"
        resourceLabel="project"
        slug={resolvedSlug}
      />
    );
  }

  const displayName = getProjectDisplayName(project);
  const techList = project.tech ?? [];
  const linkList = project.disclosed ? (project.links ?? []) : [];

  return (
    <>
      <PageHeader
        description={<p>{project.summary}</p>}
        eyebrow="Project"
        meta={
          <>
            {!project.disclosed ? <Badge variant="muted">Undisclosed</Badge> : null}
            <Badge variant="chrome">{String(project.year)}</Badge>
            <Badge variant="muted">{projectStatusLabel(project)}</Badge>
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="chrome">
                {tag}
              </Badge>
            ))}
          </>
        }
        title={displayName}
        wide
      />

      <PageBody wide>
        {!project.disclosed ? (
          <div className={styles.notice}>
            <p>
              This entry is not fully disclosed. Only the public-safe summary, year, tags, and
              status are shown. Full names, descriptions, links, and screenshots remain gated until
              the operator clears them for publication.
            </p>
          </div>
        ) : null}

        <Section title="At a glance">
          <StatList>
            <Stat label="Year" value={String(project.year)} />
            <Stat label="Status" value={projectStatusLabel(project)} />
            <Stat label="Disclosure" value={project.disclosed ? 'Public' : 'Gated'} />
            {project.tags !== undefined && project.tags.length > 0 ? (
              <Stat label="Tags" value={project.tags.join(' · ')} />
            ) : null}
          </StatList>
        </Section>

        {project.disclosed && project.description !== undefined ? (
          <Section title="Description">
            <p className={grid.featureDescription}>{project.description}</p>
          </Section>
        ) : null}

        {techList.length > 0 ? (
          <Section title="Technology">
            <ul className={grid.chipList}>
              {techList.map((item) => (
                <li className={grid.chip} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {linkList.length > 0 ? (
          <Section title="Links">
            <ul className={grid.chipList}>
              {linkList.map((link) => (
                <li key={link.url}>
                  <ExternalLink href={link.url}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </PageBody>
    </>
  );
}
