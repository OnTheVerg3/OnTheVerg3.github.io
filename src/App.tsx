import type { ReactElement } from 'react';

import { Logo } from './branding/Logo';

/**
 * Phase B placeholder. Renders the canonical SnakeWorks logo at the
 * About-dialog scale (96 px tall) above the brand wordmark and italic
 * tagline. A "Logo scale" strip below renders the Logo at three brand
 * sizes (window-header 32 px, About-dialog 96 px, splash 144 px) so the
 * geometry can be sanity-checked across the documented use cases.
 *
 * Replaced wholesale in Phase C by the SiteLayout + Nav + Footer +
 * MobileMenu + routing skeleton.
 */
export function App(): ReactElement {
  return (
    <main className="phase-b-placeholder">
      <div className="phase-b-placeholder__inner">
        <div className="phase-b-placeholder__logo">
          <Logo size={96} ariaLabel="SnakeWorks" />
        </div>

        <p className="phase-b-placeholder__eyebrow">SnakeWorks</p>
        <h1 className="phase-b-placeholder__title">Portfolio</h1>
        <p className="phase-b-placeholder__tagline">
          <em>It sssimply works.</em>
        </p>
        <p className="phase-b-placeholder__phase">
          Phase B online: brand tokens, layered silhouette logo, and metallic gradient W. Routing,
          layout shell, content schemas, and page implementations land in Phases C through G.
        </p>

        <div
          className="phase-b-placeholder__scale"
          aria-label="Logo rendered at the three canonical brand sizes"
        >
          <div className="phase-b-placeholder__scale-item">
            <Logo size={32} ariaLabel="" />
            <span className="phase-b-placeholder__scale-label">32 px / nav</span>
          </div>
          <div className="phase-b-placeholder__scale-item">
            <Logo size={96} ariaLabel="" />
            <span className="phase-b-placeholder__scale-label">96 px / about</span>
          </div>
          <div className="phase-b-placeholder__scale-item">
            <Logo size={144} ariaLabel="" />
            <span className="phase-b-placeholder__scale-label">144 px / splash</span>
          </div>
        </div>
      </div>
    </main>
  );
}
