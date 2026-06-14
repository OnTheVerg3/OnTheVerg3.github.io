// Post-build step that makes BrowserRouter routes survive direct hits and
// page refreshes on GitHub Pages.
//
// GitHub Pages serves the static asset at /dist/index.html for the site
// root, and serves the file at /dist/404.html for every URL that does not
// map to a real file on disk. By mirroring index.html as 404.html, every
// deep route falls into the SPA shell, React Router boots, reads the URL,
// and renders the matching page. The user sees the correct page; there is
// no flash of the 404 status code because the response body is identical
// to the home document.
//
// This runs cross-platform (Windows dev + Linux CI) via plain Node fs.

import { copyFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '..', 'dist');
const source = resolve(distDir, 'index.html');
const destination = resolve(distDir, '404.html');

if (!existsSync(distDir)) {
  console.error(`[copy-404] dist/ directory not found at ${distDir}. Run vite build first.`);
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`[copy-404] dist/index.html not found at ${source}. Vite build did not emit it.`);
  process.exit(1);
}

copyFileSync(source, destination);

const size = statSync(destination).size;
console.log(`[copy-404] Mirrored ${source} -> ${destination} (${size} bytes).`);
