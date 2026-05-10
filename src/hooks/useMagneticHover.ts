"use client";

import { useEffect, useRef, RefObject } from "react";

/**
 * Hook para añadir un efecto de inclinación/hover magnético 3D a los elementos.
 * El elemento se inclina hacia la posición del ratón, creando un efecto de perspectiva.
 */
export function useMagneticHover(
  ref: RefObject<HTMLElement | null>,
  options: {
    maxRotation?: number;
    perspective?: number;
    scale?: number;
    selector?: string;
  } = {}
) {
  const {
    maxRotation = 8,
    perspective = 800,
    scale = 1.02,
    selector,
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = selector
      ? container.querySelectorAll<HTMLElement>(selector)
      : [container];

    const handlers = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();

    elements.forEach((el) => {
      el.style.transition = "transform 0.1s ease-out";
      el.style.transformStyle = "preserve-3d";

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Posición normalizada de -1 a 1
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        // Limitar valores
        const clampedX = Math.max(-1, Math.min(1, x));
        const clampedY = Math.max(-1, Math.min(1, y));

        const rotateX = -clampedY * maxRotation;
        const rotateY = clampedX * maxRotation;

        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      };

      const handleMouseLeave = () => {
        el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

        // Restablecer la velocidad de transición después de la animación
        setTimeout(() => {
          el.style.transition = "transform 0.1s ease-out";
        }, 500);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      handlers.set(el, { move: handleMouseMove, leave: handleMouseLeave });
    });

    return () => {
      handlers.forEach(({ move, leave }, el) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [ref, maxRotation, perspective, scale, selector]);
}
