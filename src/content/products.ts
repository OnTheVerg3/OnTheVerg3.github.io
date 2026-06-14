import type { ProductEntry } from './types';

/**
 * SnakeWorks product catalogue.
 *
 * Authoritative ordering is index-by-prominence (most-prominent first).
 * Each entry must have a unique `slug` which becomes the URL fragment
 * under `/products/:slug`.
 *
 * Adding a new product: append the entry, ensure the slug is unique,
 * and the `<ProductsIndexPage />` will pick it up automatically through
 * the `getAllProducts()` helper in `./index.ts`.
 */
export const products: readonly ProductEntry[] = [
  {
    slug: 'clickwright',
    name: 'ClickWright',
    tagline: 'A single mouse click, fired at a precise moment on the Windows clock.',
    summary:
      'ClickWright performs one mouse click at a precise wall-clock time. You tell it where ' +
      'to click and when; at the chosen moment it positions the cursor and dispatches the ' +
      'click, then returns to idle. One single-file executable, no installer, no runtime ' +
      'download, no telemetry, no persistence beyond a 13-field settings file in your own ' +
      'LocalAppData.',
    status: 'released',
    platforms: ['windows'],
    tech: ['.NET Framework 4.8', 'WPF', 'MVVM', 'C#', 'Win32 P/Invoke', 'XAML'],
    features: [
      {
        title: 'Coordinate capture by hotkey',
        description: 'Hover the cursor over the target spot and press F8 to capture it live.',
      },
      {
        title: 'Manual coordinate entry',
        description: 'Type X and Y directly into the input fields if you know them.',
      },
      {
        title: 'Absolute wall-clock scheduling',
        description:
          'HH:MM:SS plus an optional date, tied to Windows system time. Automatic ' +
          'roll-to-tomorrow when the chosen time has already passed today.',
      },
      {
        title: 'Single or double click, Left / Right / Middle',
        description: 'Pick the button and the click count; no other modifiers supported by design.',
      },
      {
        title: 'Sub-10 ms timing accuracy',
        description:
          'Hybrid coarse-sleep, fine-tick, and Stopwatch busy-wait scheduler on a dedicated ' +
          'AboveNormal-priority thread, requesting 1 ms timer resolution only while armed.',
      },
      {
        title: 'Multi-monitor and high-DPI safe',
        description:
          'PerMonitorV2 DPI awareness and unified virtual-screen coordinates across mixed-DPI ' +
          'monitor setups.',
      },
      {
        title: 'Stay visible or minimize to tray',
        description:
          'User toggle. Tray icon path includes Restore / Abort / Exit context menu and ' +
          'double-click-to-restore.',
      },
      {
        title: 'No installer, no runtime, no telemetry',
        description:
          'One .exe file. Drop it on a thumb drive, run it from anywhere. The only persisted ' +
          'state is settings.json in your own LocalAppData; nothing else is written, nothing ' +
          'ever leaves the machine.',
      },
    ],
    releaseHistory: [
      {
        version: '0.1.0',
        date: '2026-06-14',
        highlights: [
          'First public release of the precision auto-click scheduler.',
          'Phase 5 complete: project skeleton, brand integration, MVVM scaffolding, P/Invoke ' +
            'interop, scheduling core, settings persistence, single-instance enforcement, ' +
            'tray icon, About dialog, embedded multi-resolution icon.',
          'Ships unsigned; SHA-256 published in release/HASHES.txt and submittable to ' +
            'VirusTotal for public reputation tracking.',
        ],
        sha256: '9a140a9f380475cc0aa950165fba42fa463eb8ee8d8a19d6c908c7e825181a90',
        sizeBytes: 111104,
      },
    ],
    latestVersion: '0.1.0',
  },
];
