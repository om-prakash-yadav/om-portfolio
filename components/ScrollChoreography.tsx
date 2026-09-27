"use client";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// The preloader covers the page for ~2s; the hero intro starts as it clears.
const INTRO_DELAY = 1.9;

export default function ScrollChoreography() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const heroTitle = document.querySelector<HTMLElement>("[data-hero-title]");
      if (heroTitle) {
        const split = SplitText.create(heroTitle, { type: "words,chars" });
        gsap.set(heroTitle, { perspective: 600 });
        gsap.from(split.chars, {
          rotateX: -100,
          yPercent: 60,
          opacity: 0,
          transformOrigin: "50% 50% -20px",
          stagger: 0.025,
          duration: 0.9,
          ease: "back.out(1.6)",
          delay: INTRO_DELAY,
        });
      }

      gsap.from("[data-hero-reveal]", {
        y: 30,
        rotateX: -25,
        opacity: 0,
        transformPerspective: 600,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        delay: INTRO_DELAY + 0.4,
      });

      // The hero drifts up and fades as you scroll away from it; it stays flat so the name never skews.
      gsap.to("[data-hero-content]", {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-3d-heading]").forEach((el) => {
        const split = SplitText.create(el, { type: "words,chars" });
        gsap.set(el, { perspective: 700 });
        gsap.from(split.chars, {
          rotateX: -90,
          y: 40,
          opacity: 0,
          transformOrigin: "50% 50% -30px",
          stagger: 0.035,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Headings that SplitText would break (gradient text) flip in as one block.
      gsap.utils.toArray<HTMLElement>("[data-3d-block]").forEach((el) => {
        gsap.from(el, {
          rotateX: -40,
          y: 60,
          z: -150,
          opacity: 0,
          transformPerspective: 900,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Timeline cards swing in from the side they sit on, tied to scroll position.
      gsap.utils.toArray<HTMLElement>("[data-3d-card]").forEach((el) => {
        const fromLeft = el.dataset.side === "left";
        gsap.fromTo(
          el,
          {
            rotateY: fromLeft ? 38 : -38,
            rotateX: 8,
            x: fromLeft ? -120 : 120,
            z: -260,
            opacity: 0,
            transformPerspective: 1200,
          },
          {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            z: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 60%", scrub: 1 },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-3d-skill-group]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-3d-skill]"), {
          rotateY: 90,
          z: -300,
          y: 40,
          opacity: 0,
          transformPerspective: 800,
          stagger: 0.07,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: group, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
    });

    return () => mm.revert();
  });

  return null;
}
