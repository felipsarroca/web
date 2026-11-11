"""Treu punts finals sobrers: python punts.py entrada sortida x0,y0,x1,y1[,w] ... (coordenades 1920x1080; w = fons clar)"""
import sys; sys.path.insert(0, '../scripts')
import cv2
from comp import *
im = load_slide(sys.argv[1]); a = np.asarray(im)[..., ::-1].copy(); m = np.zeros(a.shape[:2], np.uint8)
for spec in sys.argv[3:]:
    v = spec.split(','); x0, y0, x1, y1 = map(int, v[:4]); light = len(v) > 4
    g = cv2.cvtColor(a[y0:y1, x0:x1], cv2.COLOR_BGR2GRAY)
    sel = (g > 200) if light else (g < 110)
    m[y0:y1, x0:x1] = cv2.dilate(sel.astype(np.uint8) * 255, np.ones((3, 3), np.uint8))
a = cv2.inpaint(a, m, 5, cv2.INPAINT_TELEA); Image.fromarray(a[..., ::-1].copy()).save(sys.argv[2])
