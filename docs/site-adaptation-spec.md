# RouteToRecall × Waveyu Site Adaptation Spec

## Product

RouteToRecall is a Kerala-based experiential travel company creating customized, mid-to-premium trips across Thailand, Singapore, Malaysia, Maldives, Bali, Sri Lanka, Nepal, Dubai, and Cambodia. The primary conversion is a travel enquiry through the website or WhatsApp; the site does not sell fixed trips through an online checkout.

## Visual Direction

- Preserve Waveyu's Bricolage Grotesque typography, generous white space, rounded image containers, dark-green footer, chartreuse accent, motion language, and responsive rhythm.
- Replace Waveyu branding with RouteToRecall's supplied light and dark logos.
- Remove the Made in Webflow badge and all Waveyu/Webflow template attribution visible in the interface.
- Use the approved `Living Journeys` destination imagery in `images/rtr-destinations/`.
- Follow `imagery-brand-language.md` for future imagery.

## Information Architecture

- `/`: long-form homepage retaining the Waveyu section cadence.
- `/destinations`: all nine destinations and starting-price guidance.
- `/experiences`: curated trip themes and inquiry CTAs.
- `/contact`: inquiry form, contact details, and office address.
- `/faq`: full service, booking, payment, cancellation, and customization FAQ.
- `/policy`: consolidated privacy, terms, payment, and cancellation information.

## Homepage Content Mapping

1. Hero: “Trips that turn into stories” with custom-trip inquiry CTA.
2. Overview: RouteToRecall positioning, nine destinations, four years, and 200+ travellers.
3. Destination cards: Thailand, Singapore, Malaysia, and Maldives, with a link to all nine.
4. Trip styles: culture, island escape, adventure, family, and city breaks.
5. How it works: tell us, shape it together, confirm, travel supported.
6. Experiences: Maldives, Thailand, Bali, Nepal, Dubai, and Singapore.
7. Testimonials: real RouteToRecall customer names and excerpts.
8. Team: Vinayak Lal, Ajisha Rajan, and Sanjita Krishnan.
9. FAQ preview and inquiry CTA.
10. Footer: RouteToRecall contact details and page navigation.

## Content Rules

- Every itinerary is customized; prices are starting points, not fixed checkout prices.
- Keep copy compact enough to fit Waveyu's existing typographic layout.
- Use “RouteToRecall” in prose and the supplied logo for the primary wordmark.
- Keep claims limited to supported RTR facts: 4+ years, nine destinations, 200+ travellers.
- Contact: +91 6363 331 334, enquiries@routetorecall.com, #50 Green Valley Orchid, Udayamperoor, Ernakulam, Kerala 682307.
- Local preview forms show an accessible success message and do not send data.

## Responsive and Interaction Requirements

- Desktop and mobile layouts must preserve Waveyu's visual density and rounded-card behavior.
- Navigation must work across all six routes and include an accessible mobile menu.
- Accordions must support pointer and keyboard activation and expose `aria-expanded`.
- Enquiry forms must include name, email, phone, destination, dates, travellers, and trip details.
- All primary CTAs route to `/contact`; WhatsApp and email links use the official RTR details.

