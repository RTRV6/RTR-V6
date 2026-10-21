import {
  destinations,
  experiences,
  faqs,
  policies,
  routePaths,
  siteMeta,
} from "./rtr-content.js";
import { footerLetterMarkup } from "./rtr-motion.js";

const secondaryPaths = new Set(routePaths.slice(1));

export function normalizePath(pathname = "/") {
  const normalized = `/${String(pathname).split("?")[0].split("#")[0]}`
    .replace(/\/{2,}/g, "/")
    .replace(/\/$/, "")
    .toLowerCase();
  const path = normalized || "/";
  return routePaths.includes(path) ? path : "/";
}

function nav(path) {
  const links = [
    ["/destinations", "Destinations"],
    ["/experiences", "Experiences"],
    ["/faq", "FAQ"],
    ["/contact", "Contact"],
  ];

  return `
    <header class="rtr-nav" data-rtr-nav>
      <a class="rtr-brand" href="/" aria-label="RouteToRecall home">
        <img src="${siteMeta.logoDark}" alt="RouteToRecall">
      </a>
      <button class="rtr-menu-button" type="button" aria-expanded="false" aria-controls="rtr-menu" data-rtr-menu-button>Menu</button>
      <nav class="rtr-nav-links" id="rtr-menu" aria-label="Primary navigation" data-rtr-menu>
        ${links
          .map(
            ([href, label]) =>
              `<a href="${href}"${path === href ? ' aria-current="page"' : ""}>${label}</a>`,
          )
          .join("")}
        <a class="rtr-pill rtr-pill--accent" href="/contact">Plan my trip</a>
      </nav>
    </header>`;
}

function footer() {
  const link = (href, label, extra = "") => `<a class="rtr-footer-link" href="${href}"${extra}><span>${label}</span><span class="rtr-footer-link-line"></span></a>`;
  return `
    <footer class="rtr-footer">
      <div class="rtr-footer-grid">
        <div class="rtr-footer-intro">
          <img src="${siteMeta.logoLight}" alt="RouteToRecall">
          <p>${siteMeta.name}<br>${siteMeta.address}</p>
        </div>
        <div>
          <span class="rtr-footer-label">Explore</span>
          ${link("/destinations", "Destinations")}
          ${link("/experiences", "Experiences")}
          ${link("/faq", "FAQ")}
          ${link("/policy", "Policy")}
        </div>
        <div>
          <span class="rtr-footer-label">Talk to us</span>
          ${link(`mailto:${siteMeta.email}`, siteMeta.email)}
          ${link(`tel:${siteMeta.phoneHref}`, siteMeta.phone)}
          ${link(siteMeta.whatsappHref, "WhatsApp", ' target="_blank" rel="noreferrer"')}
        </div>
      </div>
      <div class="rtr-footer-bottom">
        <span>${siteMeta.address}</span>
        <span>© 2026 RouteToRecall</span>
      </div>
      <div class="rtr-footer-word" aria-label="Route to Recall">${footerLetterMarkup()}</div>
    </footer>`;
}

function pageHero({ eyebrow, title, accent, copy, image, alt }) {
  return `
    <section class="rtr-page-hero">
      <div class="rtr-page-hero-copy">
        <span class="rtr-eyebrow">${eyebrow}</span>
        <h1>${title} <span>${accent}</span></h1>
        <p>${copy}</p>
      </div>
      <div class="rtr-page-hero-media">
        <img src="${image}" alt="${alt}">
      </div>
    </section>`;
}

function sharedCta() {
  return `
    <section class="rtr-cta">
      <span class="rtr-eyebrow rtr-eyebrow--light">Your trip, shaped around you</span>
      <h2>Tell us what you want to <span>remember.</span></h2>
      <p>Share the rough idea. We will turn it into a route that fits your people, pace and priorities.</p>
      <a class="rtr-pill rtr-pill--light" href="/contact">Start planning</a>
    </section>`;
}

