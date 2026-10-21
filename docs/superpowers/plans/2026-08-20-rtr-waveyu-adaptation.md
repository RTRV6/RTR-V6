# RouteToRecall Waveyu Adaptation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the verified local Waveyu clone into a RouteToRecall travel website with a long homepage and five matching secondary pages.

**Architecture:** Keep the exported Waveyu homepage DOM and runtime as the visual base, then apply a small JavaScript content layer that replaces branding, copy, imagery, links, and repeated card content. Render secondary routes from a shared route-template module, with a single responsive stylesheet and shared interactions. Keep all structured product copy in one data module so content and tests stay aligned.

**Tech Stack:** Static HTML, Vite 7, ES modules, Webflow runtime, GSAP, Node test runner, CSS.

**Spec:** `docs/site-adaptation-spec.md`

## Global Constraints

- `D:\Claude\RTR\RTR_V3\RTR_V3` is read-only.
- Preserve the existing Waveyu typography, layout rhythm, and motion language.
- Use only the approved assets in `images/rtr-destinations/` for destination imagery.
- Remove the Made in Webflow badge and visible Waveyu/Webflow branding.
- Build routes `/`, `/destinations`, `/experiences`, `/contact`, `/faq`, and `/policy`.
- Forms are local-preview interactions only and must not imply data was transmitted.

---

### Task 1: Structured RouteToRecall Content

**Files:**
- Create: `src/rtr-content.js`
- Create: `tests/rtr-content.test.js`
- Copy: `images/rtr-logo-white.png`
- Copy: `images/rtr-logo-black.png`

**Interfaces:**
- Produces: `siteMeta`, `destinations`, `experiences`, `testimonials`, `team`, `faqs`, `policies`, and `routePaths`.

- [ ] **Step 1: Write failing content tests** asserting nine unique destinations, six routes, supported proof points, complete contact fields, and local image paths.
- [ ] **Step 2: Run `npm test -- tests/rtr-content.test.js`** and verify failure because `src/rtr-content.js` does not exist.
- [ ] **Step 3: Implement `src/rtr-content.js`** with the exact product facts and compact copy from the spec.
- [ ] **Step 4: Copy the supplied black and white RouteToRecall logos** into the local clone without modifying RTR_V3.
- [ ] **Step 5: Run `npm test -- tests/rtr-content.test.js`** and verify the content tests pass.

### Task 2: Secondary Route Renderer

**Files:**
- Create: `src/rtr-pages.js`
- Create: `src/rtr-site.css`
- Create: `tests/rtr-pages.test.js`

**Interfaces:**
- Consumes: exports from `src/rtr-content.js`.
- Produces: `normalizePath(pathname)`, `renderRoute(pathname)`, `initializeRouteInteractions(documentRef)`.

- [ ] **Step 1: Write failing route tests** for all five secondary pages, shared navigation/footer, destination imagery, FAQ accordions, policy sections, and the contact form fields.
- [ ] **Step 2: Run the route tests** and verify they fail because the renderer is missing.
- [ ] **Step 3: Implement shared header, route hero, content sections, CTA, and footer renderers** using semantic HTML and the approved copy.
- [ ] **Step 4: Implement accordion and mobile-navigation behavior** with `aria-expanded`, Escape handling, and focus-visible states.
- [ ] **Step 5: Implement the responsive Waveyu-language stylesheet** using Bricolage Grotesque, matching radii, spacing, dark green, off-white, and chartreuse tokens.
- [ ] **Step 6: Run route tests** and verify they pass.

### Task 3: Homepage Content Adapter

**Files:**
- Create: `src/rtr-home.js`
- Create: `tests/rtr-home.test.js`

**Interfaces:**
- Consumes: `siteMeta`, `destinations`, `experiences`, `testimonials`, and `team`.
- Produces: `homepageReplacements` and `adaptHomepage(documentRef)`.

- [ ] **Step 1: Write failing homepage tests** for hero copy, logo replacement, navigation routes, Webflow-badge removal, destination imagery, CTA destinations, contact details, and absence of visible Waveyu branding.
- [ ] **Step 2: Run homepage tests** and verify the adapter is missing.
- [ ] **Step 3: Implement data-driven text and image replacements** against stable Waveyu classes and section IDs.
- [ ] **Step 4: Hide the Webflow badge and replace footer metadata and links.**
- [ ] **Step 5: Keep existing Webflow motion and interaction attributes intact** while changing content.
- [ ] **Step 6: Run homepage tests** and verify they pass.

### Task 4: Application Bootstrap and Local Form Behavior

**Files:**
- Modify: `src/site-fixes.js`
- Modify: `src/site-fixes.css`
- Modify: `tests/site-fixes.test.js`
- Modify: `tests/structure.test.js`

**Interfaces:**
- Consumes: `adaptHomepage`, `renderRoute`, `initializeRouteInteractions`.
- Produces: one bootstrap that selects homepage adaptation or secondary route rendering by `window.location.pathname`.

- [ ] **Step 1: Extend tests** to require all route paths, imported RTR CSS, updated success copy, and no production Waveyu links.
- [ ] **Step 2: Run tests** and verify the new expectations fail.
- [ ] **Step 3: Import and initialize the RTR modules** before compatibility fixes.
- [ ] **Step 4: Update local form confirmation copy** to “Thanks — your trip brief is ready. RouteToRecall will get back to you shortly.”
- [ ] **Step 5: Run the full test suite** and verify all tests pass.

### Task 5: Browser Verification and Design QA

**Files:**
- Modify: `design-qa.md`
- Create: `verification/rtr-home-desktop.png`
- Create: `verification/rtr-home-mobile.png`
- Create: `verification/rtr-destinations-desktop.png`
- Create: `verification/rtr-contact-mobile.png`

**Interfaces:**
- Consumes: the complete local build.
- Produces: verified screenshots and a passing design-QA report.

- [ ] **Step 1: Run `npm test`** and record zero failures.
- [ ] **Step 2: Run `npm run build`** and record exit code 0.
- [ ] **Step 3: Open the local preview in the user-approved browser** and inspect all six routes.
- [ ] **Step 4: Exercise navigation, mobile menu, FAQ accordion, and contact form success state.**
- [ ] **Step 5: Capture desktop and mobile screenshots** at matching Waveyu reference widths.
- [ ] **Step 6: Compare the homepage captures with the Waveyu references, fix P0-P2 issues, and repeat.**
- [ ] **Step 7: Update `design-qa.md`** so the final line reads `final result: passed` only after the visual and interaction checks pass.

