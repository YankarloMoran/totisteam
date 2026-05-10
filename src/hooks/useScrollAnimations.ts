"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook para crear animaciones de revelado activadas por el scroll.
 * Anima todos los hijos [data-reveal] con una aparición gradual escalonada hacia arriba.
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
 * Hook para crear efecto parallax en elementos de fondo.
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
 * Hook para animaciones escalonadas de los hijos.
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
 * Hook para la sección hero: animación de división de texto del título.
 */
export function useHeroAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }); // Esperar a la pantalla de carga

      // Insignia
      tl.fromTo(
        "[data-animate-badge]",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );

      // El título ahora usa su propio efecto typewriter interno,
      // así que no se necesita animación GSAP para él.

      // Subtítulo
      tl.fromTo(
        "[data-animate-subtitle]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      // Botones CTA
      tl.fromTo(
        "[data-animate-cta]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      // Estadísticas
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
