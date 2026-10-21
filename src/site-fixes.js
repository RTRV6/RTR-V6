import { adaptHomepage } from "./rtr-home.js";
import {
  initializeRouteInteractions,
  normalizePath,
  renderRoute,
} from "./rtr-pages.js";
import { initializeFooterLetters, initializeParallax } from "./rtr-motion.js";

const PRODUCTION_HASH_PREFIX = "https://waveyu.webflow.io/#";
const MISSING_UTILITY_PREFIX = "/utility-pages/";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "terminal.local"]);

function isLocalPreview(windowRef) {
  const hostname = windowRef?.location?.hostname ?? "";
  return LOCAL_HOSTS.has(hostname) || hostname.endsWith(".local");
}

function normalizeLinks(documentRef) {
  for (const link of documentRef.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href") ?? "";

    if (href.startsWith(PRODUCTION_HASH_PREFIX)) {
      link.setAttribute("href", `#${href.slice(PRODUCTION_HASH_PREFIX.length)}`);
      continue;
    }

    if (href.startsWith(MISSING_UTILITY_PREFIX)) {
      link.setAttribute("href", "#");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.addEventListener("click", (event) => event.preventDefault());
    }
  }
}

function prepareLocalForms(documentRef, windowRef) {
  if (!isLocalPreview(windowRef)) return;

  for (const form of documentRef.querySelectorAll("form")) {
    if (form.hasAttribute?.("data-rtr-form")) continue;
    let status = form.querySelector(".local-form-status");
    if (!status) {
      status = documentRef.createElement("p");
      status.className = "local-form-status";
      status.hidden = true;
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      form.append(status);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent =
        "Thanks — your trip brief is ready. RouteToRecall will get back to you shortly.";
      status.hidden = false;
    });
  }
}

export function initializeRTRSite(documentRef, windowRef) {
  const path = normalizePath(windowRef?.location?.pathname ?? "/");

  if (path === "/") {
    adaptHomepage(documentRef);
  } else {
    documentRef.body.innerHTML = renderRoute(path);
    documentRef.title = "Routetorecall - Your travel companion";
    initializeRouteInteractions(documentRef);
  }
  initializeFooterLetters(documentRef);
  initializeParallax(documentRef, windowRef);
}

function installRuntimeFallback(documentRef, windowRef) {
  windowRef.setTimeout(() => {
    const interactionsAreRunning = Boolean(
      documentRef.querySelector?.(".gsap_split_word"),
    );

    if (!windowRef.Webflow && !interactionsAreRunning) {
      documentRef.documentElement.classList.add("webflow-runtime-fallback");
    }
  }, 4000);
}

export function initializeSiteFixes(documentRef, windowRef) {
  normalizeLinks(documentRef);
  prepareLocalForms(documentRef, windowRef);
  installRuntimeFallback(documentRef, windowRef);
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  const start = () => {
    initializeRTRSite(document, window);
    initializeSiteFixes(document, window);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
}
