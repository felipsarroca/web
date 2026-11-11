import os, sys
from PIL import Image
from pptx import Presentation
from pptx.util import Emu
D, N = sys.argv[1], sys.argv[2]; src = sys.argv[3:]
paths = []
for i, s in enumerate(src):
    im = Image.open(f'gen/{s}.png').convert('RGB')
    if im.size != (1920, 1080): im = im.resize((1920, 1080), Image.LANCZOS)
    p = os.path.join(D, f"{N} - ({i}).png"); assert not os.path.exists(p), p
    im.save(p, optimize=True); paths.append(p)
pr = Presentation(); pr.slide_width = Emu(12192000); pr.slide_height = Emu(6858000)
for p in paths:
    sl = pr.slides.add_slide(pr.slide_layouts[6]); sl.shapes.add_picture(p, 0, 0, pr.slide_width, pr.slide_height)
out = os.path.join(D, f"{N}.pptx"); assert not os.path.exists(out); pr.save(out)
print(len(paths), out)
