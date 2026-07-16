import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astúries i Navarra en família",
  description: "Guia familiar d’activitats a Astúries i Navarra.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/web/Asturies-Navarra/favicon.svg",
    shortcut: "/web/Asturies-Navarra/favicon.svg",
    apple: "/web/Asturies-Navarra/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
