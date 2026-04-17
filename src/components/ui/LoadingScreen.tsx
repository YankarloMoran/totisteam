"use client";

import { useState, useEffect } from "react";
import { TEAM_NAME } from "@/lib/constants";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
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
      {/* Background effects */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <span className={styles.logoIcon}>✦</span>
          <h1 className={styles.logoText}>{TEAM_NAME}</h1>
        </div>

        {/* Progress bar */}
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

        {/* Loading text */}
        <p className={styles.loadingText}>
          Cargando experiencia...
        </p>
      </div>
    </div>
  );
}
