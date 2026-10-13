import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const WEB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Renaixement · Referència artística en català",
  url: BASE_URL,
  inLanguage: "ca",
  description:
    "Web de referència en català sobre el Renaixement: obres amb visor de detall, artistes, conceptes tècnics, escoles arquitectòniques i cronologia.",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Renaixement · Pintura, escultura i arquitectura amb visor de detall",
    template: "%s",
  },
  description:
    "Web de referència en català sobre el Renaixement: obres amb visor de detall (Deep Zoom), fitxes d'artista, conceptes tècnics (Quattrocento, Cinquecento, perspectiva lineal i aèria), escoles arquitectòniques i cronologia interactiva.",
  keywords: [
    "Renaixement",
    "Quattrocento",
    "Cinquecento",
    "perspectiva lineal",
    "Miquel Àngel",
    "Donatello",
    "Rafael",
    "El Greco",
    "Plateresca",
    "Història de l'Art",
    "Batxillerat",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Renaixement · Referència artística en català",
    description:
      "Explora el Renaixement amb visor de detall: obres, artistes, conceptes i cronologia interactiva.",
    type: "website",
    locale: "ca_ES",
    url: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_JSONLD) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
