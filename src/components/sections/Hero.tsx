"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { TEAM_NAME } from "@/lib/constants";
import { useHeroAnimation } from "@/hooks/useScrollAnimations";
import styles from "./Hero.module.css";

const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

/**
 * Generador de números pseudo-aleatorios basado en semilla.
 * Produce siempre los mismos valores para la misma semilla,
 * evitando diferencias entre servidor y cliente (error de hidratación).
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * Datos pre-calculados para las partículas CSS del hero.
 * Se generan una sola vez y son idénticos en servidor y cliente.
 */
const PARTICLE_DATA = Array.from({ length: 15 }, (_, i) => ({
  left: `${10 + seededRandom(i * 7 + 1) * 80}%`,
  top: `${10 + seededRandom(i * 7 + 2) * 80}%`,
  animationDelay: `${seededRandom(i * 7 + 3) * 6}s`,
  animationDuration: `${4 + seededRandom(i * 7 + 4) * 6}s`,
  tx: `${(seededRandom(i * 7 + 5) - 0.5) * 120}px`,
  ty: `${(seededRandom(i * 7 + 6) - 0.5) * 120}px`,
}));

/**
 * Componente de contador animado que sube progresivamente hasta el número objetivo.
 * Soporta sufijo (ej: "+") y se sincroniza con la animación del hero.
 */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Retraso para sincronizar con la animación del hero
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      setHasAnimated(true);
    }, 2800);

    return () => clearTimeout(timeout);
  }, [target, hasAnimated]);

  return (
    <span className={styles.statNumber}>
      {count}{suffix}
    </span>
  );
}

/**
 * Componente de contador especial para el infinito (∞).
 * Muestra números subiendo rápidamente y termina mostrando ∞.
 */
function InfinityCounter() {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const timeout = setTimeout(() => {
      // Secuencia de números que escalan rápidamente antes de mostrar ∞
      const sequence = [1, 5, 12, 28, 57, 99, 174, 300, 512, 888, 999, "∞"];
      let idx = 0;

      const interval = setInterval(() => {
        if (idx < sequence.length) {
          setDisplay(String(sequence[idx]));
          idx++;
        }
        if (idx >= sequence.length) {
          clearInterval(interval);
        }
      }, 110);

      setHasAnimated(true);
    }, 2800);

    return () => clearTimeout(timeout);
  }, [hasAnimated]);

  return (
    <span className={styles.statNumber}>
      {display}
    </span>
  );
}

/**
 * Componente de efecto typewriter que muestra el texto del título
 * letra por letra con un cursor parpadeante al final.
 */
function TypewriterTitle() {
  const lines = [
    { text: "Creamos ", highlight: false },
    { text: "experiencias", highlight: "cyan" },
    { text: "\n", highlight: false },
    { text: "digitales ", highlight: false },
    { text: "extraordinarias", highlight: "accent" },
  ];

  const [visibleChars, setVisibleChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Calcular total de caracteres (sin contar \n)
  const totalChars = useMemo(
    () => lines.reduce((sum, part) => sum + (part.text === "\n" ? 0 : part.text.length), 0),
    []
  );

  useEffect(() => {
    // Esperar a que la animación del hero alcance el título
    const delay = setTimeout(() => {
      setIsTyping(true);
      let charIdx = 0;

      const interval = setInterval(() => {
        charIdx++;
        setVisibleChars(charIdx);
        if (charIdx >= totalChars) {
          clearInterval(interval);
          // Mantener el cursor parpadeando
        }
      }, 45);

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(delay);
  }, [totalChars]);

  // Renderizar los caracteres visibles
  let charCounter = 0;

  return (
    <h1 className={styles.title} style={{ opacity: isTyping ? 1 : 0, transition: "opacity 0.3s" }}>
      {lines.map((part, partIdx) => {
        if (part.text === "\n") {
          return <br key={partIdx} />;
        }

        const chars = part.text.split("").map((char, charIdx) => {
          const globalIdx = charCounter;
          charCounter++;
          const isVisible = globalIdx < visibleChars;

          return (
            <span
              key={`${partIdx}-${charIdx}`}
              className={styles.typewriterChar}
              style={{ opacity: isVisible ? 1 : 0 }}
            >
              {char}
            </span>
          );
        });

        // Aplicar clase de degradado según tipo de highlight
        if (part.highlight === "cyan") {
          return <span key={partIdx} className="gradient-text">{chars}</span>;
        }
        if (part.highlight === "accent") {
          return <span key={partIdx} className="gradient-text-accent">{chars}</span>;
        }
        return <span key={partIdx}>{chars}</span>;
      })}
      <span className={`${styles.typewriterCursor} ${visibleChars >= totalChars ? styles.cursorBlink : ""}`}>|</span>
    </h1>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAnimation(sectionRef);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Fondo 3D */}
      <div className={styles.canvasContainer}>
        <Scene />
      </div>

      {/* Partículas CSS — valores deterministas para evitar error de hidratación */}
      <div className={styles.cssParticles}>
        {PARTICLE_DATA.map((p, i) => (
          <div
            key={i}
            className={styles.cssParticle}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
              "--tx": p.tx,
              "--ty": p.ty,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Orbes con degradado */}
      <div className={styles.orbCyan} data-parallax />
      <div className={styles.orbViolet} data-parallax />
      <div className={styles.orbPink} />

      {/* Contenido */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <div className={styles.badge} data-animate-badge style={{ opacity: 0 }}>
            <span className={styles.badgeDot} />
            <span>Equipo de Desarrollo</span>
            <div className={styles.badgeShimmer} />
          </div>

          {/* Título con efecto typewriter */}
          <TypewriterTitle />

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

          {/* Estadísticas con glassmorphism mejorado */}
          <div className={styles.statsContainer} data-animate-stats style={{ opacity: 0 }}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <AnimatedCounter target={4} suffix="+" />
                <span className={styles.statLabel}>Proyectos</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <AnimatedCounter target={4} />
                <span className={styles.statLabel}>Miembros</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <InfinityCounter />
                <span className={styles.statLabel}>Creatividad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
