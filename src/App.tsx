import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SiteLayout } from './layout/SiteLayout';
import { AboutPage } from './pages/AboutPage';
import { AdvisoriesIndexPage } from './pages/AdvisoriesIndexPage';
import { AdvisoryDetailPage } from './pages/AdvisoryDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductsIndexPage } from './pages/ProductsIndexPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsIndexPage } from './pages/ProjectsIndexPage';
import { SchedulePage } from './pages/SchedulePage';

/**
 * Route tree. SiteLayout is the single parent layout route so every
 * page renders inside the persistent Nav + Footer chrome. NotFoundPage
 * is also inside the layout so a 404 keeps the navigation available
 * to bounce the user back to a real route.
 *
 * Route paths match the IA defined in ARCHITECTURE.md exactly. The
 * catch-all `*` route depends on react-router's match priority where
 * specific paths win over the wildcard.
 */
export function App(): ReactElement {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products" element={<ProductsIndexPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="projects" element={<ProjectsIndexPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="advisories" element={<AdvisoriesIndexPage />} />
        <Route path="advisories/:slug" element={<AdvisoryDetailPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
