import type { ReactElement } from 'react';

import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import styles from './AboutPage.module.css';

export function AboutPage(): ReactElement {
  return (
    <>
      <PageHeader
        description={
          <p>
            Aiden (OnTheVerg3) is a Software Developer and Security Advisor. SnakeWorks is the
            product label for focused native utilities; this site is the unified corporate and
            personal portfolio at https://ontheverg3.github.io.
          </p>
        }
        eyebrow="About"
        title="Aiden, and SnakeWorks"
      />

      <PageBody>
        <Section title="The operator">
          <div className={styles.prose}>
            <p>
              Work spans game internals and modding, Windows internals, offensive security research,
              native C/C++ and .NET development, and web tooling. The through-line is building
              precise, auditable systems: utilities that do one thing well, research frameworks with
              explicit threat models, and advisories that document findings with the same rigor as
              the code.
            </p>
            <p>
              Security advisory work is conducted for educational purposes and to advise vendors of
              exploits and vulnerabilities. Disclosure timelines, severity ratings, and technical
              write-ups appear in the Advisories section as they reach public coordination.
            </p>
          </div>
        </Section>

        <Section title="SnakeWorks">
          <div className={styles.prose}>
            <p>
              SnakeWorks ships focused, native, single-file Windows utilities: no installers, no
              bundled runtimes, no telemetry. Drop an executable on a thumb drive and run it. The
              Coiled Silver palette (graphite, chrome, emerald, soft white) governs every branded
              surface, native and web alike.
            </p>
            <p>
              ClickWright is the first public product: a precision wall-clock mouse click scheduler
              built with WPF, MVVM, and a hand-rolled P/Invoke layer. More utilities will follow the
              same contract: one job, one executable, full behavioural transparency documented in
              the product README.
            </p>
          </div>
        </Section>

        <Section title="This site">
          <div className={styles.prose}>
            <p>
              The portfolio is a React 19 + Vite 7 + TypeScript single-page application deployed to
              GitHub Pages. Corporate product pages and personal project entries share one
              navigation shell and one visual language; routing separates the two identities rather
              than duplicating chrome or palette.
            </p>
          </div>
        </Section>
      </PageBody>
    </>
  );
}
