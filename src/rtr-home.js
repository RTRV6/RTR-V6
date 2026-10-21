import { BASE } from "./base.js";
import {
  destinations,
  experiences,
  faqs,
  siteMeta,
  team,
  testimonials,
} from "./rtr-content.js";
import { footerLetterMarkup } from "./rtr-motion.js";

export const homepageRoutes = [
  ["Destinations", "/destinations"],
  ["Experiences", "/experiences"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

const heroImages = {
  thailand: {
    1280: new URL("../images/rtr-hero/thailand-longtail-boat-1280.webp", import.meta.url).href,
    1920: new URL("../images/rtr-hero/thailand-longtail-boat-1920.webp", import.meta.url).href,
    2560: new URL("../images/rtr-hero/thailand-longtail-boat-2560.webp", import.meta.url).href,
    3840: new URL("../images/rtr-hero/thailand-longtail-boat-4k.webp", import.meta.url).href,
  },
  sriLanka: {
    1280: new URL("../images/rtr-hero/sri-lanka-train-1280.webp", import.meta.url).href,
    1920: new URL("../images/rtr-hero/sri-lanka-train-1920.webp", import.meta.url).href,
    2560: new URL("../images/rtr-hero/sri-lanka-train-2560.webp", import.meta.url).href,
    3840: new URL("../images/rtr-hero/sri-lanka-train-4k.webp", import.meta.url).href,
  },
  malaysia: {
    1280: new URL("../images/rtr-hero/malaysia-rainforest-bridge-1280.webp", import.meta.url).href,
    1920: new URL("../images/rtr-hero/malaysia-rainforest-bridge-1920.webp", import.meta.url).href,
    2560: new URL("../images/rtr-hero/malaysia-rainforest-bridge-2560.webp", import.meta.url).href,
    3840: new URL("../images/rtr-hero/malaysia-rainforest-bridge-4k.webp", import.meta.url).href,
  },
  kayaks: {
    1280: new URL("../images/rtr-hero/maldives-kayaks-1280.webp", import.meta.url).href,
    1920: new URL("../images/rtr-hero/maldives-kayaks-1920.webp", import.meta.url).href,
    2560: new URL("../images/rtr-hero/maldives-kayaks-2560.webp", import.meta.url).href,
    3840: new URL("../images/rtr-hero/maldives-kayaks-4k.webp", import.meta.url).href,
  },
  pool: {
    1280: new URL("../images/rtr-hero/bali-infinity-pool-1280.webp", import.meta.url).href,
    1920: new URL("../images/rtr-hero/bali-infinity-pool-1920.webp", import.meta.url).href,
    2560: new URL("../images/rtr-hero/bali-infinity-pool-2560.webp", import.meta.url).href,
    3840: new URL("../images/rtr-hero/bali-infinity-pool-4k.webp", import.meta.url).href,
  },
};

function responsiveHeroImage(sources) {
  return {
    src: sources[1920],
    srcset: `${sources[1280]} 1280w, ${sources[1920]} 1920w, ${sources[2560]} 2560w, ${sources[3840]} 3840w`,
  };
}

export const homepageContent = {
  hero: {
    overline: "PERSONALIZED JOURNEYS · ASIA",
    title: "Trips that turn into stories",
    cta: "Plan My Trip",
    ctaHref: "/contact",
    image: heroImages.thailand[1920],
    slides: [
      {
        ...responsiveHeroImage(heroImages.thailand),
        alt: "An Indian couple arriving by longtail boat in Thailand",
        position: "center center",
      },
      {
        ...responsiveHeroImage(heroImages.sriLanka),
        alt: "Two Indian women friends travelling through Sri Lanka by train",
        position: "center center",
      },
      {
        ...responsiveHeroImage(heroImages.malaysia),
        alt: "An older Indian couple crossing a Malaysian rainforest canopy bridge with a guide",
        position: "center center",
      },
      {
        ...responsiveHeroImage(heroImages.kayaks),
        alt: "Indian travellers kayaking across a clear Maldives lagoon from above",
        position: "center center",
      },
      {
        ...responsiveHeroImage(heroImages.pool),
        alt: "An Indian couple overlooking Bali from a rooftop infinity pool",
        position: "center center",
      },
    ],
  },
  proof: {
    travellers: siteMeta.travellerCount,
    destinations: `${siteMeta.destinationCount} destinations`,
    years: `${siteMeta.years} years planning journeys`,
  },
  overview: {
    eyebrow: "Overview",
    heading: "Travel designed around you — not a template",
    copy:
      "Tell us who is going, what matters and how you want the days to feel. We shape the stays, movement and experiences into one coherent journey.",
  },
  highlights: [
    {
      image: BASE + "images/rtr-highlights/indian-couple-thailand.png",
      alt: "An Indian couple walking together near a waterfall in Thailand",
      title: "Find the places between the postcards",
      copy: "Forest paths, waterfalls and a day that unfolds at your pace",
    },
    {
      image: BASE + "images/rtr-highlights/indian-women-singapore.png",
      alt: "Two Indian women friends sharing street food in Singapore",
      title: "Taste the city as it really is",
      copy: "Local tables, lively neighbourhoods and easy conversations",
    },
    {
      image: BASE + "images/rtr-highlights/indian-men-sri-lanka.png",
      alt: "Three Indian men friends overlooking the coast in Sri Lanka",
      title: "Leave room for the unplanned",
      copy: "Coastal roads, slow afternoons and stories found along the way",
    },
    {
      image: BASE + "images/rtr-highlights/indian-family-bali.png",
      alt: "A multigenerational Indian family exploring a temple garden in Bali",
      title: "Make every generation part of it",
      copy: "Thoughtful pacing and meaningful moments for the whole family",
    },
  ],
  featuredDestinations: destinations.slice(0, 4),
  tripStyles: [
    ["Culture & Food", "Neighbourhoods, local tables and living traditions."],
    ["Island Escapes", "Open water, slower mornings and room to breathe."],
    ["Family Journeys", "Comfortable pacing and moments for every generation."],
    ["Adventure", "Trails, coastlines and days that earn their stories."],
  ],
  steps: [
    {
      title: "Tell us the rough idea",
      copy: "Share possible dates, people, places and the kind of trip you want.",
    },
    {
      title: "Shape it together",
      copy: "We turn that brief into a route, then refine it with your feedback.",
    },
    {
      title: "Confirm with clarity",
      copy: "You receive clear inclusions, exclusions, supplier terms and payment stages.",
    },
    {
      title: "Travel with support",
      copy: "We stay available before departure and while you are on the road.",
    },
  ],
  journeyMoments: [
    ["Arrive without the rush", "Transfers, check-in and the first easy introduction to the place."],
    ["Taste the neighbourhood", "A local table, market or food walk that helps the destination feel real."],
    ["Follow the signature experience", "The temple, island, trail or skyline moment you came to see."],
    ["Keep a slower pocket", "Time to wander, rest or change the plan without racing a checklist."],
    ["Meet the place more closely", "A guide-led story, community encounter or quieter local corner."],
    ["Choose your own afternoon", "Independent time with our recommendations ready when you need them."],
    ["Come home with a story", "A smooth departure and support through the final leg of the journey."],
  ],
  planners: [
    { name: "Airport welcome", role: "Thailand", image: BASE + "images/rtr-planners/thailand-airport-driver.png" },
    { name: "Temple stories", role: "Malaysia", image: BASE + "images/rtr-planners/malaysia-temple-guide.png" },
    { name: "Family-first guiding", role: "Malaysia", image: BASE + "images/rtr-planners/malaysia-family-guide.png" },
  ],
  videoThumbnail: BASE + "images/rtr-highlights/indian-women-singapore.png",
  testimonialAutoplay: {
    delay: 4500,
    direction: "right-to-left",
  },
  teamIntro: "",
  teamMeta: [],
  footerSocialLabel: "",
};

function setText(root, selector, value) {
  const element = root.querySelector?.(selector);
  if (element) element.textContent = value;
  return element;
}

function setHtml(root, selector, value) {
  const element = root.querySelector?.(selector);
  if (element) element.innerHTML = value;
  return element;
}

function setLink(element, href, label) {
  if (!element) return;
  element.setAttribute("href", href);
  if (label) {
    const text = element.querySelector?.(".button-text, :scope > div:first-child");
    if (text) text.textContent = label;
  }
}

function setImage(element, src, alt) {
  if (!element) return;
  element.setAttribute("src", src);
  element.removeAttribute?.("srcset");
  element.removeAttribute?.("sizes");
  element.setAttribute("alt", alt);
}

export function populateHeroSlides(imageWrap, slides) {
  const firstImage = imageWrap?.querySelector?.("img");
  if (!firstImage || !slides?.length) return [];
  for (const extra of imageWrap.querySelectorAll?.(".rtr-hero-slide:not(:first-child)") ?? []) {
    extra.remove?.();
  }
  imageWrap.classList?.add("rtr-hero-visuals");
  return slides.map((slide, index) => {
    const image = index === 0 ? firstImage : firstImage.cloneNode?.(false);
    if (!image) return null;
    setImage(image, slide.src, slide.alt);
    if (slide.srcset) image.setAttribute?.("srcset", slide.srcset);
    image.setAttribute?.("sizes", "max(100vw, 177.78vh)");
    image.setAttribute?.("decoding", "async");
    image.setAttribute?.("loading", "eager");
    image.setAttribute?.("fetchpriority", index === 0 ? "high" : "low");
    image.classList?.add("rtr-hero-slide");
    image.style?.setProperty?.("--rtr-hero-slide-index", index);
    image.style?.setProperty?.("--rtr-hero-object-position", slide.position ?? "center center");
    if (index > 0) {
      image.setAttribute?.("aria-hidden", "true");
      imageWrap.append?.(image);
    } else {
      image.removeAttribute?.("aria-hidden");
    }
    return image;
  }).filter(Boolean);
}

function leafByText(root, expected) {
  return [...(root.querySelectorAll?.("*") ?? [])].find(
    (element) =>
      element.children?.length === 0 && element.textContent?.trim() === expected,
  );
}

function adaptNavigation(documentRef) {
  for (const logo of documentRef.querySelectorAll?.(
    ".brand-link img, .footer-brand-link img",
  ) ?? []) {
    const footerLogo = logo.closest?.(".footer") || logo.closest?.("footer");
    setImage(
      logo,
      footerLogo ? siteMeta.logoLight : siteMeta.logoLight,
      "RouteToRecall",
    );
  }

  const dates = documentRef.querySelector?.(".dates");
  if (dates) {
    dates.textContent = "";
    dates.setAttribute("aria-hidden", "true");
  }

  const menu = documentRef.querySelector?.(".navbar-menu-wrap");
  if (menu) {
    menu.innerHTML = `
      <div class="rtr-home-nav-links">
        ${homepageRoutes.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
        <a class="rtr-home-nav-cta" href="/contact">Plan my trip</a>
      </div>`;
  }
}

function adaptHero(documentRef) {
  const hero = documentRef.querySelector?.(".section-hero");
  if (!hero) return;
  const content = hero.querySelector?.(".hero-content");
  if (content?.children?.[0]) {
    content.children[0].textContent = homepageContent.hero.overline;
    content.children[0].classList?.add("rtr-hero-overline");
  }
  setHtml(hero, ".heading-h1", "Trips that turn<br>into stories");
  setLink(hero.querySelector?.(".primary-button"), homepageContent.hero.ctaHref, homepageContent.hero.cta);
  populateHeroSlides(
    hero.querySelector?.(".image-wrap.u-absolute-full"),
    homepageContent.hero.slides,
  );

  const travellerCount = leafByText(hero, "350+");
  if (travellerCount) travellerCount.textContent = homepageContent.proof.travellers;
  const proofCopy = hero.querySelector?.(".hero-stats > div:last-child");
  if (proofCopy) proofCopy.textContent = "travellers already came home with stories";
  hero.querySelector?.(".hero-stats")?.classList?.add("rtr-hero-proof");
}

function adaptOverview(documentRef) {
  const section = documentRef.querySelector?.("#section-overview");
  if (!section) return;
  setText(section, ".eyebrow-section", homepageContent.overview.eyebrow);
  setHtml(
    section,
    ".heading-h2",
    'Travel designed around you — <span class="heading-accent">not a template</span>',
  );
  const headingWrap = section.querySelector?.(".heading-wrap");
  const paragraph = headingWrap?.parentElement?.querySelector?.("p") ?? section.querySelector?.("p");
  if (paragraph) paragraph.textContent = homepageContent.overview.copy;

  const tags = section.querySelectorAll?.(".tag-item > div:last-child") ?? [];
  ["Custom itineraries", "Clear inclusions", "Human support"].forEach((label, index) => {
    if (tags[index]) tags[index].textContent = label;
  });

  const details = section.querySelectorAll?.(".overview-detail") ?? [];
  const detailValues = [
    ["Based in", "Kerala, India"],
    ["Across", homepageContent.proof.destinations],
    ["Built for", "Your people & pace"],
  ];
  details.forEach((detail, index) => {
    const [label, value] = detailValues[index] ?? [];
    if (!label) return;
    const children = detail.children ?? [];
    if (children[0]) children[0].textContent = label;
    if (children[1]) children[1].innerHTML = `<strong>${value}</strong>`;
  });

  setLink(section.querySelector?.(".secondary-button"), "/contact", "Plan a Journey");
  const slides = section.querySelectorAll?.(".slider.is-overview .slide") ?? [];
  slides.forEach((slide, index) => {
    const highlight = homepageContent.highlights[index];
    if (!highlight) return;
    setImage(slide.querySelector?.("img"), highlight.image, highlight.alt);
    setText(slide, ".slide-content .u-text-size-large", highlight.title);
    setText(slide, ".slide-content-text > div:last-child", highlight.copy);
    if (!slide.querySelector?.(".rtr-highlight-readability")) {
      const readability = documentRef.createElement?.("div");
      if (readability) {
        readability.className = "rtr-highlight-readability";
        readability.setAttribute("aria-hidden", "true");
        slide.insertBefore(readability, slide.querySelector?.(".slide-content") ?? null);
      }
    }
  });
  const story = section.querySelector?.(".overview-story-card blockquote");
  if (story) {
    story.textContent =
      "It starts with a conversation. It becomes a journey that fits your people, pace and priorities — and a story you keep retelling.";
  }
}

function adaptFeaturedDestinations(documentRef) {
  const section = documentRef.querySelector?.("#section-levels");
  if (!section) return;
  setText(section, ".eyebrow-section", "Destinations");
  setHtml(
    section,
    ".heading-h2",
    'Nine places. One trip that feels <span class="heading-accent">entirely yours</span>',
  );
  setLink(section.querySelector?.(".secondary-button"), "/destinations", "See All Destinations");
  const cards = section.querySelectorAll?.(".levels-card") ?? [];
  homepageContent.featuredDestinations.forEach((destination, index) => {
    const card = cards[index];
    if (!card) return;
    card.classList?.add("rtr-destination-card");
    card.innerHTML = `
      <a class="rtr-destination-card__link" href="/destinations" aria-label="Explore ${destination.name}">
        <div class="rtr-destination-card__image">
          <img src="${destination.image}" alt="${destination.kicker}" loading="lazy">
        </div>
        <div class="rtr-destination-card__body">
          <div class="rtr-destination-card__eyebrow">${destination.price}</div>
          <h3>${destination.name}</h3>
          <p>${destination.summary}</p>
        </div>
      </a>`;
  });
}

function adaptStay(documentRef) {
  const section = documentRef.querySelector?.("#section-stay");
  if (!section) return;
  setText(section, ".eyebrow-section", "Travel styles");
  setHtml(
    section,
    ".heading-h2",
    'Go as a couple, with friends, family or <span class="heading-accent">on your own</span>',
  );
  const firstParagraph = section.querySelector?.("p");
  if (firstParagraph) {
    firstParagraph.textContent =
      "We adapt stays, transfers and the daily pace to who is travelling — from young children to older parents and everyone in between.";
  }
  setImage(
    section.querySelector?.(".image-wrap img"),
    destinations[3].image,
    "An older couple arriving in the Maldives",
  );
  const accordions = section.querySelectorAll?.(".room-accordion-wrap") ?? [];
  const rows = [
    ["Couple Getaways", "Private time, memorable stays and a pace that leaves room for spontaneity."],
    ["Friends Together", "Shared experiences, flexible room plans and enough freedom to split and regroup."],
    ["Family Journeys", "Child-friendly pacing, practical movement and activities across generations."],
    ["Solo, Not Alone", "Independent travel with a dependable planning team behind the route."],
  ];
  accordions.forEach((accordion, index) => {
    const [title, copy] = rows[index] ?? [];
    if (!title) return;
    const heading = accordion.querySelector?.("h3, .u-heading-h3-small, .room-accordion-title");
    if (heading) heading.textContent = title;
    const paragraph = accordion.querySelector?.("p");
    if (paragraph) paragraph.textContent = copy;
  });
  setLink(section.querySelector?.(".secondary-button"), "/contact", "Find My Travel Style");
}

function adaptExperiences(documentRef) {
  const section = documentRef.querySelector?.("#section-experience");
  if (!section) return;
  setText(section, ".eyebrow-section", "Experiences");
  setHtml(
    section,
    ".heading-h2",
    'Culture, coast, mountains and cities — <span class="heading-accent">mixed your way</span>',
  );
  const intro = section.querySelector?.(".experience-column-left p");
  if (intro) intro.textContent = "Start with what draws you in. We will build the route around it.";
  setLink(section.querySelector?.(".secondary-button"), "/experiences", "Explore Experiences");
  const cards = section.querySelectorAll?.(".experience-card") ?? [];
  homepageContent.tripStyles.forEach(([title, copy], index) => {
    const card = cards[index];
    if (!card) return;
    setText(card, "h3", title);
    const paragraph = card.querySelector?.("p");
    if (paragraph) paragraph.textContent = copy;
  });
}

function adaptProgram(documentRef) {
  const section = documentRef.querySelector?.("#section-program");
  if (!section) return;
  setText(section, ".eyebrow-section", "How it works");
  setHtml(
    section,
    ".heading-h2",
    'A journey with room to <span class="heading-accent">feel the place</span>',
  );
  const items = section.querySelectorAll?.(".day-accordion") ?? [];
  items.forEach((item, index) => {
    const moment = homepageContent.journeyMoments[index];
    if (!moment) return;
    setText(item, ".eyebrow-item", `Moment ${index + 1}`);
    setText(item, "h3", moment[0]);
    const paragraph = item.querySelector?.("p");
    if (paragraph) paragraph.textContent = moment[1];
    for (const image of item.querySelectorAll?.("img") ?? []) {
      const destination = destinations[index % destinations.length];
      setImage(image, destination.image, destination.kicker);
    }
  });
  setLink(section.querySelector?.(".tertiary-button"), "/contact", "Start Planning");
}

function adaptSteps(documentRef) {
  const section = documentRef.querySelector?.(".section-steps");
  if (!section) return;
  setText(section, ".eyebrow-section", "How it works");
  setHtml(section, ".heading-h2", 'Make it yours in <span class="heading-accent">four clear steps</span>');
  const intro = section.querySelector?.(".steps-header p");
  if (intro) intro.textContent = "A collaborative planning process with clear scope, flexible choices and a real person behind the journey.";
  const items = section.querySelectorAll?.(".steps-item") ?? [];
  items.forEach((item, index) => {
    const step = homepageContent.steps[index];
    if (!step) return;
    setText(item, "h3", step.title);
    const paragraph = item.querySelector?.("p");
    if (paragraph) paragraph.textContent = step.copy;
  });
}

function adaptPlannerSection(documentRef) {
  const section = documentRef.querySelector?.("#section-instructors");
  if (!section) return;
  setText(section, ".eyebrow-section", "Travel planners");
  setHtml(
    section,
    ".heading-h2",
    'Plan with people who care about the <span class="heading-accent">whole journey</span>',
  );
  const copy = section.querySelector?.("p");
  if (copy) {
    copy.textContent =
      "Our team turns scattered ideas into a route that makes sense. We balance the memorable parts with the practical details, then stay available when you travel.";
  }
  const slider = section.querySelector?.(".slider.is-instructors");
  const mask = slider?.querySelector?.(".w-slider-mask");
  const originalSlides = [...(mask?.querySelectorAll?.(".slide.is-instructors") ?? [])];
  if (mask && originalSlides.length) {
    while (mask.querySelectorAll(".slide.is-instructors").length < homepageContent.planners.length) {
      const clone = originalSlides[0].cloneNode(true);
      clone.removeAttribute("data-w-id");
      clone.removeAttribute("aria-label");
      clone.removeAttribute("style");
      clone.classList.remove("w--current");
      mask.append(clone);
    }

    const slides = [...mask.querySelectorAll(".slide.is-instructors")];
    slides.slice(homepageContent.planners.length).forEach((slide) => slide.remove());
    slides.slice(0, homepageContent.planners.length).forEach((slide, index) => {
      const member = homepageContent.planners[index];
      setImage(slide.querySelector(".image-wrap img"), member.image, `${member.name} travel support in ${member.role}`);
      setText(slide, ".slide-popup-heading", member.name);
      const popupCopy = slide.querySelector(".slide-popup-content > div:last-child");
      if (popupCopy) {
        popupCopy.textContent = "Thoughtful local support that makes each arrival, story and family moment feel easier.";
      }
      const labels = slide.querySelectorAll(".slide-content-meta .badge div");
      if (labels[0]) labels[0].textContent = member.name;
      if (labels[1]) labels[1].textContent = member.role;
    });

    slider.setAttribute("data-infinite", "true");
    documentRef.defaultView?.setTimeout?.(() => {
      documentRef.defaultView?.Webflow?.require?.("slider")?.redraw?.();
    }, 0);
  }
  const benefits = section.querySelectorAll?.("strong") ?? [];
  if (benefits[0]) benefits[0].textContent = "Thoughtful route design";
  if (benefits[1]) benefits[1].textContent = "Support while travelling";
  const benefitCopy = section.querySelectorAll?.(".instructors-benefit p") ?? [];
  if (benefitCopy[0]) benefitCopy[0].textContent = "Pacing, stays and experiences balanced around your people and priorities.";
  if (benefitCopy[1]) benefitCopy[1].textContent = "A planning team stays reachable before departure and throughout the journey.";
}

function adaptTestimonials(documentRef) {
  const section = documentRef.querySelector?.("#section-testimonials");
  if (!section) return;
  setText(section, ".eyebrow-section", "Testimonials");
  setHtml(
    section,
    ".heading-h2",
    'Stories from people who came home with <span class="heading-accent">more to tell</span>',
  );
  const intro = section.querySelector?.(".heading-wrap + p, .testimonials-header p");
  if (intro) intro.textContent = "Real notes from RouteToRecall travellers.";
  setImage(
    section.querySelector?.(".video-thumbnail img"),
    homepageContent.videoThumbnail,
    "Two Indian friends sharing a candid travel moment in Singapore",
  );
  const slider = section.querySelector?.(".slider.is-testimonials");
  if (slider) {
    slider.setAttribute("data-autoplay", "true");
    slider.setAttribute("data-delay", String(homepageContent.testimonialAutoplay.delay));
    slider.setAttribute("data-infinite", "true");
    slider.setAttribute("data-rtr-direction", homepageContent.testimonialAutoplay.direction);
    const windowRef = documentRef.defaultView;
    const reducedMotion = windowRef?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (windowRef && !reducedMotion && !slider.dataset.rtrAutoplay) {
      slider.dataset.rtrAutoplay = "running";
      windowRef.setInterval(() => {
        if (!documentRef.hidden) slider.querySelector(".right-arrow")?.click();
      }, homepageContent.testimonialAutoplay.delay);
    }
  }
  const cards = section.querySelectorAll?.(".slide.is-testimonials") ?? [];
  cards.forEach((card, index) => {
    const testimonial = testimonials[index % testimonials.length];
    const quote = card.querySelector?.("blockquote, .testimonial-text");
    if (quote) quote.textContent = testimonial.quote;
    const name = card.querySelector?.(".testimonial-author strong, .testimonial-name");
    if (name) name.textContent = testimonial.name;
    const meta = card.querySelector?.(".testimonial-author .u-text-color-muted");
    if (meta) meta.textContent = "RouteToRecall traveller";
    setText(card, ".badge div", "traveller");
  });
}

function adaptPricing(documentRef) {
  const section = documentRef.querySelector?.("#section-pricing");
  if (!section) return;
  setText(section, ".eyebrow-section", "Starting points");
  setHtml(
    section,
    ".heading-h2",
    'A useful starting point — never a <span class="heading-accent">fixed package</span>',
  );
  const cards = section.querySelectorAll?.(".pricing-card") ?? [];
  [destinations[2], destinations[0], destinations[3]].forEach((destination, index) => {
    const card = cards[index];
    if (!card) return;
    setText(card, "h3", `${destination.name} journey`);
    const price = card.querySelector?.(".pricing-card-price strong");
    if (price) price.textContent = destination.price.replace(/\D/g, "");
    const priceMeta = card.querySelectorAll?.(".pricing-card-price .price-meta") ?? [];
    if (priceMeta[0]) priceMeta[0].textContent = "₹";
    if (priceMeta[1]) priceMeta[1].textContent = "starting";
    setText(card, ".pricing-card-text .u-text-color-muted", "Customized around your dates, stays and travel party");
    setLink(card.querySelector?.("a, .primary-button"), "/contact", "Plan This Trip");
  });
}

function adaptFaq(documentRef) {
  const section = documentRef.querySelector?.("#section-faq");
  if (!section) return;
  setText(section, ".eyebrow-section", "FAQ");
  setHtml(section, ".heading-h2", 'Questions before you <span class="heading-accent">go</span>');
  const items = section.querySelectorAll?.(".faq-accordion, .faq-item, .accordion-item") ?? [];
  items.forEach((item, index) => {
    const faq = faqs[index];
    if (!faq) return;
    const heading = item.querySelector?.("h3, .accordion-title");
    if (heading) heading.textContent = faq.question;
    const paragraph = item.querySelector?.("p");
    if (paragraph) paragraph.textContent = faq.answer;
  });
  setLink(section.querySelector?.(".secondary-button"), "/faq", "See All Answers");
}

function adaptTeam(documentRef) {
  const section = documentRef.querySelector?.("#section-team");
  if (!section) return;
  setText(section, ".eyebrow-section", "Team");
  setText(section, ".heading-h2", "Meet the people behind the journeys");
  const intro = section.querySelector?.(".heading-wrap + p, .team-header p");
  if (intro) intro.remove();
  const slides = section.querySelectorAll?.(".slide.is-team") ?? [];
  slides.forEach((slide, index) => {
    const member = team[index % team.length];
    setImage(slide.querySelector?.("img"), member.image, `${member.name}, ${member.role}`);
    const badges = slide.querySelectorAll?.(".badge div") ?? [];
    if (badges[0]) badges[0].textContent = member.name;
    if (badges[1]) badges[1].textContent = member.role;
  });
}

function adaptCallsToAction(documentRef) {
  for (const button of documentRef.querySelectorAll?.(
    'a.primary-button, a.secondary-button',
  ) ?? []) {
    const href = button.getAttribute("href") ?? "";
    if (href === "#" || /apply|join/i.test(button.textContent ?? "")) {
      setLink(button, "/contact", "Plan My Trip");
    }
  }

  const final = documentRef.querySelector?.(".section-final-cta");
  if (final) {
    setHtml(final, ".heading-h2", '<span class="heading-accent">Ready</span><br>to make it yours?');
    const paragraph = final.querySelector?.(".cta-content p");
    if (paragraph) paragraph.textContent = "RouteToRecall. Your people, your pace, your story.";
    setLink(final.querySelector?.(".primary-button"), "/contact", "Start Planning");
    setImage(final.querySelector?.(".cta-media img"), destinations[5].image, "Friends travelling through Sri Lanka");
    const meta = final.querySelectorAll?.(":scope .u-flex-row > div") ?? [];
    meta.forEach?.((item) => item.remove());
    const socialLabel = final.querySelector?.(".cta-footer > .u-text-size-small");
    if (socialLabel) socialLabel.remove();
  }

  const banners = documentRef.querySelectorAll?.(".section-cta") ?? [];
  banners.forEach((section, index) => {
    const destination = destinations[(index + 6) % destinations.length];
    setImage(section.querySelector?.(".image-wrap img"), destination.image, destination.kicker);
    setText(section, ".eyebrow-section", index === 0 ? "Imagine" : "Ready");
    setHtml(
      section,
      ".heading-h2",
      index === 0
        ? "Your next story is closer than it feels"
        : "Turn the saved posts into a real journey",
    );
    setLink(section.querySelector?.(".primary-button"), "/contact", "Plan My Trip");
  });
}

function adaptFooter(documentRef) {
  const footer = documentRef.querySelector?.("footer.footer");
  if (!footer) return;
  const backdrop = footer.querySelector?.(".image-wrap.u-absolute-full");
  if (backdrop) {
    backdrop.classList?.add("rtr-footer-backdrop");
    if (backdrop.parentElement !== footer) footer.prepend?.(backdrop);
  }
  const intro = footer.querySelector?.(".footer-main-col .u-text-color-frost");
  if (intro) intro.innerHTML = `${siteMeta.name}<br>${siteMeta.address}`;
  const links = footer.querySelectorAll?.(".contact-link-col a") ?? [];
  if (links[0]) {
    links[0].setAttribute("href", `mailto:${siteMeta.email}`);
    const label = links[0].querySelector?.(".contact-link-wrap > div:last-child");
    if (label) label.textContent = siteMeta.email;
  }
  if (links[1]) {
    links[1].setAttribute("href", `tel:${siteMeta.phoneHref}`);
    const label = links[1].querySelector?.(".contact-link-wrap > div:last-child");
    if (label) label.textContent = siteMeta.phone;
  }
  if (links[2]) {
    links[2].setAttribute("href", siteMeta.whatsappHref);
    const label = links[2].querySelector?.(".contact-link-wrap > div:last-child");
    if (label) label.textContent = "WhatsApp planning team";
  }

  const navColumns = footer.querySelectorAll?.(".footer-nav") ?? [];
  if (navColumns[0]) {
    navColumns[0].innerHTML = `<div class="footer-nav-title u-text-color-frost">Explore</div><div class="nav-link-col">${homepageRoutes
      .slice(0, 3)
      .map(([label, href]) => `<a class="footer-link rtr-footer-link" href="${href}"><span>${label}</span><span class="rtr-footer-link-line"></span></a>`)
      .join("")}</div>`;
  }
  if (navColumns[1]) {
    navColumns[1].innerHTML = `<div class="footer-nav-title u-text-color-frost">Plan</div><div class="nav-link-col"><a class="footer-link rtr-footer-link" href="/contact"><span>Contact</span><span class="rtr-footer-link-line"></span></a><a class="footer-link rtr-footer-link" href="/faq"><span>FAQ</span><span class="rtr-footer-link-line"></span></a><a class="footer-link rtr-footer-link" href="/policy"><span>Policy</span><span class="rtr-footer-link-line"></span></a></div>`;
  }
  const bigLetters = footer.querySelector?.(".big-letters");
  if (bigLetters) bigLetters.innerHTML = `<div class="big-letter-wrap"><div class="big-letter rtr-footer-word">${footerLetterMarkup()}</div></div>`;
  const meta = footer.querySelector?.(".footer-meta");
  if (meta) meta.innerHTML = '<div class="meta-link-row"><div class="u-text-size-small u-text-color-frost">Copyright © RouteToRecall 2026</div></div>';
  setImage(footer.querySelector?.(".rtr-footer-backdrop img"), destinations[4].image, "A RouteToRecall family journey in Bali");
}

export function adaptHomepage(documentRef) {
  documentRef.title = "Routetorecall - Your travel companion";
  documentRef.body?.setAttribute?.("data-rtr-home", "true");
  const description = documentRef.querySelector?.('meta[name="description"]');
  if (description) description.setAttribute("content", siteMeta.description);

  for (const badge of documentRef.querySelectorAll?.(
    ".w-webflow-badge, a[href*='webflow.com']",
  ) ?? []) {
    badge.remove?.();
  }

  adaptNavigation(documentRef);
  adaptHero(documentRef);
  adaptOverview(documentRef);
  adaptFeaturedDestinations(documentRef);
  adaptStay(documentRef);
  adaptExperiences(documentRef);
  adaptProgram(documentRef);
  adaptSteps(documentRef);
  adaptPlannerSection(documentRef);
  adaptTestimonials(documentRef);
  adaptPricing(documentRef);
  adaptFaq(documentRef);
  adaptTeam(documentRef);
  adaptCallsToAction(documentRef);
  adaptFooter(documentRef);
}
