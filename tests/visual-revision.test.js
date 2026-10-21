import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("implements progressive navigation glass and highlight readability layers", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /--nav-glass-top:\s*80%/);
  assert.match(css, /--nav-glass-bottom:\s*5%/);
  assert.match(css, /mask-image:\s*linear-gradient/);
  assert.match(css, /\.rtr-highlight-readability/);
  assert.match(css, /backdrop-filter:\s*blur/);
});

test("styles homepage destination cards as image-led inset cards", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /\.rtr-destination-card__image/);
  assert.match(css, /\.rtr-destination-card__body/);
  assert.match(css, /flex:\s*0 0 14\.5rem/);
  assert.match(css, /flex:\s*0 0 19rem/);
});

test("serves the development site to the local network on a stable port", async () => {
  const config = await readFile(new URL("vite.config.js", root), "utf8");
  assert.match(config, /host:\s*"0\.0\.0\.0"/);
  assert.match(config, /port:\s*4173/);
  assert.match(config, /strictPort:\s*true/);
});

test("gives the opened mobile navigation a full-screen frosted surface", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /--mobile-menu-surface:\s*rgb\(9 31 20 \/ 94%\)/);
  assert.match(css, /\.navbar-menu-wrap\s*\{[^}]*min-height:\s*100dvh/s);
  assert.match(css, /\.navbar-menu-wrap\s*\{[^}]*backdrop-filter:\s*blur\(22px\)/s);
  assert.match(css, /\.rtr-home-nav-links a:not\(\.rtr-home-nav-cta\)[^{]*\{[^}]*mix-blend-mode:\s*normal/s);
});

test("keeps the hero overline and traveller proof free of pill-shaped surfaces", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /\.rtr-hero-overline\s*\{[^}]*background:\s*transparent/s);
  assert.match(css, /\.rtr-hero-overline\s*\{[^}]*border:\s*0/s);
  assert.match(css, /\.rtr-hero-proof\s*\{[^}]*background:\s*transparent/s);
  assert.match(css, /\.rtr-hero-proof\s*\{[^}]*border:\s*0/s);
});

test("uses readable frosted labels on RouteToRecall team imagery", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /\.slide\.is-team \.badge\s*\{[^}]*background:\s*rgb\(255 255 255 \/ 84%\)/s);
  assert.match(css, /\.slide\.is-team \.badge\s*\{[^}]*color:\s*#102f1b/s);
  assert.match(css, /\.slide\.is-instructors \.badge/);
});

test("targets the exported instructor benefit markup when replacing coach copy", async () => {
  const script = await readFile(new URL("src/rtr-home.js", root), "utf8");
  assert.match(script, /\.instructors-benefit p/);
});

test("keeps every travel-planner slide clipped to the carousel radius throughout motion", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /\.slider\.is-instructors \.w-slider-mask[^}]*border-radius:\s*inherit/s);
  assert.match(css, /\.slide\.is-instructors[^}]*border-radius:\s*inherit/s);
  assert.match(css, /\.slide\.is-instructors \.image-wrap[^}]*border-radius:\s*inherit/s);
});

test("defines reduced-motion-safe parallax targets and the interactive footer word", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /\[data-rtr-parallax\]/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.rtr-footer-letter/);
});

test("crossfades the five hero photographs at the original premium pace", async () => {
  const css = await readFile(new URL("src/site-fixes.css", root), "utf8");
  assert.match(css, /\.rtr-hero-slide/);
  assert.match(css, /animation-duration:\s*60s/);
  assert.match(css, /animation-delay:\s*calc\(\(var\(--rtr-hero-slide-index\) \* 12s\) - 2\.4s\)/);
  assert.match(css, /--rtr-hero-slide-index/);
  assert.match(css, /@keyframes\s+rtr-hero-crossfade/);
});
