import assert from "node:assert/strict";
import test from "node:test";
import { initializeRTRSite, initializeSiteFixes } from "../src/site-fixes.js";

function fixtureLink(href) {
  const attributes = new Map([["href", href]]);
  return {
    href,
    textContent: "Licenses",
    dataset: {},
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    setAttribute(name, value) {
      attributes.set(name, value);
      if (name === "href") this.href = value;
    },
    addEventListener() {},
  };
}

function fixtureForm() {
  const listeners = new Map();
  const status = {
    className: "",
    hidden: true,
    role: "",
    textContent: "",
    setAttribute(name, value) {
      this[name] = value;
    },
  };

  return {
    status,
    dataset: {},
    append(element) {
      assert.equal(element, status);
    },
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    querySelector(selector) {
      return selector === ".local-form-status" ? null : null;
    },
    submit() {
      let prevented = false;
      listeners.get("submit")?.({ preventDefault: () => (prevented = true) });
      assert.equal(prevented, true);
    },
  };
}

function fixtureDocument(links = [], forms = [], interactionReady = false) {
  return {
    readyState: "complete",
    documentElement: { classList: { add() {}, remove() {} } },
    querySelectorAll(selector) {
      if (selector === "a[href]") return links;
      if (selector === "form") return forms;
      return [];
    },
    querySelector(selector) {
      if (selector === ".gsap_split_word" && interactionReady) return {};
      return null;
    },
    createElement(tagName) {
      assert.equal(tagName, "p");
      return forms[0]?.status ?? fixtureForm().status;
    },
    addEventListener() {},
  };
}

function fixtureWindow() {
  return {
    location: { hostname: "localhost", pathname: "/" },
    setTimeout(callback) {
      callback();
    },
  };
}

test("converts production hash links into local anchors", () => {
  const link = fixtureLink("https://waveyu.webflow.io/#section-stay");
  initializeSiteFixes(fixtureDocument([link]), fixtureWindow());
  assert.equal(link.getAttribute("href"), "#section-stay");
});

test("keeps missing utility routes inert without changing their text", () => {
  const link = fixtureLink("/utility-pages/licenses");
  initializeSiteFixes(fixtureDocument([link]), fixtureWindow());
  assert.equal(link.getAttribute("href"), "#");
  assert.equal(link.getAttribute("aria-disabled"), "true");
  assert.equal(link.textContent, "Licenses");
});

test("shows a local status instead of posting a Webflow form", () => {
  const form = fixtureForm();
  initializeSiteFixes(fixtureDocument([], [form]), fixtureWindow());
  form.submit();
  assert.equal(
    form.status.textContent,
    "Thanks — your trip brief is ready. RouteToRecall will get back to you shortly.",
  );
  assert.equal(form.status.hidden, false);
});

test("renders requested RouteToRecall secondary routes", () => {
  const documentRef = fixtureDocument();
  documentRef.body = { innerHTML: "" };
  documentRef.querySelectorAll = () => [];
  const windowRef = fixtureWindow();
  windowRef.location.pathname = "/destinations";

  initializeRTRSite(documentRef, windowRef);

  assert.match(documentRef.body.innerHTML, /data-rtr-route="\/destinations"/);
  assert.match(documentRef.body.innerHTML, /Thailand/);
  assert.equal(documentRef.title, "Routetorecall - Your travel companion");
  assert.doesNotMatch(documentRef.body.innerHTML, /Waveyu|Made in Webflow/);
});

test("does not enable the fallback when the Webflow interaction runtime is healthy", () => {
  let fallbackAdded = false;
  const documentRef = fixtureDocument([], [], true);
  documentRef.documentElement.classList.add = (className) => {
    if (className === "webflow-runtime-fallback") fallbackAdded = true;
  };

  initializeSiteFixes(documentRef, fixtureWindow());

  assert.equal(fallbackAdded, false);
});
