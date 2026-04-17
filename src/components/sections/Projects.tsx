"use client";

import { useRef } from "react";
import { PROJECTS } from "@/lib/constants";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollAnimations";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import styles from "./Projects.module.css";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);
  useStaggerReveal(gridRef, `.${styles.card}`, 0.15);
  useMagneticHover(gridRef, {
    maxRotation: 5,
    scale: 1.01,
    selector: `.${styles.card}`,
  });

  return (
    <section ref={sectionRef} className={`section ${styles.projects}`} id="projects">
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
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`glass-card ${styles.card}`}
              style={
                {
                  "--project-color": project.color,
                } as React.CSSProperties
              }
            >
              {/* Color accent bar */}
              <div
                className={styles.accentBar}
                style={{ background: project.color }}
              />

              {/* Project icon */}
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{project.icon}</span>
                <div
                  className={styles.iconGlow}
                  style={{
                    background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
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

                {/* Tags */}
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

                {/* CTA */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
                </a>
              </div>

              {/* Hover gradient */}
              <div
                className={styles.hoverGradient}
                style={{
                  background: `radial-gradient(circle at bottom right, ${project.color}08 0%, transparent 60%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
