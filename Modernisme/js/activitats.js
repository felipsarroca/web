/* =========================================================
   Activitats «Posa-t'hi»
   - .activitat-classifica : cartes amb dues opcions
   - .activitat-relaciona  : files amb un desplegable
   - .activitat-ordena     : llista per ordenar amb fletxes
   - .punts-imatge         : punts calents sobre una imatge
   Les accions (Comprova / Torna-hi) són a l'element
   .accions-activitat que segueix cada activitat.
   ========================================================= */
(function () {
  'use strict';
  const IC = (window.Modernisme || {}).ICONES || {};

  function barreja(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function missatge(el, encerts, total) {
    if (!el) return;
    el.className = 'resultat-activitat ' + (encerts === total ? 'be' : 'millorable');
    el.textContent = encerts === total
      ? 'Perfecte! ' + encerts + ' de ' + total + '.'
      : encerts + ' de ' + total + ' correctes. Llegeix les explicacions i torna-hi.';
    registra(el, encerts, total);
  }

  /* Desa el resultat al registre de progrés (El meu progrés) */
  function registra(el, encerts, total) {
    const M = window.Modernisme;
    if (!M || !M.registraProgres) return;
    const totes = [...document.querySelectorAll('.accions-activitat')];
    const acc = el.closest('.accions-activitat');
    const n = totes.indexOf(acc) + 1;
    const caixa = el.closest('.activitat');
    const seccio = el.closest('section');
    const titolAct = (caixa && caixa.querySelector('h3')) || (seccio && seccio.querySelector('h2'));
    const pagina = (document.querySelector('h1') || {}).textContent || document.title;
    const nom = pagina.trim() + ' · ' + (titolAct ? titolAct.textContent.replace(/^Posa-t'hi:\s*/i, '').trim() : 'activitat ' + n);
    const pag = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    M.registraProgres(pag.replace('.html', '') + '-' + n, nom, encerts, total);
  }

  function accionsDe(act) {
    let n = act.nextElementSibling;
    while (n && !n.classList.contains('accions-activitat')) n = n.nextElementSibling;
    return n;
  }

  /* ---------- Classificar ---------- */
  function classifica(act) {
    const opcions = (act.dataset.opcions || 'Modernista|No modernista').split('|');
    const valors = (act.dataset.valors || 'si|no').split('|');
    const cartes = [...act.querySelectorAll('.carta-classifica')];
    cartes.forEach(c => {
      const caixa = c.querySelector('.opcions');
      caixa.innerHTML = opcions.map((o, i) => '<button type="button" data-valor="' + valors[i] + '" aria-pressed="false">' + o + '</button>').join('');
      caixa.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        caixa.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        c.classList.remove('correcta', 'incorrecta');
      });
    });
    const acc = accionsDe(act);
    if (!acc) return;
    const res = acc.querySelector('.resultat-activitat');
    acc.querySelector('[data-accio="comprova"]').addEventListener('click', () => {
      let encerts = 0, respostes = 0;
      cartes.forEach(c => {
        const tria = c.querySelector('button[aria-pressed="true"]');
        c.classList.remove('correcta', 'incorrecta');
        if (!tria) return;
        respostes++;
        const ok = tria.dataset.valor === c.dataset.correcta;
        if (ok) encerts++;
        c.classList.add(ok ? 'correcta' : 'incorrecta');
        c.querySelector('.retroaccio').textContent = (ok ? '✔ ' : '✘ ') + c.dataset.explica;
      });
      if (respostes < cartes.length) {
        res.className = 'resultat-activitat millorable';
        res.textContent = 'Encara et falten ' + (cartes.length - respostes) + ' obres per decidir. ' + (respostes ? encerts + ' encerts fins ara.' : '');
        return;
      }
      missatge(res, encerts, cartes.length);
    });
    acc.querySelector('[data-accio="reinicia"]').addEventListener('click', () => {
      cartes.forEach(c => {
        c.classList.remove('correcta', 'incorrecta');
        c.querySelectorAll('.opcions button').forEach(x => x.setAttribute('aria-pressed', 'false'));
      });
      res.textContent = '';
    });
  }

  /* ---------- Relacionar ---------- */
  function relaciona(act) {
    const opcions = act.dataset.opcions.split('|');
    const files = [...act.querySelectorAll('.fila-relaciona')];
    files.forEach((f, i) => {
      const sel = document.createElement('select');
      sel.id = 'rel-' + Math.random().toString(36).slice(2, 8);
      sel.innerHTML = '<option value="">— Tria —</option>' + barreja(opcions.slice()).map(o => '<option>' + o + '</option>').join('');
      const etiqueta = f.querySelector('.text-fila');
      if (etiqueta) { etiqueta.id = sel.id + '-e'; sel.setAttribute('aria-labelledby', etiqueta.id); }
      f.appendChild(sel);
      sel.addEventListener('change', () => f.classList.remove('correcta', 'incorrecta'));
    });
    const acc = accionsDe(act);
    if (!acc) return;
    const res = acc.querySelector('.resultat-activitat');
    acc.querySelector('[data-accio="comprova"]').addEventListener('click', () => {
      let encerts = 0;
      files.forEach(f => {
        const v = f.querySelector('select').value;
        f.classList.remove('correcta', 'incorrecta');
        if (!v) return;
        const ok = v === f.dataset.correcta;
        if (ok) encerts++;
        f.classList.add(ok ? 'correcta' : 'incorrecta');
      });
      missatge(res, encerts, files.length);
    });
    acc.querySelector('[data-accio="reinicia"]').addEventListener('click', () => {
      files.forEach(f => { f.querySelector('select').value = ''; f.classList.remove('correcta', 'incorrecta'); });
      res.textContent = '';
    });
  }

  /* ---------- Ordenar ---------- */
  function ordena(act) {
    const items = barreja([...act.children]);
    items.forEach(li => {
      act.appendChild(li);
      const text = li.innerHTML;
      li.innerHTML = '<span class="text-ordre">' + text + '</span><span class="fletxes">' +
        '<button type="button" data-dir="-1" aria-label="Puja">' + (IC.amunt || '↑') + '</button>' +
        '<button type="button" data-dir="1" aria-label="Baixa">' + (IC.avall || '↓') + '</button></span>';
    });
    function refresca() {
      const ll = [...act.children];
      ll.forEach((li, i) => {
        li.querySelector('[data-dir="-1"]').disabled = i === 0;
        li.querySelector('[data-dir="1"]').disabled = i === ll.length - 1;
      });
    }
    act.addEventListener('click', e => {
      const b = e.target.closest('button[data-dir]'); if (!b) return;
      const li = b.closest('li');
      const dir = Number(b.dataset.dir);
      if (dir < 0 && li.previousElementSibling) act.insertBefore(li, li.previousElementSibling);
      if (dir > 0 && li.nextElementSibling) act.insertBefore(li.nextElementSibling, li);
      [...act.children].forEach(x => x.classList.remove('correcta', 'incorrecta'));
      refresca();
      b.focus();
    });
    refresca();
    const acc = accionsDe(act);
    if (!acc) return;
    const res = acc.querySelector('.resultat-activitat');
    acc.querySelector('[data-accio="comprova"]').addEventListener('click', () => {
      let encerts = 0;
      [...act.children].forEach((li, i) => {
        const ok = Number(li.dataset.ordre) === i + 1;
        if (ok) encerts++;
        li.classList.toggle('correcta', ok);
        li.classList.toggle('incorrecta', !ok);
        let r = li.querySelector('.any-revelat');
        if (li.dataset.any && !r) { li.querySelector('.text-ordre').insertAdjacentHTML('beforeend', ' <span class="any-revelat">(' + li.dataset.any + ')</span>'); }
      });
      missatge(res, encerts, act.children.length);
    });
    acc.querySelector('[data-accio="reinicia"]').addEventListener('click', () => {
      barreja([...act.children]).forEach(li => {
        li.classList.remove('correcta', 'incorrecta');
        const r = li.querySelector('.any-revelat'); if (r) r.remove();
        act.appendChild(li);
      });
      refresca();
      res.textContent = '';
    });
  }

  /* ---------- Punts calents ---------- */
  function punts(caixa) {
    if (caixa.dataset.mode === 'endevina') return endevina(caixa);
    const sortida = document.getElementById(caixa.dataset.sortida);
    const botons = [...caixa.querySelectorAll('.punt-calent')];
    botons.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.setAttribute('aria-controls', caixa.dataset.sortida);
      b.addEventListener('click', () => {
        botons.forEach(x => x.setAttribute('aria-expanded', String(x === b)));
        sortida.innerHTML = '<h4>' + b.dataset.titol + '</h4><p>' + b.dataset.text + '</p>';
      });
    });
  }

  /* ---------- Punts calents per endevinar ----------
     Cada punt porta data-opcions (la correcta és data-correcta).
     L'alumne tria què és; després es mostra l'explicació. */
  function endevina(caixa) {
    const sortida = document.getElementById(caixa.dataset.sortida);
    const botons = [...caixa.querySelectorAll('.punt-calent')];
    const acc = accionsDe(caixa.closest('.punts-endevina') || caixa);
    const res = acc ? acc.querySelector('.resultat-activitat') : null;
    const respostes = {};
    const inici = sortida.innerHTML;
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

    function explica(b) {
      const ok = respostes[b.textContent] === true;
      sortida.innerHTML = '<p class="resultat-punt ' + (ok ? 'be' : 'millorable') + '">' + (ok ? '✔ Correcte!' : '✘ No era això. La resposta és: ' + b.dataset.correcta.charAt(0).toLowerCase() + b.dataset.correcta.slice(1) + '.') + '</p>' +
        '<h4>' + b.textContent + '. ' + b.dataset.titol + '</h4><p>' + b.dataset.text + '</p>';
    }
    function pregunta(b) {
      const opcions = barreja(b.dataset.opcions.split('|'));
      sortida.innerHTML = '<h4>Punt ' + b.textContent + ': què hi veus?</h4><div class="opcions-punt" role="group" aria-label="Respostes del punt ' + b.textContent + '">' +
        opcions.map(o => '<button type="button" class="boto clar" data-opcio="' + esc(o) + '">' + o + '</button>').join('') + '</div>';
      sortida.querySelectorAll('[data-opcio]').forEach(x => x.addEventListener('click', () => {
        const ok = x.dataset.opcio === b.dataset.correcta;
        respostes[b.textContent] = ok;
        b.classList.add(ok ? 'encertat' : 'fallat');
        explica(b);
        const fets = Object.keys(respostes).length;
        if (res) {
          const encerts = Object.values(respostes).filter(Boolean).length;
          if (fets === botons.length) missatge(res, encerts, botons.length);
          else { res.className = 'resultat-activitat'; res.textContent = fets + ' de ' + botons.length + ' punts resolts.'; }
        }
        const seguent = botons.find(y => !(y.textContent in respostes));
        if (seguent) sortida.insertAdjacentHTML('beforeend', '<p><button type="button" class="boto petit" data-seguent="' + seguent.textContent + '">Punt següent →</button></p>');
        const bs = sortida.querySelector('[data-seguent]');
        if (bs) bs.addEventListener('click', () => { seguent.focus(); seguent.click(); });
      }));
    }
    botons.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.setAttribute('aria-controls', caixa.dataset.sortida);
      b.setAttribute('aria-label', 'Punt ' + b.textContent);
      b.addEventListener('click', () => {
        botons.forEach(x => x.setAttribute('aria-expanded', String(x === b)));
        if (b.textContent in respostes) explica(b); else pregunta(b);
      });
    });
    if (acc) acc.querySelector('[data-accio="reinicia"]').addEventListener('click', () => {
      Object.keys(respostes).forEach(k => delete respostes[k]);
      botons.forEach(b => { b.classList.remove('encertat', 'fallat'); b.setAttribute('aria-expanded', 'false'); });
      sortida.innerHTML = inici;
      if (res) { res.className = 'resultat-activitat'; res.textContent = ''; }
    });
  }

  /* ---------- Lliscador abans / ara ----------
     Converteix un bloc .dues (dues figures) en una sola imatge
     amb una línia que es pot arrossegar. Les figures originals
     queden amagades (es mostren en imprimir) i es poden ampliar. */
  function lliscador(dues) {
    const figs = dues.querySelectorAll('figure');
    if (figs.length !== 2) return;
    const [fa, fb] = figs;
    const ia = fa.querySelector('img'), ib = fb.querySelector('img');
    const ca = (fa.querySelector('figcaption') || {}).textContent || 'Abans';
    const cb = (fb.querySelector('figcaption') || {}).textContent || 'Ara';
    const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const w = document.createElement('div');
    w.className = 'lliscador';
    w.style.setProperty('--pos', '50%');
    if (dues.dataset.proporcio) w.style.aspectRatio = dues.dataset.proporcio;
    w.innerHTML = '<img class="ll-ara" src="' + ib.getAttribute('src') + '" alt="' + esc(ib.alt) + '" loading="lazy">' +
      '<div class="ll-abans"><img src="' + ia.getAttribute('src') + '" alt="' + esc(ia.alt) + '" loading="lazy"></div>' +
      '<span class="ll-etiqueta ll-esq">' + esc(ca) + '</span><span class="ll-etiqueta ll-dre">' + esc(cb) + '</span>' +
      '<span class="ll-linia" aria-hidden="true"><span class="ll-agafador">' + (IC.esquerra || '‹') + (IC.dreta || '›') + '</span></span>' +
      '<input type="range" min="0" max="100" value="50" aria-label="Llisca per comparar: a l\'esquerra, ' + esc(ca) + '; a la dreta, ' + esc(cb) + '">';
    const rang = w.querySelector('input');
    rang.addEventListener('input', () => w.style.setProperty('--pos', rang.value + '%'));
    const amplia = document.createElement('p');
    amplia.className = 'll-amplia';
    amplia.innerHTML = 'Amplia: <button type="button" class="boto petit clar">' + esc(ca) + '</button> <button type="button" class="boto petit clar">' + esc(cb) + '</button>';
    const [ba, bb] = amplia.querySelectorAll('button');
    ba.addEventListener('click', () => fa.querySelector('.boto-imatge').click());
    bb.addEventListener('click', () => fb.querySelector('.boto-imatge').click());
    dues.classList.add('dues-amagades');
    dues.before(w);
    w.after(amplia);
  }

  document.querySelectorAll('.parella .dues').forEach(lliscador);
  document.querySelectorAll('.activitat-classifica').forEach(classifica);
  document.querySelectorAll('.activitat-relaciona').forEach(relaciona);
  document.querySelectorAll('.activitat-ordena').forEach(ordena);
  document.querySelectorAll('.punts-imatge').forEach(punts);
})();
