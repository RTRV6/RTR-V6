# Route to Recall — Design Guidelines

## Status: this is the brand

RTR_V5 (this project, built on Waveyu) is the confirmed brand direction — forest green, chartreuse-lime, Bricolage Grotesque, documentary photography. A separate exploration in the RTR_V3 Next.js project (teal, Thunder/Aldora/Switzer, no photography system) is superseded. Nothing in this doc reconciles with that system; it doesn't need to.

This file sits alongside the two documents already written for this project — `imagery-brand-language.md` (the photography spec) and `design-qa.md` (fidelity verification against the Waveyu source) — and doesn't repeat what they already cover well.

---

## 1. Color

```css
--rtr-ink:   #1e211f;   /* body text, default foreground */
--rtr-muted: #7d817d;   /* secondary text — captions, labels, metadata */
--rtr-paper: #f4f4f2;   /* default page background */
--rtr-card:  #ffffff;   /* raised surfaces — forms, cards on paper */
--rtr-green: #0d2c18;   /* dark punctuation surfaces — CTA, footer, hero overlay */
--rtr-lime:  #c9ec38;   /* the one accent color */
--rtr-line:  rgba(30, 33, 31, .15);
--rtr-radius: 2rem;
```

**Lime is a signal, not a fill.** It marks the one thing that should get noticed — an accent pill, a hover state, the eyebrow dot, an active letter in the footer wordmark. It never becomes a background for body content, and it never appears twice competing for attention in the same view. If a design has lime in three places at once, cut two.

**Green is the dark register**, used the way a photograph uses shadow — CTA bands, the footer, overlay scrims on hero imagery. Never used as a small accent; it's a surface, not a highlight.

---

## 2. Typography — Bricolage Grotesque only

Four weights are loaded: Light, Regular, Medium, Bold. No second typeface — not even for labels or numerals. The reference card's small mono-style tags are achieved with Bricolage Regular at reduced size and tracking, not a separate monospace font. This is already the established pattern (`.rtr-eyebrow`, `.rtr-index`): `font-size: .72rem; letter-spacing: .04em; text-transform: uppercase;`

| Weight | Role |
|---|---|
| **Bold** | Headlines, the oversized footer wordmark, the one big statement per view |
| **Medium** | Subheadings, nav labels, card titles |
| **Regular** | Body copy, form fields |
| **Light** | Large display copy where size alone already carries the weight — the "low-contrast Waveyu hierarchy" already in use on the hero and footer heading |

Don't reach for Bold as a default. The system's character comes partly from restraint — most of a page should read at Regular or Light, with Bold reserved for the one moment that should stop a scroll.

---

## 3. Photography

Governed in full by `imagery-brand-language.md` — the 60% candid-human / 25% environmental-scale / 15% negative-space formula, the casting rules, the destination-by-destination shot list. Read that document before commissioning or selecting any image. The one addition here is about how photography behaves in layout — see §5.

---

## 4. The atmospheric-depth pattern (new — formalized from your reference)

The reference card's technique: the *same* photograph appears twice — once as a heavily blurred, scaled-up background filling the frame, once crisp inside a floating card. It reads as one cohesive image pushed through a depth-of-field effect, not two unrelated layers, because it's literally the same file.

```css
.rtr-depth-frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--rtr-radius);
}
.rtr-depth-frame__backdrop {
  position: absolute;
  inset: -10%;                 /* overdraw so the blur never shows a clean edge */
  background-size: cover;
  background-position: center;
  filter: blur(40px) saturate(1.1);
  transform: scale(1.15);
}
.rtr-depth-frame__card {
  position: relative;
  z-index: 1;
  margin: auto;
  border-radius: var(--rtr-radius);
  background: var(--rtr-card);
  overflow: hidden;
}
```

**This replaces gradients as the system's atmospheric device.** Route to Recall doesn't use mesh gradients or abstract color washes for depth — it uses the photography itself, out of focus, the way GoFundMe's progress-circle motif recurs as *the* brand device rather than one of several. Reserve it for a genuine emphasis moment (a featured destination, a status card, a hero) — not every card, or it stops reading as depth and starts reading as a filter applied to everything.

---

## 5. Text vs. image vs. gradient ratio

**Gradient: zero.** Not part of this system — see §4. If a section wants atmosphere, it gets the depth-frame pattern instead, or it stays flat.

**Image-led sections carry the page.** Hero, destination cards, experience rows, the planner carousel, the footer backdrop — most of what a visitor scrolls through should be photography, per the imagery doc's own ratio.

**Flat-color, text-only sections are the deliberate rest beat.** Stats, pull quotes, the CTA band, form sections — paper or forest-green backgrounds, no image at all. This is the same 15%-negative-space principle from the imagery doc, just applied at the *page* level instead of *within one photo*: after a run of image-heavy sections, give the eye a flat, quiet one before the next photograph, so photography keeps its impact instead of becoming wallpaper.

As a rough rhythm: **don't stack more than two photography-led sections back to back** without a flat text-only or green section between them. That's the ratio — not a percentage of pixels, a rule about alternation.

---

## 6. Pills and tags — functional only

`.rtr-pill--accent` (lime) and `.rtr-pill--dark` (ink) already exist. The rule, made explicit: **a pill only ever carries real information** — a status ("Complet"), a category ("Virtuel"), a filter. It's never decorative, never a container for a headline or a CTA that could just be a button or a text link instead. The reference image's tag row is exactly this used correctly; a pill wrapping "Learn more" would not be.

---

## 7. Radius and surface language

`2rem` is the standing radius — cards, media, forms, the CTA band, the depth-frame pattern above. This is generous by design and matches Waveyu's source language; don't introduce a second, tighter radius scale for new components. One radius value, used everywhere, is part of what makes the system read as one system.

---

## 8. Motion

Light touch, never decoration for its own sake — the letter-hover footer wordmark, the hero crossfade, parallax on qualifying photographic images only (not on flat-color sections or UI chrome). `prefers-reduced-motion` disables transform-based movement everywhere; this is already implemented in `rtr-motion.js` and should be the default for anything new, not an afterthought added later.
