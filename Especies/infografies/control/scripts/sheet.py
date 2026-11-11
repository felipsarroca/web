import sys,glob,re
from PIL import Image
d=sys.argv[1]; fs=sorted(glob.glob(d+'/s*.png'),key=lambda f:int(re.findall(r'(\d+)\.png',f)[0]))
c=Image.new('RGB',(4*480,((len(fs)+3)//4)*270),'white')
for i,f in enumerate(fs): c.paste(Image.open(f).resize((480,270)),((i%4)*480,(i//4)*270))
c.save(d+'/full.png'); print(len(fs))
