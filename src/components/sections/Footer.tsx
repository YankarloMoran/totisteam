"use client";

import { useRef } from "react";
import { TEAM_NAME, TEAM_MEMBERS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollAnimations";
import styles from "./Footer.module.css";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <footer ref={sectionRef} className={styles.footer} id="contact">
      {/* Aurora Borealis effect */}
      <div className={styles.aurora}>
        <div className={styles.auroraLayer1} />
        <div className={styles.auroraLayer2} />
        <div className={styles.auroraLayer3} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* Main CTA */}
        <div className={styles.ctaBlock} data-reveal>
          <span className="section-subtitle">¿Listo para colaborar?</span>
          <h2>
            Hagamos algo{" "}
            <span className="gradient-text-accent">increíble</span> juntos
          </h2>
          <p className={styles.ctaText}>
            Estamos siempre abiertos a nuevas ideas, colaboraciones y
            oportunidades. ¡Contáctanos!
          </p>
        </div>

        {/* Team links */}
        <div className={styles.teamLinks} data-reveal>
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className={styles.memberLink}>
              <div className={styles.memberAvatar}>
                <span>{member.name.charAt(0)}</span>
              </div>
              <div className={styles.memberInfo}>
                <span className={styles.memberName}>{member.name}</span>
                <div className={styles.memberSocials}>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={`GitHub de ${member.name}`}
                  >
                    GitHub
                  </a>
                  <span className={styles.dot}>·</span>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} data-reveal />

        {/* Bottom bar */}
        <div className={styles.bottom} data-reveal>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>✦</span>
            <span className={styles.brandName}>{TEAM_NAME}</span>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {TEAM_NAME}. Todos los derechos
            reservados.
          </p>
          <div className={styles.backToTop}>
            <a
              href="#hero"
              className={styles.backToTopBtn}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
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
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              <span>Volver arriba</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
