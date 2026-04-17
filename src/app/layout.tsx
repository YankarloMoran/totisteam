import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Totisteam | Portfolio de Proyectos Innovadores",
  description:
    "Somos Totisteam — un equipo de 4 desarrolladores creando experiencias digitales únicas. Conoce nuestros proyectos: Abastto, Kartá Menu y más.",
  keywords: [
    "Totisteam",
    "portfolio",
    "desarrollo web",
    "proyectos",
    "Abastto",
    "Kartá Menu",
  ],
  authors: [
    { name: "Yankarlo Morán" },
    { name: "Milton Mendoza" },
    { name: "Mario De Leon" },
    { name: "Alan Guevara" },
  ],
  openGraph: {
    title: "Totisteam | Portfolio de Proyectos Innovadores",
    description:
      "Somos Totisteam — un equipo de 4 desarrolladores creando experiencias digitales únicas.",
    type: "website",
    locale: "es_LA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
