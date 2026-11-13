# SPDX-License-Identifier: AGPL-3.0-or-later
"""Browser QA: run a local HTTP server on port 4173, then this script."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[1]
CAPS=['camp','vapor','textil','fabrica','metalls','tren','vaixell','capital']
errors=[]
count=0
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True)
 for width,height,dpr in [(1920,1080,1),(1366,768,1),(1093,614,1.25),(911,512,1.5),(390,844,1)]:
  page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=dpr)
  page.on('pageerror',lambda e:errors.append(str(e)))
  for cap in CAPS:
   page.goto(f'http://localhost:4173/{cap}.html')
   total=page.locator('#escenes [data-esc]:not([data-esc="repte"])').count()
   for i in range(total):
    page.evaluate('i=>RI.ves(i,.15)',i)
    page.wait_for_timeout(60)
    count+=1
    assert page.locator('#comp,[data-recons],[data-vista-btn]').count()==0
    bounds=page.evaluate("""()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,
      desktop:document.documentElement.classList.contains('escriptori'),
      nav:document.querySelector('.p-nav').getBoundingClientRect().bottom,
      footer:document.querySelector('.felip-app-footer').getBoundingClientRect().top})""")
    if bounds['overflow'] or (bounds['desktop'] and bounds['nav']>bounds['footer']+2): errors.append([cap,i,width,bounds])
    mounted=page.locator('[data-capa="_real"]')
    if mounted.count():
     assert mounted.get_attribute('aria-pressed')=='true'
     assert page.locator('#b-play').is_disabled()
     page.wait_for_function("document.querySelector('#lamina-real img').naturalWidth>0")
     keys=page.locator('#lamina-real .lamina-clau button')
     if keys.count():
      keys.first.click()
      assert page.locator('.fitxa').is_visible()
      page.locator('.fitxa-tanca').first.click()
     page.locator('[data-capa="_exp"]').click()
     assert page.locator('[data-capa="_exp"]').get_attribute('aria-pressed')=='true'
     assert mounted.get_attribute('aria-pressed')=='false'
     page.wait_for_function("document.querySelector('#lamina-exp img').naturalWidth>0")
     assert page.locator('#b-play').is_disabled()
     assert page.locator('#lamina-exp .plate-mark').count()>=3
     page.locator('[data-zoom]').click()
     assert page.locator('#lamina-exp .lamina-zoom').evaluate('(n)=>n.classList.contains("zoom")')
     page.locator('[data-zoom]').click()
     page.locator('[data-capa="_mov"]').click()
     assert not page.locator('#b-play').is_disabled()
    labels=page.locator('[data-capa="_etq"]')
    if labels.count():
     for _ in range(3): labels.click()
     assert labels.inner_text().endswith('del pas')
    for moment in ([0,200,400,600,800,999] if cap=='textil' else [400]):
     page.locator('#lliscador').evaluate('(n,v)=>{n.value=v;n.dispatchEvent(new Event("input"));}',moment)
     page.wait_for_timeout(45)
     bad=page.locator('#tela > svg').evaluate('(n)=>/NaN|Infinity/.test(n.innerHTML)')
     if bad: errors.append([cap,i,width,'invalid geometry'])
   page.locator('[data-esc="repte"]').click()
   assert page.locator('.q').count()>0
  footer=page.locator('.felip-app-footer')
  assert footer.get_by_role('link',name='AGPLv3',exact=True).get_attribute('href').endswith('/RevolucioIndustrial/LICENSE')
  assert footer.get_by_role('link',name='CC BY-NC-SA 4.0',exact=True).get_attribute('href')=='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca'
  if width in (1920,1366,390):
   page.goto('http://localhost:4173/textil.html#llancadora')
   page.locator('[data-capa="_exp"]').click()
   page.wait_for_function("document.querySelector('#lamina-exp img').naturalWidth>0")
   page.wait_for_timeout(200)
   page.screenshot(path=str(ROOT/'captures'/f'teler-explotat-{width}.png'),full_page=width==390)
   page.locator('[data-capa="_mov"]').click()
   page.locator('#lliscador').evaluate('(n)=>{n.value=250;n.dispatchEvent(new Event("input"));}')
   page.wait_for_timeout(60)
   page.wait_for_timeout(200)
   page.screenshot(path=str(ROOT/'captures'/f'teler-moviment-{width}.png'),full_page=width==390)
  page.close()
 browser.close()
print(json.dumps({'scene_viewports':count,'errors':errors}))
if errors: raise SystemExit(1)
