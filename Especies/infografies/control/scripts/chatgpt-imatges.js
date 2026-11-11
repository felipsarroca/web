// Ajudants per generar i desar imatges de ChatGPT (chatgpt.com/images) sense intervenció humana.
// S'executen a la pestanya de ChatGPT amb l'eina javascript de Claude in Chrome
// (enganxa tot el fitxer una vegada per conversa; després crida les funcions).
//
// Desar: ChatGPT bloqueja fetch() cap a 127.0.0.1 (CSP connect-src), però no restringeix
// form-action. Per això cada imatge s'envia amb un formulari multipart a scripts/rebre.py,
// que l'escriu directament a la carpeta de treball. La resposta s'obre sempre a la mateixa
// pestanya auxiliar «desa_imatges» (es pot tancar en acabar).

window.RECEPTOR = window.RECEPTOR || 'http://127.0.0.1:8765/';
window._seen = window._seen || new Set();

// Envia un encàrrec. Si hi ha una generació en curs, espera i, si cal, l'atura.
window.sendPrompt = async (txt) => {
  const ed = document.querySelector('.ProseMirror[contenteditable=true]');
  ed.focus(); document.execCommand('selectAll'); document.execCommand('insertText', false, txt);
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const btns = [...document.querySelectorAll('button')];
    const b = btns.find(x => x.getAttribute('aria-label') === 'Envia');
    if (b && !b.disabled) {
      window._seen = new Set([...document.querySelectorAll('main img')].map(x => x.src));
      b.click(); return 'sent';
    }
    if (i === 10) { const s = btns.find(x => x.getAttribute('aria-label') === 'Atura'); if (s) s.click(); }
  }
  return 'no send button';
};

// Espera (màx. ~38 s per crida, per no superar el temps de l'eina) una imatge generada nova.
window.step = async (ms = 38000) => {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const imgs = [...document.querySelectorAll('main img')].filter(x =>
      /generada|generated/i.test(x.alt) && !window._seen.has(x.src) && x.complete && x.naturalWidth > 1000);
    if (imgs.length) { window._new = imgs[imgs.length - 1]; return 'done'; }
    await new Promise(r => setTimeout(r, 3000));
  }
  return 'pending';
};

// Envia al receptor local la imatge de l'adreça src amb el nom indicat; retorna la mida en bytes.
window.desaSrc = async (name, src) => {
  const b = await (await fetch(src)).blob();
  const f = document.createElement('form');
  f.method = 'POST'; f.action = window.RECEPTOR; f.enctype = 'multipart/form-data';
  f.target = 'desa_imatges'; f.style.display = 'none';
  const i = document.createElement('input'); i.type = 'file'; i.name = 'img';
  const dt = new DataTransfer(); dt.items.add(new File([b], name, { type: b.type || 'image/png' })); i.files = dt.files;
  f.appendChild(i); document.body.appendChild(f); f.submit(); f.remove();
  return b.size;
};

// Desa la imatge nova (o la k-èsima des del final) al receptor local amb el nom indicat.
// Atenció: ChatGPT només manté al DOM les imatges properes a la vista; per a peces antigues, usa recupera().
window.desa = async (name, k) => {
  let im = window._new;
  if (k !== undefined) { const a = [...document.querySelectorAll('main img')].filter(x => /generada|generated/i.test(x.alt)); im = a[a.length - 1 - k]; }
  const size = await window.desaSrc(name, im.src);
  window._seen.add(im.src);
  return [name, size, im.naturalWidth, im.naturalHeight];
};

// Recuperació (p. ex. si el receptor ha caigut): recorre la conversa de baix a dalt i associa cada imatge
// generada a l'encàrrec que la precedeix. jobs = [{name, prompt}]. Deixa el resultat a window.FOUND {name: src}.
// Triga més que el límit de l'eina: llança-la sense await i consulta Object.keys(FOUND) al cap d'una estona.
window.recupera = async (jobs) => {
  window.FOUND = window.FOUND || {};
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const keys = jobs.map(j => ({ name: j.name, k: norm(j.prompt).slice(-150) }));
  const sc = document.querySelector('.thread-scroll-container');
  const collect = () => {
    const prompts = [...document.querySelectorAll('div,p')].filter(e => e.childElementCount <= 3 && /^Crea UNA ÚNICA/.test(e.innerText || '')
      && ![...e.children].some(c => /^Crea UNA ÚNICA/.test(c.innerText || '')));
    for (const im of [...document.querySelectorAll('main img')].filter(x => /generada|generated/i.test(x.alt) && x.naturalWidth > 1000)) {
      let best = null;
      for (const p of prompts) if (p.compareDocumentPosition(im) & Node.DOCUMENT_POSITION_FOLLOWING) best = p;
      const j = best && keys.find(k => norm(best.innerText).includes(k.k));
      if (j && !FOUND[j.name]) FOUND[j.name] = im.src;
    }
  };
  for (let y = sc.scrollHeight; y >= 0; y -= 500) { sc.scrollTop = y; await new Promise(r => setTimeout(r, 700)); collect(); }
  sc.scrollTop = sc.scrollHeight;
  return Object.keys(FOUND);
};
// Després: for (const n of noms) { await desaSrc(n, FOUND[n]); await new Promise(r => setTimeout(r, 1500)); }
// Compara les mides amb el registre per confirmar l'associació.

// Pas complet: espera i desa. Retorna 'pending' si encara no ha acabat (torna-la a cridar).
window.esperaIDesa = async (name) => { const r = await window.step(); return r === 'done' ? await window.desa(name) : r; };

// Cua desatesa: envia cada encàrrec i desa la imatge (fins a ~14 min per peça). Llança-la sense await
// (runBatch(JOBS);) i segueix el progrés a window.LOG. Una peça que supera el temps queda com a TIMEOUT
// i es pot recuperar després amb recupera() o tornar a enviar.
window.runBatch = async (jobs) => {
  window.LOG = window.LOG || [];
  for (const j of jobs) {
    LOG.push(j.name + ' send ' + await window.sendPrompt(j.prompt));
    let ok = false;
    for (let t = 0; t < 22 && !ok; t++) if (await window.step() === 'done') { LOG.push('saved ' + (await window.desa(j.name)).join(' ')); ok = true; }
    if (!ok) LOG.push('TIMEOUT ' + j.name);
  }
  LOG.push('BATCH DONE');
};
'ajudants carregats';
