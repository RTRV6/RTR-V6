import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(projectRoot, "index.html"), "utf8");

function localAssetReferences(markup) {
  const references = [];
  const tagPattern = /<(?:img|script|source|link)\b[^>]*>/gi;

  for (const tag of markup.match(tagPattern) ?? []) {
    const attributes = [...tag.matchAll(/(?:src|href)="([^"]+)"/gi)];
    for (const [, value] of attributes) {
      if (/^(?:https?:|data:|#|mailto:|tel:)/i.test(value)) continue;
      references.push(value.split("?")[0].replace(/^\//, ""));
    }

    const srcset = tag.match(/srcset="([^"]+)"/i)?.[1];
    if (srcset) {
      for (const candidate of srcset.split(",")) {
        const value = candidate.trim().split(/\s+/)[0];
        if (value && !/^(?:https?:|data:)/i.test(value)) {
          references.push(value.split("?")[0].replace(/^\//, ""));
        }
      }
    }
  }

  return [...new Set(references)];
}

test("every local page asset resolves inside the clone", () => {
  const missing = localAssetReferences(html).filter(
    (reference) => !existsSync(resolve(projectRoot, decodeURIComponent(reference))),
  );

  assert.deepEqual(missing, []);
});

test("every Webflow runtime chunk is stored locally", () => {
  const runtime = readFileSync(
    resolve(projectRoot, "js/webflow.85a1c9ed.d7f63c770377a12f.js"),
    "utf8",
  );
  const chunkMap = runtime.match(/r\.u=e=>"webflow\.achunk\."\+\(\{(.+?)\}\)\[e\]\+"\.js"/)?.[1];
  assert.ok(chunkMap, "Webflow chunk map should be discoverable");

  const hashes = [...chunkMap.matchAll(/:"([0-9a-f]{16})"/g)].map(
    ([, hash]) => hash,
  );
  const missing = hashes
    .map((hash) => `js/webflow.achunk.${hash}.js`)
    .filter((reference) => !existsSync(resolve(projectRoot, reference)));

  assert.deepEqual(missing, []);
});

test("the clone loads its compatibility layer", () => {
  assert.match(html, /href="\/src\/site-fixes\.css"/);
  assert.match(html, /href="\/src\/rtr-site\.css"/);
  assert.match(html, /src="\/src\/site-fixes\.js"/);
});

test("RouteToRecall branding and generated imagery exist locally", () => {
  for (const reference of [
    "images/rtr-logo-white.png",
    "images/rtr-logo-black.png",
    "images/rtr-destinations/thailand.png",
    "images/rtr-destinations/cambodia.png",
  ]) {
    assert.equal(existsSync(resolve(projectRoot, reference)), true, reference);
  }
});

test("internal footer anchors no longer navigate to production", () => {
  assert.doesNotMatch(html, /https:\/\/waveyu\.webflow\.io\/#section-/);
});

test("Webflow interaction targets retain their complete serialized value", () => {
  assert.doesNotMatch(html, /data-wf-target="\[\[\["\s/);
  assert.equal((html.match(/data-wf-target="\[\[\["/g) ?? []).length, 0);
  assert.equal((html.match(/data-wf-target="\[\[\[&quot;/g) ?? []).length, 7);
});

test("quoted image descriptions remain valid HTML attributes", () => {
  assert.doesNotMatch(html, /alt="[^"]+"\s+ok"=""/);
  assert.match(html, /making an &quot;OK&quot; hand gesture/);
});
