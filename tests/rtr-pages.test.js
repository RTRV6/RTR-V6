import assert from "node:assert/strict";
import test from "node:test";
import { normalizePath, renderRoute } from "../src/rtr-pages.js";

test("normalizes secondary route paths", () => {
  assert.equal(normalizePath("/destinations/"), "/destinations");
  assert.equal(normalizePath("/FAQ"), "/faq");
  assert.equal(normalizePath("/unknown"), "/");
});

test("renders shared RouteToRecall navigation and footer on every secondary route", () => {
  for (const path of [
    "/destinations",
    "/experiences",
    "/contact",
    "/faq",
    "/policy",
  ]) {
    const html = renderRoute(path);
    assert.match(html, /RouteToRecall/);
    assert.match(html, /href="\/destinations"/);
    assert.match(html, /href="\/experiences"/);
    assert.match(html, /href="\/contact"/);
    assert.match(html, /enquiries@routetorecall\.com/);
    assert.match(html, /class="rtr-footer-link"/);
    assert.match(html, /class="rtr-footer-link-line"/);
    assert.ok((html.match(/class="rtr-footer-letter"/g) ?? []).length >= 11);
    assert.doesNotMatch(html, /Waveyu|Made in Webflow|Powered by Webflow/);
  }
});

test("renders all nine destination images and starting-point prices", () => {
  const html = renderRoute("/destinations");
  assert.equal((html.match(/class="rtr-destination-card/g) ?? []).length, 9);
  assert.match(html, /rtr-destinations\/thailand\.png/);
  assert.match(html, /rtr-destinations\/cambodia\.png/);
  assert.match(html, /starting points, not fixed packages/i);
});

test("renders curated experiences with enquiry actions", () => {
  const html = renderRoute("/experiences");
  assert.equal((html.match(/class="rtr-experience-row/g) ?? []).length, 6);
  assert.match(html, /Himalayan Trekking/);
  assert.match(html, /href="\/contact"/);
});

test("renders the complete contact form", () => {
  const html = renderRoute("/contact");
  for (const field of [
    "name",
    "email",
    "phone",
    "destination",
    "dates",
    "travellers",
    "tripDetails",
  ]) {
    assert.match(html, new RegExp(`name="${field}"`));
  }
});

test("renders accessible FAQ controls and consolidated policies", () => {
  const faqHtml = renderRoute("/faq");
  assert.ok((faqHtml.match(/aria-expanded="false"/g) ?? []).length >= 10);
  assert.match(faqHtml, /Do you customize tours\?/);

  const policyHtml = renderRoute("/policy");
  for (const heading of [
    "Privacy",
    "Booking and payment",
    "Changes and cancellation",
    "Travel documents",
    "Website use",
  ]) {
    assert.match(policyHtml, new RegExp(heading));
  }
});
