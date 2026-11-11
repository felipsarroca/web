"""Correccions de text a gen/8-volta-mon.png (a partir de l'original desat a obres/)."""
from PIL import Image; import numpy as np
a = np.array(Image.open('obres/_8-volta-mon-original.png').convert('RGB'))
b = a.copy()
# «Moliques» -> «Moluques»: la i (1504-1513) es substitueix per la u (1530-1546); «ques» es desplaça 7 px
y0, y1 = 655, 699
b[y0:y1, 1521:1583] = a[y0:y1, 1514:1576]
b[y0:y1, 1505:1521] = a[y0:y1, 1531:1547]
b[y0:y1, 1504] = a[y0:y1, 1514]
# «Saragosa» -> «Saragossa»: es duplica la s (1524-1544); la línia es manté centrada (-10 / +10 px)
y0, y1 = 546, 589
b[y0:y1, 1328:1534] = a[y0:y1, 1338:1544]
b[y0:y1, 1534:1554] = a[y0:y1, 1524:1544]
b[y0:y1, 1554:1596] = a[y0:y1, 1544:1586]
# la coma de «1529,» penja dins la franja: es deixa al seu lloc original
b[546:555, 1425:1460] = a[546:555, 1425:1460]
Image.fromarray(b).save('gen/8-volta-mon.png')
c = Image.fromarray(b).crop((1300, 530, 1620, 705)); c.resize((c.width * 3, c.height * 3)).save('obres/_c8.png')
