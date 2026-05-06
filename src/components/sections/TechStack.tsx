"use client";

import { useRef } from "react";
import { TECH_STACK } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollAnimations";
import styles from "./TechStack.module.css";

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
  useScrollReveal(sectionRef);

  // Double the array for seamless infinite scroll
  const doubledStack = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.techStack}`}
      id="tech"
    >
      {/* Ambient glow */}
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

      {/* Central nucleus */}
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

      {/* Marquee rows */}
      <div className={styles.marqueeContainer}>
        {/* Fade edges */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />

        {/* Row 1 — scrolls left */}
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrack}>
            {doubledStack.map((tech, i) => (
              <TechPill key={`row1-${i}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className={styles.marqueeRow}>
          <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
            {[...doubledStack].reverse().map((tech, i) => (
              <TechPill key={`row2-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
