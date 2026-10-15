(() => {
  'use strict';

  const STORAGE_KEY = 'nex-resume:v1';
  const PAGE_PX = 1056; // 11in at 96 CSS px per inch
  const SHEET_PX = 816; // 8.5in

  const TEMPLATES = [
    { id: 'classic', name: 'Classic', note: 'Serif, centred header' },
    { id: 'modern', name: 'Modern', note: 'Sans with a sidebar' },
    { id: 'compact', name: 'Compact', note: 'Dense, fits more' },
  ];

  const ACCENTS = [
    { id: 'ink', name: 'Ink blue', value: '#1f4e79' },
    { id: 'forest', name: 'Forest', value: '#2c6a4e' },
    { id: 'oxblood', name: 'Oxblood', value: '#8a2f2f' },
    { id: 'graphite', name: 'Graphite', value: '#3a414d' },
    { id: 'ochre', name: 'Ochre', value: '#94650f' },
  ];

  const BASICS = [
    { key: 'name', label: 'Full name', wide: true, auto: 'name' },
    { key: 'title', label: 'Headline', wide: true, ph: 'Senior Frontend Engineer' },
    { key: 'email', label: 'Email', input: 'email', auto: 'email' },
    { key: 'phone', label: 'Phone', input: 'tel', auto: 'tel' },
    { key: 'location', label: 'Location', ph: 'City, State' },
    { key: 'website', label: 'Website or profile', ph: 'yourname.dev' },
  ];

  const LISTS = {
    experience: {
      title: 'Experience', add: 'Add role',
      fields: [
        { key: 'role', label: 'Role', wide: true },
        { key: 'company', label: 'Company' },
        { key: 'location', label: 'Location' },
        { key: 'start', label: 'Start', ph: 'Mar 2021' },
        { key: 'end', label: 'End', ph: 'Present' },
        { key: 'bullets', label: 'Highlights', hint: '(one per line)', type: 'textarea', rows: 5, wide: true },
      ],
      name: (i) => i.role || i.company || 'New role',
    },
    projects: {
      title: 'Projects', add: 'Add project',
      fields: [
        { key: 'name', label: 'Project' },
        { key: 'link', label: 'Link', ph: 'github.com/you/project' },
        { key: 'description', label: 'What it does and your part', hint: '(one point per line)', type: 'textarea', rows: 3, wide: true },
      ],
      name: (i) => i.name || 'New project',
    },
    education: {
      title: 'Education', add: 'Add education',
      fields: [
        { key: 'degree', label: 'Degree or certificate', wide: true },
        { key: 'school', label: 'School' },
        { key: 'location', label: 'Location' },
        { key: 'start', label: 'Start' },
        { key: 'end', label: 'End' },
        { key: 'details', label: 'Details', hint: '(honours, minor, GPA)', type: 'textarea', rows: 2, wide: true },
      ],
      name: (i) => i.degree || i.school || 'New entry',
    },
    skills: {
      title: 'Skills', add: 'Add skill group',
      fields: [
        { key: 'label', label: 'Group', ph: 'Languages' },
        { key: 'items', label: 'Skills', hint: '(comma separated)', ph: 'TypeScript, SQL' },
      ],
      name: (i) => i.label || 'New group',
    },
  };
  const LIST_ORDER = ['experience', 'projects', 'education', 'skills'];
  for (const key of LIST_ORDER) {
    const def = LISTS[key];
    def.blank = () => Object.fromEntries(def.fields.map((f) => [f.key, '']));
  }

  const SAMPLE = {
    sample: true,
    template: 'classic',
    accent: 'ink',
    basics: {
      name: 'Jordan Okafor',
      title: 'Senior Frontend Engineer',
      email: 'jordan.okafor@example.com',
      phone: '(555) 014-2283',
      location: 'Austin, TX',
      website: 'jordanokafor.example.com',
    },
    summary: 'Frontend engineer with eight years of experience building fast, accessible web apps for logistics and healthcare teams. I care about measurable performance, shared design systems, and helping other engineers grow.',
    experience: [
      {
        role: 'Senior Frontend Engineer', company: 'Brightline Logistics', location: 'Austin, TX',
        start: 'Mar 2022', end: 'Present',
        bullets: 'Led the rebuild of the shipment tracking dashboard in React and TypeScript, cutting median load time from 4.8 s to 1.3 s.\nDesigned a shared component library now used by six product teams, replacing three legacy UI kits.\nMentored four engineers through promotion and ran the frontend interview loop.',
      },
      {
        role: 'Frontend Engineer', company: 'Fieldnote Health', location: 'Remote',
        start: 'Jun 2019', end: 'Feb 2022',
        bullets: 'Built the patient intake flow used by 120 clinics, raising form completion from 61% to 84%.\nIntroduced end-to-end tests with Playwright, halving release regressions over two quarters.',
      },
      {
        role: 'Web Developer', company: 'Lakeshore Credit Union', location: 'Chicago, IL',
        start: 'Aug 2017', end: 'May 2019',
        bullets: 'Shipped the first online loan application to meet WCAG 2.1 AA, now handling 40% of new loans.',
      },
    ],
    projects: [
      {
        name: 'Tidepool', link: 'github.com/jordanokafor/tidepool',
        description: 'Open-source, keyboard-first date range picker for React with 1,900 weekly downloads.',
      },
    ],
    education: [
      {
        degree: 'B.S. Computer Science', school: 'University of Illinois Urbana-Champaign', location: 'Urbana, IL',
        start: '2013', end: '2017', details: 'Minor in Statistics',
      },
    ],
    skills: [
      { label: 'Languages', items: 'TypeScript, JavaScript, HTML, CSS, SQL' },
      { label: 'Frameworks', items: 'React, Next.js, Node.js, Vite, Playwright' },
      { label: 'Practice', items: 'Accessibility, design systems, web performance, testing' },
    ],
  };

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const str = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v));
  const esc = (s) => str(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const idFor = (path) => 'f-' + path.replace(/\./g, '-');

  function normalize(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const out = {
      sample: raw.sample === true,
      template: TEMPLATES.some((t) => t.id === raw.template) ? raw.template : 'classic',
      accent: ACCENTS.some((a) => a.id === raw.accent) ? raw.accent : 'ink',
      summary: str(raw.summary),
      basics: {},
    };
    for (const f of BASICS) out.basics[f.key] = str(raw.basics && raw.basics[f.key]);
    for (const key of LIST_ORDER) {
      const def = LISTS[key];
      const list = Array.isArray(raw[key]) ? raw[key] : [];
      out[key] = list
        .filter((x) => x && typeof x === 'object')
        .map((x) => Object.fromEntries(def.fields.map((f) => [f.key, str(x[f.key])])));
    }
    return out;
  }

  function blankState() {
    return normalize({ template: state.template, accent: state.accent });
  }

  // ---------- elements ----------
  const els = {
    app: $('app'), editor: $('editor'), resume: $('resume'), breaks: $('breaks'),
    frame: $('sheet-frame'), scale: $('sheet-scale'), stage: $('stage'),
    pages: $('page-count'), pageHint: $('page-hint'), status: $('status'),
    sampleNote: $('sample-note'), embedNote: $('embed-note'),
    tplOptions: $('tpl-options'), accentOptions: $('accent-options'),
    importBtn: $('import-btn'), importFile: $('import-file'), exportBtn: $('export-btn'),
    pdfBtn: $('pdf-btn'), resetBtn: $('reset-btn'), blankBtn: $('blank-btn'),
  };

  // ---------- storage ----------
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? normalize(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }
  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStatus('Saved in this browser');
    } catch {
      setStatus('Not saved: this browser blocks storage. Use Export JSON to keep a copy.');
    }
  }
  function queueSave() {
    clearTimeout(saveTimer);
    setStatus('Saving…');
    saveTimer = setTimeout(save, 400);
  }
  function setStatus(text) { els.status.textContent = text; }

  const restored = load();
  let state = restored || clone(SAMPLE);

  // ---------- design controls ----------
  function renderDesignControls() {
    els.tplOptions.innerHTML = TEMPLATES.map((t) => `
      <label class="opt" for="tpl-${t.id}">
        <input type="radio" name="template" id="tpl-${t.id}" value="${t.id}">
        <span class="opt-name">${t.name}</span>
        <span class="opt-note">${t.note}</span>
      </label>`).join('');
    els.accentOptions.innerHTML = ACCENTS.map((a) => `
      <label class="swatch" for="accent-${a.id}" style="--sw:${a.value}" title="${a.name}">
        <input type="radio" name="accent" id="accent-${a.id}" value="${a.id}">
        <span class="sr-only">${a.name}</span>
      </label>`).join('');
  }
  function syncDesignControls() {
    $('tpl-' + state.template).checked = true;
    $('accent-' + state.accent).checked = true;
  }
  document.querySelector('.design-bar').addEventListener('change', (e) => {
    if (e.target.name === 'template') state.template = e.target.value;
    else if (e.target.name === 'accent') state.accent = e.target.value;
    else return;
    renderPreview();
    queueSave();
  });

  // ---------- editor ----------
  const collapsed = new Set();

  function fieldHTML(path, f, value) {
    const id = idFor(path);
    const attrs = `id="${id}" name="${id}" data-path="${path}"` +
      (f.ph ? ` placeholder="${esc(f.ph)}"` : '') +
      ` autocomplete="${f.auto || 'off'}"`;
    const control = f.type === 'textarea'
      ? `<textarea ${attrs} rows="${f.rows || 4}">${esc(value)}</textarea>`
      : `<input type="${f.input || 'text'}" ${attrs} value="${esc(value)}">`;
    const hint = f.hint ? ` <span class="hint">${esc(f.hint)}</span>` : '';
    return `<div class="field${f.wide ? ' wide' : ''}"><label for="${id}">${esc(f.label)}${hint}</label>${control}</div>`;
  }

  function sectionHTML(key, title, meta, body) {
    return `<details class="sec" data-sec="${key}"${collapsed.has(key) ? '' : ' open'}>
      <summary><span>${title}</span>${meta ? `<span class="count">${meta}</span>` : ''}</summary>
      <div class="sec-body">${body}</div>
    </details>`;
  }

  function itemHTML(key, def, item, i, n) {
    const btn = (action, label, glyph, disabled) =>
      `<button type="button" class="icon-btn" data-action="${action}" data-list="${key}" data-index="${i}" aria-label="${label}" title="${label}"${disabled ? ' disabled' : ''}>${glyph}</button>`;
    return `<fieldset class="item">
      <legend class="sr-only">${esc(def.title)} entry ${i + 1}</legend>
      <div class="item-head">
        <span class="item-name">${esc(def.name(item))}</span>
        ${btn('up', 'Move up', '↑', i === 0)}
        ${btn('down', 'Move down', '↓', i === n - 1)}
        ${btn('remove', 'Remove', '×', false)}
      </div>
      <div class="grid">${def.fields.map((f) => fieldHTML(`${key}.${i}.${f.key}`, f, item[f.key])).join('')}</div>
    </fieldset>`;
  }

  function renderEditor() {
    const parts = [
      sectionHTML('basics', 'Contact details', '',
        `<div class="grid">${BASICS.map((f) => fieldHTML('basics.' + f.key, f, state.basics[f.key])).join('')}</div>`),
      sectionHTML('summary', 'Summary', '',
        fieldHTML('summary', { label: 'Two or three sentences on what you do best', type: 'textarea', rows: 4, wide: true }, state.summary)),
    ];
    for (const key of LIST_ORDER) {
      const def = LISTS[key];
      const items = state[key];
      const body = items.map((item, i) => itemHTML(key, def, item, i, items.length)).join('') +
        `<button type="button" class="btn add-btn" data-action="add" data-list="${key}">+ ${def.add}</button>`;
      parts.push(sectionHTML(key, def.title, items.length ? String(items.length) : 'none', body));
    }
    els.editor.innerHTML = parts.join('');
    els.sampleNote.hidden = !state.sample;
  }

  function markEdited() {
    if (state.sample) {
      state.sample = false;
      els.sampleNote.hidden = true;
    }
  }

  function setPath(path, value) {
    const parts = path.split('.');
    let o = state;
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = value;
  }

  els.editor.addEventListener('submit', (e) => e.preventDefault());

  els.editor.addEventListener('input', (e) => {
    const path = e.target.dataset.path;
    if (!path) return;
    setPath(path, e.target.value);
    markEdited();
    const item = e.target.closest('.item');
    if (item) {
      const [key, i] = path.split('.');
      item.querySelector('.item-name').textContent = LISTS[key].name(state[key][i]);
    }
    renderPreview();
    queueSave();
  });

  els.editor.addEventListener('toggle', (e) => {
    const key = e.target.dataset && e.target.dataset.sec;
    if (!key) return;
    if (e.target.open) collapsed.delete(key);
    else collapsed.add(key);
  }, true);

  els.editor.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const { action, list: key } = btn.dataset;
    const list = state[key];
    const i = Number(btn.dataset.index);
    let focusSelector = null;

    if (action === 'add') {
      list.push(LISTS[key].blank());
      focusSelector = '#' + idFor(`${key}.${list.length - 1}.${LISTS[key].fields[0].key}`);
    } else if (action === 'remove') {
      const removed = LISTS[key].name(list[i]);
      list.splice(i, 1);
      setStatus(`Removed “${removed}”`);
      focusSelector = `button[data-action="add"][data-list="${key}"]`;
    } else if (action === 'up' || action === 'down') {
      const j = action === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= list.length) return;
      [list[i], list[j]] = [list[j], list[i]];
      focusSelector = `button[data-action="${action}"][data-list="${key}"][data-index="${j}"]:not(:disabled)`;
    }

    collapsed.delete(key);
    markEdited();
    renderEditor();
    renderPreview();
    queueSave();
    const target = focusSelector && els.editor.querySelector(focusSelector);
    if (target) target.focus();
  });

  // ---------- preview ----------
  const lines = (s) => str(s).split('\n').map((l) => l.replace(/^\s*[-•*]\s*/, '').trim()).filter(Boolean);
  const range = (a, b) => [a, b].map((x) => str(x).trim()).filter(Boolean).join(' – ');

  function entryHTML(title, orgParts, when, bullets) {
    const org = orgParts.map((p) => str(p).trim()).filter(Boolean).map(esc).join(' · ');
    if (!str(title).trim() && !org && !bullets.length) return '';
    return `<div class="r-item">
      <div class="r-item-head">
        <div>${title.trim() ? `<h3>${esc(title.trim())}</h3>` : ''}${org ? `<p class="r-org">${org}</p>` : ''}</div>
        ${when ? `<p class="r-dates">${esc(when)}</p>` : ''}
      </div>
      ${bullets.length ? `<ul class="r-bullets">${bullets.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
    </div>`;
  }

  function renderPreview() {
    const s = state;
    const b = s.basics;
    const contact = ['email', 'phone', 'location', 'website']
      .map((k) => b[k].trim()).filter(Boolean).map((v) => `<li>${esc(v)}</li>`).join('');
    const head = `<header class="r-head">
      <div class="r-id">
        <h1>${b.name.trim() ? esc(b.name.trim()) : '<span class="r-empty">Your name</span>'}</h1>
        ${b.title.trim() ? `<p class="r-title">${esc(b.title.trim())}</p>` : ''}
      </div>
      ${contact ? `<ul class="r-contact">${contact}</ul>` : ''}
    </header>`;

    const sec = (title, body) => (body ? `<section class="r-sec"><h2>${title}</h2><div class="r-sec-body">${body}</div></section>` : '');
    const summary = s.summary.trim() ? `<p>${esc(s.summary.trim())}</p>` : '';
    const experience = s.experience.map((x) => entryHTML(x.role, [x.company, x.location], range(x.start, x.end), lines(x.bullets))).join('');
    const projects = s.projects.map((x) => entryHTML(x.name, [x.link], '', lines(x.description))).join('');
    const education = s.education.map((x) => entryHTML(x.degree, [x.school, x.location], range(x.start, x.end), lines(x.details))).join('');
    const skills = s.skills
      .filter((g) => g.label.trim() || g.items.trim())
      .map((g) => `<div><dt>${esc(g.label.trim())}</dt><dd>${esc(g.items.split(',').map((t) => t.trim()).filter(Boolean).join(', '))}</dd></div>`)
      .join('');

    const accent = (ACCENTS.find((a) => a.id === s.accent) || ACCENTS[0]).value;
    els.resume.className = `resume tpl-${s.template}`;
    els.resume.style.setProperty('--r-accent', accent);
    els.resume.innerHTML = head +
      `<div class="r-main">${sec('Summary', summary)}${sec('Experience', experience)}${sec('Projects', projects)}</div>` +
      `<div class="r-side">${sec('Education', education)}${sec('Skills', skills ? `<dl class="r-skills">${skills}</dl>` : '')}</div>`;
    layoutPages();
  }

  function layoutPages() {
    const r = els.resume;
    r.style.minHeight = '';
    const pages = Math.max(1, Math.ceil((r.scrollHeight - 2) / PAGE_PX));
    r.style.minHeight = pages * 11 + 'in';
    els.breaks.innerHTML = Array.from({ length: pages - 1 }, (_, i) =>
      `<div class="break" style="top:${(i + 1) * PAGE_PX}px"><span>Page ${i + 2}</span></div>`).join('');
    els.pages.textContent = pages === 1 ? '1 page' : `${pages} pages`;
    els.pages.classList.toggle('warn', pages > 1);
    els.pageHint.textContent = pages > 1 ? 'Most recruiters expect one page early in a career.' : '';
    fit();
  }

  function fit() {
    const cs = getComputedStyle(els.stage);
    const avail = els.stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (avail <= 0) return;
    const scale = Math.min(1, avail / SHEET_PX);
    els.scale.style.transform = `scale(${scale})`;
    els.frame.style.width = SHEET_PX * scale + 'px';
    els.frame.style.height = els.scale.offsetHeight * scale + 'px';
  }

  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(els.stage);
  else window.addEventListener('resize', fit);

  // ---------- toolbar ----------
  let embedded = false;
  try { embedded = window.self !== window.top; } catch { embedded = true; }
  if (embedded) {
    els.pdfBtn.disabled = true;
    els.exportBtn.disabled = true;
    els.pdfBtn.title = els.exportBtn.title = 'Open the site directly to use this';
    els.embedNote.hidden = false;
  }

  els.pdfBtn.addEventListener('click', () => {
    setStatus('In the print dialog, choose “Save as PDF”');
    window.print();
  });

  els.exportBtn.addEventListener('click', () => {
    const slug = state.basics.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'resume';
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}-resume.json`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setStatus(`Exported ${a.download}`);
  });

  els.importBtn.addEventListener('click', () => els.importFile.click());
  els.importFile.addEventListener('change', () => {
    const file = els.importFile.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let next = null;
      try { next = normalize(JSON.parse(reader.result)); } catch { next = null; }
      if (!next || !next.basics) {
        setStatus(`Couldn't read ${file.name}. Choose a .json file exported from Nex Resume.`);
      } else {
        next.sample = false;
        replaceState(next);
        setStatus(`Imported ${file.name}`);
      }
      els.importFile.value = '';
    };
    reader.onerror = () => setStatus(`Couldn't open ${file.name}.`);
    reader.readAsText(file);
  });

  function replaceState(next) {
    state = next;
    collapsed.clear();
    syncDesignControls();
    renderEditor();
    renderPreview();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* status already reflects storage */ }
  }

  // Destructive actions ask for a second click instead of a dialog.
  function twoStep(btn, armedText, run) {
    const idle = btn.textContent;
    let timer = null;
    const disarm = () => { clearTimeout(timer); timer = null; btn.textContent = idle; btn.classList.remove('armed'); };
    btn.addEventListener('click', () => {
      if (!timer) {
        btn.textContent = armedText;
        btn.classList.add('armed');
        timer = setTimeout(disarm, 4000);
        return;
      }
      disarm();
      run();
    });
  }
  twoStep(els.resetBtn, 'Click again to replace your résumé', () => {
    replaceState(clone(SAMPLE));
    setStatus('Sample restored');
  });
  twoStep(els.blankBtn, 'Click again to clear every field', () => {
    replaceState(blankState());
    setStatus('Started a blank résumé');
  });

  // ---------- mobile tabs ----------
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      els.app.dataset.view = tab.dataset.view;
      document.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
      if (tab.dataset.view === 'preview') requestAnimationFrame(fit);
    });
  });

  // ---------- start ----------
  renderDesignControls();
  syncDesignControls();
  renderEditor();
  renderPreview();
  setStatus(restored ? 'Restored from this browser' : 'Sample loaded');
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutPages);
})();
