"use client";

import { useState, useEffect } from "react";
import { TEAM_NAME } from "@/lib/constants";
import styles from "./LoadingScreen.module.css";

/**
 * Generador de números pseudo-aleatorios basado en semilla.
 * Evita diferencias entre servidor y cliente (error de hidratación).
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * Datos pre-calculados para las partículas de la pantalla de carga.
 * Se generan una sola vez y son idénticos en servidor y cliente.
 */
const LOADING_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: `${seededRandom(i * 5 + 100) * 100}%`,
  top: `${seededRandom(i * 5 + 101) * 100}%`,
  animationDelay: `${seededRandom(i * 5 + 102) * 5}s`,
  animationDuration: `${3 + seededRandom(i * 5 + 103) * 4}s`,
  tx: `${(seededRandom(i * 5 + 104) - 0.5) * 150}px`,
  ty: `${(seededRandom(i * 5 + 105) - 0.5) * 150}px`,
}));

/**
 * Pantalla de carga con animación de progreso, logo y partículas.
 * Se muestra al inicio y desaparece una vez completado el progreso.
 */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress((prev) => {
        // Incrementos variables para sensación natural
        const increment = seededRandom(step * 31 + 777) * 15 + 5;
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 400);
          setTimeout(() => setIsHidden(true), 1200);
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`${styles.loadingScreen} ${isComplete ? styles.complete : ""}`}
    >
      {/* Partículas animadas — valores deterministas */}
      <div className={styles.particleField}>
        {LOADING_PARTICLES.map((p, i) => (
          <div
            key={i}
            className={styles.particle}
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

      {/* Efectos de fondo */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <div className={styles.logoRing}>
            <div className={styles.logoRingInner} />
          </div>
          <span className={styles.logoIcon}>✦</span>
        </div>

        <h1 className={styles.logoText}>{TEAM_NAME}</h1>
        <p className={styles.tagline}>Creando experiencias digitales</p>

        {/* Barra de progreso */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
            <div
              className={styles.progressGlow}
              style={{ left: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
