"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to create scroll-triggered reveal animations.
 * Animates all [data-reveal] children with staggered fade-in-up.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const revealElements = el.querySelectorAll("[data-reveal]");

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

/**
 * Hook to create parallax effect on background elements.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.3
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const parallaxElements = el.querySelectorAll("[data-parallax]");

      parallaxElements.forEach((element) => {
        gsap.to(element, {
          yPercent: -30 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref, speed]);
}

/**
 * Hook for staggered children animations.
 */
export function useStaggerReveal(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  stagger: number = 0.1
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const children = el.querySelectorAll(selector);

      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, selector, stagger]);
}

/**
 * Hook for hero section: title text split animation.
 */
export function useHeroAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }); // Wait for loading screen

      // Badge
      tl.fromTo(
        "[data-animate-badge]",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );

      // Title words
      tl.fromTo(
        "[data-animate-title]",
        { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // Subtitle
      tl.fromTo(
        "[data-animate-subtitle]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // CTA buttons
      tl.fromTo(
        "[data-animate-cta]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      // Stats
      tl.fromTo(
        "[data-animate-stats]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
