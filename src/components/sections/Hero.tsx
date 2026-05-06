"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TEAM_NAME } from "@/lib/constants";
import { useHeroAnimation } from "@/hooks/useScrollAnimations";
import styles from "./Hero.module.css";

const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const num = parseInt(target);
    if (isNaN(num)) {
      setHasAnimated(true);
      return;
    }

    // Delay to sync with hero animation
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 30;
      const increment = num / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= num) {
          setCount(num);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      setHasAnimated(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [target, hasAnimated]);

  const isNumeric = !isNaN(parseInt(target));

  return (
    <span ref={ref} className={styles.statNumber}>
      {isNumeric ? count : target}{suffix}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAnimation(sectionRef);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* 3D Background */}
      <div className={styles.canvasContainer}>
        <Scene />
      </div>

      {/* CSS Particles (visible on all devices including mobile) */}
      <div className={styles.cssParticles}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={styles.cssParticle}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              "--tx": `${(Math.random() - 0.5) * 120}px`,
              "--ty": `${(Math.random() - 0.5) * 120}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className={styles.orbCyan} data-parallax />
      <div className={styles.orbViolet} data-parallax />
      <div className={styles.orbPink} />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.badge} data-animate-badge style={{ opacity: 0 }}>
            <span className={styles.badgeDot} />
            <span>Equipo de Desarrollo</span>
            <div className={styles.badgeShimmer} />
          </div>

          <h1 className={styles.title} data-animate-title style={{ opacity: 0 }}>
            Creamos{" "}
            <span className="gradient-text">experiencias</span>
            <br />
            digitales{" "}
            <span className="gradient-text-accent">extraordinarias</span>
          </h1>

          <p className={styles.subtitle} data-animate-subtitle style={{ opacity: 0 }}>
            Somos <strong>{TEAM_NAME}</strong> — un equipo de 4 desarrolladores
            transformando ideas en productos digitales que impactan. Desde
            marketplaces B2B hasta videojuegos inmersivos.
          </p>

          <div className={styles.cta} data-animate-cta style={{ opacity: 0 }}>
            <a href="#projects" className="btn-primary">
              Ver Proyectos
              <span>→</span>
            </a>
            <a href="#team" className="btn-secondary">
              Conocer al Equipo
            </a>
          </div>

          <div className={styles.stats} data-animate-stats style={{ opacity: 0 }}>
            <div className={styles.stat}>
              <AnimatedCounter target="4" suffix="+" />
              <span className={styles.statLabel}>Proyectos</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <AnimatedCounter target="4" />
              <span className={styles.statLabel}>Miembros</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Creatividad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
