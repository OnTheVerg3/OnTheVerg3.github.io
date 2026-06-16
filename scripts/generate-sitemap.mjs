// Generates dist/sitemap.xml after vite build.
//
// Cross-platform Node script. Reads the content TypeScript modules as
// raw text and extracts the `slug:` field of each entry via a single
// regex. Avoids any TypeScript compilation step or extra dependency
// (no tsx / ts-node / sucrase). The format is stable enough that the
// regex is robust: every entry uses `slug: 'kebab-case'` on its own
// line. If you ever change the slug formatting, update the regex
// below and add a verification line.
//
// Skipped entries:
//   - Non-public advisories (status !== 'public-disclosure') are
//     filtered the same way the runtime helper getPublicAdvisories()
//     filters them.
//
// Note on /engineering: this is a single static page (no per-entry
// detail routes), so it is included once in STATIC_ROUTES below.
// The personal-projects index that previously lived at /projects
// was removed during the IA pivot; no /projects/:slug enumeration
// is needed.
//
// Output format: sitemap protocol 0.9, one <url> per route. The
// lastmod is set to the script's run timestamp (today) for every URL;
// per-entry lastmod is not currently tracked in the content schema.

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const distDir = resolve(root, 'dist');

const SITE_BASE_URL = 'https://ontheverg3.github.io';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/engineering', priority: '0.8', changefreq: 'monthly' },
  { path: '/advisories', priority: '0.8', changefreq: 'weekly' },
  { path: '/schedule', priority: '0.6', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

function readSlugs(relativePath) {
  const fullPath = resolve(root, relativePath);
  const source = readFileSync(fullPath, 'utf8');
  const matches = source.matchAll(/^\s*slug:\s*'([a-z0-9-]+)'\s*,?\s*$/gm);
  const slugs = [];
  for (const match of matches) {
    if (match[1] !== undefined) {
      slugs.push(match[1]);
    }
  }
  return slugs;
}

function readPublicAdvisorySlugs() {
  return readSlugsMatchingField('src/content/advisories.ts', /status:\s*'public-disclosure'/);
}

function readSlugsMatchingField(relativePath, fieldRegex) {
  const fullPath = resolve(root, relativePath);
  const source = readFileSync(fullPath, 'utf8');
  // Match each entry block { ... } that contains slug: '...'. Tolerant
  // to field ordering within the block. The catalogue is small and
  // each entry has no nested object literals, so a flat [^{}] body
  // match is safe.
  const entries = source.matchAll(/\{[^{}]*?slug:\s*'([a-z0-9-]+)'[^{}]*?\}/g);
  const slugs = [];
  for (const entry of entries) {
    const block = entry[0];
    const slug = entry[1];
    if (slug !== undefined && fieldRegex.test(block)) {
      slugs.push(slug);
    }
  }
  return slugs;
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

function urlBlock(path, lastmod, priority, changefreq) {
  const loc = escapeXml(`${SITE_BASE_URL}${path}`);
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const productSlugs = readSlugs('src/content/products.ts');
  const advisorySlugs = readPublicAdvisorySlugs();

  const urls = [
    ...STATIC_ROUTES.map((route) =>
      urlBlock(route.path, lastmod, route.priority, route.changefreq),
    ),
    ...productSlugs.map((slug) => urlBlock(`/products/${slug}`, lastmod, '0.8', 'monthly')),
    ...advisorySlugs.map((slug) => urlBlock(`/advisories/${slug}`, lastmod, '0.7', 'yearly')),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

mkdirSync(distDir, { recursive: true });
const sitemapPath = resolve(distDir, 'sitemap.xml');
const sitemap = buildSitemap();
writeFileSync(sitemapPath, sitemap, 'utf8');

const size = statSync(sitemapPath).size;
const urlCount = (sitemap.match(/<url>/g) ?? []).length;
console.log(
  `[generate-sitemap] Wrote ${sitemapPath} (${String(size)} bytes, ${String(urlCount)} URLs).`,
);
