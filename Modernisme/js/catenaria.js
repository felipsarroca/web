/* =========================================================
   De la cadena a l'arc: simulació de la catenària
   Una cadena de partícules unides (integració de Verlet) penja
   de dos suports. Els sacs fan més pesades algunes baules. En
   girar-la, la mateixa forma és l'arc que només treballa a
   compressió (el principi de les maquetes de Gaudí).
   Unitats internes: centímetres d'una maqueta imaginària.
   ========================================================= */
(function () {
  'use strict';
  const arrel = document.getElementById('catenaria');
  if (!arrel) return;
  const canvas = document.getElementById('catenaria-canvas');
  const ctx = canvas.getContext('2d');
  const estat = document.getElementById('catenaria-estat');
  const inLlarg = document.getElementById('cat-llarg');
  const inSep = document.getElementById('cat-sep');
  const outLlarg = document.getElementById('cat-llarg-v');
  const outSep = document.getElementById('cat-sep-v');
  const btGira = document.getElementById('cat-gira');
  const chMig = document.getElementById('cat-mig');
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const N = 41;                 // baules
  const G = 0.06;               // gravetat per pas
  const PES_SAC = 6;            // massa extra de cada sac
  const MAX_SACS = 8;
  const ORDRE_SACS = [20, 10, 30, 5, 35, 15, 25, 8];
  let llarg = 0, sep = 0, girat = false, sacs = [], p = [], actiu = false, quiet = 0;

  function llegeix() {
    sep = Number(inSep.value);
    llarg = Math.max(Number(inLlarg.value), Math.ceil(sep * 1.08));
    if (Number(inLlarg.value) < llarg) inLlarg.value = llarg;
    outLlarg.textContent = llarg + ' cm';
    outSep.textContent = sep + ' cm';
  }

  function anclatges() { return [{ x: -sep / 2, y: 0 }, { x: sep / 2, y: 0 }]; }

  function inicia() {
    const [a, b] = anclatges();
    // Primera forma aproximada: una paràbola amb una fletxa raonable
    const fletxa = Math.sqrt(Math.max(0, (llarg * llarg - sep * sep))) / 2.4;
    p = [];
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const x = a.x + (b.x - a.x) * t;
      const y = 4 * fletxa * t * (1 - t);
      p.push({ x, y, px: x, py: y });
    }
  }

  function masses() {
    return p.map((_, i) => (i === 0 || i === N - 1) ? 0 : 1 / (1 + PES_SAC * sacs.filter(s => s === i).length));
  }

  function pas(inv) {
    const r = llarg / (N - 1);
    for (let i = 1; i < N - 1; i++) {
      const q = p[i];
      const vx = (q.x - q.px) * 0.97, vy = (q.y - q.py) * 0.97;
      q.px = q.x; q.py = q.y;
      q.x += vx; q.y += vy + G;
    }
    const [a, b] = anclatges();
    Object.assign(p[0], { x: a.x, y: a.y, px: a.x, py: a.y });
    Object.assign(p[N - 1], { x: b.x, y: b.y, px: b.x, py: b.y });
    for (let k = 0; k < 40; k++) {
      for (let i = 0; i < N - 1; i++) {
        const u = p[i], v = p[i + 1];
        const dx = v.x - u.x, dy = v.y - u.y;
        const d = Math.hypot(dx, dy) || 1e-6;
        const w = inv[i] + inv[i + 1];
        if (!w) continue;
        const f = (d - r) / d / w;
        u.x += dx * f * inv[i]; u.y += dy * f * inv[i];
        v.x -= dx * f * inv[i + 1]; v.y -= dy * f * inv[i + 1];
      }
    }
    let e = 0;
    for (let i = 1; i < N - 1; i++) e += Math.abs(p[i].x - p[i].px) + Math.abs(p[i].y - p[i].py);
    return e;
  }

  /* ---------- Dibuix ---------- */
  let W = 600, H = 360, esc = 4, ox = 300, oy = 40;
  const color = nom => getComputedStyle(document.documentElement).getPropertyValue(nom).trim() || '#5c4a3d';

  function mida() {
    const amplada = canvas.parentElement.clientWidth;
    W = Math.max(260, amplada);
    H = Math.round(Math.min(420, Math.max(250, W * 0.62)));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function encaixa() {
    const fondaria = Math.max(10, ...p.map(q => q.y)) + (sacs.length ? 9 : 3);
    const migpunt = chMig.checked ? sep / 2 : 0;
    const alt = Math.max(fondaria, migpunt + 2);
    esc = Math.min((W - 40) / Math.max(sep + 16, 60), (H - 70) / alt);
    ox = W / 2;
    oy = girat ? H - 34 : 34;
  }

  // Passa de coordenades de la maqueta (cm) a la pantalla
  const aP = (x, y) => [ox + x * esc, girat ? oy - y * esc : oy + y * esc];

  function dibuixa() {
    encaixa();
    ctx.clearRect(0, 0, W, H);
    const cMarro = color('--color-marro'), cTerra = color('--color-terracota'), cDaurat = color('--color-daurat'),
      cClar = color('--color-text-clar'), cBeix = color('--color-beix'), cFons = color('--color-blanc');
    ctx.fillStyle = cFons; ctx.fillRect(0, 0, W, H);

    // Sostre o terra
    const [a, b] = anclatges();
    const [ax, ay] = aP(a.x, a.y), [bx] = aP(b.x, b.y);
    ctx.fillStyle = cBeix;
    if (girat) ctx.fillRect(0, ay, W, H - ay); else ctx.fillRect(0, 0, W, ay - 6);
    ctx.strokeStyle = cClar; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, girat ? ay : ay - 6); ctx.lineTo(W, girat ? ay : ay - 6); ctx.stroke();

    // Arc de mig punt per comparar
    if (chMig.checked) {
      ctx.save();
      ctx.setLineDash([7, 6]); ctx.strokeStyle = cClar; ctx.lineWidth = 2;
      ctx.beginPath();
      const rr = sep / 2 * esc;
      if (girat) ctx.arc(ox, ay, rr, Math.PI, 0); else ctx.arc(ox, ay, rr, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = cClar; ctx.font = '13px Lora, Georgia, serif'; ctx.textAlign = 'center';
      ctx.fillText('mig punt', ox, girat ? ay - rr - 6 : ay + rr + 16);
    }

    const pts = p.map(q => aP(q.x, q.y));
    if (girat) {
      // Arc fet de dovelles de maó
      const gruix = Math.max(9, Math.min(18, esc * 2.2));
      for (let i = 0; i < N - 1; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
        const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1;
        const nx = -dy / d * gruix / 2, ny = dx / d * gruix / 2;
        ctx.beginPath();
        ctx.moveTo(x1 + nx, y1 + ny); ctx.lineTo(x2 + nx, y2 + ny); ctx.lineTo(x2 - nx, y2 - ny); ctx.lineTo(x1 - nx, y1 - ny);
        ctx.closePath();
        ctx.fillStyle = i % 2 ? cTerra : cDaurat; ctx.fill();
        ctx.strokeStyle = cFons; ctx.lineWidth = 1; ctx.stroke();
      }
      // Càrregues: fletxes que premen l'arc
      sacs.forEach(i => {
        const [x, y] = pts[i];
        ctx.strokeStyle = cMarro; ctx.fillStyle = cMarro; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(x, y - 40); ctx.lineTo(x, y - 14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 6, y - 20); ctx.lineTo(x + 6, y - 20); ctx.lineTo(x, y - 11); ctx.closePath(); ctx.fill();
      });
    } else {
      ctx.strokeStyle = cMarro; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
      ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
      ctx.fillStyle = cMarro;
      pts.forEach(([x, y], i) => { if (i % 2 === 0) { ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 2 * Math.PI); ctx.fill(); } });
      // Sacs de perdigons
      sacs.forEach(i => {
        const [x, y] = pts[i];
        ctx.strokeStyle = cClar; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 12); ctx.stroke();
        ctx.fillStyle = cTerra;
        ctx.beginPath(); ctx.ellipse(x, y + 21, 8, 10, 0, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = cMarro; ctx.fillRect(x - 3, y + 10, 6, 3);
      });
    }
    // Suports
    ctx.fillStyle = cMarro;
    [ax, bx].forEach(x => { ctx.beginPath(); ctx.arc(x, ay, 6, 0, 2 * Math.PI); ctx.fill(); });

    descriu();
  }

  function descriu() {
    const fletxa = Math.max(...p.map(q => q.y));
    const sacsTxt = sacs.length ? (sacs.length === 1 ? ' Hi ha 1 sac penjat.' : ' Hi ha ' + sacs.length + ' sacs penjats.') : '';
    const txt = girat
      ? 'Arc catenari de ' + sep + ' cm d\'amplada i ' + Math.round(fletxa) + ' cm d\'alçada.' + (sacs.length ? ' Les fletxes marquen on hi ha càrrega.' : '') + (chMig.checked ? ' Compara\'l amb l\'arc de mig punt, de ' + Math.round(sep / 2) + ' cm d\'alçada.' : '')
      : 'Cadena de ' + llarg + ' cm penjada entre dos suports separats ' + sep + ' cm. Baixa ' + Math.round(fletxa) + ' cm.' + sacsTxt;
    canvas.setAttribute('aria-label', txt);
    if (estat.textContent !== txt && !actiu) estat.textContent = txt;
  }

  /* ---------- Bucle ---------- */
  function desperta() {
    quiet = 0;
    if (reduit) { const inv = masses(); for (let i = 0; i < 1500; i++) pas(inv); dibuixa(); return; }
    if (actiu) return;
    actiu = true;
    requestAnimationFrame(bucle);
  }
  function bucle() {
    const inv = masses();
    let e = 0;
    for (let k = 0; k < 6; k++) e = pas(inv);
    quiet = e < 0.02 ? quiet + 1 : 0;
    if (quiet > 20) actiu = false;
    dibuixa();
    if (actiu) requestAnimationFrame(bucle);
  }

  /* ---------- Controls ---------- */
  function canvi() { llegeix(); desperta(); }
  inLlarg.addEventListener('input', canvi);
  inSep.addEventListener('input', canvi);
  chMig.addEventListener('change', () => dibuixa());

  function afegeixSac(i) {
    if (sacs.length >= MAX_SACS) { estat.textContent = 'Ja hi ha ' + MAX_SACS + ' sacs: treu-ne algun per penjar-ne més.'; return; }
    sacs.push(i); desperta();
  }
  document.getElementById('cat-sac').addEventListener('click', () => {
    const lliure = ORDRE_SACS.find(i => !sacs.includes(i));
    afegeixSac(lliure === undefined ? ORDRE_SACS[sacs.length % ORDRE_SACS.length] : lliure);
  });
  document.getElementById('cat-treu').addEventListener('click', () => { sacs = []; desperta(); });
  btGira.addEventListener('click', () => {
    girat = !girat;
    btGira.setAttribute('aria-pressed', String(girat));
    btGira.textContent = girat ? 'Torna a la cadena' : 'Gira-ho: fes l\'arc';
    arrel.classList.toggle('girat', girat);
    dibuixa();
  });
  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    let millor = -1, dist = 22;
    p.forEach((q, i) => {
      if (i < 2 || i > N - 3) return;
      const [px, py] = aP(q.x, q.y);
      const d = Math.hypot(px - x, py - y);
      if (d < dist) { dist = d; millor = i; }
    });
    if (millor > 0) afegeixSac(millor);
  });

  llegeix();
  inicia();
  mida();
  desperta();
  dibuixa();
  if ('ResizeObserver' in window) new ResizeObserver(() => { mida(); dibuixa(); }).observe(canvas.parentElement);
  else window.addEventListener('resize', () => { mida(); dibuixa(); });
  // Canvi de tema clar/fosc: redibuixa amb els colors nous
  new MutationObserver(() => dibuixa()).observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema'] });
})();
