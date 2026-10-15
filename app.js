(() => {
  'use strict';

  const STORAGE_KEY = 'nex-resume:v2';

  const PAPER = {
    letter: { label: 'US Letter · 8.5 × 11 in', w: 816, h: 1056, css: 'letter' },
    a4: { label: 'A4 · 210 × 297 mm', w: 794, h: 1123, css: 'A4' },
  };

  // ---------- icons ----------
  const dot = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="1.5" fill="currentColor" stroke="none"/>`;
  const ICONS = {
    grip: dot(9, 6) + dot(15, 6) + dot(9, 12) + dot(15, 12) + dot(9, 18) + dot(15, 18),
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/>',
    more: dot(5, 12) + dot(12, 12) + dot(19, 12),
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
    link: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    folder: '<path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7"/>',
    badge: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 9h10M7 12h6M15 17v4l2-1 2 1v-4"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/>',
    heart: '<path d="M12 20s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0114 0M16 4.5a3.5 3.5 0 010 7M22 20a7 7 0 00-4-6.3"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    quote: '<path d="M7 7h4v4c0 3-2 5-4 6M15 7h4v4c0 3-2 5-4 6"/>',
    translate: '<path d="M3 5h10M8 3v2M5 5c1 4 4 7 7 8M11 5c-1 4-4 7-7 8M13 21l4-9 4 9M14.5 18h5"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    upload: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
    listUl: '<path d="M9 6h11M9 12h11M9 18h11"/>' + dot(4.5, 6) + dot(4.5, 12) + dot(4.5, 18),
    listOl: '<path d="M10 6h10M10 12h10M10 18h10M4 4.5l1.5-1v5M3.5 14.5c.5-1 2.5-1 2.5.3 0 1-2.5 2-2.5 3.2H6"/>',
  };
  const icon = (name, size = 18, cls = '') =>
    `<svg class="ic ${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  // ---------- section types ----------
  const TYPES = {
    profile: { label: 'Profile', desc: 'A few lines on who you are and what you do best', icon: 'user', kind: 'text', column: 'main' },
    experience: {
      label: 'Professional experience', title: 'Experience', desc: 'Jobs, internships and freelance work', icon: 'briefcase', column: 'main', add: 'Experience',
      labels: { title: 'Job title', subtitle: 'Employer', location: 'City', start: 'Start date', end: 'End date', link: 'Link', body: 'Description' },
    },
    education: {
      label: 'Education', desc: 'Degrees, schools and bootcamps', icon: 'cap', column: 'main', add: 'Education',
      labels: { title: 'Degree', subtitle: 'School', location: 'City', start: 'Start date', end: 'End date', link: 'Link', body: 'Description' },
    },
    skills: {
      label: 'Skills', desc: 'Tools, languages and strengths', icon: 'star', kind: 'compact', column: 'side', add: 'Skill',
      labels: { title: 'Skill', subtitle: 'Information' }, ph: { subtitle: 'Expert, or the tools it covers' },
    },
    languages: {
      label: 'Languages', desc: 'Spoken languages and your level', icon: 'translate', kind: 'compact', column: 'side', add: 'Language',
      labels: { title: 'Language', subtitle: 'Level' }, ph: { subtitle: 'Native, C1, Fluent' },
    },
    projects: {
      label: 'Projects', desc: 'Side projects and open source', icon: 'folder', column: 'main', add: 'Project',
      labels: { title: 'Project', subtitle: 'Your role or the stack', start: 'Start date', end: 'End date', link: 'Link', body: 'Description' },
    },
    certificates: {
      label: 'Certificates', desc: 'Licences and certifications', icon: 'badge', column: 'side', add: 'Certificate',
      labels: { title: 'Certificate', subtitle: 'Issuer', end: 'Date', link: 'Link', body: 'Description' },
    },
    courses: {
      label: 'Courses', desc: 'Training and online courses', icon: 'book', column: 'main', add: 'Course',
      labels: { title: 'Course', subtitle: 'Institution', location: 'City', start: 'Start date', end: 'End date', body: 'Description' },
    },
    awards: {
      label: 'Awards', desc: 'Prizes, honours and scholarships', icon: 'award', column: 'main', add: 'Award',
      labels: { title: 'Award', subtitle: 'Issuer', end: 'Date', body: 'Description' },
    },
    organisations: {
      label: 'Organisations', desc: 'Volunteering, clubs and associations', icon: 'users', column: 'main', add: 'Organisation',
      labels: { title: 'Role', subtitle: 'Organisation', location: 'City', start: 'Start date', end: 'End date', body: 'Description' },
    },
    publications: {
      label: 'Publications', desc: 'Articles, papers and talks', icon: 'file', column: 'main', add: 'Publication',
      labels: { title: 'Title', subtitle: 'Publisher', end: 'Date', link: 'Link', body: 'Description' },
    },
    interests: {
      label: 'Interests', desc: 'Hobbies that say something about you', icon: 'heart', kind: 'compact', column: 'side', add: 'Interest',
      labels: { title: 'Interest', subtitle: 'Details' },
    },
    references: {
      label: 'References', desc: 'People who can vouch for your work', icon: 'quote', column: 'main', add: 'Reference',
      labels: { title: 'Name', subtitle: 'Position and company', location: 'Email or phone', body: 'Note' },
    },
    custom: {
      label: 'Custom section', title: 'Custom', desc: 'Anything else, with your own heading', icon: 'plus', column: 'main', add: 'Entry', multiple: true,
      labels: { title: 'Title', subtitle: 'Subtitle', location: 'City', start: 'Start date', end: 'End date', link: 'Link', body: 'Description' },
    },
  };
  for (const t of Object.values(TYPES)) {
    t.kind = t.kind || 'entries';
    t.title = t.title || t.label;
    t.ph = t.ph || {};
  }
  const ENTRY_KEYS = ['title', 'subtitle', 'location', 'start', 'end', 'link', 'body'];

  // ---------- design ----------
  const FONTS = [
    { id: 'source-serif', name: 'Source Serif', stack: '"Source Serif 4", Georgia, serif' },
    { id: 'lora', name: 'Lora', stack: 'Lora, Georgia, serif' },
    { id: 'eb-garamond', name: 'EB Garamond', stack: '"EB Garamond", Garamond, Georgia, serif' },
    { id: 'plex-sans', name: 'IBM Plex Sans', stack: '"IBM Plex Sans", Arial, sans-serif' },
    { id: 'manrope', name: 'Manrope', stack: 'Manrope, "Segoe UI", Arial, sans-serif' },
    { id: 'work-sans', name: 'Work Sans', stack: '"Work Sans", Arial, sans-serif' },
    { id: 'karla', name: 'Karla', stack: 'Karla, Arial, sans-serif' },
    { id: 'plex-mono', name: 'IBM Plex Mono', stack: '"IBM Plex Mono", Menlo, Consolas, monospace' },
  ];
  const ACCENTS = ['#1f4e79', '#0f6e7a', '#2c6a4e', '#94650f', '#b4492f', '#8a2f2f', '#5a3e8a', '#3a414d'];

  const DEFAULT_DESIGN = {
    template: 'harbor', paper: 'letter', layout: 'one', sideWidth: 32,
    font: 'source-serif', fontSize: 10, lineHeight: 1.35, margin: 0.55, entryGap: 8, sectionGap: 12,
    accent: '#1f4e79',
    accentOn: { name: false, jobTitle: true, headings: true, headingLine: true, dates: false, icons: true, links: true },
    headerBand: false, sideTint: false,
    headingStyle: 'underline', headingUpper: true, headingSize: 'm',
    headerAlign: 'left', contactStyle: 'icons', photoShape: 'circle', photoSize: 84,
    datePos: 'right', subtitleStyle: 'italic',
  };
  const ENUMS = {
    paper: Object.keys(PAPER), layout: ['one', 'left', 'right'], font: FONTS.map((f) => f.id),
    headingStyle: ['underline', 'line', 'box', 'bar', 'top', 'plain'], headingSize: ['s', 'm', 'l'],
    headerAlign: ['left', 'center'], contactStyle: ['icons', 'bullets', 'bars'], photoShape: ['circle', 'rounded', 'square'],
    datePos: ['right', 'below'], subtitleStyle: ['italic', 'normal', 'bold'],
  };
  const RANGES = {
    sideWidth: [25, 42], fontSize: [8.5, 12], lineHeight: [1.15, 1.7], margin: [0.4, 1],
    entryGap: [2, 18], sectionGap: [6, 24], photoSize: [56, 120],
  };
  const FMT = {
    sideWidth: (v) => `${v}%`, fontSize: (v) => `${v} pt`, lineHeight: (v) => v.toFixed(2),
    margin: (v) => `${v.toFixed(2)} in`, entryGap: (v) => `${v} pt`, sectionGap: (v) => `${v} pt`, photoSize: (v) => `${v} px`,
  };

  const TEMPLATE_BASE = { fontSize: 10, lineHeight: 1.35, margin: 0.55, entryGap: 8, sectionGap: 12, headingSize: 'm', datePos: 'right', sideWidth: 32, sideTint: false, headerBand: false };
  const TEMPLATES = [
    { id: 'harbor', name: 'Harbor', design: { layout: 'one', font: 'source-serif', headingStyle: 'underline', headingUpper: true, headerAlign: 'left', accent: '#1f4e79', contactStyle: 'icons', subtitleStyle: 'italic' } },
    { id: 'atlas', name: 'Atlas', design: { layout: 'right', font: 'manrope', fontSize: 10, headingStyle: 'plain', headingUpper: true, headerAlign: 'left', sideTint: true, accent: '#2c6a4e', contactStyle: 'icons', subtitleStyle: 'normal' } },
    { id: 'meridian', name: 'Meridian', design: { layout: 'left', sideWidth: 34, font: 'work-sans', fontSize: 10, headingStyle: 'bar', headingUpper: false, headerAlign: 'left', headerBand: true, accent: '#3a414d', contactStyle: 'icons', subtitleStyle: 'bold' } },
    { id: 'folio', name: 'Folio', design: { layout: 'one', font: 'eb-garamond', fontSize: 11, headingStyle: 'line', headingUpper: true, headerAlign: 'center', accent: '#8a2f2f', contactStyle: 'bullets', subtitleStyle: 'italic' } },
    { id: 'ledger', name: 'Ledger', design: { layout: 'one', font: 'plex-sans', fontSize: 9.5, lineHeight: 1.3, margin: 0.5, entryGap: 6, sectionGap: 10, headingStyle: 'box', headingUpper: true, headerAlign: 'left', accent: '#94650f', contactStyle: 'bars', datePos: 'below', subtitleStyle: 'normal' } },
    { id: 'quill', name: 'Quill', design: { layout: 'right', sideWidth: 30, font: 'lora', headingStyle: 'top', headingUpper: false, headerAlign: 'center', accent: '#5a3e8a', contactStyle: 'bullets', subtitleStyle: 'italic' } },
  ];

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const uid = () => Math.random().toString(36).slice(2, 10);
  const str = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v));
  const esc = (s) => str(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, [lo, hi]) => Math.min(hi, Math.max(lo, v));
  const isEmptyHTML = (h) => !str(h).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  const range = (a, b) => [a, b].map((x) => str(x).trim()).filter(Boolean).join(' – ');
  const href = (l) => (/^(https?:|mailto:)/i.test(l.trim()) ? l.trim() : 'https://' + l.trim());

  const ALLOWED_TAGS = { B: 'strong', STRONG: 'strong', I: 'em', EM: 'em', U: 'u', UL: 'ul', OL: 'ol', LI: 'li', BR: 'br', P: 'p', DIV: 'p', A: 'a' };
  function sanitize(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = str(html);
    const out = document.createElement('div');
    (function walk(src, dst) {
      for (const n of src.childNodes) {
        if (n.nodeType === 3) { dst.append(n.textContent); continue; }
        if (n.nodeType !== 1) continue;
        const tag = ALLOWED_TAGS[n.tagName];
        const linkOk = tag === 'a' && /^(https?:|mailto:)/i.test(n.getAttribute('href') || '');
        if (!tag || (tag === 'a' && !linkOk)) { walk(n, dst); continue; }
        const el = document.createElement(tag);
        if (tag === 'a') el.setAttribute('href', n.getAttribute('href'));
        dst.append(el);
        walk(n, el);
      }
    })(tpl.content, out);
    return out.innerHTML;
  }

  const blankEntry = (o = {}) => ({ id: uid(), hidden: false, ...Object.fromEntries(ENTRY_KEYS.map((k) => [k, ''])), ...o });
  const newSection = (type, o = {}) => ({
    id: uid(), type, title: TYPES[type].title, hidden: false, column: TYPES[type].column, body: '', entries: [], ...o,
  });
  const freshDesign = () => ({ ...DEFAULT_DESIGN, accentOn: { ...DEFAULT_DESIGN.accentOn } });

  function makeSample() {
    const ul = (...items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    return {
      version: 2,
      sample: true,
      personal: {
        name: 'Jordan Okafor', jobTitle: 'Senior Frontend Engineer', email: 'jordan.okafor@example.com',
        phone: '(555) 014-2283', location: 'Austin, TX', website: 'jordanokafor.example.com', linkedin: '', photo: '',
      },
      design: freshDesign(),
      sections: [
        newSection('profile', {
          body: '<p>Frontend engineer with eight years of experience building fast, accessible web apps for logistics and healthcare teams. I care about measurable performance, shared design systems, and helping other engineers grow.</p>',
        }),
        newSection('experience', {
          entries: [
            blankEntry({
              title: 'Senior Frontend Engineer', subtitle: 'Brightline Logistics', location: 'Austin, TX', start: 'Mar 2022', end: 'Present',
              body: ul('Led the rebuild of the shipment tracking dashboard in React and TypeScript, cutting median load time from 4.8 s to 1.3 s.',
                'Designed a shared component library now used by six product teams, replacing three legacy UI kits.',
                'Mentored four engineers through promotion and ran the frontend interview loop.'),
            }),
            blankEntry({
              title: 'Frontend Engineer', subtitle: 'Fieldnote Health', location: 'Remote', start: 'Jun 2019', end: 'Feb 2022',
              body: ul('Built the patient intake flow used by 120 clinics, raising form completion from 61% to 84%.',
                'Introduced end-to-end tests with Playwright, halving release regressions over two quarters.'),
            }),
            blankEntry({
              title: 'Web Developer', subtitle: 'Lakeshore Credit Union', location: 'Chicago, IL', start: 'Aug 2017', end: 'May 2019',
              body: ul('Shipped the first online loan application to meet WCAG 2.1 AA, now handling 40% of new loans.'),
            }),
          ],
        }),
        newSection('projects', {
          entries: [blankEntry({
            title: 'Tidepool', subtitle: 'Maintainer', link: 'github.com/jordanokafor/tidepool',
            body: '<p>Open-source, keyboard-first date range picker for React with 1,900 weekly downloads.</p>',
          })],
        }),
        newSection('education', {
          entries: [blankEntry({
            title: 'B.S. Computer Science', subtitle: 'University of Illinois Urbana-Champaign', location: 'Urbana, IL',
            start: '2013', end: '2017', body: '<p>Minor in Statistics</p>',
          })],
        }),
        newSection('skills', {
          entries: [
            blankEntry({ title: 'Frontend', subtitle: 'React, Next.js, TypeScript, Vite' }),
            blankEntry({ title: 'Testing', subtitle: 'Playwright, Vitest, Testing Library' }),
            blankEntry({ title: 'Practice', subtitle: 'Accessibility, design systems, web performance' }),
          ],
        }),
        newSection('languages', {
          entries: [
            blankEntry({ title: 'English', subtitle: 'Native' }),
            blankEntry({ title: 'Spanish', subtitle: 'Professional (B2)' }),
          ],
        }),
      ],
    };
  }

  function makeBlank() {
    return {
      version: 2, sample: false,
      personal: { name: '', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', photo: '' },
      design: { ...state.design, accentOn: { ...state.design.accentOn } },
      sections: [newSection('profile'), newSection('experience'), newSection('education'), newSection('skills')],
    };
  }

  function normalizeDesign(raw) {
    const d = freshDesign();
    if (!raw || typeof raw !== 'object') return d;
    for (const key of Object.keys(DEFAULT_DESIGN)) {
      const v = raw[key];
      if (key === 'accentOn') {
        for (const k of Object.keys(d.accentOn)) if (typeof v?.[k] === 'boolean') d.accentOn[k] = v[k];
      } else if (ENUMS[key]) {
        if (ENUMS[key].includes(v)) d[key] = v;
      } else if (RANGES[key]) {
        if (typeof v === 'number' && Number.isFinite(v)) d[key] = clamp(v, RANGES[key]);
      } else if (key === 'accent') {
        if (/^#[0-9a-f]{6}$/i.test(str(v))) d[key] = v;
      } else if (typeof v === typeof d[key]) {
        d[key] = v;
      }
    }
    return d;
  }

  function normalize(raw) {
    if (!raw || typeof raw !== 'object' || raw.version !== 2 || !Array.isArray(raw.sections)) return null;
    const p = raw.personal || {};
    const photo = /^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(str(p.photo)) ? p.photo : '';
    return {
      version: 2,
      sample: raw.sample === true,
      personal: {
        name: str(p.name), jobTitle: str(p.jobTitle), email: str(p.email), phone: str(p.phone),
        location: str(p.location), website: str(p.website), linkedin: str(p.linkedin), photo,
      },
      design: normalizeDesign(raw.design),
      sections: raw.sections
        .filter((s) => s && TYPES[s.type])
        .map((s) => ({
          id: str(s.id) || uid(),
          type: s.type,
          title: str(s.title) || TYPES[s.type].title,
          hidden: s.hidden === true,
          column: s.column === 'side' ? 'side' : 'main',
          body: sanitize(s.body),
          entries: (Array.isArray(s.entries) ? s.entries : [])
            .filter((e) => e && typeof e === 'object')
            .map((e) => blankEntry({
              id: str(e.id) || uid(), hidden: e.hidden === true,
              ...Object.fromEntries(ENTRY_KEYS.map((k) => [k, k === 'body' ? sanitize(e[k]) : str(e[k])])),
            })),
        })),
    };
  }

  // ---------- elements ----------
  const els = {
    app: $('app'), rail: $('rail'), sidePanel: $('side-panel'), content: $('panel-content'), customize: $('panel-customize'),
    moreBtn: $('more-btn'), moreMenu: $('more-menu'), toast: $('toast'),
    resume: $('resume'), breaks: $('breaks'), frame: $('sheet-frame'), scale: $('sheet-scale'), stage: $('stage'),
    pages: $('page-count'), pageHint: $('page-hint'), paperLabel: $('paper-label'), status: $('status'),
    embedNote: $('embed-note'), pageStyle: $('page-style'),
    zoomOut: $('zoom-out'), zoomIn: $('zoom-in'), zoomFit: $('zoom-fit'),
    dialog: $('add-dialog'), typeGrid: $('type-grid'), addClose: $('add-close'),
    photoFile: $('photo-file'), importFile: $('import-file'),
    importBtn: $('import-btn'), exportBtn: $('export-btn'), pdfBtn: $('pdf-btn'),
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
      setStatus('Not saved: this browser blocks storage. Use Export to keep a copy.', true);
    }
  }
  function queueSave() {
    clearTimeout(saveTimer);
    setStatus('Saving…');
    saveTimer = setTimeout(save, 400);
  }
  // The status line is always updated; on phones, `notify` also shows a toast
  // because the status line is hidden there.
  let toastTimer = null;
  function setStatus(text, notify = false) {
    els.status.textContent = text;
    if (!notify) return;
    els.toast.textContent = text;
    els.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3200);
  }

  const restored = load();
  let state = restored || makeSample();
  const ui = { panel: 'content', mobilePreview: false, closed: new Set(), openEntry: null, settingsOpen: null, zoom: 'fit', scale: 1 };

  const findSection = (id) => state.sections.find((s) => s.id === id);
  const findEntry = (sec, id) => sec && sec.entries.find((e) => e.id === id);

  function markEdited() {
    if (!state.sample) return;
    state.sample = false;
    const note = els.content.querySelector('.sample-note');
    if (note) note.remove();
  }
  function commit({ content = false, customize = false } = {}) {
    if (content) renderContent();
    if (customize) renderCustomize();
    renderPreview();
    queueSave();
  }

  // ---------- rail ----------
  function renderRail() {
    els.rail.innerHTML = [['content', 'pencil', 'Content'], ['customize', 'sliders', 'Customize'], ['preview', 'eye', 'Preview']]
      .map(([id, ic, label]) => `<button type="button" class="rail-btn${id === 'preview' ? ' rail-preview' : ''}" data-panel="${id}" aria-pressed="false">${icon(ic, 20)}<span>${label}</span></button>`)
      .join('');
  }
  function setPanel(id) {
    if (id === 'preview') ui.mobilePreview = true;
    else { ui.panel = id; ui.mobilePreview = false; }
    els.app.dataset.panel = ui.panel;
    els.app.dataset.mobilePreview = String(ui.mobilePreview);
    els.content.hidden = ui.panel !== 'content';
    els.customize.hidden = ui.panel !== 'customize';
    if (ui.panel === 'customize') renderCustomize();
    els.rail.querySelectorAll('.rail-btn').forEach((b) => {
      const on = b.dataset.panel === 'preview' ? ui.mobilePreview : !ui.mobilePreview && b.dataset.panel === ui.panel;
      b.setAttribute('aria-pressed', String(on));
    });
    if (ui.mobilePreview) requestAnimationFrame(fit);
    if (getComputedStyle(els.sidePanel).overflowY === 'visible') window.scrollTo(0, 0);
  }
  els.rail.addEventListener('click', (e) => {
    const b = e.target.closest('.rail-btn');
    if (b) setPanel(b.dataset.panel);
  });

  // ---------- content panel ----------
  function inputField(id, label, value, attrs, { wide = false, pair = false, type = 'text', ph = '', auto = 'off' } = {}) {
    return `<div class="field${wide ? ' wide' : ''}${pair ? ' pair' : ''}"><label for="${id}">${esc(label)}</label>` +
      `<input type="${type}" id="${id}" name="${id}" value="${esc(value)}" autocomplete="${auto}"${ph ? ` placeholder="${esc(ph)}"` : ''} ${attrs}></div>`;
  }

  function rte(id, label, html, attrs, ph) {
    const tools = [['bold', '<b>B</b>', 'Bold'], ['italic', '<i>I</i>', 'Italic'], ['underline', '<u>U</u>', 'Underline'],
      ['insertUnorderedList', icon('listUl', 16), 'Bulleted list'], ['insertOrderedList', icon('listOl', 16), 'Numbered list']];
    return `<div class="field wide"><span class="label" id="${id}-label">${esc(label)}</span><div class="rte">
      <div class="rte-bar" role="toolbar" aria-label="Formatting">${tools.map(([cmd, glyph, name]) =>
        `<button type="button" data-cmd="${cmd}" aria-label="${name}" title="${name}">${glyph}</button>`).join('')}</div>
      <div class="rte-area" id="${id}" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="${id}-label" data-ph="${esc(ph || '')}" ${attrs}>${html}</div>
    </div></div>`;
  }

  function cardHead(key, open, lead, title, sub, trailing) {
    return `<div class="card-head">${lead}
      <button type="button" class="card-toggle" data-act="toggle-card" data-card="${key}" aria-expanded="${open}">
        ${title}<span class="card-text"><span class="card-title">${sub[0]}</span>${sub[1] ? `<span class="card-sub">${sub[1]}</span>` : ''}</span>
        ${icon('chevron', 18, 'chev')}
      </button>${trailing}</div>`;
  }

  function personalCard() {
    const p = state.personal;
    const open = !ui.closed.has('personal');
    const avatar = p.photo ? `<img class="avatar" src="${p.photo}" alt="">` : `<span class="avatar">${icon('user')}</span>`;
    const f = (key, label, opts) => inputField(`p-${key}`, label, p[key], `data-bind="${key}"`, opts);
    return `<section class="card" data-card="personal">
      ${cardHead('personal', open, '<span class="handle" aria-hidden="true"></span>', avatar, [esc(p.name) || 'Your name', esc(p.jobTitle) || 'Personal details'], '')}
      <div class="card-body"${open ? '' : ' hidden'}>
        <div class="photo-row">
          ${p.photo ? `<img class="avatar" src="${p.photo}" alt="Your photo">` : `<span class="avatar">${icon('user', 26)}</span>`}
          <div class="photo-actions">
            <button type="button" class="btn" data-act="upload-photo">${icon('upload', 16)} ${p.photo ? 'Change photo' : 'Upload photo'}</button>
            ${p.photo ? `<button type="button" class="btn quiet" data-act="remove-photo">Remove</button>` : ''}
          </div>
        </div>
        <div class="grid">
          ${f('name', 'Full name', { wide: true, auto: 'name' })}
          ${f('jobTitle', 'Job title', { wide: true, ph: 'Senior Frontend Engineer' })}
          ${f('email', 'Email', { type: 'email', auto: 'email' })}
          ${f('phone', 'Phone', { type: 'tel', auto: 'tel' })}
          ${f('location', 'Location', { ph: 'City, State' })}
          ${f('website', 'Website', { ph: 'yourname.dev' })}
          ${f('linkedin', 'LinkedIn or other profile', { wide: true, ph: 'linkedin.com/in/yourname' })}
        </div>
      </div>
    </section>`;
  }

  function entrySummary(e) {
    return { title: e.title.trim() || 'Untitled', sub: [e.subtitle.trim(), range(e.start, e.end)].filter(Boolean).join(' · ') };
  }

  function entryForm(sec, e) {
    const t = TYPES[sec.type];
    const L = t.labels;
    const field = (key) => {
      const wide = key === 'title' || key === 'link' || (key === 'subtitle' && !L.location) || (t.kind === 'compact');
      return inputField(`e-${e.id}-${key}`, L[key], e[key], `data-entry-key="${key}"`, {
        wide, pair: (key === 'start' || key === 'end') && L.start && L.end, ph: t.ph[key] || (key === 'end' && L.start ? 'Present' : ''),
      });
    };
    const fields = ENTRY_KEYS.filter((k) => k !== 'body' && L[k]).map(field).join('');
    return `<div class="entry-form">
      <div class="grid">${fields}</div>
      ${L.body ? rte(`e-${e.id}-body`, L.body, e.body, 'data-rich="entry"', 'Use bullet points for achievements, with numbers where you have them.') : ''}
      <div class="entry-foot">
        <button type="button" class="btn quiet danger" data-act="delete-entry" data-confirm="Click again to delete">${icon('trash', 16)} Delete</button>
        <button type="button" class="btn primary" data-act="toggle-entry">Done</button>
      </div>
    </div>`;
  }

  function entryItem(sec, e) {
    const open = ui.openEntry === e.id;
    const s = entrySummary(e);
    return `<li class="entry${open ? ' open' : ''}${e.hidden ? ' is-hidden' : ''}" data-entry-id="${e.id}">
      <div class="entry-row">
        <button type="button" class="handle" data-sort="entry" aria-label="Move ${esc(s.title)}. Use the arrow keys." title="Drag to reorder">${icon('grip', 16)}</button>
        <button type="button" class="entry-toggle" data-act="toggle-entry" aria-expanded="${open}">
          <span class="entry-title">${esc(s.title)}</span><span class="entry-sub">${esc(s.sub)}</span>
        </button>
        <button type="button" class="icon-btn" data-act="toggle-entry-hidden" aria-pressed="${!e.hidden}" aria-label="${e.hidden ? 'Show' : 'Hide'} ${esc(s.title)} on the résumé" title="${e.hidden ? 'Hidden on résumé' : 'Shown on résumé'}">${icon(e.hidden ? 'eyeOff' : 'eye', 17)}</button>
      </div>
      ${open ? entryForm(sec, e) : ''}
    </li>`;
  }

  function sectionCard(sec) {
    const t = TYPES[sec.type];
    const open = !ui.closed.has(sec.id);
    const n = sec.entries.length;
    const title = esc(sec.title) || t.label;
    const settings = ui.settingsOpen === sec.id;
    const body = t.kind === 'text'
      ? rte(`s-${sec.id}-body`, 'Text', sec.body, 'data-rich="section"', 'Two or three sentences on what you do and what you are looking for.')
      : `<ul class="entry-list">${sec.entries.map((e) => entryItem(sec, e)).join('')}</ul>
         <button type="button" class="add-entry" data-act="add-entry">${icon('plus', 16)} ${esc(t.add)}</button>`;
    return `<section class="card sec-card${sec.hidden ? ' is-hidden' : ''}" data-sec-id="${sec.id}">
      ${cardHead(sec.id, open,
        `<button type="button" class="handle" data-sort="section" aria-label="Move ${title}. Use the arrow keys." title="Drag to reorder">${icon('grip', 16)}</button>`,
        `<span class="card-icon">${icon(t.icon)}</span>`,
        [title, t.kind === 'text' ? (sec.hidden ? 'Hidden' : '') : `${n} ${n === 1 ? 'entry' : 'entries'}${sec.hidden ? ' · hidden' : ''}`],
        `<button type="button" class="icon-btn" data-act="toggle-sec-hidden" aria-pressed="${!sec.hidden}" aria-label="${sec.hidden ? 'Show' : 'Hide'} ${title} on the résumé" title="${sec.hidden ? 'Hidden on résumé' : 'Shown on résumé'}">${icon(sec.hidden ? 'eyeOff' : 'eye', 17)}</button>
         <button type="button" class="icon-btn" data-act="sec-settings" aria-expanded="${settings}" aria-label="${title} settings" title="Rename or delete">${icon('more', 17)}</button>`)}
      <div class="card-body"${open ? '' : ' hidden'}>
        ${settings ? `<div class="sec-settings">
          ${inputField(`st-${sec.id}`, 'Section heading', sec.title, 'data-sec-title')}
          <button type="button" class="btn quiet danger" data-act="delete-sec" data-confirm="Click again to delete section">${icon('trash', 16)} Delete section</button>
        </div>` : ''}
        ${body}
      </div>
    </section>`;
  }

  function renderContent() {
    els.content.innerHTML = [
      state.sample ? '<p class="sample-note">This is a sample résumé. Replace it with your own details; changes save in this browser as you type.</p>' : '',
      personalCard(),
      `<div class="sec-list" id="sec-list" style="display:grid;gap:12px">${state.sections.map(sectionCard).join('')}</div>`,
      `<button type="button" class="add-content" data-act="open-add">${icon('plus', 20)} Add content</button>`,
      `<div class="panel-foot">
        <button type="button" class="btn quiet" data-act="start-blank" data-confirm="Click again to clear everything">Start blank</button>
        <button type="button" class="btn quiet" data-act="restore-sample" data-confirm="Click again to replace your résumé">Restore sample</button>
      </div>`,
    ].join('');
  }

  // Destructive buttons ask for a second click instead of a dialog.
  function confirmed(btn) {
    if (!btn.dataset.confirm || btn.dataset.armed === '1') return true;
    const idle = btn.innerHTML;
    btn.dataset.armed = '1';
    btn.classList.add('armed');
    btn.textContent = btn.dataset.confirm;
    setTimeout(() => {
      if (!btn.isConnected) return;
      btn.dataset.armed = '';
      btn.classList.remove('armed');
      btn.innerHTML = idle;
    }, 4000);
    return false;
  }

  els.content.addEventListener('mousedown', (e) => {
    if (e.target.closest('.rte-bar button')) e.preventDefault(); // keep the text selection
  });

  els.content.addEventListener('click', (e) => {
    const cmdBtn = e.target.closest('.rte-bar button');
    if (cmdBtn) {
      const area = cmdBtn.closest('.rte').querySelector('.rte-area');
      if (document.activeElement !== area) area.focus();
      document.execCommand(cmdBtn.dataset.cmd, false);
      return;
    }
    const btn = e.target.closest('[data-act]');
    if (!btn || !confirmed(btn)) return;
    const card = btn.closest('[data-sec-id]');
    const sec = card && findSection(card.dataset.secId);
    const li = btn.closest('[data-entry-id]');
    const entry = li && findEntry(sec, li.dataset.entryId);

    switch (btn.dataset.act) {
      case 'toggle-card': {
        const key = btn.dataset.card;
        const open = btn.getAttribute('aria-expanded') !== 'true';
        if (open) ui.closed.delete(key); else ui.closed.add(key);
        btn.setAttribute('aria-expanded', String(open));
        btn.closest('.card').querySelector('.card-body').hidden = !open;
        return;
      }
      case 'sec-settings':
        ui.settingsOpen = ui.settingsOpen === sec.id ? null : sec.id;
        ui.closed.delete(sec.id);
        renderContent();
        if (ui.settingsOpen) $(`st-${sec.id}`)?.focus();
        return;
      case 'toggle-sec-hidden':
        sec.hidden = !sec.hidden;
        commit({ content: true });
        focusAfterRender(`[data-sec-id="${sec.id}"] [data-act="toggle-sec-hidden"]`);
        return;
      case 'delete-sec':
        state.sections = state.sections.filter((s) => s !== sec);
        markEdited();
        setStatus(`Deleted ${sec.title}`, true);
        commit({ content: true, customize: ui.panel === 'customize' });
        return;
      case 'toggle-entry':
        ui.openEntry = ui.openEntry === entry.id ? null : entry.id;
        renderContent();
        focusAfterRender(ui.openEntry ? `#e-${entry.id}-title` : `[data-entry-id="${entry.id}"] .entry-toggle`);
        return;
      case 'toggle-entry-hidden':
        entry.hidden = !entry.hidden;
        commit({ content: true });
        focusAfterRender(`[data-entry-id="${entry.id}"] [data-act="toggle-entry-hidden"]`);
        return;
      case 'add-entry': {
        const fresh = blankEntry();
        sec.entries.push(fresh);
        ui.openEntry = fresh.id;
        markEdited();
        commit({ content: true });
        focusAfterRender(`#e-${fresh.id}-title`);
        return;
      }
      case 'delete-entry':
        sec.entries = sec.entries.filter((x) => x !== entry);
        markEdited();
        setStatus(`Deleted ${entry.title || 'entry'}`, true);
        commit({ content: true });
        return;
      case 'open-add':
        openAddDialog();
        return;
      case 'upload-photo':
        els.photoFile.click();
        return;
      case 'remove-photo':
        state.personal.photo = '';
        commit({ content: true });
        return;
      case 'start-blank':
        replaceState(makeBlank());
        setStatus('Started a blank résumé', true);
        return;
      case 'restore-sample':
        replaceState(makeSample());
        setStatus('Sample restored', true);
        return;
    }
  });

  function focusAfterRender(selector) {
    const el = els.content.querySelector(selector);
    if (el) el.focus();
  }

  els.content.addEventListener('input', (e) => {
    const t = e.target;
    const card = t.closest('[data-sec-id]');
    const sec = card && findSection(card.dataset.secId);
    if (t.dataset.bind) {
      state.personal[t.dataset.bind] = t.value;
      if (t.dataset.bind === 'name' || t.dataset.bind === 'jobTitle') {
        const head = els.content.querySelector('[data-card="personal"] .card-text');
        head.children[0].textContent = state.personal.name || 'Your name';
        if (head.children[1]) head.children[1].textContent = state.personal.jobTitle || 'Personal details';
      }
    } else if (t.dataset.entryKey) {
      const li = t.closest('[data-entry-id]');
      const entry = findEntry(sec, li.dataset.entryId);
      entry[t.dataset.entryKey] = t.value;
      const s = entrySummary(entry);
      li.querySelector('.entry-title').textContent = s.title;
      li.querySelector('.entry-sub').textContent = s.sub;
    } else if (t.dataset.rich) {
      const html = sanitize(t.innerHTML);
      if (t.dataset.rich === 'entry') findEntry(sec, t.closest('[data-entry-id]').dataset.entryId).body = html;
      else sec.body = html;
    } else if (t.hasAttribute('data-sec-title')) {
      sec.title = t.value;
      card.querySelector('.card-title').textContent = t.value || TYPES[sec.type].label;
    } else {
      return;
    }
    markEdited();
    renderPreview();
    queueSave();
  });

  // Paste as plain text so formatting from other apps doesn't leak in.
  els.content.addEventListener('paste', (e) => {
    if (!e.target.closest('.rte-area')) return;
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  });

  // ---------- reordering: drag a handle, or focus it and use the arrow keys ----------
  let drag = null;
  els.content.addEventListener('pointerdown', (e) => {
    const h = e.target.closest('.handle[data-sort]');
    if (!h || e.button !== 0) return;
    const item = h.dataset.sort === 'section' ? h.closest('.sec-card') : h.closest('.entry');
    e.preventDefault();
    h.setPointerCapture(e.pointerId);
    drag = { item, list: item.parentElement, kind: h.dataset.sort };
    item.classList.add('dragging');
    document.body.classList.add('is-dragging');
  });
  els.content.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const { item, list } = drag;
    // Scroll the panel (or the page, on phones) when dragging near an edge.
    const scroller = getComputedStyle(els.sidePanel).overflowY === 'visible' ? document.scrollingElement : els.sidePanel;
    const box = scroller === els.sidePanel ? els.sidePanel.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
    if (e.clientY < box.top + 90) scroller.scrollBy(0, -14);
    else if (e.clientY > box.bottom - 110) scroller.scrollBy(0, 14);
    const next = [...list.children].find((c) => c !== item && e.clientY < c.getBoundingClientRect().top + c.offsetHeight / 2);
    if (next) { if (item.nextElementSibling !== next) list.insertBefore(item, next); }
    else if (list.lastElementChild !== item) list.append(item);
  });
  const endDrag = () => {
    if (!drag) return;
    const { item, list, kind } = drag;
    drag = null;
    item.classList.remove('dragging');
    document.body.classList.remove('is-dragging');
    const ids = [...list.children].map((c) => c.dataset.secId || c.dataset.entryId);
    if (kind === 'section') reorder(state.sections, ids, (a) => { state.sections = a; });
    else {
      const sec = findSection(list.closest('[data-sec-id]').dataset.secId);
      reorder(sec.entries, ids, (a) => { sec.entries = a; });
    }
  };
  els.content.addEventListener('pointerup', endDrag);
  els.content.addEventListener('pointercancel', endDrag);

  function reorder(arr, ids, assign) {
    const map = new Map(arr.map((x) => [x.id, x]));
    const next = ids.map((id) => map.get(id)).filter(Boolean);
    if (next.length !== arr.length || next.every((x, i) => x === arr[i])) return;
    assign(next);
    markEdited();
    commit({ customize: ui.panel === 'customize' });
  }

  els.content.addEventListener('keydown', (e) => {
    const h = e.target.closest('.handle[data-sort]');
    if (!h || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    e.preventDefault();
    const delta = e.key === 'ArrowUp' ? -1 : 1;
    const card = h.closest('[data-sec-id]');
    const sec = findSection(card.dataset.secId);
    let arr, id, sel;
    if (h.dataset.sort === 'section') {
      arr = state.sections; id = sec.id; sel = `[data-sec-id="${id}"] > .card-head .handle`;
    } else {
      arr = sec.entries; id = h.closest('[data-entry-id]').dataset.entryId; sel = `[data-entry-id="${id}"] .handle`;
    }
    const i = arr.findIndex((x) => x.id === id);
    const j = i + delta;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    markEdited();
    commit({ content: true });
    focusAfterRender(sel);
    setStatus(`Moved to position ${j + 1} of ${arr.length}`);
  });

  // ---------- add content dialog ----------
  function openAddDialog() {
    const have = new Set(state.sections.map((s) => s.type));
    const isTaken = ([type, t]) => have.has(type) && !t.multiple;
    const entries = Object.entries(TYPES);
    els.typeGrid.innerHTML = [...entries.filter((x) => !isTaken(x)), ...entries.filter(isTaken)].map(([type, t]) => {
      const taken = isTaken([type, t]);
      return `<button type="button" class="type-btn" data-add-type="${type}"${taken ? ' disabled' : ''}>
        <span class="card-icon">${icon(t.icon)}</span>
        <span><span class="type-name">${esc(t.label)}</span><span class="type-desc">${taken ? 'Already on your résumé' : esc(t.desc)}</span></span>
      </button>`;
    }).join('');
    if (typeof els.dialog.showModal === 'function') els.dialog.showModal();
    else els.dialog.setAttribute('open', '');
    els.typeGrid.querySelector('button:not(:disabled)')?.focus();
  }
  function closeAddDialog() {
    if (typeof els.dialog.close === 'function') els.dialog.close();
    else els.dialog.removeAttribute('open');
  }
  els.addClose.addEventListener('click', closeAddDialog);
  els.dialog.addEventListener('click', (e) => { if (e.target === els.dialog) closeAddDialog(); });
  els.typeGrid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add-type]');
    if (!b || b.disabled) return;
    const type = b.dataset.addType;
    const sec = newSection(type);
    if (TYPES[type].kind !== 'text') {
      const first = blankEntry();
      sec.entries.push(first);
      ui.openEntry = first.id;
    }
    state.sections.push(sec);
    closeAddDialog();
    markEdited();
    commit({ content: true });
    const card = els.content.querySelector(`[data-sec-id="${sec.id}"]`);
    card.scrollIntoView({ block: 'start', behavior: 'smooth' });
    (card.querySelector('.entry-form input') || card.querySelector('.rte-area'))?.focus({ preventScroll: true });
    setStatus(`Added ${TYPES[type].label}`, true);
  });

  // ---------- photo ----------
  els.photoFile.addEventListener('change', () => {
    const file = els.photoFile.files[0];
    els.photoFile.value = '';
    if (!file) return;
    if (!/^image\//.test(file.type)) { setStatus(`${file.name} isn't an image. Choose a JPG or PNG.`, true); return; }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const size = Math.min(480, side);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      canvas.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      state.personal.photo = canvas.toDataURL('image/jpeg', 0.86);
      markEdited();
      commit({ content: true });
      setStatus('Photo added', true);
    };
    img.onerror = () => { URL.revokeObjectURL(url); setStatus(`Couldn't read ${file.name}. Try a JPG or PNG.`, true); };
    img.src = url;
  });

  // ---------- customize panel ----------
  const LAYOUT_ART = {
    one: '<rect x="6" y="14" width="28" height="2" class="art-line"/><rect x="6" y="20" width="28" height="2" class="art-line"/><rect x="6" y="26" width="22" height="2" class="art-line"/><rect x="6" y="32" width="28" height="2" class="art-line"/><rect x="6" y="38" width="18" height="2" class="art-line"/>',
    left: '<rect x="5" y="13" width="10" height="31" rx="1" class="art-side"/><rect x="18" y="14" width="17" height="2" class="art-line"/><rect x="18" y="20" width="17" height="2" class="art-line"/><rect x="18" y="26" width="13" height="2" class="art-line"/><rect x="18" y="32" width="17" height="2" class="art-line"/>',
    right: '<rect x="25" y="13" width="10" height="31" rx="1" class="art-side"/><rect x="5" y="14" width="17" height="2" class="art-line"/><rect x="5" y="20" width="17" height="2" class="art-line"/><rect x="5" y="26" width="13" height="2" class="art-line"/><rect x="5" y="32" width="17" height="2" class="art-line"/>',
  };
  const layoutArt = (k) => `<svg class="art" viewBox="0 0 40 50" aria-hidden="true"><rect x="1" y="1" width="38" height="48" rx="3" class="art-page"/><rect x="6" y="5" width="16" height="4" rx="1" class="art-ink"/>${LAYOUT_ART[k]}</svg>`;

  function getDesign(key) {
    const [a, b] = key.split('.');
    return b ? state.design[a][b] : state.design[a];
  }
  function setDesign(key, v) {
    const [a, b] = key.split('.');
    if (b) state.design[a][b] = v; else state.design[a] = v;
  }

  const ccard = (title, body) => `<section class="c-card"><h2>${title}</h2>${body}</section>`;
  const group = (label, body) => `<div class="c-group"><span class="c-label">${label}</span>${body}</div>`;
  function choice(key, label, opts) {
    return group(label, `<div class="choices" role="radiogroup" aria-label="${esc(label)}">${opts.map((o) => {
      const id = `d-${key}-${o.value}`;
      return `<label class="choice" for="${id}"><input type="radio" name="d-${key}" id="${id}" value="${o.value}" data-design="${key}"${getDesign(key) === o.value ? ' checked' : ''}>${o.art || ''}<span>${o.label}</span></label>`;
    }).join('')}</div>`);
  }
  function slider(key, label, step) {
    const [min, max] = RANGES[key];
    const v = getDesign(key);
    return `<div class="range"><label for="d-${key}">${label}</label><output id="o-${key}" for="d-${key}">${FMT[key](v)}</output>
      <input type="range" id="d-${key}" min="${min}" max="${max}" step="${step}" value="${v}" data-design="${key}"></div>`;
  }
  function toggle(key, label) {
    const id = `d-${key.replace('.', '-')}`;
    return `<label class="toggle" for="${id}"><input type="checkbox" id="${id}" data-design="${key}"${getDesign(key) ? ' checked' : ''}><span class="switch" aria-hidden="true"></span><span>${label}</span></label>`;
  }

  function thumb(tp) {
    const d = { ...DEFAULT_DESIGN, ...TEMPLATE_BASE, ...tp.design };
    const side = d.layout === 'one' ? '' : `<span class="t-side${d.sideTint ? ' tint' : ''}"><i class="h"></i><i></i><i class="short"></i><i></i><i class="h"></i><i></i><i class="short"></i></span>`;
    return `<span class="thumb" style="--t-accent:${d.accent}">
      <span class="t-head${d.headerBand ? ' band' : ''}${d.headerAlign === 'center' ? ' center' : ''}"><i class="name"></i><i class="short"></i></span>
      <span class="t-cols ${d.layout}"><span class="t-main"><i class="h"></i><i></i><i></i><i class="short"></i><i></i><i class="h"></i><i></i><i></i><i class="short"></i></span>${side}</span>
    </span>`;
  }

  function renderCustomize() {
    const d = state.design;
    const sections = state.sections;
    els.customize.innerHTML = [
      ccard('Templates', `<div class="tpl-grid">${TEMPLATES.map((tp) =>
        `<button type="button" class="tpl" data-template="${tp.id}" aria-pressed="${d.template === tp.id}">${thumb(tp)}<span>${tp.name}</span></button>`).join('')}</div>`),
      ccard('Layout', [
        choice('layout', 'Columns', [
          { value: 'one', label: 'One column', art: layoutArt('one') },
          { value: 'left', label: 'Sidebar left', art: layoutArt('left') },
          { value: 'right', label: 'Sidebar right', art: layoutArt('right') },
        ]),
        d.layout === 'one' ? '' : slider('sideWidth', 'Sidebar width', 1),
        d.layout === 'one' || !sections.length ? '' : group('Where each section goes', `<div class="col-list">${sections.map((s) => `
          <div class="col-row"><span>${esc(s.title) || TYPES[s.type].label}</span>
            <div class="mini-seg" role="radiogroup" aria-label="${esc(s.title)} column">
              <label for="col-${s.id}-main"><input type="radio" id="col-${s.id}-main" name="col-${s.id}" value="main" data-column="${s.id}"${s.column !== 'side' ? ' checked' : ''}>Main</label>
              <label for="col-${s.id}-side"><input type="radio" id="col-${s.id}-side" name="col-${s.id}" value="side" data-column="${s.id}"${s.column === 'side' ? ' checked' : ''}>Sidebar</label>
            </div></div>`).join('')}</div>`),
        choice('paper', 'Paper size', [{ value: 'letter', label: 'US Letter' }, { value: 'a4', label: 'A4' }]),
      ].join('')),
      ccard('Spacing', [
        slider('fontSize', 'Font size', 0.5), slider('lineHeight', 'Line height', 0.05),
        slider('margin', 'Page margins', 0.05), slider('entryGap', 'Space between entries', 1), slider('sectionGap', 'Space between sections', 1),
      ].join('')),
      ccard('Colours', [
        group('Accent colour', `<div class="swatches" role="radiogroup" aria-label="Accent colour">${ACCENTS.map((c, i) =>
          `<label class="swatch" for="d-accent-${i}" style="--sw:${c}" title="${c}"><input type="radio" name="d-accent" id="d-accent-${i}" value="${c}" data-design="accent"${d.accent.toLowerCase() === c ? ' checked' : ''}><span class="sr-only">${c}</span></label>`).join('')}
          <label class="custom-color" for="d-accent-custom"><input type="color" id="d-accent-custom" value="${d.accent}" data-design="accent">Custom</label></div>`),
        group('Use the accent on', `<div class="toggles">${toggle('accentOn.name', 'Name')}${toggle('accentOn.jobTitle', 'Job title')}${toggle('accentOn.headings', 'Section headings')}${toggle('accentOn.headingLine', 'Heading lines')}${toggle('accentOn.dates', 'Dates')}${toggle('accentOn.icons', 'Contact icons')}${toggle('accentOn.links', 'Links')}</div>`),
        group('Fills', `<div class="toggles">${toggle('headerBand', 'Coloured header')}${toggle('sideTint', 'Tinted sidebar')}</div>`),
      ].join('')),
      ccard('Font', choice('font', 'Typeface', FONTS.map((f) => ({ value: f.id, label: f.name, art: `<span class="font-aa" style="font-family:${esc(f.stack)}">Aa</span>` })))),
      ccard('Section headings', [
        choice('headingStyle', 'Style', ENUMS.headingStyle.map((h) => ({ value: h, label: h[0].toUpperCase() + h.slice(1), art: `<span class="h-art ${h}">Skills</span>` }))),
        choice('headingSize', 'Size', [{ value: 's', label: 'Small' }, { value: 'm', label: 'Medium' }, { value: 'l', label: 'Large' }]),
        toggle('headingUpper', 'Capital letters'),
      ].join('')),
      ccard('Header', [
        choice('headerAlign', 'Alignment', [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Centred' }]),
        choice('contactStyle', 'Contact details', [{ value: 'icons', label: 'Icons' }, { value: 'bullets', label: 'Dots ·' }, { value: 'bars', label: 'Bars |' }]),
        choice('photoShape', 'Photo shape', [{ value: 'circle', label: 'Circle' }, { value: 'rounded', label: 'Rounded' }, { value: 'square', label: 'Square' }]),
        slider('photoSize', 'Photo size', 2),
      ].join('')),
      ccard('Entries', [
        choice('datePos', 'Dates and location', [{ value: 'right', label: 'Right side' }, { value: 'below', label: 'Under the title' }]),
        choice('subtitleStyle', 'Employer and school', [{ value: 'italic', label: 'Italic' }, { value: 'normal', label: 'Regular' }, { value: 'bold', label: 'Bold' }]),
      ].join('')),
    ].join('');
  }

  els.customize.addEventListener('click', (e) => {
    const b = e.target.closest('[data-template]');
    if (!b) return;
    const tp = TEMPLATES.find((x) => x.id === b.dataset.template);
    Object.assign(state.design, TEMPLATE_BASE, tp.design, { template: tp.id });
    for (const s of state.sections) s.column = TYPES[s.type].column;
    commit({ customize: true });
    setStatus(`Applied the ${tp.name} template`, true);
  });

  els.customize.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.column) {
      findSection(t.dataset.column).column = t.value;
      commit();
      return;
    }
    const key = t.dataset.design;
    if (!key) return;
    const v = t.type === 'checkbox' ? t.checked : t.type === 'range' ? Number(t.value) : t.value;
    setDesign(key, v);
    if (t.type === 'range') $(`o-${key}`).textContent = FMT[key](v);
    if (key === 'accent') {
      $('d-accent-custom').value = v;
      els.customize.querySelectorAll('input[name="d-accent"]').forEach((r) => { r.checked = r.value === v.toLowerCase(); });
    }
    commit({ customize: key === 'layout' });
  });

  // ---------- preview ----------
  function entryHTML(e) {
    const title = e.title.trim();
    const sub = e.subtitle.trim();
    const dates = range(e.start, e.end);
    const loc = e.location.trim();
    const meta = [dates && `<span class="r-dates">${esc(dates)}</span>`, loc && `<span class="r-loc">${esc(loc)}</span>`].filter(Boolean).join('');
    const link = e.link.trim() ? `<a class="r-link" href="${esc(href(e.link))}">${esc(e.link.trim())}</a>` : '';
    return `<div class="r-entry">
      <div class="r-entry-head">
        <div class="r-entry-id">${title ? `<h3 class="r-title">${esc(title)}</h3>` : ''}${sub ? `<p class="r-sub">${esc(sub)}</p>` : ''}</div>
        ${meta ? `<div class="r-meta">${meta}</div>` : ''}
      </div>
      ${link}${isEmptyHTML(e.body) ? '' : `<div class="r-body">${e.body}</div>`}
    </div>`;
  }

  function sectionHTML(s) {
    const t = TYPES[s.type];
    let body = '';
    if (t.kind === 'text') {
      if (!isEmptyHTML(s.body)) body = `<div class="r-body">${s.body}</div>`;
    } else {
      const items = s.entries.filter((e) => !e.hidden && (e.title.trim() || e.subtitle.trim() || !isEmptyHTML(e.body)));
      if (items.length) {
        body = t.kind === 'compact'
          ? `<ul class="r-compact">${items.map((e) => `<li><span class="r-c-title">${esc(e.title.trim())}</span>${e.subtitle.trim() ? `<span class="r-c-sub">${esc(e.subtitle.trim())}</span>` : ''}</li>`).join('')}</ul>`
          : items.map(entryHTML).join('');
      }
    }
    return body ? `<section class="r-section"><h2 class="r-heading"><span>${esc(s.title.trim() || t.label)}</span></h2>${body}</section>` : '';
  }

  function renderPreview() {
    const d = state.design;
    const p = state.personal;
    const paper = PAPER[d.paper];
    const font = FONTS.find((f) => f.id === d.font) || FONTS[0];
    const r = els.resume;

    const flags = ['resume'];
    for (const [k, cls] of [['name', 'ac-name'], ['jobTitle', 'ac-title'], ['headings', 'ac-headings'], ['headingLine', 'ac-line'], ['dates', 'ac-dates'], ['icons', 'ac-icons'], ['links', 'ac-links']]) {
      if (d.accentOn[k]) flags.push(cls);
    }
    if (d.headingUpper) flags.push('h-upper');
    if (d.headerBand) flags.push('band');
    if (d.sideTint) flags.push('side-tint');
    r.className = flags.join(' ');
    Object.assign(r.dataset, {
      layout: d.layout, h: d.headingStyle, hsize: d.headingSize, align: d.headerAlign, contact: d.contactStyle,
      photo: d.photoShape, datepos: d.datePos, sub: d.subtitleStyle,
    });
    r.style.cssText = `--r-accent:${d.accent};--r-font:${font.stack};--r-size:${d.fontSize}pt;--r-lh:${d.lineHeight};` +
      `--r-margin:${d.margin}in;--r-entry-gap:${d.entryGap}pt;--r-section-gap:${d.sectionGap}pt;--r-side-w:${d.sideWidth}%;` +
      `--r-photo:${d.photoSize}px;--r-w:${paper.w}px;--r-h:${paper.h}px;`;

    const contacts = [['mail', p.email], ['phone', p.phone], ['pin', p.location], ['globe', p.website], ['link', p.linkedin]]
      .filter(([, v]) => v.trim())
      .map(([ic, v]) => `<li>${icon(ic, 12)}<span>${esc(v.trim())}</span></li>`).join('');
    const header = `<header class="r-header">
      ${p.photo ? `<img class="r-photo" src="${p.photo}" alt="">` : ''}
      <div class="r-id">
        <h1 class="r-name">${p.name.trim() ? esc(p.name.trim()) : '<span class="r-empty">Your name</span>'}</h1>
        ${p.jobTitle.trim() ? `<p class="r-job">${esc(p.jobTitle.trim())}</p>` : ''}
        ${contacts ? `<ul class="r-contacts">${contacts}</ul>` : ''}
      </div>
    </header>`;

    const visible = state.sections.filter((s) => !s.hidden);
    const main = d.layout === 'one' ? visible : visible.filter((s) => s.column !== 'side');
    const side = d.layout === 'one' ? [] : visible.filter((s) => s.column === 'side');
    r.innerHTML = header +
      `<div class="r-cols"><div class="r-main">${main.map(sectionHTML).join('')}</div>` +
      (d.layout === 'one' ? '' : `<div class="r-side">${side.map(sectionHTML).join('')}</div>`) + '</div>';

    els.paperLabel.textContent = paper.label;
    els.pageStyle.textContent = `@page { size: ${paper.css}; margin: ${d.margin}in 0; }`;
    layoutPages();
  }

  function layoutPages() {
    const paper = PAPER[state.design.paper];
    const r = els.resume;
    r.style.minHeight = '';
    const pages = Math.max(1, Math.ceil((r.scrollHeight - 2) / paper.h));
    r.style.minHeight = pages * paper.h + 'px';
    els.breaks.innerHTML = Array.from({ length: pages - 1 }, (_, i) =>
      `<div class="break" style="top:${(i + 1) * paper.h}px"><span>Page ${i + 2}</span></div>`).join('');
    els.pages.textContent = pages === 1 ? '1 page' : `${pages} pages`;
    els.pages.classList.toggle('warn', pages > 1);
    els.pageHint.textContent = pages > 1 ? 'Try smaller spacing to fit one page.' : '';
    fit();
  }

  function fit() {
    const paper = PAPER[state.design.paper];
    const cs = getComputedStyle(els.stage);
    const avail = els.stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (avail <= 0) return;
    const scale = ui.zoom === 'fit' ? Math.min(1, avail / paper.w) : ui.zoom;
    ui.scale = scale;
    els.scale.style.width = paper.w + 'px';
    els.scale.style.transform = `scale(${scale})`;
    els.frame.style.width = paper.w * scale + 'px';
    els.frame.style.height = els.scale.offsetHeight * scale + 'px';
    els.zoomFit.textContent = `${Math.round(scale * 100)}%`;
    els.zoomFit.title = ui.zoom === 'fit' ? 'Fitted to width' : 'Fit to width';
  }
  const zoomBy = (step) => {
    ui.zoom = Math.min(2, Math.max(0.3, Math.round((ui.scale + step) * 10) / 10));
    fit();
  };
  els.zoomOut.addEventListener('click', () => zoomBy(-0.1));
  els.zoomIn.addEventListener('click', () => zoomBy(0.1));
  els.zoomFit.addEventListener('click', () => { ui.zoom = 'fit'; fit(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => fit()).observe(els.stage);
  else window.addEventListener('resize', fit);

  // ---------- toolbar ----------
  els.moreBtn.innerHTML = icon('more', 20);
  const setMore = (open) => {
    els.moreMenu.classList.toggle('open', open);
    els.moreBtn.setAttribute('aria-expanded', String(open));
  };
  els.moreBtn.addEventListener('click', () => setMore(!els.moreMenu.classList.contains('open')));
  els.moreMenu.addEventListener('click', (e) => { if (e.target.closest('button')) setMore(false); });
  document.addEventListener('click', (e) => { if (!e.target.closest('.more')) setMore(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && els.moreMenu.classList.contains('open')) { setMore(false); els.moreBtn.focus(); }
  });

  let embedded = false;
  try { embedded = window.self !== window.top; } catch { embedded = true; }
  if (embedded) {
    els.pdfBtn.disabled = true;
    els.exportBtn.disabled = true;
    els.pdfBtn.title = els.exportBtn.title = 'Open the site directly to use this';
    els.embedNote.hidden = false;
  }

  els.pdfBtn.addEventListener('click', () => {
    setStatus('In the print dialog, choose “Save as PDF”', true);
    window.print();
  });

  els.exportBtn.addEventListener('click', () => {
    const slug = state.personal.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my';
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${slug}-resume.json`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setStatus(`Exported ${a.download}`, true);
  });

  els.importBtn.addEventListener('click', () => els.importFile.click());
  els.importFile.addEventListener('change', () => {
    const file = els.importFile.files[0];
    els.importFile.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let next = null;
      try { next = normalize(JSON.parse(reader.result)); } catch { next = null; }
      if (!next) {
        setStatus(`Couldn't read ${file.name}. Choose a .json file exported from Nex Resume.`, true);
        return;
      }
      next.sample = false;
      replaceState(next);
      setStatus(`Imported ${file.name}`, true);
    };
    reader.onerror = () => setStatus(`Couldn't open ${file.name}.`, true);
    reader.readAsText(file);
  });

  function replaceState(next) {
    state = next;
    ui.closed.clear();
    ui.openEntry = null;
    ui.settingsOpen = null;
    renderContent();
    if (ui.panel === 'customize') renderCustomize();
    renderPreview();
    save();
  }

  // ---------- start ----------
  renderRail();
  renderContent();
  setPanel('content');
  renderPreview();
  setStatus(restored ? 'Restored from this browser' : 'Sample loaded');
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutPages);
})();
