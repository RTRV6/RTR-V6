import assert from "node:assert/strict";
import test from "node:test";
import { initializeParallax } from "../src/rtr-motion.js";

test("leaves the full-bleed footer backdrop stationary", () => {
  let decorated = false;
  const image = {
    matches(selector) {
      return selector.includes(".rtr-footer-backdrop img");
    },
    setAttribute() {
      decorated = true;
    },
  };
  const documentRef = {
    querySelectorAll() {
      return [image];
    },
  };
  const windowRef = {
    matchMedia() {
      return { matches: false };
    },
  };

  initializeParallax(documentRef, windowRef);

  assert.equal(decorated, false);
});

test("moves the hero visuals as one layer instead of transforming every slide", () => {
  const attributes = new Map();
  const wrapper = {
    parentElement: { classList: { add() {} }, getBoundingClientRect: () => ({ top: 0, bottom: 900, height: 900 }) },
    matches: () => false,
    closest: () => true,
    setAttribute: (name, value) => attributes.set(name, value),
    style: {},
  };
  let slideDecorated = false;
  const slide = {
    matches: (selector) => selector.includes(".rtr-hero-slide"),
    setAttribute: () => { slideDecorated = true; },
  };
  const documentRef = { querySelectorAll: () => [wrapper, slide] };
  const windowRef = {
    innerHeight: 900,
    innerWidth: 1280,
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (callback) => callback(),
    addEventListener() {},
  };

  initializeParallax(documentRef, windowRef);

  assert.equal(attributes.has("data-rtr-parallax"), true);
  assert.equal(slideDecorated, false);
  assert.match(wrapper.style.transform, /translate3d/);
});
