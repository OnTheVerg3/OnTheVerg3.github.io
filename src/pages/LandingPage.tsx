import { BookOpen, Calendar, Mail, Package, Shield, User, type LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';

import { Logo } from '../branding/Logo';
import { Card } from '../components/Card';
import grid from '../components/ContentDisplay.module.css';
import { PageBody, PageHeader } from '../components/PageHeader';
import styles from './LandingPage.module.css';

interface LandingCard {
  readonly to: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const landingCards: readonly LandingCard[] = [
  {
    to: '/about',
    title: 'About',
    description: 'Aiden as developer and security advisor, and the SnakeWorks origin story.',
    icon: User,
  },
  {
    to: '/products',
    title: 'Products',
    description: 'SnakeWorks-branded utilities built to do one thing well.',
    icon: Package,
  },
  {
    to: '/projects',
    title: 'Projects',
    description: 'Selected work across game internals, security research, and tooling.',
    icon: BookOpen,
  },
  {
    to: '/advisories',
    title: 'Advisories',
    description: 'Published security advisories and coordinated disclosure write-ups.',
    icon: Shield,
  },
  {
    to: '/schedule',
    title: 'Schedule',
    description: 'Posted availability on a live Google Calendar embed.',
    icon: Calendar,
  },
  {
    to: '/contact',
    title: 'Contact',
    description: 'GitHub, email, and other ways to reach the operator.',
    icon: Mail,
  },
];

export function LandingPage(): ReactElement {
  return (
    <>
      <PageHeader
        description={
          <p>
            The corporate face of SnakeWorks and the personal portfolio of Aiden (OnTheVerg3),
            Software Developer and Security Advisor. One cohesive surface, two identities,
            differentiated by routing and content rather than visual styling.
          </p>
        }
        eyebrow="SnakeWorks"
        title="Portfolio"
        wide
      />

      <PageBody wide>
        <section aria-label="Studio statement" className={styles.hero}>
          <div className={styles.logoMark}>
            <Logo ariaLabel="" size={56} />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>Studio statement</p>
            <p className={styles.tagline}>
              <em>It sssimply works.</em>
            </p>
            <p className={styles.heroText}>
              SnakeWorks ships focused, native, single-file Windows utilities. No installers, no
              bundled runtimes, no telemetry. Drop an executable on a thumb drive and run it. The
              same standard applies to security research, advisories, and every other surface of the
              portfolio.
            </p>
          </div>
        </section>

        <h2 className={styles.sectionHeading}>Explore the site</h2>
        <div className={grid.grid}>
          {landingCards.map(({ to, title, description, icon: Icon }) => (
            <Card footer="Open section" key={to} tagline={description} title={title} to={to}>
              <Icon aria-hidden className={styles.cardIcon} size={22} strokeWidth={1.75} />
            </Card>
          ))}
        </div>
      </PageBody>
    </>
  );
}
