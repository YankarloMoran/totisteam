"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { PROJECTS } from "@/lib/constants";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollAnimations";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import styles from "./Projects.module.css";

/**
 * Tarjeta de proyecto individual.
 * Toda la tarjeta es clickeable y lleva al URL del proyecto.
 * El video se reproduce al pasar el cursor por encima.
 */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const hasVideo = "video" in project && project.video;

  // Carga perezosa del video cuando es visible en el viewport
  useEffect(() => {
    if (!hasVideo || !videoBoxRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(videoBoxRef.current);
    return () => observer.disconnect();
  }, [hasVideo]);

  const handleVideoEnter = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignorar errores de reproducción automática
      });
    }
  }, []);

  const handleVideoLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardLink}
    >
      <div
        className={`glass-card ${styles.card}`}
        style={
          {
            "--project-color": project.color,
          } as React.CSSProperties
        }
      >
        {/* Número de proyecto */}
        <span className={styles.projectNumber}>
          #{String(index + 1).padStart(2, "0")}
        </span>

        {/* Barra de acento de color */}
        <div
          className={styles.accentBar}
          style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }}
        />

        {/* Vista previa de video O Emoji de respaldo */}
        {hasVideo ? (
          <div
            ref={videoBoxRef}
            className={styles.videoBox}
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
          >
            {/* Marcador de posición con brillo */}
            {!isVideoLoaded && (
              <div className={styles.videoShimmer}>
                <div className={styles.shimmerWave} />
              </div>
            )}

            {/* Video con carga perezosa */}
            {isVideoVisible && (
              <video
                ref={videoRef}
                src={project.video}
                preload="metadata"
                muted
                loop
                playsInline
                className={styles.video}
                onLoadedData={() => setIsVideoLoaded(true)}
              />
            )}

            {/* Capa superpuesta del ícono de reproducción */}
            <div className={styles.playOverlay}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: project.color }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Resplandor del borde */}
            <div
              className={styles.videoGlow}
              style={{
                boxShadow: `inset 0 0 0 1px ${project.color}30, 0 0 20px ${project.color}10`,
              }}
            />
          </div>
        ) : (
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>{project.icon}</span>
            <div
              className={styles.iconGlow}
              style={{
                background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
              }}
            />
          </div>
        )}

        {/* Contenido */}
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <span
              className={styles.projectSubtitle}
              style={{ color: project.color }}
            >
              {project.subtitle}
            </span>
            <h3 className={styles.projectTitle}>{project.title}</h3>
          </div>

          <p className={styles.description}>{project.description}</p>

          {/* Etiquetas */}
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={styles.tag}
                style={{
                  color: project.color,
                  background: `${project.color}12`,
                  borderColor: `${project.color}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Llamado a la acción visual */}
          <div
            className={styles.projectLink}
            style={{ color: project.color }}
          >
            <span>Visitar Proyecto</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Degradado al pasar el cursor */}
        <div
          className={styles.hoverGradient}
          style={{
            background: `radial-gradient(circle at bottom right, ${project.color}08 0%, transparent 60%)`,
          }}
        />
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);
  useStaggerReveal(gridRef, `.${styles.cardLink}`, 0.15);
  useMagneticHover(gridRef, {
    maxRotation: 5,
    scale: 1.01,
    selector: `.${styles.cardLink}`,
  });

  return (
    <section
      ref={sectionRef}
      className={`section ${styles.projects}`}
      id="projects"
    >
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-subtitle">Nuestros Proyectos</span>
          <h2>
            Lo que hemos{" "}
            <span className="gradient-text">construido</span>
          </h2>
          <div className="section-divider" />
          <p>
            Cada proyecto representa nuestra pasión por resolver problemas
            reales con tecnología de vanguardia.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