function destinationPage() {
  return `
    ${pageHero({
      eyebrow: "Nine destinations",
      title: "Find the place that fits",
      accent: "your story",
      copy: "These are starting points, not fixed packages. Every route is adjusted to your dates, pace, people and priorities.",
      image: destinations[0].image,
      alt: "Friends arriving by long-tail boat in Thailand",
    })}
    <section class="rtr-section rtr-section--destinations">
      <div class="rtr-section-heading">
        <span class="rtr-eyebrow">Destinations</span>
        <h2>Nine ways to leave the <span>ordinary</span></h2>
      </div>
      <div class="rtr-destination-grid">
        ${destinations
          .map(
            (destination, index) => `
              <article class="rtr-destination-card${index === 0 || index === 5 ? " rtr-destination-card--wide" : ""}">
                <img src="${destination.image}" alt="${destination.name}: ${destination.kicker}">
                <div class="rtr-card-overlay">
                  <span>${destination.price}</span>
                  <h2>${destination.name}</h2>
                  <p>${destination.summary}</p>
                  <a href="/contact">Plan ${destination.name}</a>
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>
    ${sharedCta()}`;
}

function experiencesPage() {
  return `
    ${pageHero({
      eyebrow: "Curated experiences",
      title: "Travel deeper than a",
      accent: "checklist",
      copy: "Choose the feeling you want from the trip. We will build the days, stays and movement around it.",
      image: destinations[4].image,
      alt: "A family exploring rice terraces in Bali",
    })}
    <section class="rtr-section">
      <div class="rtr-section-heading rtr-section-heading--split">
        <div>
          <span class="rtr-eyebrow">Experiences</span>
          <h2>Start with what pulls <span>you in</span></h2>
        </div>
        <p>No two versions need to look the same. These themes become your own once we know who is travelling.</p>
      </div>
      <div class="rtr-experience-list">
        ${experiences
          .map(
            (experience, index) => `
              <article class="rtr-experience-row${index % 2 ? " rtr-experience-row--reverse" : ""}">
                <img src="${experience.image}" alt="${experience.title} in ${experience.location}">
                <div>
                  <span class="rtr-index">0${index + 1} · ${experience.location}</span>
                  <h2>${experience.title}</h2>
                  <p>${experience.summary}</p>
                  <a class="rtr-text-link" href="/contact">Build this into my trip</a>
                </div>
              </article>`,
          )
          .join("")}
      </div>
    </section>
    ${sharedCta()}`;
}

function contactPage() {
  return `
    ${pageHero({
      eyebrow: "Plan with us",
      title: "Your trip starts with a",
      accent: "real conversation",
      copy: "Tell us the rough idea, even if the dates or destination are not final yet. We will help you shape the rest.",
      image: destinations[7].image,
      alt: "A family arriving at Dubai Creek",
    })}
    <section class="rtr-section rtr-contact-layout">
      <div class="rtr-contact-copy">
        <span class="rtr-eyebrow">Contact</span>
        <h2>Give us the <span>starting point</span></h2>
        <p>We usually begin with a short call or WhatsApp conversation. Your enquiry helps us arrive prepared.</p>
        <div class="rtr-contact-details">
          <a href="tel:${siteMeta.phoneHref}">${siteMeta.phone}</a>
          <a href="mailto:${siteMeta.email}">${siteMeta.email}</a>
          <p>${siteMeta.address}</p>
        </div>
      </div>
      <form class="rtr-form" data-rtr-form>
        <label>Full name<input name="name" autocomplete="name" required></label>
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel" required></label>
        <label>Destination<select name="destination"><option value="">Still deciding</option>${destinations.map(({ name }) => `<option>${name}</option>`).join("")}</select></label>
        <label>Travel dates<input name="dates" placeholder="Approximate dates are fine"></label>
        <label>Travellers<input name="travellers" placeholder="Adults, children and ages"></label>
        <label class="rtr-form-wide">What should this trip feel like?<textarea name="tripDetails" rows="5" placeholder="Interests, pace, special moments, budget range…"></textarea></label>
        <button class="rtr-pill rtr-pill--dark" type="submit">Send my trip brief</button>
        <p class="rtr-form-status" role="status" aria-live="polite" hidden></p>
      </form>
    </section>`;
}

function faqPage() {
  return `
    ${pageHero({
      eyebrow: "Good questions",
      title: "Know how the journey",
      accent: "comes together",
      copy: "Clear answers about customization, pricing, booking, payments and the support you can expect.",
      image: destinations[2].image,
      alt: "Friends exploring a heritage street in Malaysia",
    })}
    <section class="rtr-section rtr-faq-layout">
      <div class="rtr-section-heading">
        <span class="rtr-eyebrow">FAQ</span>
        <h2>Before you <span>pack</span></h2>
        <p>Still unsure? Send the question to our planning team and we will answer it in plain language.</p>
        <a class="rtr-pill rtr-pill--dark" href="/contact">Ask us directly</a>
      </div>
      <div class="rtr-accordion-list">
        ${faqs
          .map(
            (item, index) => `
              <article class="rtr-accordion-item">
                <button type="button" aria-expanded="false" aria-controls="faq-${index}" data-rtr-accordion>
                  <span>0${index + 1}</span><strong>${item.question}</strong><em>Open</em>
                </button>
                <div id="faq-${index}" hidden><p>${item.answer}</p></div>
              </article>`,
          )
          .join("")}
      </div>
    </section>
    ${sharedCta()}`;
}

function policyPage() {
  return `
    ${pageHero({
      eyebrow: "Policy",
      title: "Clear terms for a",
      accent: "confident trip",
      copy: "A concise guide to how enquiries, booking, payments, changes and personal information are handled.",
      image: destinations[8].image,
      alt: "Travellers exploring an Angkor-era temple in Cambodia",
    })}
    <section class="rtr-section rtr-policy-layout">
      <aside>
        <span class="rtr-eyebrow">Last reviewed</span>
        <h2>20 August 2026</h2>
        <p>Your confirmed proposal contains the specific supplier terms for your trip and takes precedence over this general website summary.</p>
        <a class="rtr-pill rtr-pill--dark" href="/contact">Ask a question</a>
      </aside>
      <div class="rtr-policy-list">
        ${policies
          .map(
            (item, index) => `
              <article>
                <span>0${index + 1}</span>
                <div><h2>${item.title}</h2><p>${item.body}</p></div>
              </article>`,
          )
          .join("")}
      </div>
    </section>`;
}

const pages = {
  "/destinations": destinationPage,
  "/experiences": experiencesPage,
  "/contact": contactPage,
  "/faq": faqPage,
  "/policy": policyPage,
};

export function renderRoute(pathname) {
  const path = normalizePath(pathname);
  if (!secondaryPaths.has(path)) return "";

  return `
    <div class="rtr-route-shell" data-rtr-route="${path}">
      ${nav(path)}
      <main>${pages[path]()}</main>
      ${footer()}
    </div>`;
}

export function initializeRouteInteractions(documentRef) {
  const menuButton = documentRef.querySelector?.("[data-rtr-menu-button]");
  const menu = documentRef.querySelector?.("[data-rtr-menu]");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close" : "Menu";
    menu?.classList.toggle("is-open", open);
  });

  for (const button of documentRef.querySelectorAll?.("[data-rtr-accordion]") ?? []) {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      const panel = documentRef.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", String(open));
      const label = button.querySelector("em");
      if (label) label.textContent = open ? "Close" : "Open";
      if (panel) panel.hidden = !open;
    });
  }

  for (const form of documentRef.querySelectorAll?.("[data-rtr-form]") ?? []) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector(".rtr-form-status");
      if (status) {
        status.textContent =
          "Thanks — your trip brief is ready. RouteToRecall will get back to you shortly.";
        status.hidden = false;
      }
    });
  }
}
