// BeyondItalyView.tsx — Bloc 6: el Renaixement fora d'Itàlia (Flandes, França, Espanya, nord)
"use client";

import { useApp } from "@/lib/renaissance/store";
import { OBRES, obresArtista } from "@/data/obres";
import { artista } from "@/data/artistes";
import WorkCard from "./WorkCard";
import { TextViu } from "./Term";

const TERRITORIS: {
  id: string;
  nom: string;
  ambit: string;
  idea: string;
  text: string;
  artistes: string[];
}[] = [
  {
    id: "flandes",
    nom: "Flandes",
    ambit: "flandes",
    idea:
      "Els primitius flamencs no imiten Roma: pinten el món visible amb precisió òptica possible gràcies a l'oli, amb símbols dissimulats al detall. Mentre Florència construeix l'espai, Flandes inventa el color.",
    text:
      "Jan van Eyck perfecciona l'oli i pinta amb lupa; Van der Weyden converteix el dolor en coreografia; Bosch imagina inferns que cap tradició no explica; Bruegel fa del pagès i del paisatge els protagonistes. La dualitat Itàlia-Flandes és dues maneres coetànies de voler ser fidel al món visible: la racional-geomètrica i l'òptica-empírica.",
    artistes: ["van-eyck", "van-der-weyden", "bosch", "bruegel"],
  },
  {
    id: "franca",
    nom: "França",
    ambit: "franca",
    idea:
      "Història d'adaptació cortesana: el realisme espiritual de Fouquet, el retrat oficial dels Clouet, la importació directa de manera italiana amb l'Escola de Fontainebleau i els castells del Loira.",
    text:
      "Fouquet sintetitza Flandes i Itàlia en una manera francesa (el Díptic de Melun és l'obra més original del segle XV); Clouet defineix el retrat de cort; Francesc I porta Leonardo a Amboise i fa de Chambord i Fontainebleau els documents del Renaixement al servei de la majestat francesa.",
    artistes: ["fouquet", "clouet"],
  },
  {
    id: "espanya",
    nom: "Espanya",
    ambit: "espanya",
    idea:
      "Espanya recorre el camí italià amb accents propis: Berruguete i l'escultura expressiva, Machuca i el classicisme granadí, l'Escorial, i la culminació d'El Greco, que marca la frontera entre el Renaixement i la modernitat.",
    text:
      "Berruguete torna d'Itàlia i fusiona el Manierisme amb la tradició del retaule policromat castellà; Machuca aixeca dins de l'Alhambra el manifest del classicisme pur; Herrera defineix l'austeritat del poder; El Greco —format a Creta i Venècia, madur a Toledo— condensa l'herència manierista en una expressió espiritual únicament personal.",
    artistes: ["berruguete", "machuca", "herrera", "el-greco"],
  },
  {
    id: "nord",
    nom: "El nord alemany",
    ambit: "alemanya",
    idea:
      "El nord hi entra pel gravat de Dürer, primer artista amb fama internacional construïda per la impremta, i pel retrat fisiognòmic d'Holbein, document visual de la cort Tudor.",
    text:
      "Dürer porta la teoria italiana (proporció, perspectiva) al detall germànic i fa del gravat un mitjà de difusió global; els seus autoretrats són els primers manifestos de l'artista com a geni. Holbein el Jove pinta el retrat del nord d'Europa amb precisió de fisiognomista: Els ambaixadors és el document més intel·ligent de la pintura del segle XVI.",
    artistes: ["durer", "holbein"],
  },
];

export default function BeyondItalyView() {
  const { navega } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Fora d&apos;Itàlia</h1>
      <p className="mt-2 text-tinta-2 max-w-2xl text-[15px]">
        Flandes, França, Espanya i el nord alemany: el Renaixement no és només italià.
        Aquest bloc fa visible la lliçó central de l&apos;assignatura —les cultures no
        reben, reinterpreten: cada territori tria què agafa d&apos;Itàlia i què conserva
        de la seva tradició.
      </p>

      <div className="mt-10 space-y-14">
        {TERRITORIS.map((t) => {
          const obres = OBRES.filter((o) => o.ambit === t.ambit);
          const artistes = t.artistes.map((s) => artista(s)).filter(Boolean);
          return (
            <section key={t.id} aria-label={t.nom}>
              <div className="flex items-baseline gap-4 flex-wrap">
                <h2 className="font-serif text-2xl sm:text-3xl text-concepte">{t.nom}</h2>
                <p className="text-[13px] text-tinta-2">
                  {obres.length} obres · {artistes.length} fitxes d&apos;artista
                </p>
              </div>

              <div className="bloc-relevancia rounded-r-lg p-4 mt-4 max-w-3xl">
                <p className="text-[15px] leading-relaxed text-tinta">{t.idea}</p>
              </div>

              <div className="mt-5 max-w-3xl text-[15px] leading-relaxed text-tinta-2">
                <TextViu text={t.text} />
              </div>

              {artistes.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {artistes.map((a) => a && (
                    <button
                      key={a.slug}
                      onClick={() => navega("artista/" + a.slug)}
                      className="rounded-full border border-border bg-superficie px-3.5 py-1.5 text-[13px] hover:border-accio/50 hover:text-accio transition-colors"
                    >
                      {a.nom}{" "}
                      <span className="text-tinta-2">({obresArtista(a.slug).length})</span>
                    </button>
                  ))}
                </div>
              )}

              {obres.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {obres.map((o) => (
                    <WorkCard key={o.slug} obra={o} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
