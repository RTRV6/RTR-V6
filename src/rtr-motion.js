const FOOTER_WORD = "route to recall";

export function footerLetterMarkup(className = "rtr-footer-letter") {
  return [...FOOTER_WORD]
    .map((letter, index) =>
      letter === " "
        ? `<span class="${className} ${className}--space" aria-hidden="true">&nbsp;</span>`
        : `<span class="${className}" data-rtr-letter="${index}">${letter}</span>`,
    )
    .join("");
}

export function initializeFooterLetters(documentRef) {
  const letters = [...(documentRef.querySelectorAll?.(".rtr-footer-letter") ?? [])];
  if (!letters.length) return;
  if (documentRef.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
  const activate = (current) => {
    const previous = documentRef.querySelector?.(".rtr-footer-letter.is-active");
    for (const letter of letters) letter.classList?.remove("is-trailing");
    if (previous && previous !== current) previous.classList?.add("is-trailing");
    for (const letter of letters) letter.classList?.toggle("is-active", letter === current);
  };
  for (const letter of letters) {
    if (letter.classList?.contains("rtr-footer-letter--space")) continue;
    letter.addEventListener?.("pointerenter", () => activate(letter));
  }
  documentRef.querySelector?.(".rtr-footer-word, .big-letters")?.addEventListener?.("pointerleave", () => {
    for (const letter of letters) letter.classList?.remove("is-active", "is-trailing");
  });
}

export function initializeParallax(documentRef, windowRef) {
  if (windowRef?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
  const exclusions = ".rtr-hero-slide, .brand-link img, .footer-brand-link img, .rtr-brand img, .rtr-footer-intro img, .rtr-footer-backdrop img, .social-icon img, .testimonial-avatar img, .team-avatar img";
  const targets = [...(documentRef.querySelectorAll?.(".rtr-hero-visuals, main img, footer .image-wrap img") ?? [])]
    .filter((target) => !target.matches?.(exclusions));
  if (!targets.length) return;
  for (const target of targets) {
    target.setAttribute?.("data-rtr-parallax", "");
    target.parentElement?.classList?.add("rtr-parallax-clip");
  }
  let scheduled = false;
  const render = () => {
    scheduled = false;
    const viewport = windowRef.innerHeight || 800;
    const mobile = (windowRef.innerWidth || 1200) < 768;
    for (const target of targets) {
      const rect = target.parentElement?.getBoundingClientRect?.() ?? target.getBoundingClientRect?.();
      if (!rect || rect.bottom < -200 || rect.top > viewport + 200) continue;
      const progress = ((rect.top + rect.height / 2) - viewport / 2) / viewport;
      const hero = Boolean(target.closest?.(".section-hero, .rtr-page-hero-media"));
      const distance = mobile ? (hero ? 18 : 9) : (hero ? 42 : 18);
      const offset = Math.max(-distance, Math.min(distance, -progress * distance));
      target.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(${hero ? "1.1" : "1.06"})`;
    }
  };
  const requestRender = () => {
    if (scheduled) return;
    scheduled = true;
    (windowRef.requestAnimationFrame ?? ((callback) => callback()))(render);
  };
  windowRef.addEventListener?.("scroll", requestRender, { passive: true });
  windowRef.addEventListener?.("resize", requestRender, { passive: true });
  requestRender();
}
