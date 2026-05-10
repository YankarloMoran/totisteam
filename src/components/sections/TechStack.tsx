"use client";

import { useRef, useEffect } from "react";
import { TECH_STACK } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollAnimations";
import styles from "./TechStack.module.css";
import gsap from "gsap";

function TechPill({ tech }: { tech: (typeof TECH_STACK)[0] }) {
  return (
    <div className={styles.techItem}>
      <div
        className={styles.techDot}
        style={{
          background: tech.color,
          boxShadow: `0 0 12px ${tech.color}40`,
        }}
      />
      <span className={styles.techName}>{tech.name}</span>
      <div
        className={styles.techGlow}
        style={{
          background: `radial-gradient(circle, ${tech.color}15 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  
  useScrollReveal(sectionRef);

  // Cuadruplicamos el stack para asegurar que siempre haya suficiente contenido
  // para llenar la pantalla en pantallas ultra anchas antes de reiniciar
  const quadrupledStack = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  useEffect(() => {
    if (!track1Ref.current || !track2Ref.current) return;

    // Animación fluida con GSAP
    const ctx = gsap.context(() => {
      // Calculamos la mitad del ancho total ya que el contenido está cuadruplicado
      // y queremos un bucle continuo perfecto.
      
      const animateTrack = (track: HTMLElement, direction: 1 | -1, duration: number) => {
        if (direction === 1) {
          // Track 1: hacia la izquierda
          gsap.fromTo(
            track,
            { xPercent: 0 },
            { xPercent: -50, ease: "none", duration: duration, repeat: -1 }
          );
        } else {
          // Track 2: hacia la derecha
          // Debe empezar en -50 (movido a la izquierda) y animarse hacia 0
          // para no dejar espacios vacíos en la izquierda al moverse a la derecha.
          gsap.fromTo(
            track,
            { xPercent: -50 },
            { xPercent: 0, ease: "none", duration: duration, repeat: -1 }
          );
        }
      };

      // Animaciones mucho más lentas y fluidas (80 segundos para recorrer la mitad)
      animateTrack(track1Ref.current, 1, 80);
      animateTrack(track2Ref.current, -1, 80);

      // Efecto hover para pausar las animaciones
      const handleMouseEnter = () => gsap.globalTimeline.pause();
      const handleMouseLeave = () => gsap.globalTimeline.play();

      const container = sectionRef.current;
      if (container) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (container) {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.techStack}`}
      id="tech"
    >
      {/* Resplandor ambiental */}
      <div className={styles.ambientGlow} />

      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-subtitle">Tecnologías</span>
          <h2>
            Nuestro{" "}
            <span className="gradient-text">arsenal</span> tecnológico
          </h2>
          <div className="section-divider" />
          <p>
            Las herramientas y frameworks que dominamos para construir productos
            digitales de alto impacto.
          </p>
        </div>
      </div>

      {/* Núcleo central */}
      <div className={styles.nucleusContainer} data-reveal>
        <div className={styles.nucleus}>
          <div className={styles.nucleusInner}>
            <span className={styles.nucleusIcon}>⚡</span>
            <span className={styles.nucleusLabel}>Stack</span>
          </div>
          <div className={styles.nucleusRing} />
          <div className={styles.nucleusRing2} />
        </div>
      </div>

      {/* Filas de la marquesina */}
      <div className={styles.marqueeContainer}>
        {/* Bordes desvanecidos */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        {/* Fila 1 — se desplaza a la izquierda */}
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrackGsap} ref={track1Ref}>
            {quadrupledStack.map((tech, i) => (
              <TechPill key={`row1-${i}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Fila 2 — se desplaza a la derecha */}
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrackGsap} ref={track2Ref}>
            {[...quadrupledStack].reverse().map((tech, i) => (
              <TechPill key={`row2-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
