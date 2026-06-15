import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { Badge } from '../components/Badge';
import grid from '../components/ContentDisplay.module.css';
import { DetailNotFound } from '../components/DetailNotFound';
import { ExternalLink } from '../components/ExternalLink';
import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Stat, StatList } from '../components/Stat';
import { getAdvisoryBySlug } from '../content';
import { advisorySeverityVariant, advisoryStatusLabel } from '../content/display';
import { formatISODate } from '../utils/format';

export function AdvisoryDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const resolvedSlug = slug ?? '';
  const advisory = getAdvisoryBySlug(resolvedSlug);

  if (advisory?.status !== 'public-disclosure') {
    return (
      <DetailNotFound
        backLabel="All advisories"
        backTo="/advisories"
        eyebrow="Advisory"
        resourceLabel="advisory"
        slug={resolvedSlug}
      />
    );
  }

  return (
    <>
      <PageHeader
        description={<p>{advisory.summary}</p>}
        eyebrow="Advisory"
        meta={
          <>
            <Badge variant={advisorySeverityVariant(advisory.severity)}>{advisory.severity}</Badge>
            <Badge variant="muted">{advisoryStatusLabel(advisory.status)}</Badge>
            {advisory.cveId !== undefined ? <Badge variant="chrome">{advisory.cveId}</Badge> : null}
          </>
        }
        title={advisory.title}
        wide
      />

      <PageBody wide>
        <Section title="At a glance">
          <StatList>
            <Stat label="Vendor" value={advisory.vendor} />
            <Stat label="Product" value={advisory.product} />
            <Stat label="Severity" value={advisory.severity} />
            {advisory.cveId !== undefined ? <Stat label="CVE" mono value={advisory.cveId} /> : null}
            {advisory.affectedVersions !== undefined ? (
              <Stat label="Affected" value={advisory.affectedVersions} />
            ) : null}
            {advisory.fixedInVersion !== undefined ? (
              <Stat label="Fixed in" value={advisory.fixedInVersion} />
            ) : null}
          </StatList>
        </Section>

        {advisory.description !== undefined ? (
          <Section title="Technical details">
            <p className={grid.featureDescription}>{advisory.description}</p>
          </Section>
        ) : null}

        {advisory.timeline !== undefined && advisory.timeline.length > 0 ? (
          <Section title="Disclosure timeline">
            <ul className={grid.timeline}>
              {advisory.timeline.map((event) => (
                <li className={grid.timelineItem} key={`${event.date}-${event.event}`}>
                  <span className={grid.timelineDate}>{formatISODate(event.date)}</span>
                  <span className={grid.timelineEvent}>{event.event}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {advisory.references !== undefined && advisory.references.length > 0 ? (
          <Section title="References">
            <ul className={grid.chipList}>
              {advisory.references.map((reference) => (
                <li key={reference.url}>
                  <ExternalLink href={reference.url}>{reference.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </PageBody>
    </>
  );
}
