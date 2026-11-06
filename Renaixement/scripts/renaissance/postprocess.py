#!/usr/bin/env python3
# postprocess.py — Pedaços de compatibilitat WPS/Office (toc.md § Page Number API):
#   1. Elimina <w:pgNumType/> buits (confonen WPS a la secció de portada).
#   2. Pedaça els camps PAGE dels folres amb el commutador de format explícit:
#      secció 2 (índex)  -> PAGE \* ROMAN \* MERGEFORMAT
#      secció 3 (cos)    -> PAGE \* arabic \* MERGEFORMAT
import re
import shutil
import sys
import zipfile

DOCX = sys.argv[1] if len(sys.argv) > 1 else "/home/z/my-project/download/Programacio_web_Renaixement.docx"


def main() -> int:
    with zipfile.ZipFile(DOCX, "r") as z:
        names = z.namelist()
        data = {n: z.read(n) for n in names}

    doc_xml = data["word/document.xml"].decode("utf-8")

    # 1) Treu pgNumType buits (sense atributs)
    before = doc_xml.count("<w:pgNumType/>")
    doc_xml = doc_xml.replace("<w:pgNumType/>", "")
    print(f"pgNumType buits eliminats: {before}")

    # 1b) Dins del sdt del TOC, el docx-js + script deixa una PRIMERA entrada amb
    #     un PAGEREF buit (es veu sense número i duplica l'entrada 1). L'eliminem:
    #     queda [begin][instr TOC][separate] + les 54 entrades planes + [end].
    i_sep = doc_xml.find('<w:fldChar w:fldCharType="separate"/>')
    if i_sep != -1:
        i_h = doc_xml.find("<w:hyperlink", i_sep)
        if i_h != -1 and i_h - i_sep < 120:
            i_h_end = doc_xml.find("</w:hyperlink>", i_h)
            frag = doc_xml[i_h:i_h_end]
            if "PAGEREF" in frag:
                doc_xml = doc_xml[:i_h] + doc_xml[i_h_end + len("</w:hyperlink>"):]
                print("Entrada de TOC duplicada (PAGEREF buit) eliminada")
            else:
                print("Avís: el primer hyperlink post-separate no conté PAGEREF; no es toca")

    # 2) Mapa sectPr (en ordre de document) -> rIds de folre
    sect_prs = re.findall(r"<w:sectPr[\s\S]*?</w:sectPr>", doc_xml)
    print(f"Seccions detectades: {len(sect_prs)}")
    footer_rids = []  # [(index_secció, rId)]
    for i, sp in enumerate(sect_prs):
        m = re.search(r'<w:footerReference[^>]*r:id="([^"]+)"', sp)
        footer_rids.append((i, m.group(1) if m else None))
        print(f"  secció {i + 1}: footerReference={'-' if not m else m.group(1)}")

    # Rels: rId -> fitxer de folre
    rels_xml = data["word/_rels/document.xml.rels"].decode("utf-8")
    rid_to_target = dict(re.findall(r'<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"', rels_xml))

    # Assignació per ordre: darrera secció amb folre = cos (arabic); l'anterior = índex (ROMAN)
    sections_with_footer = [i for i, rid in footer_rids if rid]
    if len(sections_with_footer) != 2:
        print(f"AVÍS: s'esperaven 2 seccions amb folre, n'hi ha {len(sections_with_footer)}")
    formats = {}
    if len(sections_with_footer) >= 1:
        formats[sections_with_footer[-1]] = "arabic"      # cos
    if len(sections_with_footer) >= 2:
        formats[sections_with_footer[-2]] = "ROMAN"       # índex

    for i, rid in footer_rids:
        if not rid or i not in formats:
            continue
        target = rid_to_target.get(rid)
        if not target:
            continue
        fname = "word/" + target.lstrip("/")
        if fname not in data:
            print(f"AVÍS: no trobat {fname}")
            continue
        fxml = data[fname].decode("utf-8")
        fmt = formats[i]
        fxml_new, n = re.subn(
            r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
            r"\g<1>PAGE \\* " + fmt + r" \\* MERGEFORMAT\g<2>",
            fxml,
        )
        data[fname] = fxml_new.encode("utf-8")
        print(f"  folre de la secció {i + 1} ({fname}): {n} camps PAGE -> \\* {fmt}")

    data["word/document.xml"] = doc_xml.encode("utf-8")

    tmp = DOCX + ".tmp"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for n in names:
            z.writestr(n, data[n])
    shutil.move(tmp, DOCX)
    print("Postprocessat OK:", DOCX)
    return 0


if __name__ == "__main__":
    sys.exit(main())
