import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { Badge } from '../components/Badge';
import grid from '../components/ContentDisplay.module.css';
import { DetailNotFound } from '../components/DetailNotFound';
import { ExternalLink } from '../components/ExternalLink';
import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { formatPlatformLabel, productStatusVariant } from '../content/display';
import { getProductBySlug } from '../content';
import { formatBytes, formatISODate } from '../utils/format';

export function ProductDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const resolvedSlug = slug ?? '';
  const product = getProductBySlug(resolvedSlug);

  if (product === undefined) {
    return (
      <DetailNotFound
        backLabel="All products"
        backTo="/products"
        eyebrow="Product"
        resourceLabel="product"
        slug={resolvedSlug}
      />
    );
  }

  const latestRelease = product.releaseHistory?.[0];

  return (
    <>
      <PageHeader
        description={<p>{product.summary}</p>}
        eyebrow="Product"
        meta={
          <>
            <Badge variant={productStatusVariant(product.status)}>{product.status}</Badge>
            {product.platforms.map((platform) => (
              <Badge key={platform} variant="muted">
                {formatPlatformLabel(platform)}
              </Badge>
            ))}
            {product.latestVersion !== undefined ? (
              <Badge variant="chrome">v{product.latestVersion}</Badge>
            ) : null}
          </>
        }
        title={product.name}
        wide
      />

      <PageBody wide>
        <Section subtitle={product.tagline} title="Overview">
          <p className={grid.featureDescription}>{product.summary}</p>
        </Section>

        <Section title="Features">
          <ul className={grid.featureList}>
            {product.features.map((feature) => (
              <li className={grid.featureItem} key={feature.title}>
                <h3 className={grid.featureTitle}>{feature.title}</h3>
                {feature.description !== undefined ? (
                  <p className={grid.featureDescription}>{feature.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Technology">
          <ul className={grid.chipList}>
            {product.tech.map((item) => (
              <li className={grid.chip} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {latestRelease !== undefined ? (
          <Section title="Latest release">
            <ul className={grid.featureList}>
              <li className={grid.featureItem}>
                <h3 className={grid.featureTitle}>
                  Version {latestRelease.version}
                  <span className={grid.timelineDate}> · {formatISODate(latestRelease.date)}</span>
                </h3>
                {latestRelease.highlights !== undefined ? (
                  <ul className={grid.featureList}>
                    {latestRelease.highlights.map((highlight) => (
                      <li className={grid.featureItem} key={highlight}>
                        <p className={grid.featureDescription}>{highlight}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {latestRelease.sizeBytes !== undefined ? (
                  <p className={grid.featureDescription}>
                    Size: {formatBytes(latestRelease.sizeBytes)}
                  </p>
                ) : null}
                {latestRelease.sha256 !== undefined ? (
                  <>
                    <p className={grid.featureDescription}>SHA-256</p>
                    <pre className={grid.monoBlock}>{latestRelease.sha256}</pre>
                  </>
                ) : null}
                {latestRelease.downloadUrl !== undefined ? (
                  <p className={grid.featureDescription}>
                    <ExternalLink href={latestRelease.downloadUrl}>Download release</ExternalLink>
                  </p>
                ) : null}
              </li>
            </ul>
          </Section>
        ) : null}

        {(product.repoUrl !== undefined || product.websiteUrl !== undefined) && (
          <Section title="Links">
            <div className={grid.chipList}>
              {product.repoUrl !== undefined ? (
                <ExternalLink href={product.repoUrl}>Source repository</ExternalLink>
              ) : null}
              {product.websiteUrl !== undefined ? (
                <ExternalLink href={product.websiteUrl}>Product website</ExternalLink>
              ) : null}
            </div>
          </Section>
        )}
      </PageBody>
    </>
  );
}
