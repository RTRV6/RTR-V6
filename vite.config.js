import { cpSync } from "node:fs";
import { defineConfig } from "vite";

// Images are referenced from JS at runtime (BASE + "images/..."), so Vite never bundles them.
// Copy the folder into dist/ after the build so those URLs exist on the deployed site.
const copyImages = {
  name: "copy-runtime-images",
  apply: "build",
  closeBundle() {
    cpSync("images", "dist/images", { recursive: true });
  },
};

export default defineConfig({
  // Set PAGES_BASE=/RTR-V6/ for the GitHub Pages build; defaults to "/" for local dev.
  base: process.env.PAGES_BASE || "/",
  plugins: [copyImages],
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
