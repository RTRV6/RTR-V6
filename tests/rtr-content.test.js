import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  destinations,
  experiences,
  faqs,
  routePaths,
  siteMeta,
  team,
  testimonials,
} from "../src/rtr-content.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("defines the six public RouteToRecall routes", () => {
  assert.deepEqual(routePaths, [
    "/",
    "/destinations",
    "/experiences",
    "/contact",
    "/faq",
    "/policy",
  ]);
});

test("defines nine unique destinations with local generated imagery", () => {
  assert.equal(destinations.length, 9);
  assert.equal(new Set(destinations.map(({ slug }) => slug)).size, 9);

  for (const destination of destinations) {
    assert.ok(destination.name);
    assert.ok(destination.summary);
    assert.match(destination.image, /^\/images\/rtr-destinations\/.+\.png$/);
    assert.equal(
      existsSync(resolve(projectRoot, destination.image.slice(1))),
      true,
      `${destination.name} image should exist`,
    );
  }
});

test("keeps RouteToRecall claims and contact details grounded", () => {
  assert.equal(siteMeta.years, "4+");
  assert.equal(siteMeta.destinationCount, "9");
  assert.equal(siteMeta.travellerCount, "200+");
  assert.equal(siteMeta.phone, "+91 6363 331 334");
  assert.equal(siteMeta.email, "enquiries@routetorecall.com");
  assert.match(siteMeta.address, /Udayamperoor/);
});

test("supplies complete homepage and secondary-page collections", () => {
  assert.ok(experiences.length >= 6);
  assert.ok(testimonials.length >= 6);
  assert.deepEqual(
    team.map(({ name }) => name),
    ["Vinayak Lal", "Ajisha Rajan", "Sanjita Krishnan"],
  );
  assert.ok(faqs.length >= 10);
});

