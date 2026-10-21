# RouteToRecall visual QA

## Evidence

- Source visual truth: `C:\Users\Vishnu02\AppData\Local\Temp\codex-clipboard-7f230d69-a92b-46cf-b07b-66ebc6ae6a1e.png` (Waveyu footer reference, 1906 × 772 px).
- Additional source assets: the three approved ImageGen outputs saved in `images/rtr-planners/`, plus `C:\Users\Vishnu02\AppData\Local\Temp\codex-clipboard-15fee2ac-2d70-4467-b40a-985a2cac933a.png` for the exact favicon mark.
- Implementation screenshots: `verification/final-planners-desktop.png`, `verification/final-footer-desktop.png`, and `verification/final-secondary-footer-desktop.png`.
- Combined comparison: `verification/qa-footer-source-vs-rtr.png`.
- Browser viewport: 882 × 912 CSS px at device scale 1. Source and implementation were normalized with aspect-preserving contain scaling in the combined comparison because the supplied footer reference is 1906 × 772 px.
- State: homepage planner carousel at rest and 90 ms into its next-slide transition; secondary footer at rest; homepage footer letter hover; homepage before and after vertical scroll.

## Fidelity review

- Fonts and typography: Bricolage Grotesque remains unchanged. Footer headings, navigation rows and the oversized wordmark retain the light, low-contrast Waveyu hierarchy while using RouteToRecall content.
- Spacing and layout rhythm: the three-column footer structure, link-row dividers, generous negative space and oversized lower wordmark match the reference language. The narrower implementation viewport intentionally stacks more vertically.
- Colors and visual tokens: the footer uses the same deep forest family with translucent white copy and chartreuse interaction color. The homepage footer image is darkened so the foreground remains legible.
- Image quality and asset fidelity: all three planner images are high-resolution generated assets with a consistent bright, neutral editorial treatment. Their subjects match the approved airport, temple-guide and family-guide scenes.
- Copy and content: RouteToRecall logo, address, contact details and page names replace Waveyu content. The tab title is exactly `Routetorecall - Your travel companion`.

## Interaction and responsive checks

- The planner carousel advances correctly. At rest and during motion, the mask, every slide and every image wrapper retain a 30 px radius with hidden overflow; the square-edge transition bug is no longer reproducible.
- The oversized footer word is split into individual letters. Pointer hover changes the active letter to chartreuse and leaves a soft trailing color on the preceding letter.
- Footer links retain a fine divider and animate the chartreuse line on hover.
- Qualifying photographic images receive subtle parallax; the hero's three slides now move through one shared transformed wrapper, mobile movement is reduced, and `prefers-reduced-motion` disables transforms.
- Primary planner, scroll and footer interactions completed in the in-app browser without an exception or broken state.
- The supplied RouteToRecall favicon and touch icon resolve from the active page.
- The homepage footer backdrop now matches the footer bounds edge-to-edge (882 px at the verified viewport), keeps `object-fit: cover` at a 50% / 43% focal point, and remains stationary instead of receiving parallax.
- The homepage hero now cycles through five approved photographic scenes with a 60-second loop and the original 12-second-per-scene pacing; the fixed copy and CTA do not move between scenes.
- Thailand longtail arrival, Sri Lanka hill-country train and Malaysia rainforest bridge now lead into the existing Maldives kayaks and Bali infinity pool. The rejected Bali-family frame is no longer used.
- All five 3840 × 2160 masters are preserved, with 1280, 1920, 2560 and 3840 WebP renditions supplied through responsive source sets. At the verified 897 × 912 viewport, the browser selected the 1920 tier for every scene and kept parallax on one shared wrapper.

## Findings

- No actionable P0, P1 or P2 visual differences remain in the approved scope.
- P3: the full RouteToRecall footer wordmark is naturally longer than “Waveyu,” so it uses a slightly smaller responsive size to remain on one line.

## Comparison history

- Earlier P1: moving planner slides exposed square leading edges because only the stationary outer slider was rounded. Fixed by applying inherited radius, clipping and backface isolation to the mask, slides and image wrappers. Post-fix browser evidence confirms 30 px radius throughout the transition.
- Earlier P2: the homepage footer image reduced text contrast. Fixed with a deep forest overlay and explicit stacking order; the content now stays above the image treatment.
- Earlier P2: the footer image was positioned inside the constrained content layout, leaving an obvious cropped rectangle and green side gutters. Fixed by promoting it to a full-bleed footer backdrop and removing its parallax transform.
- Earlier P2: the generated favicon draft did not preserve the exact supplied brand mark. Replaced with the user-provided RouteToRecall favicon artwork.

## Implementation checklist

- [x] Generated and installed the three travel-support carousel assets.
- [x] Fixed persistent rounded clipping during slide motion.
- [x] Added the Waveyu-style footer rows and interactive letter wordmark.
- [x] Added reduced-motion-safe image parallax.
- [x] Installed the supplied favicon and exact tab title.
- [x] Corrected the homepage footer image crop and full-bleed framing.
- [x] Installed the five-scene premium hero crossfade with 4K-ready source imagery.
- [x] Added responsive hero image tiers, priority hints and one shared parallax layer.
- [x] Passed automated tests and production build.

final result: passed
