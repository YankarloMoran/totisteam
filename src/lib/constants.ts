export const TEAM_NAME = "Totisteam";

export const TEAM_MEMBERS = [
  {
    name: "Yankarlo Morán",
    role: "Full Stack Developer",
    avatar: "/images/team/yankarlo.jpg",
    github: "https://github.com/YankarloMoran",
  },
  {
    name: "Milton Mendoza",
    role: "Game Developer",
    avatar: "/images/team/milton.jpg",
    github: "https://github.com/Totis515",
  },
  {
    name: "Mario De Leon",
    role: "Sound Designer & Creative Developer",
    avatar: "/images/team/mario.jpg",
    github: "https://github.com/mariorenedeleonramirez-cyber",
  },
  {
    name: "Alan Guevara",
    role: "Game Developer",
    avatar: "/images/team/alan.jpg",
    github: "https://github.com",
  },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  color: string;
  tags: string[];
  icon: string;
  video?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "abastto",
    title: "Abastto",
    subtitle: "B2B Marketplace",
    description:
      "Plataforma de adquisiciones B2B que conecta compradores con proveedores verificados. Cotizaciones en tiempo real, comparación de ofertas y trazabilidad completa.",
    url: "https://abastto.vercel.app/",
    color: "#00f0ff",
    tags: ["Next.js", "Supabase", "TypeScript", "Vercel AI"],
    icon: "🏢",
    video: "/videos/abastto.mp4",
  },
  {
    id: "karta",
    title: "Kartá Menu",
    subtitle: "Menú Digital QR",
    description:
      "Plataforma de menús digitales con código QR para restaurantes y cafeterías. Diseño personalizable, actualización en tiempo real y analíticas de visualización.",
    url: "https://karta-menu.vercel.app/",
    color: "#f97316",
    tags: ["Next.js", "Supabase", "QR Generation", "PWA"],
    icon: "🍽️",
    video: "/videos/karta.mp4",
  },
  {
    id: "nightfall",
    title: "Nightfall Survival",
    subtitle: "Shooter de Supervivencia",
    description:
      "Trepidante shooter de supervivencia basado en oleadas. Resiste ante zombies mutados, infectados colosales y mecas militarizados a través de 3 biomas. Arsenal progresivo desde pistolas hasta lanzacohetes, miniguns y jetpacks. Multijugador PC y móvil.",
    url: "https://nightfall-survival.vercel.app/",
    color: "#8b5cf6",
    tags: ["Multiplayer", "Survival", "Cross-Platform", "WebGL"],
    icon: "🧟",
    video: "/videos/nightfall.mp4",
  },
  {
    id: "jjk-clash",
    title: "Ultimate JJK CLASH",
    subtitle: "Cursed Expansion",
    description:
      "Juego de lucha 2D definitivo basado en el universo de Jujutsu Kaisen. Domina la energía maldita en duelos rítmicos estilo 'tug-of-war', despliega expansiones de dominio y sobrevive a enfrentamientos de alta intensidad.",
    url: "https://jjk-cursed-clash.vercel.app/",
    color: "#ec4899",
    tags: ["Fighter", "Rhythm Mechanics", "WebGL 2.0", "Phaser 3"],
    icon: "🔥",
    video: "/videos/jjk-clash.mp4",
  },
  {
    id: "proserco",
    title: "PROSERCO",
    subtitle: "Soluciones Contables Integrales",
    description:
      "Sitio web corporativo premium para una firma de contadores públicos y consultores financieros. Incluye simuladores fiscales interactivos (ISR, IVA, IGSS, Salud Financiera) y portal de clientes.",
    url: "https://proserco.vercel.app/",
    color: "#d4af37",
    tags: ["React", "Tailwind CSS", "Vite", "Simulador Fiscal"],
    icon: "💼",
    image: "/images/projects/proserco.jpg",
  },
  {
    id: "flower-studio",
    title: "Flower Studio",
    subtitle: "Cozy Lofi Art Generator",
    description:
      "Generador interactivo de arte botánico en HTML5 Canvas mediante algoritmos de gráficos de tortuga. Incluye reproductor de música lofi, creador de dedicatorias con IA y exportador de código Python.",
    url: "https://flower-studio-chi.vercel.app/",
    color: "#f472b6",
    tags: ["HTML5 Canvas", "Lofi Player", "AI Poetry", "Python Turtle"],
    icon: "🌸",
    image: "/images/projects/flower-studio.jpg",
  },
  {
    id: "lundertale",
    title: "LUNDERTALE",
    subtitle: "Undertale Fan Game",
    description:
      "Juego fan de Undertale desarrollado con un motor de combate personalizado en HTML5 Canvas. Enfréntate a batallas contra jefes icónicos de la cultura pop como Godzilla, Darth Vader, Sachiel y Bill Cipher, esquivando complejos patrones de proyectiles al ritmo de la música.",
    url: "https://lundertale.vercel.app/",
    color: "#ef4444",
    tags: ["JavaScript", "HTML5 Canvas", "Undertale Fangame", "Boss Fight"],
    icon: "❤️",
    image: "/images/projects/lundertale.jpg",
  },
];

export const TECH_STACK = [
  { name: "Next.js", color: "#ffffff" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Three.js", color: "#049ef4" },
  { name: "Node.js", color: "#68a063" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "GSAP", color: "#88ce02" },
  { name: "Figma", color: "#f24e1e" },
  { name: "Git", color: "#f05032" },
  { name: "Tailwind", color: "#06b6d4" },
];

export const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Equipo", href: "#team" },
  { label: "Proyectos", href: "#projects" },
  { label: "Tecnologías", href: "#tech" },
  { label: "Contacto", href: "#contact" },
];
