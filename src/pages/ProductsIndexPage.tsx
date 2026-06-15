import type { ReactElement } from 'react';

import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import grid from '../components/ContentDisplay.module.css';
import { PageBody, PageHeader } from '../components/PageHeader';
import { formatPlatformLabel, productStatusVariant } from '../content/display';
import { getAllProducts } from '../content';

export function ProductsIndexPage(): ReactElement {
  const catalogue = getAllProducts();

  return (
    <>
      <PageHeader
        description={
          <p>
            SnakeWorks-branded utilities built to do one job with full behavioural transparency.
            Each product ships as a focused native executable with documented P/Invoke surfaces and
            no telemetry.
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
