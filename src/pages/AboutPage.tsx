import type { ReactElement } from 'react';

import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { SITE_BASE_URL, useSeo } from '../utils/seo';
import styles from './AboutPage.module.css';

const ABOUT_JSON_LD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aiden',
  alternateName: 'OnTheVerg3',
  jobTitle: 'Software Developer and Security Advisor',
  url: `${SITE_BASE_URL}/about`,
  sameAs: ['https://github.com/OnTheVerg3'],
  affiliation: {
    '@type': 'Organization',
    name: 'SnakeWorks',
    url: SITE_BASE_URL,
  },
};

export function AboutPage(): ReactElement {
  useSeo({
    path: '/about',
    title: 'About',
    description:
      'Aiden (OnTheVerg3) is a Software Developer and Security Advisor. SnakeWorks is the software label for native products built carefully, behaving predictably, and documented with full behavioural transparency.',
    jsonLd: ABOUT_JSON_LD,
  });

  return (
    <>
      <PageHeader
        description={
          <p>
            Aiden (OnTheVerg3) is a Software Developer and Security Advisor. SnakeWorks is the
            software label for native products built carefully and documented thoroughly; this site
            is the unified corporate and personal portfolio at https://ontheverg3.github.io.
          </p>
        }
        eyebrow="About"
        title="Aiden, and SnakeWorks"
      />

      <PageBody>
        <Section title="The operator">
          <div className={styles.prose}>
            <p>
              Work spans Windows internals, kernel and hypervisor research, offensive security
              tooling, native C / C++ and .NET development, full-stack web, and game internals. The
              through-line is building precise, auditable systems: products that earn their
              reliability claims, research platforms with explicit threat models, and advisories
              that document findings with the same rigor as the code.
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
              SnakeWorks is a software label built around the standard the tagline implies: things
              that work, plainly and reliably, and explain themselves. Products span focused
              single-task tools, multi-component suites, and full applications, deployed wherever
              the problem lives. The Coiled Silver palette (graphite, chrome, emerald, soft white)
              governs every branded surface, native and web alike.
            </p>
            <p>
              ClickWright is the first public release: a precision wall-clock mouse click scheduler
              built with WPF, MVVM, and a hand-rolled P/Invoke layer. It is one specific shape
              SnakeWorks software can take; future products will adopt whatever shape the problem
              requires, held to the same standard of craft, behavioural transparency, and documented
              surface.
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
