import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function ContactPage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title="Get in touch"
      description={
        <p>
          Operator contact methods (email, GitHub, optionally Keybase / Matrix / Signal for secure
          channels). Final method list and any optional secure form treatment are decided during
          Phase E.
        </p>
      }
    />
  );
}
