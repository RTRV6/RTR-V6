import { defineConfig } from "vite";

export default defineConfig({
  // Set PAGES_BASE=/RTR-V6/ for the GitHub Pages build; defaults to "/" for local dev.
  base: process.env.PAGES_BASE || "/",
  server: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
    allowedHosts: ["terminal.local"],
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
