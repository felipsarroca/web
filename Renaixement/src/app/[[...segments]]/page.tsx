// Genera totes les rutes i les seves metadades durant la compilació.
// Els filtres i la navegació interactiva es resolen al navegador.
import type { Metadata } from "next";
import RenaissanceApp from "@/components/renaissance/RenaissanceApp";
import { OBRES, obra } from "@/data/obres";
import { ARTISTES, artista } from "@/data/artistes";
import { CONCEPTES, concepte } from "@/data/conceptes";
import { urlImatge } from "@/data/imatges";
import { descodificaSegment } from "@/lib/renaissance/rutes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Params = Promise<{ segments?: string[] }>;
const ESTATIQUES: Record<string, string> = {
  obres: "coleccions", cronologia: "cronologia", artistes: "artistes",
  conceptes: "conceptes", arquitectura: "arquitectura", "fora-ditalia": "fora",
  comparacions: "comparacions", glossari: "glossari", sobre: "sobre",
};
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { segments: [] },
    ...Object.keys(ESTATIQUES).map(cami => ({ segments: [cami] })),
    ...OBRES.map(o => ({ segments: ["obres", o.slug] })),
    ...ARTISTES.map(a => ({ segments: ["artistes", a.slug] })),
    ...CONCEPTES.map(c => ({ segments: ["conceptes", c.slug] })),
  ];
}
async function llegeixRuta(params: Params) {
  const segments = (await params).segments ?? [];
  const [capsa, valorSlug] = segments;
  const slug = valorSlug ? descodificaSegment(valorSlug) : undefined;
  const ruta = slug ? ({ obres: "obra", artistes: "artista", conceptes: "concepte" }[capsa]) : ESTATIQUES[capsa];
  const canonical = BASE_URL.replace(/\/$/, "") + "/" + segments.map(encodeURIComponent).join("/") + (segments.length ? "/" : "");
  return { ruta, slug, canonical };
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { ruta, slug, canonical } = await llegeixRuta(params);

  let titol: string | undefined;
  let descripcio: string | undefined;
  let imatge: string | undefined;

  if (ruta === "obra" && slug && obra(slug)) {
    const o = obra(slug)!;
    titol = `${o.titol} — ${o.autorNom}`;
    descripcio = o.relevancia.slice(0, 157).trim() + "…";
    const local = urlImatge(o.slug, 1200);
    if (local) imatge = local;
  } else if (ruta === "artista" && slug && artista(slug)) {
    const a = artista(slug)!;
    titol = `${a.nom} — Artista del Renaixement`;
    descripcio = a.biografia.replace(/\n/g, " ").slice(0, 157).trim() + "…";
  } else if (ruta === "concepte" && slug && concepte(slug)) {
    const c = concepte(slug)!;
    titol = `${c.nom} — Concepte del Renaixement`;
    descripcio = c.definicio;
  } else if (ruta) {
    const NOMS: Record<string, string> = {
      coleccions: "Col·leccions",
      cronologia: "Cronologia",
      artistes: "Artistes",
      conceptes: "Conceptes",
      arquitectura: "Arquitectura",
      fora: "Fora d'Itàlia",
      comparacions: "Comparacions d'obres",
      glossari: "Glossari",
      sobre: "Sobre",
    };
    titol = NOMS[ruta];
  }

  if (titol) {
    return {
      title: `${titol} · Renaixement`,
      description: descripcio,
      alternates: { canonical },
      openGraph: {
        title: `${titol} · Renaixement`,
        description: descripcio,
        images: imatge ? [{ url: new URL(imatge, BASE_URL).toString() }] : undefined,
        type: "article",
      },
    };
  }

  return { alternates: { canonical } };
}

export default async function Page({ params }: { params: Params }) {
  const { ruta, slug } = await llegeixRuta(params);

  // JSON-LD contextual (audit P1 SEO)
  let jsonLd: object | null = null;
  if (ruta === "obra" && slug && obra(slug)) {
    const o = obra(slug)!;
    const im = urlImatge(o.slug, 1200);
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "VisualArtwork",
      name: o.titol,
      alternateName: o.titolOriginal,
      creator: { "@type": "Person", name: o.autorNom },
      dateCreated: o.data,
      artMedium: o.tecnica,
      artworkSurface: o.dimensions,
      locationCreated: `${o.ubicacio.ciutat}, ${o.ubicacio.pais}`,
      description: o.relevancia,
      image: im ? new URL(im, BASE_URL).toString() : undefined,
      isAccessibleForFree: true,
      inLanguage: "ca",
    };
  } else if (ruta === "artista" && slug && artista(slug)) {
    const a = artista(slug)!;
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: a.nom,
      alternateName: a.nomOriginal,
      birthDate: a.dates.split("-")[0],
      deathDate: a.dates.split("-")[1],
      description: a.biografia.replace(/\n/g, " ").slice(0, 300),
      jobTitle: a.ambits.join(", "),
      inLanguage: "ca",
    };
  } else if (ruta === "concepte" && slug && concepte(slug)) {
    const c = concepte(slug)!;
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: c.nom,
      description: c.definicio,
      inDefinedTermSet: { "@type": "DefinedTermSet", name: "Conceptes del Renaixement" },
      inLanguage: "ca",
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <RenaissanceApp />
    </>
  );
}
