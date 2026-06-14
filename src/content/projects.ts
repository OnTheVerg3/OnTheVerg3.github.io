import type { ProjectEntry } from './types';

/**
 * Non-SnakeWorks project portfolio.
 *
 * Every entry MUST set `disclosed` explicitly. The renderer treats
 * `disclosed: false` as "show only `publicName` + `summary` + `tech` +
 * `year` + `tags`; hide `privateName`, `description`, `links`,
 * `screenshots`".
 *
 * IMPORTANT (Phase D operator-input deferred): the entries below are
 * STUBS authored from operator-provided project list in
 * `IDE-Brain/PROJECTS.md`. Real summaries, year ranges, tech stacks,
 * tag sets, and per-entry disclosure decisions are pending operator
 * authorship in a follow-up content pass. Until then, each stub uses
 * `disclosed: false` (most conservative) and the placeholder text
 * documents what is still to fill in. Phase E renderers will produce
 * a brand-coherent surface for each entry regardless of fill-in state,
 * because the schema is satisfied.
 */
export const projects: readonly ProjectEntry[] = [
  {
    slug: 'jarvis',
    disclosed: false,
    publicName: 'Personal AI assistant framework',
    privateName: 'Jarvis',
    summary: 'Long-running personal AI assistant integrated across the operator workstation.',
    year: 2025,
    tags: ['ai', 'tooling'],
    status: 'active',
  },
  {
    slug: 'spectre',
    disclosed: false,
    publicName: 'Stealth game-research framework',
    privateName: 'Spectre',
    summary: 'Internal framework for low-visibility game-process research.',
    year: 2024,
    tags: ['game-internals', 'reverse-engineering'],
    status: 'paused',
  },
  {
    slug: 'cloak',
    disclosed: false,
    publicName: 'Anti-detection runtime hardening tooling',
    privateName: 'Cloak',
    summary: 'Anti-detection hardening primitives for security research tooling.',
    year: 2024,
    tags: ['security-research', 'runtime-hardening'],
    status: 'paused',
  },
  {
    slug: 'piercer',
    disclosed: false,
    publicName: 'Game-internals analysis tooling',
    privateName: 'Piercer',
    summary: 'Analysis tooling for game-internals research.',
    year: 2024,
    tags: ['game-internals', 'security-research'],
    status: 'paused',
  },
  {
    slug: 'game-mods',
    disclosed: false,
    publicName: 'Game modifications portfolio',
    summary:
      'Collection of game modifications across multiple titles. Specific titles and ' +
      'per-mod disclosure decisions pending operator authorship.',
    year: '2022-2025',
    tags: ['game-modding'],
    status: 'archived',
  },
];
