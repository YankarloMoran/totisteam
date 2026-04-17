"use client";

import { useRef, useEffect } from "react";
import { NAV_LINKS, TEAM_NAME } from "@/lib/constants";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add(styles.scrolled);
        } else {
          navRef.current.classList.remove(styles.scrolled);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav ref={navRef} className={styles.navbar} id="navbar">
      <div className={styles.container}>
        <a href="#hero" className={styles.logo} onClick={(e) => handleClick(e, "#hero")}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>{TEAM_NAME}</span>
        </a>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navLink}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
