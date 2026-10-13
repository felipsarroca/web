/** Prefix del desplegament; buit durant el desenvolupament local. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function camiPublic(cami: string): string {
  return BASE_PATH + cami;
}
export function rutaPublica(cami: string): string {
  return camiPublic(cami.endsWith("/") ? cami : cami + "/");
}
export function sensePrefix(cami: string): string {
  return BASE_PATH && (cami === BASE_PATH || cami.startsWith(BASE_PATH + "/"))
    ? cami.slice(BASE_PATH.length) || "/" : cami;
}
