import assert from "node:assert/strict";
import test from "node:test";
import { adaptHomepage, homepageContent, homepageRoutes } from "../src/rtr-home.js";

test("defines RouteToRecall hero and proof content for the Waveyu homepage", () => {
  assert.equal(homepageContent.hero.title, "Trips that turn into stories");
  assert.equal(homepageContent.hero.overline, "PERSONALIZED JOURNEYS · ASIA");
  assert.equal(homepageContent.hero.ctaHref, "/contact");
  assert.equal(homepageContent.proof.travellers, "200+");
  assert.equal(homepageContent.proof.destinations, "9 destinations");
  assert.match(homepageContent.overview.heading, /designed around you/i);
});

test("supplies four Indian-traveller highlights with local imagery", () => {
  assert.equal(homepageContent.highlights.length, 4);
  for (const highlight of homepageContent.highlights) {
    assert.match(highlight.image, /^\/images\/rtr-highlights\/.+\.png$/);
    assert.match(highlight.alt, /Indian/i);
    assert.ok(highlight.title.length > 0);
    assert.ok(highlight.copy.length > 0);
  }
});

test("maps the primary homepage navigation to requested routes", () => {
  assert.deepEqual(homepageRoutes, [
    ["Destinations", "/destinations"],
    ["Experiences", "/experiences"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ]);
});

test("supplies four featured destinations and four planning steps", () => {
  assert.equal(homepageContent.featuredDestinations.length, 4);
  assert.equal(homepageContent.steps.length, 4);
  assert.deepEqual(
    homepageContent.steps.map(({ title }) => title),
    [
      "Tell us the rough idea",
      "Shape it together",
      "Confirm with clarity",
      "Travel with support",
    ],
  );
});

test("supplies the approved travel-support carousel, video thumbnail and testimonial motion", () => {
  assert.deepEqual(
    homepageContent.planners.map(({ name, role, image }) => ({ name, role, image })),
    [
      { name: "Airport welcome", role: "Thailand", image: "/images/rtr-planners/thailand-airport-driver.png" },
      { name: "Temple stories", role: "Malaysia", image: "/images/rtr-planners/malaysia-temple-guide.png" },
      { name: "Family-first guiding", role: "Malaysia", image: "/images/rtr-planners/malaysia-family-guide.png" },
    ],
  );
  assert.equal(
    homepageContent.videoThumbnail,
    "/images/rtr-highlights/indian-women-singapore.png",
  );
  assert.deepEqual(homepageContent.testimonialAutoplay, {
    delay: 4500,
    direction: "right-to-left",
  });
});

test("removes the approved homepage helper copy", () => {
  assert.equal(homepageContent.teamIntro, "");
  assert.deepEqual(homepageContent.teamMeta, []);
  assert.equal(homepageContent.footerSocialLabel, "");
});

test("contains no visible Waveyu or Webflow branding", () => {
  const visibleContent = JSON.stringify(homepageContent, (key, value) =>
    key === "image" || key === "src" || key === "srcset" ? undefined : value,
  );
  assert.doesNotMatch(visibleContent, /Waveyu|Webflow/i);
});

test("promotes the homepage footer image outside the constrained layout", () => {
  const image = {
    removeAttribute() {},
    setAttribute() {},
  };
  const backdrop = { classList: { add() {} }, parentElement: {} };
  const footer = {
    promoted: null,
    prepend(element) {
      this.promoted = element;
      element.parentElement = this;
    },
    querySelector(selector) {
      if (selector === ".image-wrap.u-absolute-full") return backdrop;
      if (selector === ".image-wrap.u-absolute-full img") return image;
      return null;
    },
    querySelectorAll() {
      return [];
    },
  };
  const documentRef = {
    body: { setAttribute() {} },
    querySelector(selector) {
      if (selector === "footer.footer") return footer;
      return null;
    },
    querySelectorAll() {
      return [];
    },
  };

  adaptHomepage(documentRef);

  assert.equal(footer.promoted, backdrop);
});

test("builds an accessible three-image hero sequence in the approved order", async () => {
  const module = await import("../src/rtr-home.js");
  assert.equal(typeof module.populateHeroSlides, "function");

  const makeImage = () => {
    const attributes = new Map();
    const classes = new Set();
    return {
      attributes,
      classList: { add: (...names) => names.forEach((name) => classes.add(name)) },
      cloneNode: () => makeImage(),
      removeAttribute: (name) => attributes.delete(name),
      setAttribute: (name, value) => attributes.set(name, String(value)),
      style: { setProperty: (name, value) => attributes.set(name, String(value)) },
    };
  };
  const first = makeImage();
  const imageWrap = {
    children: [first],
    classList: { add() {} },
    append(image) {
      this.children.push(image);
    },
    querySelector() {
      return first;
    },
    querySelectorAll() {
      return [];
    },
  };
  const slides = [
    {
      src: "/images/rtr-hero/bali-family-1920.webp",
      srcset: "/images/rtr-hero/bali-family-1280.webp 1280w, /images/rtr-hero/bali-family-1920.webp 1920w",
      alt: "Bali family",
    },
    {
      src: "/images/rtr-hero/maldives-kayaks-1920.webp",
      srcset: "/images/rtr-hero/maldives-kayaks-1280.webp 1280w, /images/rtr-hero/maldives-kayaks-1920.webp 1920w",
      alt: "Maldives kayaks",
    },
    {
      src: "/images/rtr-hero/bali-infinity-pool-1920.webp",
      srcset: "/images/rtr-hero/bali-infinity-pool-1280.webp 1280w, /images/rtr-hero/bali-infinity-pool-1920.webp 1920w",
      alt: "Bali infinity pool",
    },
  ];

  module.populateHeroSlides(imageWrap, slides);

  assert.deepEqual(
    imageWrap.children.map((image) => image.attributes.get("src")),
    slides.map(({ src }) => src),
  );
  assert.equal(imageWrap.children[0].attributes.get("aria-hidden"), undefined);
  assert.equal(imageWrap.children[1].attributes.get("aria-hidden"), "true");
  assert.equal(imageWrap.children[2].attributes.get("--rtr-hero-slide-index"), "2");
  assert.equal(imageWrap.children[0].attributes.get("srcset"), slides[0].srcset);
  assert.equal(imageWrap.children[0].attributes.get("sizes"), "max(100vw, 177.78vh)");
  assert.equal(imageWrap.children[0].attributes.get("decoding"), "async");
  assert.equal(imageWrap.children[0].attributes.get("fetchpriority"), "high");
  assert.equal(imageWrap.children[1].attributes.get("fetchpriority"), "low");
});

test("publishes the approved five-scene hero journey in order", () => {
  assert.equal(homepageContent.hero.slides.length, 5);
  assert.deepEqual(
    homepageContent.hero.slides.map(({ alt }) => alt),
    [
      "An Indian couple arriving by longtail boat in Thailand",
      "Two Indian women friends travelling through Sri Lanka by train",
      "An older Indian couple crossing a Malaysian rainforest canopy bridge with a guide",
      "Indian travellers kayaking across a clear Maldives lagoon from above",
      "An Indian couple overlooking Bali from a rooftop infinity pool",
    ],
  );
});
