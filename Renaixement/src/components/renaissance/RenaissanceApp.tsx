// RenaissanceApp.tsx — Shell de l'aplicació: nav + vista per ruta real + visor + peu
"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/renaissance/store";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ViewerModal from "./ViewerModal";
import HomeView from "./HomeView";
import CollectionsView from "./CollectionsView";
import WorkDetailView from "./WorkDetailView";
import TimelineView from "./TimelineView";
import ArtistsView from "./ArtistsView";
import ArtistDetailView from "./ArtistDetailView";
import ConceptsView from "./ConceptsView";
import ConceptDetailView from "./ConceptDetailView";
import ArchitectureView from "./ArchitectureView";
import BeyondItalyView from "./BeyondItalyView";
import ComparacionsView from "./ComparacionsView";
import GlossaryView from "./GlossaryView";
import AboutView from "./AboutView";
import NotFoundView from "./NotFoundView";

export default function RenaissanceApp() {
  const { vista, sincronitzaRuta } = useApp();

  // Sincronitza amb la ruta inicial (migració de hash antic inclosa) i amb
  // endarrere/endavant del navegador (audit P0-3)
  useEffect(() => {
    sincronitzaRuta();
    window.addEventListener("popstate", sincronitzaRuta);
    return () => window.removeEventListener("popstate", sincronitzaRuta);
  }, [sincronitzaRuta]);

  // Cada canvi de vista puja al començament de la pàgina
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [vista]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#contingut"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:rounded-md focus:bg-accio focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Salta al contingut
      </a>
      <NavBar />
      <main id="contingut" className="flex-1">
        <VistaActual vista={vista} />
      </main>
      <Footer />
      <ViewerModal />
    </div>
  );
}

function VistaActual({ vista }: { vista: ReturnType<typeof useApp.getState>["vista"] }) {
  switch (vista.nom) {
    case "home": return <HomeView />;
    case "coleccions": return <CollectionsView />;
    case "obra":
      return <WorkDetailView key={vista.slug} slug={vista.slug} />;
    case "cronologia": return <TimelineView />;
    case "artistes": return <ArtistsView />;
    case "artista":
      return <ArtistDetailView key={vista.slug} slug={vista.slug} />;
    case "conceptes": return <ConceptsView />;
    case "concepte":
      return <ConceptDetailView key={vista.slug} slug={vista.slug} />;
    case "arquitectura": return <ArchitectureView />;
    case "fora": return <BeyondItalyView />;
    case "comparacions": return <ComparacionsView />;
    case "glossari": return <GlossaryView />;
    case "sobre": return <AboutView />;
    default: return <NotFoundView missatge="Aquesta secció no existeix." />;
  }
}
