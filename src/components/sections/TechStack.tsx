"use client";

import { useRef } from "react";
import { TECH_STACK } from "@/lib/constants";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollAnimations";
import styles from "./TechStack.module.css";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);
  useStaggerReveal(gridRef, `.${styles.techItem}`, 0.06);

  return (
    <section ref={sectionRef} className={`section ${styles.techStack}`} id="tech">
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

        <div className={styles.orbitContainer}>
          {/* Central nucleus */}
          <div className={styles.nucleus} data-reveal>
            <div className={styles.nucleusInner}>
              <span className={styles.nucleusIcon}>⚡</span>
              <span className={styles.nucleusLabel}>Stack</span>
            </div>
            <div className={styles.nucleusRing} />
            <div className={styles.nucleusRing2} />
          </div>

          {/* Tech items */}
          <div ref={gridRef} className={styles.techGrid}>
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className={styles.techItem}
              >
                <div
                  className={styles.techDot}
                  style={{ background: tech.color, boxShadow: `0 0 15px ${tech.color}40` }}
                />
                <span className={styles.techName}>{tech.name}</span>
                <div
                  className={styles.techGlow}
                  style={{
                    background: `radial-gradient(circle, ${tech.color}15 0%, transparent 70%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
