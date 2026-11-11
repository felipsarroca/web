"""Reescriu un rètol: tapa la zona amb el color del fons i hi escriu el text correcte."""
import sys; sys.path.insert(0, '../scripts')
from comp import *
def retext(im, box, parts, size, color=None, pad=4):
    a = np.asarray(im).astype(np.float32)
    x0, y0, x1, y1 = box
    reg = a[y0:y1, x0:x1]
    flat = reg.reshape(-1, 3)
    bg = np.median(flat[flat.sum(1) > np.percentile(flat.sum(1), 40)], axis=0)
    ink = flat[np.argsort(flat.sum(1))[:150]].mean(0) if color is None else np.array(color)
    alpha = np.ones(reg.shape[:2], np.float32); f = 6
    for i in range(f):
        alpha[i, :] *= i / f; alpha[-1 - i, :] *= i / f; alpha[:, i] *= i / f; alpha[:, -1 - i] *= i / f
    rng = np.random.default_rng(0)
    fill = np.ones_like(reg) * bg + rng.normal(0, 2.5, reg.shape)
    a[y0:y1, x0:x1] = reg * (1 - alpha[..., None]) + fill * alpha[..., None]
    out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(out)
    fonts = [font(size, bold=True, italic=it) for _, it in parts]
    w = sum(d.textlength(t, font=fn) for (t, _), fn in zip(parts, fonts))
    x = (x0 + x1) / 2 - w / 2; y = (y0 + y1) / 2
    for (t, _), fn in zip(parts, fonts):
        d.text((x, y), t, font=fn, fill=tuple(int(c) for c in ink), anchor="lm"); x += d.textlength(t, font=fn)
    return out
