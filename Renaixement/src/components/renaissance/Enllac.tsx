// Enllac.tsx — Enllaç HTML real (<a href>) amb navegació SPA interceptada.
// L'auditoria de coherència demana rutes reals i enllaços d'HTML també a les
// targetes i la navegació, no només botons programàtics: historial, compartir
// URL, obrir en pestanya nova i clic del botó del mig han de funcionar.
"use client";

import { type ReactNode, type MouseEvent } from "react";
import { rutaPublica } from "@/lib/renaissance/camins";
import { useApp, destiARuta } from "@/lib/renaissance/store";

interface Props {
  desti: string;                 // desti intern ("obra/x", "coleccions?disciplina=escultura", "")
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaCurrent?: "page" | undefined;
  title?: string;
  onNavegat?: () => void;
}

export default function Enllac({ desti, className, children, ariaLabel, ariaCurrent, title, onNavegat }: Props) {
  const navega = useApp((s) => s.navega);
  const { cami, cerca } = destiARuta(desti);
  const href = rutaPublica(cami) + cerca;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Modificadors i clics secundaris: comportament de navegador estàndard
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navega(desti);
    onNavegat?.();
  };

  return (
    <a href={href} onClick={onClick} className={className} aria-label={ariaLabel} aria-current={ariaCurrent} title={title}>
      {children}
    </a>
  );
}
