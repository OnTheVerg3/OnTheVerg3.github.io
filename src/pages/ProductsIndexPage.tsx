import type { ReactElement } from 'react';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import grid from '../components/ContentDisplay.module.css';
import { PageBody, PageHeader } from '../components/PageHeader';
import { getAllProducts } from '../content';
import { formatPlatformLabel, productStatusVariant } from '../content/display';
import { useSeo } from '../utils/seo';

export function ProductsIndexPage(): ReactElement {
  useSeo({
    path: '/products',
    title: 'Products',
    description:
      'SnakeWorks-branded software spanning focused single-task tools, multi-component suites, and full applications. Built native, documented down to the system-call surface, and shipped with full behavioural transparency.',
  });

  const catalogue = getAllProducts();

  return (
    <>
      <PageHeader
        description={
          <p>
            SnakeWorks-branded software ranging from focused single-task tools to multi-component
            suites. Every product is built native, documented down to the system-call surface, and
            ships with full behavioural transparency.
          </p>
        }
        eyebrow="Products"
        title="SnakeWorks software"
        wide
      />

      <PageBody wide>
        <div className={grid.grid}>
          {catalogue.map((product) => (
            <Card
              footer={`View ${product.name}`}
              key={product.slug}
              tagline={product.tagline}
              title={product.name}
              to={`/products/${product.slug}`}
            >
              <div className={grid.chipList}>
                <Badge variant={productStatusVariant(product.status)}>{product.status}</Badge>
                {product.platforms.map((platform) => (
                  <Badge key={platform} variant="muted">
                    {formatPlatformLabel(platform)}
                  </Badge>
                ))}
                {product.latestVersion !== undefined ? (
                  <Badge variant="chrome">v{product.latestVersion}</Badge>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </PageBody>
    </>
  );
}
