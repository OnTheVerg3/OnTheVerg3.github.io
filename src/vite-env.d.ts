/// <reference types="vite/client" />

// Enables typed imports of Vite's client features:
//   import.meta.env      typed access to import.meta.env.MODE etc.
//   import.meta.glob     typed glob imports
//   *.module.css         typed as Record<string, string>
//   *.svg / *.png / etc. typed as string URLs
//   *.svg?react          typed as React component (via Vite plugins, if used)
//
// This file is intentionally empty beyond the reference directive. Add
// module-augmentation declarations here only when introducing a Vite plugin
// or asset type that the default vite/client typings do not cover.
