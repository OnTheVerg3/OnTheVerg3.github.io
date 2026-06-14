import type { AdvisoryEntry } from './types';

/**
 * Published security advisories.
 *
 * Empty by design at Phase D. Append new entries as advisories are
 * authored. The renderer (Phase E) hides entries whose `status` is not
 * `'public-disclosure'` from the index view by default, so an entry can
 * be drafted here in `reported` / `acknowledged` / `patched` state
 * without exposing it publicly; flip the status when ready.
 *
 * Suggested append pattern (template for the next entry):
 *
 *   {
 *     slug: 'cve-2026-12345-acme-widget',
 *     title: 'Authentication bypass in Acme Widget < 1.4.2',
 *     cveId: 'CVE-2026-12345',
 *     severity: 'high',
 *     vendor: 'Acme Corp',
 *     product: 'Acme Widget',
 *     affectedVersions: '< 1.4.2',
 *     fixedInVersion: '1.4.2',
 *     summary: 'A missing session check on the admin route lets unauthenticated callers ...',
 *     status: 'public-disclosure',
 *     timeline: [
 *       { date: '2026-01-15', event: 'Reported to vendor security inbox' },
 *       { date: '2026-01-19', event: 'Vendor acknowledged' },
 *       { date: '2026-02-04', event: 'Patch shipped in 1.4.2' },
 *       { date: '2026-02-18', event: 'Public disclosure' },
 *     ],
 *     references: [
 *       { label: 'Vendor advisory', url: 'https://acme.example.com/security/2026-01-15' },
 *       { label: 'NVD entry', url: 'https://nvd.nist.gov/vuln/detail/CVE-2026-12345' },
 *     ],
 *   },
 */
export const advisories: readonly AdvisoryEntry[] = [];
