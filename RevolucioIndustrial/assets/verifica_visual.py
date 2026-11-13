"""Verificació local: python assets/verifica_visual.py (servidor al port 4173)."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json

ROOT = Path(__file__).resolve().parents[1]
CAPITOLS = ['camp', 'vapor', 'textil', 'fabrica', 'metalls', 'tren', 'vaixell', 'capital']
errors, revisades = [], 0
with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.on('pageerror', lambda e: errors.append(str(e)))
    for width, height, dpr in [(1920,1080,1), (1366,768,1), (1093,614,1.25), (911,512,1.5), (390,844,1)]:
        page.close()
        page = browser.new_page(viewport={'width':width,'height':height}, device_scale_factor=dpr)
        page.on('pageerror', lambda e: errors.append(str(e)))
        for cap in CAPITOLS:
            page.goto(f'http://localhost:4173/{cap}.html')
            count = page.locator('#escenes button[data-esc]:not([data-esc="repte"])').count()
            for i in range(count):
                page.evaluate('i => RI.ves(i, .15)', i)
                page.wait_for_timeout(60)
                revisades += 1
                result = page.evaluate('''() => ({
                  overflow:document.documentElement.scrollWidth > innerWidth+2,
                  broken:[...document.querySelectorAll('#tela img')].filter(i=>i.complete && !i.naturalWidth).map(i=>i.src),
                  bottom:document.querySelector('.felip-app-footer').getBoundingClientRect().bottom,
                  desktop:document.documentElement.classList.contains('escriptori')
                })''')
                if result['overflow'] or result['broken'] or (result['desktop'] and result['bottom'] > height+3):
                    errors.append([cap,i,width,result])
                for view in range(page.locator('[data-vista-btn]').count()):
                    page.locator('[data-vista-btn]').nth(view).click()
                labels = page.locator('[data-capa="_etq"]')
                if labels.count():
                    for _ in range(3): labels.click()
                    assert labels.inner_text() == 'Etiquetes: del pas'
                art = page.locator('[data-capa="_exp"]')
                if art.is_visible():
                    art.click()
                    assert page.locator('#b-play').is_disabled()
                    if page.locator('#lamina-exp').count():
                        page.wait_for_function("document.querySelector('#lamina-exp img').naturalWidth > 0")
                    art.click()
                    assert not page.locator('#b-play').is_disabled()
            page.locator('[data-esc="repte"]').click()
            assert page.locator('.q').count() > 0
        page.goto('http://localhost:4173/vapor.html')
        page.wait_for_timeout(150)
        if width in (1366,390):
            page.screenshot(path=str(ROOT / 'captures' / ('mobil.png' if width == 390 else 'projeccio.png')), full_page=width==390)
        if width == 1920:
            page.locator('[data-capa="_exp"]').click()
            page.wait_for_function("document.querySelector('#lamina-exp img').naturalWidth > 0")
            page.wait_for_timeout(450)
            page.screenshot(path=str(ROOT / 'captures' / 'illustracio.png'))
    browser.close()
print(json.dumps({'escenes_i_mides':revisades,'errors':errors},ensure_ascii=False))
if errors: raise SystemExit(1)
