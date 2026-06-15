import type { ReactElement } from 'react';

import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import styles from './SchedulePage.module.css';
import { GOOGLE_CALENDAR_EMBED_URL } from './scheduleConstants';

export function SchedulePage(): ReactElement {
  return (
    <>
      <PageHeader
        description={
          <p>
            Posted availability on a live Google Calendar embed. Times are shown in America/Los
            Angeles unless your Google account overrides the timezone.
          </p>
        }
        eyebrow="Schedule"
        title="Calendar"
        wide
      />

      <PageBody wide>
        <Section title="Posted schedule">
          <div className={styles.embedShell}>
            <iframe
              className={styles.embed}
              src={GOOGLE_CALENDAR_EMBED_URL}
              title="Aiden's posted schedule"
            />
          </div>
          <p className={styles.note}>
            The embed loads content from Google Calendar. If it fails to appear, your browser or
            network may be blocking third-party frames.
          </p>
        </Section>
      </PageBody>
    </>
  );
}
