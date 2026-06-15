import type { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { Badge } from '../components/Badge';
import grid from '../components/ContentDisplay.module.css';
import { DetailNotFound } from '../components/DetailNotFound';
import { ExternalLink } from '../components/ExternalLink';
import { FeatureGrid } from '../components/FeatureGrid';
import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Stat, StatList } from '../components/Stat';
import { getProductBySlug } from '../content';
import type { ProductEntry } from '../content';
import { formatPlatformLabel, productStatusVariant } from '../content/display';
import { formatBytes, formatISODate } from '../utils/format';
import { SITE_BASE_URL, useSeo } from '../utils/seo';

const SITE_PRODUCT_NOT_FOUND_DESCRIPTION =
  'No SnakeWorks product matches this slug. Browse the catalogue or return home.';

function buildProductJsonLd(product: ProductEntry): Record<string, unknown> {
  const latest = product.releaseHistory?.[0];
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.summary,
    url: `${SITE_BASE_URL}/products/${product.slug}`,
    operatingSystem: product.platforms.join(', '),
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
  if (latest !== undefined) {
    json.softwareVersion = latest.version;
    json.datePublished = latest.date;
    if (latest.sizeBytes !== undefined) {
      json.fileSize = `${String(latest.sizeBytes)} B`;
    }
  }
  return json;
}

export function ProductDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const resolvedSlug = slug ?? '';
  const product = getProductBySlug(resolvedSlug);

  useSeo({
    path: `/products/${resolvedSlug}`,
    title: product !== undefined ? product.name : 'Product not found',
    description: product !== undefined ? product.summary : SITE_PRODUCT_NOT_FOUND_DESCRIPTION,
    ogType: 'product',
    ...(product !== undefined ? { jsonLd: buildProductJsonLd(product) } : {}),
  });

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
  const hasLinks = product.repoUrl !== undefined || product.websiteUrl !== undefined;
  const releaseSectionSubtitle =
    latestRelease?.highlights !== undefined
      ? 'Highlights and release metadata for the current public build.'
      : undefined;

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
        <Section subtitle={product.tagline} title="Features">
          <FeatureGrid items={product.features} />
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
          <Section
            {...(releaseSectionSubtitle !== undefined ? { subtitle: releaseSectionSubtitle } : {})}
            title={`Latest release: v${latestRelease.version}`}
          >
            {latestRelease.highlights !== undefined ? (
              <ul className={grid.featureList}>
                {latestRelease.highlights.map((highlight) => (
                  <li className={grid.featureItem} key={highlight}>
                    <p className={grid.featureDescription}>{highlight}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            <StatList>
              <Stat label="Version" value={latestRelease.version} />
              <Stat label="Released" value={formatISODate(latestRelease.date)} />
              {latestRelease.sizeBytes !== undefined ? (
                <Stat label="Size" value={formatBytes(latestRelease.sizeBytes)} />
              ) : null}
              {latestRelease.sha256 !== undefined ? (
                <Stat label="SHA-256" mono value={latestRelease.sha256} />
              ) : null}
              {latestRelease.downloadUrl !== undefined ? (
                <Stat
                  label="Download"
                  value={<ExternalLink href={latestRelease.downloadUrl}>Release page</ExternalLink>}
                />
              ) : null}
            </StatList>
          </Section>
        ) : null}

        {hasLinks ? (
          <Section title="Links">
            <ul className={grid.chipList}>
              {product.repoUrl !== undefined ? (
                <li>
                  <ExternalLink href={product.repoUrl}>Source repository</ExternalLink>
                </li>
              ) : null}
              {product.websiteUrl !== undefined ? (
                <li>
                  <ExternalLink href={product.websiteUrl}>Product website</ExternalLink>
                </li>
              ) : null}
            </ul>
          </Section>
        ) : null}
      </PageBody>
    </>
  );
}
