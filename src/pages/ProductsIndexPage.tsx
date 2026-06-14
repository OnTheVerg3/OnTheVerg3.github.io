import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function ProductsIndexPage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="Products"
      title="SnakeWorks software"
      description={
        <p>
          A gallery of SnakeWorks-branded utilities. The product schema (status, platform, tech
          stack, download URL, screenshots, feature bullets) is defined in
          <code> src/content/products.ts</code> in Phase D; the first entry is ClickWright.
        </p>
      }
    />
  );
}
