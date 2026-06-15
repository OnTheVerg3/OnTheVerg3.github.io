import type { ReactElement } from 'react';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import grid from '../components/ContentDisplay.module.css';
import { PageBody, PageHeader } from '../components/PageHeader';
import { getPublicAdvisories } from '../content';
import { advisorySeverityVariant } from '../content/display';
import { useSeo } from '../utils/seo';

export function AdvisoriesIndexPage(): ReactElement {
  useSeo({
    path: '/advisories',
    title: 'Advisories',
    description:
      'Published security advisories and coordinated disclosure write-ups by Aiden (OnTheVerg3). In-flight reports that have not reached public disclosure are not listed.',
  });

  const published = getPublicAdvisories();

  return (
    <>
      <PageHeader
        description={
          <p>
            Published security advisories and coordinated disclosure write-ups. In-flight reports
            that have not reached public disclosure are not listed here.
          </p>
        }
        eyebrow="Advisories"
        title="Security advisories"
        wide
      />

      <PageBody wide>
        {published.length === 0 ? (
          <div className={grid.emptyState}>
            <p>
              No public advisories are published yet. When coordinated disclosures reach public
              status, they will appear here with severity, CVE ID (when assigned), and a link to the
              full write-up.
            </p>
          </div>
        ) : (
          <div className={grid.grid}>
            {published.map((advisory) => (
              <Card
                footer="Read advisory"
                key={advisory.slug}
                tagline={advisory.summary}
                title={advisory.title}
                to={`/advisories/${advisory.slug}`}
              >
                <div className={grid.chipList}>
                  <Badge variant={advisorySeverityVariant(advisory.severity)}>
                    {advisory.severity}
                  </Badge>
                  {advisory.cveId !== undefined ? (
                    <Badge variant="chrome">{advisory.cveId}</Badge>
                  ) : null}
                  <Badge variant="muted">
                    {advisory.vendor} · {advisory.product}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
