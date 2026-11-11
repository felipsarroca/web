"""Utilitats de composició: detecció del marc magenta i incrustació d'obres reals."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

W, H = 1920, 1080
NAVY = (22, 38, 84)
CREAM = (246, 236, 212)
FONTS = r"C:\Windows\Fonts"


def font(size, bold=True, italic=False):
    name = {(True, False): "palab.ttf", (False, False): "pala.ttf",
            (True, True): "palabi.ttf", (False, True): "palai.ttf"}[(bold, italic)]
    return ImageFont.truetype(f"{FONTS}\\{name}", size)


def load_slide(path):
    im = Image.open(path).convert("RGB")
    if im.size != (W, H):
        im = im.resize((W, H), Image.LANCZOS)
    return im


def magenta_mask(im, tol=60, largest=True):
    import cv2
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = (r > 200) & (b > 200) & (g < 90) & (np.abs(r - b) < tol)
    if not largest or not m.any():
        return m
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8), 8)
    k = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    # tapa forats interns (antialiàsing) omplint la caixa del component
    comp = lab == k
    return comp


def bbox(mask):
    ys, xs = np.where(mask)
    if len(xs) == 0:
        return None
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def paste_into_mask(im, art, crop=None, grow=3, focus=(0.5, 0.5)):
    """Omple la zona magenta amb l'obra (cover) i retorna la caixa."""
    m = magenta_mask(im)
    box = bbox(m)
    assert box, "No hi ha zona magenta"
    x0, y0, x1, y1 = box
    if crop:
        art = art.crop(crop)
    bw, bh = x1 - x0, y1 - y0
    fitted = ImageOps.fit(art, (bw, bh), Image.LANCZOS, centering=focus)
    mask_img = Image.fromarray((m * 255).astype("uint8"))
    # Engreixa la màscara per tapar les vores antialiased del magenta
    mask_img = mask_img.filter(ImageFilter.MaxFilter(grow * 2 + 1))
    sub = mask_img.crop(box)
    im.paste(fitted, (x0, y0), sub)
    return box, m.sum() / ((bw) * (bh))


def text_box(draw, xy, text, fnt, fill=NAVY, bg=CREAM, pad=(14, 8), outline=(150, 120, 70), radius=10, anchor="la"):
    x, y = xy
    l, t, r, b = draw.multiline_textbbox((x, y), text, font=fnt, anchor=anchor, align="center", spacing=4)
    draw.rounded_rectangle((l - pad[0], t - pad[1], r + pad[0], b + pad[1]), radius=radius,
                           fill=bg, outline=outline, width=2)
    draw.multiline_text((x, y), text, font=fnt, fill=fill, anchor=anchor, align="center", spacing=4)
    return (l - pad[0], t - pad[1], r + pad[0], b + pad[1])


def leftover_magenta(im):
    return int(magenta_mask(im, largest=False).sum())


def paste_cover(im, art, focus=(0.5, 0.5), grow=6):
    """Com paste_into_mask però retorna la funció que converteix coordenades de l'obra en coordenades de la diapositiva."""
    m = magenta_mask(im)
    x0, y0, x1, y1 = bbox(m)
    x0, y0, x1, y1 = x0 - grow, y0 - grow, x1 + grow, y1 + grow
    bw, bh = x1 - x0, y1 - y0
    aw, ah = art.size
    s = max(bw / aw, bh / ah)
    nw, nh = round(aw * s), round(ah * s)
    ox = (nw - bw) * focus[0]
    oy = (nh - bh) * focus[1]
    big = art.resize((nw, nh), Image.LANCZOS).crop((round(ox), round(oy), round(ox) + bw, round(oy) + bh))
    # màscara tolerant: inclou píxels barrejats amb magenta a la vora
    a = np.asarray(im).astype(int)
    loose = ((a[..., 0] - a[..., 1]) > 60) & ((a[..., 2] - a[..., 1]) > 50)
    region = np.zeros_like(loose); region[max(0,y0-12):y1+12, max(0,x0-12):x1+12] = True
    full = (m | (loose & region)).astype("uint8") * 255
    mask_img = Image.fromarray(full).filter(ImageFilter.MaxFilter(5))
    im.paste(big, (x0, y0), mask_img.crop((x0, y0, x1, y1)))
    # restes fora de la caixa: es fonen amb el color veí (marc daurat)
    a = np.asarray(im).astype(int)
    # només fora de la zona enganxada: els porpres propis de l'obra o del mapa no són restes
    pasted = np.zeros_like(region); pasted[y0:y1, x0:x1] = np.asarray(mask_img.crop((x0, y0, x1, y1))) > 0
    rest = ((a[..., 0] - a[..., 1]) > 60) & ((a[..., 2] - a[..., 1]) > 50) & region & ~pasted
    if rest.any():
        import cv2
        fixed = cv2.inpaint(np.asarray(im)[..., ::-1].copy(), cv2.dilate(rest.astype(np.uint8) * 255, np.ones((3, 3), np.uint8)), 3, cv2.INPAINT_TELEA)
        im.paste(Image.fromarray(fixed[..., ::-1].copy()))
    to_slide = lambda px, py: (x0 + px * s - ox, y0 + py * s - oy)
    return (x0, y0, x1, y1), to_slide


