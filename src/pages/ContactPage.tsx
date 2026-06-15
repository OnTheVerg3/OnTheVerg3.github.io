import { Code2, Mail } from 'lucide-react';
import type { ReactElement } from 'react';

import { ExternalLink } from '../components/ExternalLink';
import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import styles from './ContactPage.module.css';

const GITHUB_PROFILE_URL = 'https://github.com/OnTheVerg3';
const GITHUB_REPO_URL = 'https://github.com/OnTheVerg3/OnTheVerg3.github.io';
const CONTACT_EMAIL = 'aiden.eckstrom@gmail.com';

export function ContactPage(): ReactElement {
  return (
    <>
      <PageHeader
        description={
          <p>
            Reach out for security research collaboration, advisory coordination, product feedback,
            or portfolio inquiries. Prefer GitHub for public technical discussion; use email for
            private coordination.
          </p>
        }
        eyebrow="Contact"
        title="Get in touch"
      />

      <PageBody>
        <Section title="Primary channels">
          <ul className={styles.methodList}>
            <li className={styles.methodItem}>
              <Code2 aria-hidden className={styles.methodIcon} size={22} strokeWidth={1.75} />
              <div>
                <h3 className={styles.methodTitle}>GitHub</h3>
                <p className={styles.methodDescription}>
                  Public issues and profile for open-source and portfolio work.
                </p>
                <ExternalLink href={GITHUB_PROFILE_URL}>github.com/OnTheVerg3</ExternalLink>
              </div>
            </li>

            <li className={styles.methodItem}>
              <Mail aria-hidden className={styles.methodIcon} size={22} strokeWidth={1.75} />
              <div>
                <h3 className={styles.methodTitle}>Email</h3>
                <p className={styles.methodDescription}>
                  Private coordination, advisory reports, and vendor security inbox routing.
                </p>
                <a className={styles.emailLink} href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </li>
          </ul>
        </Section>

        <Section title="This repository">
          <p className={styles.note}>
            The portfolio source lives at{' '}
            <ExternalLink href={GITHUB_REPO_URL}>OnTheVerg3/OnTheVerg3.github.io</ExternalLink>. Use
            GitHub Issues for site bugs or content corrections.
          </p>
        </Section>
      </PageBody>
    </>
  );
}
