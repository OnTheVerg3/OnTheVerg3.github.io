import type { ReactElement } from 'react';

import { PagePlaceholder } from './PagePlaceholder';

export function SchedulePage(): ReactElement {
  return (
    <PagePlaceholder
      eyebrow="Schedule"
      title="Calendar"
      description={
        <p>
          The Google Calendar embed preserved from the legacy site lands here in Phase E. The embed
          URL is retained intact; only the surrounding chrome (header, fullscreen toggle, timezone
          note) is rebuilt to match the SnakeWorks brand.
        </p>
      }
    />
  );
}
