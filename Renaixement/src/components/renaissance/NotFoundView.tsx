// NotFoundView.tsx — Vista per a slugs inexistents
"use client";

import { ArrowLeft } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";

export default function NotFoundView({ missatge }: { missatge: string }) {
  const { navega } = useApp();
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="font-serif text-4xl mb-4">Pàgina no trobada</p>
      <p className="text-tinta-2 mb-8">{missatge}</p>
      <button
        onClick={() => navega("")}
        className="inline-flex items-center gap-2 rounded-md bg-accio px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accio-fort)]"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Tornar a l&apos;inici
      </button>
    </div>
  );
}
