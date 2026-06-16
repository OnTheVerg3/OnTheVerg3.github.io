import type { ReactElement } from 'react';

import { FeatureGrid, type FeatureGridItem } from '../components/FeatureGrid';
import { PageBody, PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { useSeo } from '../utils/seo';

/**
 * Engineering page.
 *
 * Replaces the prior `/projects` route. Languages-first, with neutral
 * application context. Intentionally avoids naming individual projects
 * or operational domains so the page reads as a senior engineer's stack
 * page rather than as an inventory of capabilities. If the catalogue
 * needs to grow, add entries to `languages` and keep the same shape.
 */

const languages: readonly FeatureGridItem[] = [
  {
    title: 'C / C++',
    description:
      'Native Windows software and system-level components. Reached for when direct API access, deterministic memory behaviour, and tight resource control are required. CMake for cross-component builds, MSVC and the Windows SDK for the toolchain.',
  },
  {
    title: 'C# / .NET',
    description:
      'Desktop applications with WPF and MVVM, web services with ASP.NET Core, browser-hosted frontends with Blazor WebAssembly, and managed-to-native interop through P/Invoke. The most-used language by hours, spanning .NET Framework 4.8 through .NET 8.',
  },
  {
    title: 'Go',
    description:
      'Network services and high-throughput command-line tooling. Picked when a service has to be both fast and operationally simple: built-in concurrency primitives and single-binary deployment without a runtime dependency.',
  },
  {
    title: 'Python',
    description:
      'Tooling, automation, and analysis. Click and Rich for command-line interfaces, httpx and requests for HTTP work, and a long tail of utility scripts that benefit from a fast iteration loop and a broad standard library.',
  },
  {
    title: 'TypeScript / JavaScript',
    description:
      'Modern web applications with React 19, desktop applications with Electron, and browser extensions targeting the Chrome MV3 APIs. TypeScript for everything new; strict mode is the baseline, not a stretch goal.',
  },
  {
    title: 'Kotlin',
    description:
      'Android applications built with Jetpack Compose and Material 3. Coroutines and Flow for concurrency, Hilt for dependency injection, and Room for local persistence.',
  },
  {
    title: 'PowerShell',
    description:
      'Windows automation, build orchestration, certificate management, and infrastructure scripts that live closer to the operating system than to application code.',
  },
  {
    title: 'x64 Assembly (MASM)',
    description:
      'Small low-level routines where direct register and calling-convention control matters. Used as a thin layer beneath higher-level languages, not as a general-purpose tool.',
  },
  {
    title: 'SQL',
    description:
      'Relational persistence layers, typically through Entity Framework Core in .NET applications and through hand-rolled queries elsewhere when the data model is small enough to justify it.',
  },
];

export function EngineeringPage(): ReactElement {
  useSeo({
    path: '/engineering',
    title: 'Engineering',
    description:
      'The languages reached for regularly across native, web, mobile, and systems work, with brief context on where each one has been applied.',
  });

  return (
    <>
      <PageHeader
        description={
          <p>
            Languages are chosen per problem, not picked once and stretched to fit everything. The
            list below captures what gets reached for regularly and the kinds of systems each one
            has been applied to. Where multiple languages overlap in capability, the choice usually
            comes down to deployment shape (single binary vs. managed runtime), ecosystem fit, and
            how much of the underlying system the work needs to touch.
          </p>
        }
        eyebrow="Engineering"
        title="Languages and applications"
        wide
      />

      <PageBody wide>
        <Section title="Languages I reach for">
          <FeatureGrid items={languages} />
        </Section>
      </PageBody>
    </>
  );
}
