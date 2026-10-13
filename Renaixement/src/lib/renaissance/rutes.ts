/** Descodifica un segment d'URL sense fallar davant un enllaç mal format. */
export function descodificaSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