def label(draw, anchor_pt, text_pt, text, fnt, color=NAVY, dot=(196, 92, 52)):
    """Rètol amb línia guia i punt sobre l'element assenyalat."""
    draw.line([text_pt, anchor_pt], fill=(255, 250, 235), width=7)
    draw.line([text_pt, anchor_pt], fill=dot, width=3)
    r = 9
    ax, ay = anchor_pt
    draw.ellipse((ax - r, ay - r, ax + r, ay + r), fill=dot, outline=(255, 250, 235), width=3)
    return text_box(draw, text_pt, text, fnt, fill=color, anchor="mm")


def magenta_regions(im, min_area=20000):
    """Retorna les caixes de totes les zones magenta grans, d'esquerra a dreta."""
    import cv2
    a = np.asarray(im).astype(int)
    m = (a[..., 0] > 200) & (a[..., 2] > 200) & (a[..., 1] < 90)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8), 8)
    boxes = [(st[i, 0], st[i, 1], st[i, 0] + st[i, 2], st[i, 1] + st[i, 3]) for i in range(1, n) if st[i, 4] > min_area]
    return sorted(boxes)


def paste_in_box(im, art, box, focus=(0.5, 0.5), grow=6):
    """Omple amb l'obra la zona magenta dins de la caixa indicada; retorna la caixa i la transformació."""
    import cv2
    x0, y0, x1, y1 = box
    x0, y0, x1, y1 = x0 - grow, y0 - grow, x1 + grow, y1 + grow
    bw, bh = x1 - x0, y1 - y0
    aw, ah = art.size
    s = max(bw / aw, bh / ah)
    nw, nh = round(aw * s), round(ah * s)
    ox, oy = (nw - bw) * focus[0], (nh - bh) * focus[1]
    big = art.convert('RGB').resize((nw, nh), Image.LANCZOS).crop((round(ox), round(oy), round(ox) + bw, round(oy) + bh))
    a = np.asarray(im).astype(int)
    loose = ((a[..., 0] - a[..., 1]) > 60) & ((a[..., 2] - a[..., 1]) > 50)
    reg = np.zeros_like(loose); reg[max(0, y0 - 6):y1 + 6, max(0, x0 - 6):x1 + 6] = True
    mk = Image.fromarray(((loose & reg) * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5))
    im.paste(big, (x0, y0), mk.crop((x0, y0, x1, y1)))
    a = np.asarray(im).astype(int)
    # només fora de la zona enganxada: els porpres propis de l'obra o del mapa no són restes
    pasted = np.zeros_like(reg); pasted[y0:y1, x0:x1] = np.asarray(mk.crop((x0, y0, x1, y1))) > 0
    rest = ((a[..., 0] - a[..., 1]) > 60) & ((a[..., 2] - a[..., 1]) > 50) & reg & ~pasted
    if rest.any():
        fixed = cv2.inpaint(np.asarray(im)[..., ::-1].copy(), cv2.dilate(rest.astype(np.uint8) * 255, np.ones((3, 3), np.uint8)), 3, cv2.INPAINT_TELEA)
        im.paste(Image.fromarray(fixed[..., ::-1].copy()))
    return (x0, y0, x1, y1), (lambda px, py: (x0 + px * s - ox, y0 + py * s - oy))
