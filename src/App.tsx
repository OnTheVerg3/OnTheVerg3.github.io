import type { ReactElement } from 'react';

export function App(): ReactElement {
  return (
    <main className="phase-a-placeholder">
      <div className="phase-a-placeholder__inner">
        <p className="phase-a-placeholder__eyebrow">SnakeWorks</p>
        <h1 className="phase-a-placeholder__title">Portfolio</h1>
        <p className="phase-a-placeholder__tagline">
          <em>It sssimply works.</em>
        </p>
        <p className="phase-a-placeholder__phase">
          Phase A scaffold online. Brand tokens, layout shell, and routing land in subsequent
          phases.
        </p>
      </div>
    </main>
  );
}
