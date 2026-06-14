import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function LandingPage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="SnakeWorks"
      title="Portfolio"
      description={
        <>
          <p>
            <em>It sssimply works.</em> The corporate face of SnakeWorks and the personal portfolio
            of Aiden (OnTheVerg3), Software Developer and Security Advisor.
          </p>
          <p>
            Navigate via the menu above. No traditional hero is planned for this landing surface;
            the final landing layout arrives in Phase E with a curated set of entry cards into
            Products, Projects, Advisories, and Contact.
          </p>
        </>
      }
    />
  );
}
