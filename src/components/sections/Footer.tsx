"use client";

import { useRef, useEffect } from "react";
import { TEAM_NAME, TEAM_MEMBERS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollAnimations";
import styles from "./Footer.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Animación fluida para los miembros del equipo (stagger)
      gsap.fromTo(
        `.${styles.memberLink}`,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: `.${styles.teamLinks}`,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={sectionRef} className={styles.footer} id="contact">
      {/* Efecto de aurora boreal — mejorado */}
      <div className={styles.aurora}>
        <div className={styles.auroraLayer1} />
        <div className={styles.auroraLayer2} />
        <div className={styles.auroraLayer3} />
      </div>

      <div className={`container ${styles.content}`}>
        {/* CTA Principal */}
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

          {/* Botón CTA animado */}
          <div className={styles.ctaButtons} data-reveal>
            <a href="mailto:totisteam@gmail.com" className={styles.ctaButton}>
              <span className={styles.ctaButtonGlow} />
              <span className={styles.ctaButtonText}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Enviar Email
              </span>
            </a>
          </div>
        </div>

        {/* Enlaces del equipo */}
        <div className={styles.teamLinks}>
          {TEAM_MEMBERS.map((member) => (
            <a
              key={member.name}
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.memberLink}
            >
              <div className={styles.memberAvatar}>
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={styles.avatarImg}
                  />
                ) : (
                  <span>{member.name.charAt(0)}</span>
                )}
              </div>
              <div className={styles.memberInfo}>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberSocials}>GitHub</span>
              </div>
            </a>
          ))}
        </div>

        {/* Divisor */}
        <div className={styles.divider} data-reveal />

        {/* Barra inferior */}
        <div className={styles.bottom} data-reveal>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>✦</span>
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>{TEAM_NAME}</span>
              <span className={styles.brandTagline}>Innovación Digital</span>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {TEAM_NAME}. Todos los derechos
              reservados.
            </p>
            <div className={styles.legalLinks}>
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
            </div>
          </div>

          <div className={styles.backToTop}>
            <a
              href="#hero"
              className={styles.backToTopBtn}
              onClick={handleBackToTop}
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
