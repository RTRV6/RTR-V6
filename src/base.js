// Public base path. Vite sets BASE_URL from `base` in vite.config.js (e.g. "/RTR-V6/" on GitHub Pages).
// Under Node (tests) import.meta.env is undefined, so this falls back to "/".
export const BASE = import.meta.env?.BASE_URL ?? "/";
